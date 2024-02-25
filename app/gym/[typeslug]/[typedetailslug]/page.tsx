"use client";

import Spinner from "@/components/Spinner";
import { useCurrentUser } from "@/components/auth/hooks/useCurrentUser";
import ExerciseDetailBlock from "@/components/exercises/ExerciseDetail";
import ExerciseDetailForm from "@/components/exercises/ExerciseDetailForm";
import ExercisesDataDetails from "@/components/exercises/ExercisesDataDetails";
import {
  getExerciseByExerciseId,
  getExerciseData,
} from "@/servises/apiExercise";
import { useQuery } from "@tanstack/react-query";
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
  const isLoading =
    isLoadingLast || isLoadingBest || isLoadingExact || isLoadingAll;

  if (isLoading) return <Spinner />;
  if (!bestExerciseData || !lastExerciseData || !allExerciseData || !exercise)
    return;

  return (
    <div className=" my-6 h-auto w-[90%] mx-auto rounded-sm p-4 flex flex-col gap-6 justify-center items-center">
      <h2 className="text-2xl text-center">
        Performance of{" "}
        {exercise?.exercise_name.toUpperCase().replaceAll("_", " ")}{" "}
      </h2>
      {bestExerciseData.length === 0 &&
        lastExerciseData.length === 0 &&
        allExerciseData.length === 0 && <p>No records yet, start adding.</p>}
      {bestExerciseData.length !== 0 && (
        <div className="w-full">
          <h4 className="text-center text-2xl">Best record</h4>

          <ExerciseDetailBlock
            exerciseData={bestExerciseData}
            type={typeslug}
            exercise={exercise}
          />
        </div>
      )}
      {lastExerciseData.length !== 0 && (
        <div className="w-full">
          <h4 className="text-center text-2xl">Last record</h4>

          <ExerciseDetailBlock
            exerciseData={lastExerciseData}
            type={typeslug}
            exercise={exercise}
          />
        </div>
      )}
      {allExerciseData.length !== 0 && (
        <div className="w-full">
          <h4 className="text-center text-2xl">Last 30 records</h4>

          <ExercisesDataDetails
            allExerciseData={allExerciseData}
            exercise={exercise}
          />
        </div>
      )}
      {openFrom && (
        <ExerciseDetailForm
          type={typeslug}
          slug={typedetailslug}
          userId={userId}
          open={setOpenForm}
          exercise={exercise}
        />
      )}
      {!openFrom && (
        <div className="w-4/5 justify-between items-center flex m-auto">
          <button
            className="px-6 py-1 w-auto  rounded-sm"
            onClick={() => router.back()}
          >
            Back
          </button>
          <button
            className="px-6 py-1 w-auto  rounded-sm"
            onClick={() => setOpenForm((d) => !d)}
          >
            Track
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseDetail;
