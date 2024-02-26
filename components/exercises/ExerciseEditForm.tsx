import { ExerciseType } from "@/lib/ExerciseType";
import React from "react";
import { useEditExercise } from "./hooks/useEditExercise";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { HiOutlinePencil } from "react-icons/hi2";
import { Input } from "../ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "../ui/use-toast";
import { useDisplayExerciseEditForm } from "@/store/useExerciseEditForm";

type ExerciseEditFormProps = {
  exercise: ExerciseType;
  query: string;
};

function ExerciseEditForm({ exercise, query }: ExerciseEditFormProps) {
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<ExerciseType>({
    defaultValues: exercise,
  });
  const { editingExercise } = useEditExercise();
  const { displayExerciseEditForm, toggleDisplayExerciseEditForm } =
    useDisplayExerciseEditForm();

  function onSubmit(data: ExerciseType) {
    editingExercise(
      { editedExercise: data, query },
      {
        onSuccess: () => {
          toast({
            description: "Exercise updated!.",
          });
          queryClient.invalidateQueries({ queryKey: [query] });
          toggleDisplayExerciseEditForm(false);
        },
      }
    );
  }

  return (
    <Dialog
      open={displayExerciseEditForm}
      onOpenChange={toggleDisplayExerciseEditForm}
    >
      <DialogTrigger>
        {" "}
        <HiOutlinePencil className="text-primary" />
      </DialogTrigger>
      <DialogContent className="w-[90%] my-2 mx-auto">
        <DialogHeader>
          <DialogTitle>
            {" "}
            <span className="text-primary">{exercise.exercise_name} </span> edit
            form{" "}
          </DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4 items-center justify-center w-4/5 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            className="p-2"
            type="text"
            required
            id="exercise_name"
            {...register("exercise_name")}
          />
          <div className="flex gap-4 w-full">
            <Input
              className="p-2 w-1/2"
              type="text"
              required
              id="metric"
              {...register("metric")}
            />
            <Input
              className="p-2 w-1/2"
              type="text"
              required
              id="unit"
              {...register("unit")}
            />
          </div>

          <Button>Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ExerciseEditForm;
