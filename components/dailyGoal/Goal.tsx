import { GoalType } from "@/lib/DailyGoalsType";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { CalendarClock, LucideCalendarCheck2 } from "lucide-react";
import { HiOutlineTrash } from "react-icons/hi2";
import { Switch } from "../ui/switch";
import { useDeleteGoal } from "./hooks/useDeleteGoal";
import { useQueryClient } from "@tanstack/react-query";
import { useCompleteTemp } from "./hooks/useCompleteTemp";
import { useCompletePerm } from "./hooks/useCompletePerm";
import { formatDate } from "@/helpers/functions";
import { LOCALE, NOW } from "@/helpers/constants";

type GoalProps = {
  goal: GoalType;
};

function Goal({ goal }: GoalProps) {
  const {
    goal_id,
    goal: goalName,
    description,
    daily,
    userId,
    status,
    date,
  } = goal;
  const { deletingGoal } = useDeleteGoal();
  const queryClient = useQueryClient();
  const dateNow = formatDate(LOCALE, NOW);
  const { completingTempGoal } = useCompleteTemp();
  const { completingPermGoal } = useCompletePerm();

  useEffect(() => {
    function handleResetDaily() {
      if (!goal_id) return;
      if (daily === true && date !== dateNow) {
        completingPermGoal(
          { goal_id, status: false, userId },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["permGoals"] });
            },
          }
        );
      }
    }
    handleResetDaily();
  }, []);
  function handleChange(e: boolean) {
    if (!goal_id) return;
    if (daily === false) {
      completingTempGoal(
        { goal_id, status: e, userId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tempGoals"] });
          },
        }
      );
    }
    if (daily === true) {
      completingPermGoal(
        { goal_id, status: e, userId, dateNow },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["permGoals"] });
          },
        }
      );
    }
  }
  function handleDelete() {
    deletingGoal(
      { goal_id, daily, userId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["permGoals"] });
          queryClient.invalidateQueries({ queryKey: ["tempGoals"] });
        },
      }
    );
  }
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-4">
            {" "}
            {status === false ? (
              <CalendarClock className="text-primary" />
            ) : (
              <LucideCalendarCheck2 className="text-accent" />
            )}
            <span>{goalName}</span>
          </div>{" "}
        </AccordionTrigger>
        <AccordionContent className="flex items-center justify-between gap-2">
          <Switch checked={status} onCheckedChange={(e) => handleChange(e)} />
          <p>{description}</p>
          <AlertDialog>
            <AlertDialogTrigger className="text-primary text-xl   ml-auto">
              {" "}
              <HiOutlineTrash />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default Goal;
