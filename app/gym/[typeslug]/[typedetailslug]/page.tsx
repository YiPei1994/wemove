"use client";

// Import the necessary dependencies
import Spinner from "@/components/Spinner";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import { getExactExerciseData } from "@/servises/apiExercise";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation"; // Corrected the import path

// Define the type for the pageProps
type PageProps = {
  params: {
    typeslug: string;
    typedetailslug: string;
  };
};

// Define the ExerciseDetail component
const ExerciseDetail = ({ params }: PageProps) => {
  // Destructure necessary values using the useCurrentUser hook
  const { user } = useCurrentUser();
  const router = useRouter();
  const { typeslug, typedetailslug } = params;
  const userId = user?.id;

  // Use the useQuery hook to fetch exerciseData
  const { data: exerciseData, isLoading } = useQuery({
    queryKey: [`${typeslug}Data`, typedetailslug, userId],
    queryFn: () => getExactExerciseData(userId, typedetailslug),
  });

  // Display a spinner while loading
  if (isLoading) return <Spinner />;

  // Destructure the exerciseData only if it exists
  let date, exercise, performance, powerLevel, unit; // Declare variables outside the if block for later use
  if (exerciseData) {
    ({ date, exercise, performance, powerLevel, unit } = exerciseData);
  }

  // Return the JSX for the ExerciseDetail component
  return (
    <div className="bg-slate-50 my-6 h-auto w-[90%] mx-auto rounded-xl p-4 flex flex-col gap-6">
      <h2 className="text-2xl text-center">Your peak performance</h2>
      {exerciseData ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <p>Name: {exercise?.replaceAll("-", " ")} </p>
          <div className="flex justify-between w-full">
            <p>
              Date: {date?.split("-").reverse().join().replaceAll(",", ".")}{" "}
            </p>
            <p>Power Level: {powerLevel} </p>
          </div>
          <div className="flex justify-between w-full">
            <p>Performance: {performance} </p> <p>Unit: {unit} </p>
          </div>
        </div>
      ) : (
        <p>No record for this exercise from you yet.</p>
      )}
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

// Export the ExerciseDetail component as the default export
export default ExerciseDetail;
