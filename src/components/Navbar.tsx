import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { sepolia, arbitrumSepolia, arbitrum } from "thirdweb/chains";
import client from "@/api/key/connect";

const Navbar: React.FC = () => {
  return (
    <div className="flex flex-wrap w-full px-7 py-3 bg-[#212121] text-white items-center justify-between">
      <div>
        <Link href={"/"}>
          <h1 className="text-xl font-bold">ExpStamp</h1>
        </Link>
      </div>
      <div className="flex flex-wrap gap-x-8">
        {["Mint", "Collection"].map((item) => (
          <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-indigo-600 transition ease-in-out duration-300">
            <p>{item}</p>
          </Link>
        ))}
      </div>
      <div>
        <ConnectButton
          client={client}
          theme="dark"
          connectButton={{
            label: "Sign In",
            style: {
              color: "black",
              background: "white",
              width: "141px",
              height: "34px",
              fontSize: "15px",
            },
          }}
          chains={[sepolia, arbitrumSepolia, arbitrum]}
        />
      </div>
    </div>
  );
};

export default Navbar;
