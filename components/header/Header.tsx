"use client";

import { HiOutlineListBullet } from "react-icons/hi2";
import { HiOutlineXMark } from "react-icons/hi2";

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
          <HiOutlineXMark className="text-[#53B9C7] " />
        ) : (
          <HiOutlineListBullet />
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
