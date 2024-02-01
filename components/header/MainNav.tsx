"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MainNav() {
  const path = usePathname();
  return (
    <ul className="flex flex-col justify-center items-center gap-4 lg:flex-row">
      <li>
        <Link className={path === "/" ? "text-blue-400" : ""} href="/">
          Home
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
          className={path.startsWith("/user") ? "text-blue-400" : ""}
          href="/user"
        >
          User stats
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
  );
}

export default MainNav;
