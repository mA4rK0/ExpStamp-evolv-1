import { createThirdwebClient, getContract } from "thirdweb";
// import { defineChain } from "thirdweb/chains";
import { sepolia } from "thirdweb/chains";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = process.env.THIRDWEB_SECRET_KEY;
const smartContractAddress = "0xB7e1c7a77A484df69459e1Fa07fd004d73f1fF35";
const client = createThirdwebClient({
  clientId: clientId as string,
  secretKey: secretKey as string,
});

export const contract = getContract({
  client,
  chain: sepolia,
  address: smartContractAddress,
});

export default client;
