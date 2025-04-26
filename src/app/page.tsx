import { ConnectButton } from "thirdweb/react";
import client from "../api/key/connect";

export default function Home() {
  return (
    <div>
      <ConnectButton client={client} theme="dark" />
    </div>
  );
}
