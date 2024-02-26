"use client";

import Spinner from "@/components/Spinner";
import { useCurrentUser } from "@/components/auth/hooks/useCurrentUser";
import Exercise from "@/components/exercises/Exercise";
import ExerciseEditForm from "@/components/exercises/ExerciseEditForm";
import { useDeleteExercise } from "@/components/exercises/hooks/useDeleteExercise";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllExercisesOfType } from "@/servises/apiExercise";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { HiOutlineTrash } from "react-icons/hi2";

type pageProps = {
  params: { typeslug: string };
};

const GymExercisepage = ({ params }: pageProps) => {
  const query = params.typeslug;

  const { user } = useCurrentUser();

  const { deleting } = useDeleteExercise();
  const queryClient = useQueryClient();

  function handleDelete(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) {
    e.preventDefault();

    deleting(
      { query, id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [query] });
        },
      }
    );
  }
  const { data: exercises, isLoading } = useQuery({
    queryKey: [`${query}`, query],
    queryFn: () => getAllExercisesOfType(query, user?.id),
  });

  if (isLoading) return <Spinner />;

  if (!exercises) return;
  return (
    <div className=" my-10 h-auto w-[90%] mx-auto rounded-sm p-4 flex flex-col gap-6">
      <header className="text-center w-4/5 text-lg m-auto flex flex-col gap-4 ">
        <h1 className="text-2xl">
          All <span className="text-primary">{query}</span> exercises
        </h1>
        {exercises.length === 0 && <p>No exercise yet, lets add some!</p>}
      </header>
      <div className="flex flex-wrap gap-4">
        {exercises.map((exercise) => (
          <div className="w-full" key={exercise.slug}>
            <div className="flex w-full">
              <Link
                className="px-4 py-2   w-full rounded-sm uppercase"
                href={`/gym/${query}/${exercise.slug}`}
              >
                <Exercise exercise={exercise} query={query} />
              </Link>

              <div className="flex gap-4 items-center ml-auto text-2xl py-2">
                <ExerciseEditForm exercise={exercise} query={query} />
                <Separator orientation="vertical" />
                <Popover>
                  <PopoverTrigger>
                    <HiOutlineTrash className="text-primary" />
                  </PopoverTrigger>
                  <PopoverContent className="w-80 mx-auto bg-accent p-4 rounded-lg">
                    <div className="flex flex-col gap-4 justify-center">
                      <p>
                        Are you sure to delete{" "}
                        <span className="text-primary">
                          {exercise.exercise_name}
                        </span>{" "}
                        ?
                      </p>
                      <Button
                        className="w-2/5"
                        onClick={(e) => handleDelete(e, exercise.exercise_id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
      <div className="w-4/5 justify-between items-center flex m-auto">
        <Button asChild>
          <Link href={`/gym`}>Back</Link>
        </Button>
        <Button asChild>
          <Link href={`/gym/${query}/newExerciseForm`}>Add</Link>
        </Button>
      </div>
    </div>
  );
};

export default GymExercisepage;
