import React from "react";
import AddGoal from "./AddGoal";
import ScheduledGoals from "./ScheduledGoals";

function DailyGoal() {
  return (
    <div className="h-auto w-[90%] mx-auto rounded-sm p-4  flex flex-col gap-4">
      <AddGoal />
      <ScheduledGoals />
    </div>
  );
}

export default DailyGoal;
