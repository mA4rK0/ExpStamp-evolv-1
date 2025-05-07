"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "thirdweb/react";
import { sepolia, arbitrumSepolia, arbitrum } from "thirdweb/chains";
import client from "@/api/key/connect";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const navItems = [
    { href: "/mint", label: "Mint" },
    { href: "/collection", label: "Collection" },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-x-8">
        {navItems.map(({ href, label }) => (
          <Link key={label} href={href} className={`hover:text-indigo-500 transition ease-in-out duration-300 ${pathname === href ? "text-indigo-500 font-semibold" : "text-white"}`}>
            <p>{label}</p>
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
    </>
  );
};

export default Navbar;
