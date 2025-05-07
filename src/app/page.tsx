"use client";
import { Stamp } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useConnectModal, useActiveAccount } from "thirdweb/react";
import client from "@/api/key/connect";
import Loading from "@/components/Loading";

export default function Home() {
  const { connect, isConnecting } = useConnectModal();
  const account = useActiveAccount();
  const router = useRouter();
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    if (account?.address && !isConnecting) {
      isLoading(true);
      router.push("/mint");
      isLoading(false);
    }
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

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full bg-black px-6 py-10 gap-10">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-center">
            <Stamp className="text-indigo-500 w-32 h-32 md:w-64 md:h-64" />
          </div>
          <div className="flex flex-col gap-6 text-center md:text-left max-w-[400px]">
            <p className="text-white text-2xl md:text-5xl font-bold leading-snug">
              Mint your <span className="text-indigo-500">NFT</span>s now on <span className="text-indigo-500">Exp</span>Stamp!
            </p>
            <div className="flex justify-center md:justify-start">
              <button onClick={handleConnect} className="text-white text-[1rem] md:text-[1.25rem] border rounded-full px-8 py-3 border-indigo-500 hover:bg-indigo-500 transition ease-in-out duration-300 cursor-pointer">
                Connect
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
