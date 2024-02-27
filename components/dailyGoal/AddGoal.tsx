"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useCreateUserGoal } from "./hooks/useCreateUserGoal";
import { useQueryClient } from "@tanstack/react-query";
import { useDisplayAddGoal } from "@/store/useDisplayAddGoal";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { useCurrentUser } from "../auth/hooks/useCurrentUser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import { GoalType } from "@/lib/DailyGoalsType";

function AddGoal() {
  const form = useForm<GoalType>({
    defaultValues: {
      goal: "",
      description: "",
      daily: false,
    },
  });
  const { user } = useCurrentUser();
  const { creatingGoal } = useCreateUserGoal();
  const queryClient = useQueryClient();
  const { displayAddGoal, toggleDisplayAddGoal } = useDisplayAddGoal();

  function handleNewGoal() {
    toggleDisplayAddGoal();
  }

  function onSubmit(data: GoalType) {
    if (!data || !user) return;

    const newGoal: GoalType = {
      goal: data.goal,
      description: data.description,
      daily: data.daily,
      userId: user.id,
    };

    creatingGoal(newGoal, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["goals"] });
        queryClient.invalidateQueries({ queryKey: ["dailyGoals"] });
        form.reset();
        toggleDisplayAddGoal();
      },
    });
  }
  return (
    <>
      <Button
        onClick={handleNewGoal}
        className="w-full flex gap-4 items-center justify-center text-center p-4 uppercase  text-lg"
      >
        <span>Add goal</span> <HiOutlineDocumentPlus />
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${
            displayAddGoal
              ? "max-h-[250px] opacity-100 pointer-events-auto py-4"
              : "max-h-[0px] opacity-0 pointer-events-none py-0"
          } transition-all duration-300 flex flex-wrap items-center justify-between gap-4 border  px-2 `}
        >
          <div className="w-full flex gap-2 justify-between items-center">
            <FormField
              control={form.control}
              name="daily"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md px-4 shadow">
                  <span>Daily: </span>
                  <FormControl>
                    <Checkbox
                      className="h-6 w-6"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="goal..." required {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="detail..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-4/5 justify-between items-center flex m-auto">
            <Button type="reset" onClick={() => toggleDisplayAddGoal(false)}>
              Close
            </Button>
            <Button>Add</Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default AddGoal;
