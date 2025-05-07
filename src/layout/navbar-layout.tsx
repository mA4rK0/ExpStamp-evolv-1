"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";

export default function NavbarLayout() {
  const account = useActiveAccount();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowSize.width <= 440;
  const isDisabled = !!account;

  return (
    <div className="flex flex-wrap fixed w-full px-7 py-3 bg-[#212121] text-white items-center justify-between z-20">
      <div>
        <Link
          href={"/"}
          onClick={(e) => {
            if (isDisabled) e.preventDefault();
          }}
        >
          <h1 className="text-xl font-bold">
            <span className="text-indigo-500">Exp</span>Stamp
          </h1>
        </Link>
      </div>
      {isMobile ? <MobileNavbar /> : <Navbar />}
    </div>
  );
}
