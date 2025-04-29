import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    PINATA_JWT: process.env.PINATA_JWT,
  },
};

export default nextConfig;
