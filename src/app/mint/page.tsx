"use client";
import { useRef, useState } from "react";
import { MediaRenderer, useActiveAccount, useConnectModal } from "thirdweb/react";
import client from "@/api/key/connect";
import useMintNft from "@/lib/useMintNft";

export default function Mint() {
  const address = useActiveAccount();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [nftName, setIsNftName] = useState<string>("");
  const [nftDescription, setIsNftDescription] = useState<string>("");
  const [mintingNft, setIsMintingNft] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const { mintNft } = useMintNft();
  const { connect, isConnecting } = useConnectModal();

  async function handleConnect() {
    try {
      const wallet = await connect({ client });
      const account = wallet.getAccount();
      await account?.signMessage({
        message: "welcome to ExpStamp, you can mint your NFTs here. Currently, only Ethereum Sepolia is supported",
      });

      console.log("connected to", account);
    } catch (error) {
      console.log(error);
    }
  }

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      processFile(selectedFile);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!nftName.trim()) {
      setNameError("NFT name is required!");
      hasError = true;
    } else {
      setNameError(null);
    }

    if (!file) {
      alert("Image file is required! Please add an image to mint your NFT.");
      hasError = true;
    }

    if (hasError) return;

    setIsMintingNft(true);

    try {
      if (!file) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const rawText = await uploadRes.text();
      console.log("Upload response text:", rawText);

      let uploadData;
      try {
        uploadData = JSON.parse(rawText);
      } catch (e) {
        console.error("Response is not valid JSON:", rawText);
        throw new Error("Server did not return valid JSON");
      }

      const ipfsHash = uploadData.IpfsHash;

      if (!ipfsHash) {
        console.error("Upload failed or unexpected response format:", uploadData);
        throw new Error("Image upload failed");
      }

      const imageIpfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

      const metadataRes = await fetch("/api/metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nftName,
          description: nftDescription,
          imageUrl: imageIpfsUrl,
        }),
      });

      const metadataData = await metadataRes.json();
      console.log("Uploaded metadata:", metadataData);
      if (metadataData) {
        await mintNft(`ipfs://${metadataData.IpfsHash}`);
        alert("NFT minted successfully");
      }
    } catch (error) {
      console.log(error);
    }

    setIsMintingNft(false);
  };

  const reset = () => {
    setImageUrl(null);
  };
  return (
    // <div className="min-h-screen bg-black text-white px-4">
    //   {address ? (
    //     <div className="w-full h-full flex flex-col md:flex-row justify-center items-start md:pt-28 gap-10 py-24">
    //       <div className="flex flex-col w-full md:w-auto">
    //         <h1 className="text-2xl font-bold mb-5">NFT Image</h1>
    //         <div onClick={handleFileSelect} className="flex items-center justify-center w-full md:w-[40rem] h-40 md:h-[25rem] border-2 border-dashed border-gray-300 cursor-pointer overflow-hidden">
    //           <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleChange} />
    //           {!imageUrl ? <p>Click to add file</p> : <MediaRenderer client={client} src={imageUrl} className="w-full h-full object-cover" />}
    //         </div>
    //         {imageUrl && (
    //           <div className="flex justify-center mt-6">
    //             <button onClick={reset} className="border border-red-600 rounded-md w-full max-w-[15rem] hover:bg-red-600 hover:text-white text-red-600 text-md p-2 cursor-pointer transition ease-in-out duration-300">
    //               Reset
    //             </button>
    //           </div>
    //         )}
    //       </div>

    //       <div className="flex flex-col w-full md:w-auto">
    //         <h1 className="text-2xl font-bold mb-9">NFT Metadata</h1>

    //         <label className="mb-2">NFT Name:</label>
    //         <input type="text" placeholder="My NFT Name" value={nftName} onChange={(e) => setIsNftName(e.target.value)} className={`border ${nameError ? "border-red-500 mb-2" : "border-gray-300 mb-5"} rounded-md w-full md:w-[40rem] p-3`} />
    //         {nameError && <p className="text-red-500 text-sm mb-5">{nameError}</p>}

    //         <label className="mb-2">NFT Description:</label>
    //         <input type="text" placeholder="My NFT is unique" value={nftDescription} onChange={(e) => setIsNftDescription(e.target.value)} className="border border-gray-300 rounded-md w-full md:w-[40rem] p-3 mb-12" />

    //         <button onClick={handleSubmit} className="border border-indigo-600 hover:bg-indigo-600 rounded-2xl w-full md:w-[40rem] p-3 transition duration-300 ease-in-out cursor-pointer" disabled={mintingNft}>
    //           {mintingNft ? "Minting..." : "Mint NFT"}
    //         </button>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="pt-32 text-center">
    //       <p className="mb-8 text-red-600 text-lg">Sign in to mint an NFT</p>
    //       <button onClick={handleConnect} className="text-white text-lg border rounded-full px-10 py-3 border-indigo-500 hover:bg-indigo-500 transition ease-in-out duration-300">
    //         Connect
    //       </button>
    //     </div>
    //   )}
    // </div>

    <div className="min-h-screen bg-black text-white px-4">
      {address ? (
        <div className="w-full h-full flex flex-col md:flex-row justify-center items-start md:pt-28 gap-10 md:gap-12 lg:gap-20 py-24 md:max-w-[90%] lg:max-w-none mx-auto">
          {/* NFT Image Section */}
          <div className="flex flex-col w-full md:w-[50%] lg:w-auto">
            <h1 className="text-2xl font-bold mb-5">NFT Image</h1>
            <div onClick={handleFileSelect} className="flex items-center justify-center w-full md:w-full lg:w-[40rem] h-40 md:h-[20rem] lg:h-[25rem] border-2 border-dashed border-gray-300 cursor-pointer overflow-hidden">
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleChange} />
              {!imageUrl ? <p>Click to add file</p> : <MediaRenderer client={client} src={imageUrl} className="w-full h-full object-cover" />}
            </div>
            {imageUrl && (
              <div className="flex justify-center mt-6">
                <button onClick={reset} className="border border-red-600 rounded-md w-full max-w-[15rem] hover:bg-red-600 hover:text-white text-red-600 text-md p-2 cursor-pointer transition ease-in-out duration-300">
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* NFT Metadata Section */}
          <div className="flex flex-col w-full md:w-[50%] lg:w-auto">
            <h1 className="text-2xl font-bold mb-9">NFT Metadata</h1>

            <label className="mb-2">NFT Name:</label>
            <input
              type="text"
              placeholder="My NFT Name"
              value={nftName}
              onChange={(e) => setIsNftName(e.target.value)}
              className={`border ${nameError ? "border-red-500 mb-2" : "border-gray-300 mb-5"} rounded-md w-full md:w-full lg:w-[40rem] p-3`}
            />
            {nameError && <p className="text-red-500 text-sm mb-5">{nameError}</p>}

            <label className="mb-2">NFT Description:</label>
            <input type="text" placeholder="My NFT is unique" value={nftDescription} onChange={(e) => setIsNftDescription(e.target.value)} className="border border-gray-300 rounded-md w-full md:w-full lg:w-[40rem] p-3 mb-12" />

            <button onClick={handleSubmit} className="border border-indigo-600 hover:bg-indigo-600 rounded-2xl w-full md:w-full lg:w-[40rem] p-3 transition duration-300 ease-in-out cursor-pointer" disabled={mintingNft}>
              {mintingNft ? "Minting..." : "Mint NFT"}
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-32 text-center">
          <p className="mb-8 text-red-600 text-lg">Sign in to mint an NFT</p>
          <button onClick={handleConnect} className="text-white text-lg border rounded-full px-10 py-3 border-indigo-500 hover:bg-indigo-500 transition ease-in-out duration-300">
            Connect
          </button>
        </div>
      )}
    </div>
  );
}
