"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "thirdweb/react";
import { sepolia, arbitrumSepolia, arbitrum } from "thirdweb/chains";
import client from "@/api/key/connect";

export default function MobileNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isBorder, setIsBorder] = useState(false);
  const navItems = [
    { href: "/mint", label: "Mint" },
    { href: "/collection", label: "Collection" },
  ];

  function handleNavbar() {
    setIsBorder(!isBorder);
    setIsOpen(!isOpen);
  }

  return (
    <>
      <section className={`flex items-center ${isBorder ? "border p-2 rounded" : ""}`}>
        <button aria-label="toggle navigation menu" onClick={handleNavbar} className="flex flex-col justify-center items-center">
          <span className="w-[30px] h-[2px] my-[3px] bg-indigo-500"></span>
          <span className="w-[30px] h-[2px] my-[3px] bg-indigo-500"></span>
          <span className="w-[30px] h-[2px] my-[3px] bg-indigo-500"></span>
        </button>
      </section>

      <nav className={`${isOpen ? "flex" : "hidden"} flex-col gap-4 py-6 px-5 fixed right-2 top-16 w-full max-w-[200px] z-20 bg-gray-700 text-white shadow-lg shadow-black rounded-lg`}>
        <div className="flex flex-col gap-3">
          {navItems.map(({ href, label }) => (
            <Link key={label} href={href} className={`transition ease-in-out duration-300 ${pathname === href ? "text-indigo-500 font-semibold" : "text-white"} hover:text-indigo-400`}>
              {label}
            </Link>
          ))}
        </div>

        <hr className="border-gray-500 my-2" />

        <div className="mt-2">
          <ConnectButton
            client={client}
            theme="dark"
            connectButton={{
              label: "Sign In",
              style: {
                color: "black",
                background: "white",
                width: "100%",
                height: "36px",
                fontSize: "15px",
                borderRadius: "6px",
              },
            }}
            chains={[sepolia, arbitrumSepolia, arbitrum]}
          />
        </div>
      </nav>
    </>
  );
}
