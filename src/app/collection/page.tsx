"use client";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

export default function CollectionPage() {
  const account = useActiveAccount();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (!account) return;

    const fetchNFTs = async () => {
      const res = await fetch(`/api/collection?address=${account.address}`);
      const data = await res.json();
      setNfts(data.nfts || []);
    };

    fetchNFTs();
  }, [account]);

  return (
    <div>
      <h1>My NFTs</h1>
      {nfts.length === 0 && <p>No NFTs found.</p>}
      <ul>
        {nfts.map((nft: any, i) => (
          <li key={i}>
            {nft.media?.[0]?.gateway ? (
              <img src={nft.media[0].gateway} alt={nft.title || "NFT"} width={100} />
            ) : (
              <div style={{ width: 100, height: 100, background: "#eee" }}>
                <p>No image</p>
              </div>
            )}
            <p>{nft.title || "No title"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

//* This is for get all the NFTs only in a specific smart contract with thirdweb

// "use client";
// import { useState, useEffect } from "react";
// import { useActiveAccount } from "thirdweb/react";
// import { readContract } from "thirdweb";
// import { contract } from "@/api/key/connect";

// export default function CollectionPage() {
//   const account = useActiveAccount();
//   const [tokenUris, setTokenUris] = useState<string[] | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!account) return;
//     if (account) {
//       async function fetchTokenUris() {
//         setLoading(true);
//         const data = await readContract({
//           contract,
//           method: "function getUserTokenUris(address user) view returns (string[])",
//           params: [account?.address ?? ""],
//         });
//         console.log(data);
//         setTokenUris(data as string[]);
//         setLoading(false);
//       }
//       fetchTokenUris();
//     }
//   }, [account]);

//   if (!account) return <p>Silakan hubungkan wallet</p>;

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       {(tokenUris ?? []).length > 0 ? (
//         <div>
//           {tokenUris?.map((uri, idx) => (
//             <div key={idx}>{uri}</div>
//           ))}
//         </div>
//       ) : (
//         <p>No NFTs found</p>
//       )}
//     </div>
//   );
// }
