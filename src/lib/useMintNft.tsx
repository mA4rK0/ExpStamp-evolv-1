"use client";

import { prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { contract } from "@/api/key/connect";

export default function useMintNft() {
  const account = useActiveAccount();

  const mintNft = async (tokenUri: string) => {
    try {
      if (!account) {
        throw new Error("Wallet not connected");
      }

      const transaction = prepareContractCall({
        contract,
        method: "function mintNft(string tokenUri)",
        params: [tokenUri],
      });

      console.log("Sending transaction with URI:", tokenUri);

      const txResult = await sendAndConfirmTransaction({
        account,
        transaction,
      });

      console.log("✅ Mint confirmed:", txResult.transactionHash);
      alert("NFT minted! Tx: " + txResult.transactionHash);
    } catch (err) {
      console.error("❌ Mint failed:", err);
      alert("Minting failed. See console.");
    }
  };

  return { mintNft };
}
