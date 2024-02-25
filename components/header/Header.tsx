"use client";

import { HiOutlineListBullet } from "react-icons/hi2";
import { HiOutlineXMark } from "react-icons/hi2";
import MainNav from "./MainNav";
import Logo from "./Logo";
import { useDisplayNavbar } from "@/store/useDisplayNavbar";
import { useCurrentUser } from "../auth/hooks/useCurrentUser";

function Header() {
  const { displayNavbar, toggleDisplayNavbar } = useDisplayNavbar();
  const { isAutenticated } = useCurrentUser();

  return (
    <header className="flex w-full justify-between items-center p-4 flex-wrap lg:flex-nowrap ">
      <Logo />
      <button className="block lg:hidden" onClick={() => toggleDisplayNavbar()}>
        {displayNavbar ? (
          <HiOutlineXMark className="" />
        ) : (
          <HiOutlineListBullet />
        )}
      </button>

      {isAutenticated && (
        <>
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
        </>
      )}
    </header>
  );
}

export default Header;
