"use client";

import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

function Header() {
  const [displayNavbar, setDisplayNavbar] = useState(false);
  const path = usePathname();
  return (
    <header className="flex w-full justify-between items-center p-4 flex-wrap lg:flex-nowrap bg-slate-50">
      <div>Logo</div>
      <button
        className="block lg:hidden"
        onClick={() => setDisplayNavbar((d) => !d)}
      >
        {displayNavbar ? <FaTimes /> : <GiHamburgerMenu />}
      </button>

      <nav
        className={`relative w-full  duration-300 transition-all  lg:max-h-auto lg:opacity-100 lg lg:w-auto lg:top-0 lg:mt-0 ${
          displayNavbar ? " max-h-[400px] opacity-100" : " max-h-0 opacity-0"
        }`}
      >
        <ul
          className={`flex  flex-col gap-4 py-4 justify-center items-center  absolute w-full bg-slate-50 lg:flex-row lg:top-[-28px] lg:relative`}
        >
          <li>
            <Link className={path === "/" ? "text-blue-400" : ""} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className={path.startsWith("/user") ? "text-blue-400" : ""}
              href="/user"
            >
              User stats
            </Link>
          </li>
          <li>
            <Link
              className={path.startsWith("/indoor") ? "text-blue-400" : ""}
              href="/indoor"
            >
              Indoor
            </Link>
          </li>
          <li>
            <Link
              className={path.startsWith("/outdoor") ? "text-blue-400" : ""}
              href="/outdoor"
            >
              OutDoor
            </Link>
          </li>
          <li>
            <Link
              className={path.startsWith("/graph") ? "text-blue-400" : ""}
              href="/graph"
            >
              Graph stats
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
