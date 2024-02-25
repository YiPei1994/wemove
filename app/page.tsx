"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DailyGoal from "@/components/dailyGoal/DailyGoal";
import { useCurrentUser } from "@/components/auth/hooks/useCurrentUser";

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
      <main>
        <DailyGoal />
      </main>
    </>
  );
}
