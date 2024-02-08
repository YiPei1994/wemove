"use client";

import Spinner from "@/components/Spinner";
import { getAllExercisesOfType } from "@/servises/apiExercise";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

type pageProps = {
  params: { typeslug: string };
};

const GymExercisepage = ({ params }: pageProps) => {
  const query = params.typeslug;
  const router = useRouter();
  const { data: exercises, isLoading } = useQuery({
    queryKey: [`${query}`, query],
    queryFn: () => getAllExercisesOfType(query),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-slate-50 my-6 h-auto w-[90%] mx-auto rounded-xl p-4 flex flex-col gap-6">
      <header className="text-center w-4/5 text-lg m-auto flex flex-col gap-4">
        <h1 className="text-2xl">All {query} exercises</h1>
        <p>
          Find and add your best score to the exercise loved by all, or create
          it and add in for everyone.
        </p>
      </header>
      <div className="flex flex-wrap gap-4">
        {exercises?.map((exercise) => (
          <Link
            key={exercise.exercise_id}
            className="px-4 py-2 text-white bg-blue-600/90 rounded-lg uppercase w-[90%] m-auto"
            href={`/gym/${query}/${exercise.slug}`}
          >
            {exercise.exercise_name.replaceAll("_", " ")}{" "}
          </Link>
        ))}
      </div>
      <div className="w-4/5 justify-between items-center flex m-auto">
        <button
          className="px-4 py-2 text-white bg-red-600/90 rounded-lg"
          onClick={() => router.back()}
        >
          Back
        </button>
        <Link
          href={`/gym/${query}/newExerciseForm`}
          className="px-4 py-2 text-white bg-green-600/90 rounded-lg"
        >
          Add
        </Link>
      </div>
    </div>
  );
};
export default GymExercisepage;
