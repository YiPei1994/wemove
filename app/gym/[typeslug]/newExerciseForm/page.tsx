"use client";

import { useCurrentUser } from "@/components/auth/hooks/useCurrentUser";
import { useAddExercise } from "@/components/exercises/hooks/useAddExercise";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewExerciseType, exerciseSchema } from "@/lib/ExerciseType";
import { zodResolver } from "@hookform/resolvers/zod";

type NewExerciseFormProps = {
  params: {
    typeslug: string;
  };
};

function NewExerciseForm({ params }: NewExerciseFormProps) {
  const query = params.typeslug;
  const form = useForm<NewExerciseType>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      exercise_name: "",
      metric: "",
      unit: "",
    },
  });

  const router = useRouter();
  const { addExercise } = useAddExercise();
  const queryclient = useQueryClient();
  const { user } = useCurrentUser();

  function onSubmit(data: NewExerciseType) {
    /*   const newExercise: NewExercise = {
      exercise_name: exerciseName,
      slug: `${exerciseName.replaceAll(" ", "_")}_${uuidv4()}`,
      owner: user.id,
      metric: metricValue,
      unit,
    }; */
    /*     addExercise(
      { newExercise, query },
      {
        onSuccess: () => {
          router.push(`/gym/${query}`);
          queryclient.invalidateQueries({ queryKey: [query] });
        },
      }
    ); */
  }
  return (
    <div className=" my-4 h-auto w-[90%] mx-auto rounded-sm p-4 flex flex-col gap-6">
      <header className="text-center w-auto text-2xl">
        New {query} exercise form
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="exercise_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise name</FormLabel>
                <FormControl>
                  <Input placeholder="exercise name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metric"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise metric</FormLabel>
                <FormControl>
                  <Input placeholder="exercise metric" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reps">Repeats</SelectItem>
                    <SelectItem value="mins">Minutes</SelectItem>
                    <SelectItem value="secs">Seconds</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default NewExerciseForm;
