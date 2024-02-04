"use client";

import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import MainNav from "./MainNav";

function Header() {
  const [displayNavbar, setDisplayNavbar] = useState(false);

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
        className={`${
          displayNavbar
            ? "max-h-[400px] opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        } w-full lg:hidden transition-all duration-300`}
      >
        <MainNav />
      </nav>
      <nav className="hidden lg:block">
        <MainNav />
      </nav>
    </header>
  );
}

export default Header;
