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
    <div className="flex flex-wrap justify-center items-center min-h-screen w-full bg-black">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            <Stamp className="text-indigo-500 w-64 h-64" />
          </div>
          <div className="flex flex-col gap-y-14">
            <p className="text-white text-5xl font-bold">
              Mint your <span className="text-indigo-500">NFT</span>s now on <span className="text-indigo-500">Exp</span>Stamp!
            </p>
            <div className="flex justify-center">
              <button onClick={handleConnect} className="text-white text-[1.25rem] border rounded-full px-10 py-3 border-indigo-500 hover:bg-indigo-500 transition ease-in-out duration-300 cursor-pointer">
                Connect
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
