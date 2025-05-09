# ExpStamp-Evolv-1

Decentralised platform for minting NFTs

## Tools

1. Front-end Framework: Next.js | v15.3.1
2. Smart Contract Framework: Foundry
3. Icons: Lucide | v^0.507.0
4. Decentralised Storage: Pinata | v^2.2.1, IPFS
5. Web3.0 SDK and APIs: Thirdweb | v^5.96.3
6. CSS Framework: Tailwind CSS | v^4
7. Mint NFT Library: OpenZeppelin
8. Blockchain API: Alchemy
9. Loading component: SpinKit
10. Web Hosting: Vercel
11. Smart Contract Address Checker: Etherscan

## Getting Started 

1. First, make a `.env` file in the root directory, then make all the following variables to store the API Key values on the `.env` file, exm:
   ```
   PINATA_JWT=YOUR_PINATA_JWT
   NEXT_PUBLIC_GATEWAY_URL=YOUR_NEXT_PUBLIC_PINATA_GATEWAY_URL
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=YOUR_NEXT_PUBLIC_THIRDWEB_CLIENT_ID
   THIRDWEB_SECRET_KEY=YOUR_THIRDWEB_SECRET_KEY
   ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
   SEPOLIA_RPC_URL=YOUR_SEPOLIA_RPC_URL
   RPC_URL=YOUR_RPC_URL
   PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
   ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
   SMART_CONTRACT_ADDRESS=YOUR_SMART_CONTRACT_MINT_NFT_ADDRESS
   ```
2. Then, type `source .env` in the terminal to read the `.env` file:
   ```source .env```
3. Run the project by typing:
   ```npm run dev```
