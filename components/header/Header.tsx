"use client";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import MainNav from "./MainNav";

import Logo from "./Logo";
import { useDisplayNavbar } from "@/store/useDisplayNavbar";

function Header() {
  const { displayNavbar, toggleDisplayNavbar } = useDisplayNavbar();

  return (
    <header className="flex w-full justify-between items-center p-4 flex-wrap lg:flex-nowrap bg-[#BE3144]">
      <Logo />
      <button className="block lg:hidden" onClick={() => toggleDisplayNavbar()}>
        {displayNavbar ? (
          <FaTimes className="text-[#53B9C7] " />
        ) : (
          <GiHamburgerMenu />
        )}
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
