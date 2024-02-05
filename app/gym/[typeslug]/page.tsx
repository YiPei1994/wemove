"use client";

import { getAllExercisesOfType } from "@/servises/apiExercise";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type pageProps = {
  params: { typeslug: string };
};

const GymExercisepage = ({ params }: pageProps) => {
  const query = params.typeslug;
  console.log(query);
  const { data: exercises, isLoading } = useQuery({
    queryKey: [`${query}`, query],
    queryFn: () => getAllExercisesOfType(query),
  });
  console.log(exercises);
  if (isLoading) return <p>Exercises is being fetched...</p>;

  return (
    <ul>
      {exercises?.map((exercise) => (
        <li key={exercise.exercise_id}>
          <Link href={`/gym/${query}/${exercise.slug}`}>
            {exercise.exercise_name}{" "}
          </Link>{" "}
        </li>
      ))}
    </ul>
  );
};
export default GymExercisepage;
