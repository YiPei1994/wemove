import { fetchPermGoals, fetchTempGoals } from "@/servises/apiDailyGoals";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useCurrentUser } from "../auth/hooks/useCurrentUser";
import Spinner from "../Spinner";
import Goal from "./Goal";
import { Badge } from "../ui/badge";
import { formatDate } from "@/helpers/functions";
import { LOCALE, NOW } from "@/helpers/constants";

function ScheduledGoals() {
  const { user } = useCurrentUser();

  const { data: permGoals, isLoading: loadingPerm } = useQuery({
    queryKey: ["permGoals"],
    queryFn: () => fetchPermGoals(user?.id),
  });

  const { data: tempGoals, isLoading: loadingTemp } = useQuery({
    queryKey: ["tempGoals"],
    queryFn: () => fetchTempGoals(user?.id),
  });

  const loading = loadingPerm || loadingTemp;

  if (loading) return <Spinner />;
  if (!tempGoals || !permGoals) return;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Badge className="uppercase">Permanent goals</Badge>
        <div>
          {permGoals.map((goal) => (
            <Goal key={goal.goal_id} goal={goal} />
          ))}
        </div>
      </div>
      <div>
        <Badge className="uppercase">Temporary goals</Badge>
        <div>
          {tempGoals.map((goal) => (
            <Goal key={goal.goal_id} goal={goal} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScheduledGoals;
