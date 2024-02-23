"use client";

import React, { ReactNode } from "react";
import { useCurrentUser } from "../auth/useCurrentUser";
import { formatDate } from "@/helpers/functions";
import { LOCALE, NOW } from "@/helpers/constants";
import { useQuery } from "@tanstack/react-query";
import { getDailyGoals } from "@/servises/apiDailyGoals";
import Spinner from "../Spinner";
import Goal from "./Goal";

type GoalListProps = {
  type: "daily" | "unfinished" | "finished";
  children: ReactNode;
};

function GoalList({ type, children }: GoalListProps) {
  const { user } = useCurrentUser();

  const date = formatDate(LOCALE, NOW);

  const { data: dailyGoals, isLoading } = useQuery({
    queryKey: ["dailyGoals", user?.id, date, type],
    queryFn: () => getDailyGoals(user?.id, type, date),
  });

  if (isLoading) return <Spinner />;

  if (dailyGoals?.length === 0 || !dailyGoals) return;
  return (
    <div>
      <h2 className="uppercase">{children}</h2>
      <ul>
        {dailyGoals.map((goal) => (
          <li key={goal.id}>
            <Goal goal={goal} type={type} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalList;
