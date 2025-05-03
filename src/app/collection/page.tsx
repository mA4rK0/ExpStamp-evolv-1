"use client";
import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { readContract } from "thirdweb";
import { contract } from "@/api/key/connect";

export default function CollectionPage() {
  const account = useActiveAccount();
  const [tokenUris, setTokenUris] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account) return;
    if (account) {
      async function fetchTokenUris() {
        setLoading(true);
        const data = await readContract({
          contract,
          method: "function getUserTokenUris(address user) view returns (string[])",
          params: [account?.address ?? ""],
        });
        console.log(data);
        setTokenUris(data as string[]);
        setLoading(false);
      }
      fetchTokenUris();
    }
  }, [account]);

  if (!account) return <p>Silakan hubungkan wallet</p>;

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {(tokenUris ?? []).length > 0 ? (
        <div>
          {tokenUris?.map((uri, idx) => (
            <div key={idx}>{uri}</div>
          ))}
        </div>
      ) : (
        <p>No NFTs found</p>
      )}
    </div>
  );
}
