"use client";

import { useCurrentUser } from "@/components/auth/useCurrentUser";
import DailyGoal from "@/components/dailyGoal/DailyGoal";
import { useRouter } from "next/navigation";

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
