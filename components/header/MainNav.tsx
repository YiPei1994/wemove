"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa6";
import { useCurrentUser } from "../auth/useCurrentUser";
import { IoIosLogOut } from "react-icons/io";
import { useLogOut } from "../auth/useLogout";
import { useDisplayNavbar } from "@/store/bearStore/displayUserFrom";

function MainNav() {
  const path = usePathname();
  const { isAutenticated } = useCurrentUser();
  const { logOut } = useLogOut();
  const route = useRouter();
  const { toggleDisplayNavbar } = useDisplayNavbar();
  function handleLogout() {
    logOut();
    route.push("/login");
  }
  return (
    <ul className="flex flex-col justify-center items-center gap-4 lg:flex-row">
      <li onClick={toggleDisplayNavbar}>
        <Link className={path === "/" ? "text-[#53B9C7]" : ""} href="/">
          Home
        </Link>
      </li>

      <li onClick={toggleDisplayNavbar}>
        <Link
          className={path.startsWith("/gym") ? "text-[#53B9C7]" : ""}
          href="/gym"
        >
          Gym
        </Link>
      </li>

      {isAutenticated && (
        <li onClick={toggleDisplayNavbar}>
          <Link
            className={path.startsWith("/user") ? "text-[#53B9C7]" : ""}
            href="/user"
          >
            User stats
          </Link>
        </li>
      )}

      <li onClick={toggleDisplayNavbar}>
        {isAutenticated ? (
          <button
            className={`${
              path.startsWith("/graph") ? "text-[#53B9C7]" : ""
            } flex items-center gap-4`}
            onClick={handleLogout}
          >
            <IoIosLogOut className="text-[#53B9C7] " />
            Log out
          </button>
        ) : (
          <Link
            className={`${
              path.startsWith("/graph") ? "text-[#53B9C7]" : ""
            } flex items-center gap-4`}
            href="/login"
          >
            <FaUser className="text-[#53B9C7] " /> Log in
          </Link>
        )}
      </li>
    </ul>
  );
}

export default MainNav;
