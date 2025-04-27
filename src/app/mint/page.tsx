"use client";
import { useRef, useState } from "react";
import { MediaRenderer, useActiveAccount } from "thirdweb/react";

export default function Mint() {
  const address = useActiveAccount();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
      processFile(files[0]);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const reset = () => {
    setImageUrl(null);
  };
  return (
    <div className="h-screen bg-black text-white">
      {address ? (
        <div className="w-full h-full flex justify-center mx-auto">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mt-10 mb-5">NFT Image</h1>
            <div onClick={handleFileSelect} className="flex items-center justify-center w-[40rem] h-[25rem] border-2 border-dashed border-gray-300 cursor-pointer overflow-hidden">
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleChange} />
              {!imageUrl ? (
                <div>
                  <p>Click to add file</p>
                </div>
              ) : (
                <>
                  <div>
                    <MediaRenderer src={imageUrl} className="w-full h-full object-cover" />
                  </div>
                </>
              )}
            </div>
            {imageUrl && (
              <div className="flex justify-center mt-6">
                <button onClick={reset} className="border border-red-600 rounded-md w-[15rem] hover:bg-red-600 hover:text-white text-red-600 text-md p-1 transition ease-in-out duration-300 cursor-pointer">
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h1>sign in to mint an NFT.</h1>
        </div>
      )}
    </div>
  );
}
