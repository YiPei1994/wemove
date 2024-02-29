"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDisplayNavbar } from "@/store/useDisplayNavbar";

import { useCurrentUser } from "../auth/hooks/useCurrentUser";
import UserOperations from "./UserOperations";
function MainNav() {
  const path = usePathname();
  const { isAutenticated } = useCurrentUser();
  const { toggleDisplayNavbar } = useDisplayNavbar();

  return (
    <ul className="flex flex-col justify-center items-center gap-4 lg:flex-row">
      <li onClick={toggleDisplayNavbar}>
        <Link
          className={`${
            path.startsWith("/goal") ? "text-primary bg-accent/50" : ""
          }  px-4 py-2 rounded-md transition-all duration-300`}
          href="/goal"
        >
          Goals
        </Link>
      </li>

      <li onClick={toggleDisplayNavbar}>
        <Link
          className={`${
            path === "/gym" ? "text-primary bg-accent/50" : ""
          }  px-4 py-2 rounded-md transition-all duration-300`}
          href="/gym"
        >
          Gym
        </Link>
      </li>

      {isAutenticated && (
        <li onClick={toggleDisplayNavbar}>
          <Link
            className={`${
              path === "/user" ? "text-primary bg-accent/50" : ""
            }  px-4 py-2 rounded-md transition-all duration-300`}
            href="/user"
          >
            User stats
          </Link>
        </li>
      )}
      <li>
        <UserOperations />
      </li>
    </ul>
  );
}

export default MainNav;
