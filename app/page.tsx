"use client";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import DailyGoal from "@/components/dailyGoal/DailyGoal";

export default function Home() {
  const { isAutenticated } = useCurrentUser();
  const router = useRouter();

  if (!isAutenticated) {
    router.push("/login");
  }
  return (
    <>
      <main>
        <DailyGoal />
      </main>
    </>
  );
}
