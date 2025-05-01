import { NFT } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import client from "@/api/key/connect";

type NftCardProps = {
  nft: NFT;
};

export const NftCard = ({ nft }: NftCardProps) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <MediaRenderer client={client} src={nft.metadata.image} alt={nft.metadata.name} className="w-full h-64 object-cover" />
      <div className="mt-2">
        <h2 className="text-lg font-semibold">{nft.metadata.name}</h2>
        <p className="text-sm text-gray-400">Owned: {shortenAddress(nft.owner ?? "Unknown Owner")}</p>
      </div>
    </div>
  );
};
