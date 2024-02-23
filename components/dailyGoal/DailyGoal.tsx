import React from "react";
import AddGoal from "./AddGoal";
import GoalList from "./GoalList";

function DailyGoal() {
  return (
    <div className="bg-[#BE3144] my-6 h-auto w-[90%] mx-auto rounded-sm p-4 py-8 flex flex-col gap-4">
      <AddGoal />
      <div className="flex flex-col gap-2">
        <GoalList type="daily">Daily goals:</GoalList>
        <GoalList type="unfinished">Today goals:</GoalList>

        <GoalList type="finished">Finished goals:</GoalList>
      </div>
    </div>
  );
}

export default DailyGoal;
