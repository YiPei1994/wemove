"use client";

import Spinner from "@/components/Spinner";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import ExerciseDetailBlock from "@/components/exercises/ExerciseDetail";
import ExerciseDetailForm from "@/components/exercises/ExerciseDetailForm";
import ExercisesDataDetails from "@/components/exercises/ExercisesDataDetails";

import {
  getExerciseByExerciseId,
  getExerciseData,
} from "@/servises/apiExercise";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";

type PageProps = {
  params: {
    typeslug: string;
    typedetailslug: string;
  };
};

const ExerciseDetail = ({ params }: PageProps) => {
  const { user } = useCurrentUser();
  const router = useRouter();
  const { typeslug, typedetailslug } = params;
  const userId = user?.id;
  const exerciseData = `${typeslug}Data`;
  const [openFrom, setOpenForm] = useState(false);

  const { data: lastExerciseData, isLoading: isLoadingLast } = useQuery({
    queryKey: [exerciseData, typedetailslug, userId, "last"],
    queryFn: () =>
      getExerciseData(userId, typedetailslug, exerciseData, "last"),
  });

  const { data: bestExerciseData, isLoading: isLoadingBest } = useQuery({
    queryKey: [exerciseData, typedetailslug, userId, "best"],
    queryFn: () =>
      getExerciseData(userId, typedetailslug, exerciseData, "best"),
  });

  const { data: allExerciseData, isLoading: isLoadingAll } = useQuery({
    queryKey: [exerciseData, typedetailslug, userId, "all"],
    queryFn: () => getExerciseData(userId, typedetailslug, exerciseData, "all"),
  });

  const { data: exercise, isLoading: isLoadingExact } = useQuery({
    queryKey: [typeslug, typedetailslug, "exact"],
    queryFn: () => getExerciseByExerciseId(typedetailslug, typeslug),
  });
  const isLoading = isLoadingLast || isLoadingBest || isLoadingExact;

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-[#BE3144] my-6 h-auto w-[90%] mx-auto rounded-sm p-4 flex flex-col gap-6 justify-center items-center">
      <h2 className="text-2xl text-center">
        Performance of{" "}
        {exercise?.exercise_name.toUpperCase().replaceAll("_", " ")}{" "}
      </h2>
      {exercise?.image && (
        <Image
          width={256}
          height={256}
          src={exercise.image}
          alt={exercise.exercise_name}
        />
      )}
      <div className="w-full">
        <h4 className="text-center text-2xl">Best record</h4>
        {bestExerciseData && (
          <ExerciseDetailBlock
            exerciseData={bestExerciseData}
            type={typeslug}
          />
        )}
      </div>
      <div className="w-full">
        <h4 className="text-center text-2xl">Last record</h4>
        {lastExerciseData && (
          <ExerciseDetailBlock
            exerciseData={lastExerciseData}
            type={typeslug}
          />
        )}
      </div>

      <div className="w-full">
        <h4 className="text-center text-2xl">Last 30 records</h4>
        {allExerciseData && (
          <ExercisesDataDetails allExerciseData={allExerciseData} />
        )}
      </div>
      {openFrom && (
        <ExerciseDetailForm
          type={typeslug}
          slug={typedetailslug}
          userId={userId}
          open={setOpenForm}
        />
      )}
      {!openFrom && (
        <div className="w-4/5 justify-between items-center flex m-auto">
          <button
            className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm"
            onClick={() => router.back()}
          >
            Back
          </button>
          <button
            className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm"
            onClick={() => setOpenForm((d) => !d)}
          >
            Add detail
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseDetail;
