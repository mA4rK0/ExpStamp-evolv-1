"use client";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import getNfts from "@/lib/getNfts";

export default function CollectionPage() {
  const account = useActiveAccount();
  const { getUserTokenUris } = getNfts();
  const [tokenUris, setTokenUris] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account) return;
    const fetchData = async () => {
      setLoading(true);
      const uris = await getUserTokenUris();
      setTokenUris(uris);
      setLoading(false);
    };

    fetchData();
  }, [account]);

  return (
    <div>
      {loading ? (
        <p>Loading NFTs...</p>
      ) : tokenUris.length > 0 ? (
        <div>
          {tokenUris.map((uri, idx) => (
            <div key={idx}>{uri}</div>
          ))}
        </div>
      ) : (
        <p>No NFTs found</p>
      )}
    </div>
  );
}
