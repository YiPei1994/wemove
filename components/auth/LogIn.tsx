"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useLogin } from "./useLogin";
import { useRouter } from "next/navigation";

import Logo from "../header/Logo";

function LogIn() {
  const [email, setEmail] = useState("test@gmail.yp");
  const [password, setPassword] = useState("testacc");
  const { login } = useLogin();
  const route = useRouter();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          route.push("/");
        },
      }
    );
  }
  return (
    <div className="flex justify-center flex-col gap-4 m-4 p-10 items-center mt-10 bg-[#be3144]">
      <Logo />
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <input
            className="p-2 w-full"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            className="p-2 w-full"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-2 text-center">
          <button className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm">
            Log in
          </button>
          <Link
            className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm"
            href="/login/signup"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
