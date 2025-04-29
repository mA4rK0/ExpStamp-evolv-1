import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const JWT = process.env.PINATA_JWT;

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const pinataFormData = new FormData();
    pinataFormData.append("file", new Blob([fileBuffer], { type: file.type }), file.name);

    const uploadResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: pinataFormData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.text();
      console.error("Pinata error:", errorData);
      return NextResponse.json({ error: "Failed to upload to Pinata", detail: errorData }, { status: 500 });
    }

    const pinataData = await uploadResponse.json();
    return NextResponse.json(pinataData);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
