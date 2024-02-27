"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/components/auth/hooks/useCurrentUser";
import Motto from "@/components/motto/Motto";

export default function Home() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const isAutenticated = user?.role === "authenticated";
  useEffect(() => {
    if (!isAutenticated) {
      router.push("/login");
    }
  }, [isAutenticated, router]);

  return (
    <>
      {isAutenticated && (
        <main>
          <Motto />
        </main>
      )}
    </>
  );
}
