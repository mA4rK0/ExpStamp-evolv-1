import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });
  }

  try {
    const apiKey = process.env.ALCHEMY_API_KEY;
    const chain = "eth-sepolia";
    const url = `https://${chain}.g.alchemy.com/nft/v2/${apiKey}/getNFTs/?owner=${address}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    return NextResponse.json({ nfts: data.ownedNfts });
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return NextResponse.json({ error: "Failed to fetch NFTs" }, { status: 500 });
  }
}
