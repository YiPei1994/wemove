"use client";

import Spinner from "@/components/Spinner";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import ExerciseDetailBlock from "@/components/exercises/ExerciseDetail";
import ExerciseDetailForm from "@/components/exercises/ExerciseDetailForm";

import {
  getBestExerciseData,
  getLastExerciseData,
} from "@/servises/apiExercise";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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
    queryFn: () => getLastExerciseData(userId, typedetailslug, exerciseData),
  });

  const { data: bestExerciseData, isLoading: isLoadingBest } = useQuery({
    queryKey: [exerciseData, typedetailslug, userId, "best"],
    queryFn: () => getBestExerciseData(userId, typedetailslug, exerciseData),
  });

  const isLoading = isLoadingLast || isLoadingBest;

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-slate-50 my-6 h-auto w-[90%] mx-auto rounded-xl p-4 flex flex-col gap-6">
      <h2 className="text-2xl text-center">
        {" "}
        {typedetailslug.toUpperCase().replaceAll("-", " ")} performance
      </h2>
      <div>
        <h4>Your last exercise recod:</h4>
        <ExerciseDetailBlock exerciseData={lastExerciseData} />
      </div>
      <div>
        <h4>Your best exercise recod:</h4>
        <ExerciseDetailBlock exerciseData={bestExerciseData} />
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
            className="px-4 py-2 text-white bg-red-600 rounded-lg"
            onClick={() => router.back()}
          >
            Back
          </button>
          <button
            className="px-4 py-2 text-white bg-green-400 rounded-lg"
            onClick={() => setOpenForm((d) => !d)}
          >
            Open add form
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseDetail;
