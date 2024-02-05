"use client";

import Spinner from "@/components/Spinner";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import { ExerciseDataType } from "@/lib/ExerciseType";
import { getExactExerciseData } from "@/servises/apiExercise";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type pageProps = {
  params: {
    typeslug: string;
    typedetailslug: string;
  };
};

const ExerciseDetail = ({ params }: pageProps) => {
  const { user } = useCurrentUser();
  const router = useRouter();
  const { typeslug, typedetailslug } = params;
  const userId = user?.id;

  const { data: exerciseData, isLoading } = useQuery({
    queryKey: [`${typeslug}Data`, typedetailslug, userId],
    queryFn: () => getExactExerciseData(userId, typedetailslug),
  });

  if (isLoading) return <Spinner />;

  const { date, exercise, performance, powerLevel, unit } =
    exerciseData as ExerciseDataType;

  return (
    <div className="bg-slate-50 my-6 h-auto w-[90%] mx-auto rounded-xl p-4 flex flex-col gap-6">
      <h2 className="text-2xl text-center">Your peak performance</h2>
      <div className="flex flex-col gap-2 justify-center items-center">
        <p>Name: {exercise.replaceAll("-", " ")} </p>

        <div className="flex justify-between w-full">
          {" "}
          <p>Date: {date.split("-").reverse().join().replaceAll(",", ".")} </p>
          <p>
            {" "}
            <p>Power Level: {powerLevel} </p>
          </p>{" "}
        </div>
        <div className="flex justify-between w-full">
          {" "}
          <p>Performance: {performance} </p> <p>Unit: {unit} </p>
        </div>
      </div>
      <div className="w-4/5 justify-between items-center flex m-auto">
        <button
          className="px-4 py-2 text-white bg-red-600 rounded-lg"
          onClick={() => router.back()}
        >
          Back
        </button>
        <button className="px-4 py-2 text-white bg-green-400 rounded-lg">
          Update
        </button>
      </div>
    </div>
  );
};
export default ExerciseDetail;
