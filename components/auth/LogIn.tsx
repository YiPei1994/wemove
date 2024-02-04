"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useLogin } from "./useLogin";
import { useRouter } from "next/navigation";

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
    <div className="flex justify-center flex-col gap-4 px-10 items-center mt-10">
      <div>Logo</div>
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
        <div className="flex flex-col gap-2">
          <button className="px-4 py-2 w-auto bg-blue-500/50 rounded-lg text-white">
            Log in
          </button>
          <Link
            className="px-4 py-2 w-auto bg-blue-500/50 rounded-lg text-white text-center"
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
