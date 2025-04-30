import { prepareContractCall } from "thirdweb";
import { useSendAndConfirmTransaction } from "thirdweb/react";
import { contract } from "@/api/key/connect";

export default function useMintNft() {
  const { mutateAsync: sendAndConfirm } = useSendAndConfirmTransaction();

  const mintNft = async (tokenUri: string) => {
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function mintNft(string tokenUri)",
        params: [tokenUri],
      });

      console.log("Sending transaction with URI:", tokenUri);
      const txResult = await sendAndConfirm(transaction);
      console.log("✅ Mint confirmed:", txResult.transactionHash);
      alert("NFT minted! Tx: " + txResult.transactionHash);
    } catch (err) {
      console.error("❌ Mint failed:", err);
      alert("Minting failed. See console.");
    }
  };

  return { mintNft };
}
