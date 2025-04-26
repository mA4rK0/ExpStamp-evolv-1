import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const clientId = process.env.THIRDWEB_CLIENT_ID;
const client = createThirdwebClient({
  clientId: clientId as string,
});

export default client;
