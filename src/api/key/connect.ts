import { createThirdwebClient, getContract } from "thirdweb";
// import { defineChain } from "thirdweb/chains";
import { sepolia } from "thirdweb/chains";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = process.env.THIRDWEB_SECRET_KEY;
const smartContractAddress = "0xc5A340e06542Eb424F30592AB25D571c1122F40B";
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
