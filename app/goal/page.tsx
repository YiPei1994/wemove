"use client";
import { useEffect } from "react";
import { useCurrentUser } from "@/components/auth/hooks/useCurrentUser";
import DailyGoal from "@/components/dailyGoal/DailyGoal";
import Motto from "@/components/motto/Motto";
import { redirect } from "next/navigation";

function Goalpage() {
  const { isAutenticated } = useCurrentUser();
  console.log(isAutenticated);
  useEffect(() => {
    if (!isAutenticated) {
      redirect("/login");
    }
  }, [isAutenticated]);

  return (
    <div>
      <Motto />
      <DailyGoal />
    </div>
  );
}

export default Goalpage;
