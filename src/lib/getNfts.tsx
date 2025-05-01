"use client";
import { prepareContractCall, simulateTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { contract } from "@/api/key/connect";

export default function getNfts() {
  const account = useActiveAccount();

  const getUserTokenUris = async (): Promise<string[]> => {
    try {
      if (!account) throw new Error("Wallet not connected");

      const tx = prepareContractCall({
        contract,
        method: "function getUserTokens() view returns (uint256[])",
        params: [],
      });

      const { result: tokenIds } = await simulateTransaction({ transaction: tx, account });

      if (!tokenIds || tokenIds.length === 0) return [];

      console.log("Token IDs:", tokenIds);

      const uris: string[] = [];

      for (const tokenId of tokenIds as bigint[]) {
        const txUri = prepareContractCall({
          contract,
          method: "function tokenURI(uint256) view returns (string)",
          params: [tokenId],
        });

        const { result: uri } = await simulateTransaction({ transaction: txUri, account });
        if (uri) uris.push(uri as string);
      }

      console.log("Token URIs:", uris);
      return uris;
    } catch (error) {
      console.error("getUserTokenUris error:", error);
      return [];
    }
  };

  return { getUserTokenUris };
}
