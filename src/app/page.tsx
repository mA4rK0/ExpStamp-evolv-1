"use client";
import { Stamp } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConnectModal, useActiveAccount } from "thirdweb/react";
import client from "@/api/key/connect";

export default function Home() {
  const { connect, isConnecting } = useConnectModal();
  const account = useActiveAccount();
  const router = useRouter();

  useEffect(() => {
    if (account?.address && !isConnecting) {
      router.push("/mint");
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
    <div className="flex flex-wrap min-h-screen w-full bg-black">
      <div>
        <Stamp className="text-indigo-500" />
      </div>
      <div>
        <p className="text-white">Mint your NFTs now on ExpStamp!</p>
        <button onClick={handleConnect} className="text-white">
          Connect
        </button>
      </div>
    </div>
  );
}
