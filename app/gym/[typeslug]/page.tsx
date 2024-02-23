"use client";

import Spinner from "@/components/Spinner";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import Exercise from "@/components/exercises/Exercise";
import ExerciseEditForm from "@/components/exercises/ExerciseEditForm";
import { getAllExercisesOfType } from "@/servises/apiExercise";
import { useDisplayExerciseEditForm } from "@/store/useExerciseEditForm";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

type pageProps = {
  params: { typeslug: string };
};

const GymExercisepage = ({ params }: pageProps) => {
  const query = params.typeslug;
  const router = useRouter();
  const { user } = useCurrentUser();
  const { displayExerciseEditForm, toggleDisplayExerciseEditForm } =
    useDisplayExerciseEditForm();

  const { data: exercises, isLoading } = useQuery({
    queryKey: [`${query}`, query],
    queryFn: () => getAllExercisesOfType(query, user?.id),
  });
  function handleBack() {
    router.back();
  }
  if (isLoading) return <Spinner />;

  if (!exercises) return;
  return (
    <div className="bg-[#BE3144] my-6 h-auto w-[90%] mx-auto rounded-sm p-4 flex flex-col gap-6">
      <header className="text-center w-4/5 text-lg m-auto flex flex-col gap-4">
        <h1 className="text-2xl">All {query} exercises</h1>
        {exercises.length === 0 && <p>No exercise yet, lets add some!</p>}
      </header>

      {exercises.map((exercise) => (
        <div className="flex flex-wrap gap-4" key={exercise.slug}>
          <Link
            className="px-4 py-2  bg-[#FFE4E3] text-[#be3144] w-full rounded-sm uppercase "
            href={`/gym/${query}/${exercise.slug}`}
          >
            <Exercise exercise={exercise} query={query} />
          </Link>
          {displayExerciseEditForm && (
            <ExerciseEditForm exercise={exercise} query={query} />
          )}
        </div>
      ))}

      <div className="w-4/5 justify-between items-center flex m-auto">
        <button
          className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm"
          onClick={handleBack}
        >
          Back
        </button>
        <Link
          href={`/gym/${query}/newExerciseForm`}
          className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm"
        >
          Add
        </Link>
      </div>
    </div>
  );
};

export default GymExercisepage;
