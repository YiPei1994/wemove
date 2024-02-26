"use client";

import Spinner from "@/components/Spinner";
import { useCurrentUser } from "@/components/auth/hooks/useCurrentUser";
import ExerciseDetailBlock from "@/components/exercises/ExerciseDetail";
import ExerciseDetailForm from "@/components/exercises/ExerciseDetailForm";
import ExercisesDataDetails from "@/components/exercises/ExercisesDataDetails";
import { Button } from "@/components/ui/button";
import {
  getExerciseByExerciseId,
  getExerciseData,
} from "@/servises/apiExercise";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
        <span className="text-primary">
          {" "}
          {exercise?.exercise_name.toUpperCase().replaceAll("_", " ")}{" "}
        </span>
      </h2>
      {bestExerciseData.length === 0 &&
        lastExerciseData.length === 0 &&
        allExerciseData.length === 0 && <p>No records yet, start adding.</p>}
      {bestExerciseData.length !== 0 && (
        <div className="w-full">
          <h4 className="text-center text-2xl">
            <span className="text-primary">Best</span> record
          </h4>

          <ExerciseDetailBlock
            exerciseData={bestExerciseData}
            type={typeslug}
            exercise={exercise}
          />
        </div>
      )}
      {lastExerciseData.length !== 0 && (
        <div className="w-full">
          <h4 className="text-center text-2xl">
            <span className="text-primary">Last</span> record
          </h4>

          <ExerciseDetailBlock
            exerciseData={lastExerciseData}
            type={typeslug}
            exercise={exercise}
          />
        </div>
      )}
      {allExerciseData.length !== 0 && (
        <div className="w-full">
          <h4 className="text-center text-2xl">
            Last <span className="text-primary">30</span> records
          </h4>

          <ExercisesDataDetails
            allExerciseData={allExerciseData}
            exercise={exercise}
            type={typeslug}
          />
        </div>
      )}

      <div className="w-4/5 justify-between items-center flex m-auto">
        <Button onClick={() => router.back()}>Back</Button>

        <Button asChild>
          <ExerciseDetailForm
            type={typeslug}
            slug={typedetailslug}
            userId={userId}
            exercise={exercise}
          />
        </Button>
      </div>
    </div>
  );
};

export default ExerciseDetail;
