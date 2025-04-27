import { createThirdwebClient } from "thirdweb";

const clientId = process.env.THIRDWEB_CLIENT_ID;
const secretKey = process.env.THIRDWEB_SECRET_KEY;
const client = createThirdwebClient({
  clientId: clientId as string,
  secretKey: secretKey as string,
});

export default client;
