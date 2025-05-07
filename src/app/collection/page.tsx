"use client";
import Link from "next/link";
import { Copy, CopyCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useActiveAccount, useConnectModal } from "thirdweb/react";
import client from "@/api/key/connect";
import Loading from "@/components/Loading";
import copyToClipboard from "@/utils/copyAddress";

export default function CollectionPage() {
  const account = useActiveAccount();
  const { connect, isConnecting } = useConnectModal();
  const [hydration, setHydration] = useState(false);
  const [loading, isLoading] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [isCopied, setIsCopied] = useState<string>();
  const [isHover, setIsHover] = useState<string>();

  useEffect(() => {
    if (!account) return;

    const fetchNFTs = async () => {
      isLoading(true);
      setHydration(true);
      const res = await fetch(`/api/collection?address=${account.address}`);
      const data = await res.json();
      setNfts(data.nfts || []);
      isLoading(false);
    };

    fetchNFTs();
  }, [account]);

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

  const handleCopy = async (value: string) => {
    try {
      await copyToClipboard(value);
      setIsCopied(value);
      setTimeout(() => {
        setIsCopied("");
        setIsHover("");
      }, 500);
    } catch (error) {
      console.log("Clipboard API not supported");
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="flex justify-center text-4xl font-bold mt-24 mb-14 text-white">My NFTs</h1>
          {!account && (
            <>
              <p className="text-center mx-auto mb-8 text-red-600 text-[1.406rem]">Connect a wallet to see your NFTs</p>{" "}
              <div className="flex justify-center mb-11">
                <button onClick={handleConnect} className="text-white text-[1.25rem] border rounded-full px-10 py-3 border-indigo-500 hover:bg-indigo-500 transition ease-in-out duration-300 cursor-pointer">
                  Connect
                </button>
              </div>
            </>
          )}
          {hydration &&
            account &&
            (nfts.length === 0 ? (
              <p className="text-center mx-auto text-gray-400 text-[1.406rem]">
                No NFTs found. You can mint them{" "}
                <Link href="/mint" className="text-indigo-500 hover:underline">
                  here
                </Link>
                .
              </p>
            ) : (
              <ul className="flex flex-wrap gap-10 justify-center">
                {nfts.map((nft: any, i) => (
                  <li key={i} className="group bg-neutral-800 rounded-2xl p-4 shadow-white hover:shadow-lg transition-shadow duration-300 border border-neutral-700 w-72 h-96">
                    <div className="relative overflow-hidden rounded-lg mb-10">
                      {nft.media?.[0]?.gateway ? (
                        <img src={nft.media[0].gateway} alt={nft.title || "NFT"} className="w-full h-48 object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-125" />
                      ) : (
                        <div className="w-full h-48 bg-neutral-700 flex items-center justify-center rounded-lg">
                          <p className="text-sm text-gray-400">No image</p>
                        </div>
                      )}
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-2">{nft.title || "No title"}</h2>
                    <p className="text-sm text-gray-400 mb-2">ID: {parseInt(nft.id.tokenId, 16)}</p>
                    <div className="flex items-center gap-2 cursor-pointer relative">
                      <Link target="_blank" href={`https://testnets.opensea.io/assets/sepolia/${nft.contract.address}/${parseInt(nft.id.tokenId, 16)}`} className="text-md text-blue-400 hover:underline break-all">
                        {`${nft.contract.address.slice(0, 5)}...${nft.contract.address.slice(-4)}`}
                      </Link>
                      {isHover === nft.contract.address && <div className="absolute -top-5 left-24 bg-black text-white px-2 text-xs rounded-sm">Copy</div>}
                      {isCopied === nft.contract.address ? (
                        <CopyCheck className="size-5 text-white" />
                      ) : (
                        <Copy className="size-5 text-white" onClick={() => handleCopy(nft.contract.address)} onMouseEnter={() => setIsHover(nft.contract.address)} onMouseLeave={() => setIsHover("")} />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ))}
        </>
      )}
    </div>
  );
}

//* This is for get all the NFTs only in a specific smart contract with thirdweb

// "use client";
// import { useState, useEffect } from "react";
// import { useActiveAccount } from "thirdweb/react";
// import { readContract } from "thirdweb";
// import { contract } from "@/api/key/connect";

// export default function CollectionPage() {
//   const account = useActiveAccount();
//   const [tokenUris, setTokenUris] = useState<string[] | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!account) return;
//     if (account) {
//       async function fetchTokenUris() {
//         setLoading(true);
//         const data = await readContract({
//           contract,
//           method: "function getUserTokenUris(address user) view returns (string[])",
//           params: [account?.address ?? ""],
//         });
//         console.log(data);
//         setTokenUris(data as string[]);
//         setLoading(false);
//       }
//       fetchTokenUris();
//     }
//   }, [account]);

//   if (!account) return <p>Silakan hubungkan wallet</p>;

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       {(tokenUris ?? []).length > 0 ? (
//         <div>
//           {tokenUris?.map((uri, idx) => (
//             <div key={idx}>{uri}</div>
//           ))}
//         </div>
//       ) : (
//         <p>No NFTs found</p>
//       )}
//     </div>
//   );
// }
