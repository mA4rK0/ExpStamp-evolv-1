// const JWT = process.env.PINATA_JWT;

// export default async function metadata(name: string, description: string, imageUrl: string) {
//   try {
//     const formData = new FormData();

//     const json = JSON.stringify({
//       name,
//       description,
//       imageUrl,
//     });
//     const blob = new Blob([json]);
//     const file = new File([blob], `${name}.json`, { type: "application/json" });

//     formData.append("file", file);

//     formData.append("network", "public");

//     const request = await fetch("https://uploads.pinata.cloud/v3/files", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${JWT}`,
//       },
//       body: formData,
//     });
//     const response = await request.json();
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(error);
//     return;
//   }
// }

// app/api/metadata/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, description, imageUrl } = await req.json();

  const JWT = process.env.PINATA_JWT;

  try {
    const formData = new FormData();

    const json = JSON.stringify({ name, description, imageUrl });
    const blob = new Blob([json], { type: "application/json" });
    const file = new File([blob], `${name}.json`, { type: "application/json" });

    formData.append("file", file);
    formData.append("network", "public");

    const pinataResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: formData,
    });

    const pinataData = await pinataResponse.json();
    return NextResponse.json(pinataData);
  } catch (error) {
    console.error("Pinata upload error:", error);
    return NextResponse.json({ error: "Failed to upload metadata" }, { status: 500 });
  }
}
