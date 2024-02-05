"use client";

import { FaUserDoctor } from "react-icons/fa6";
import { useReadUser } from "./useReadUser";
import { useDisplayUserForm } from "@/store/bearStore/displayUserFrom";
import Spinner from "../Spinner";

function User() {
  const { userData, isLoading } = useReadUser();
  const { gender, age, bmr, calories, height, pal, weight } = userData || {};

  const { toggleUserForm } = useDisplayUserForm();
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex items-center justify-center ">
        <FaUserDoctor className="text-5xl" />
      </div>
      {!userData && (
        <p className="m-4">
          You have no data yet, head over to form to get your data.
        </p>
      )}
      {userData && isLoading && <Spinner />}
      {userData && (
        <div className="flex justify-center items-center flex-col my-4  w-full ">
          <h2>Your last updated stats:</h2>
          <div className="flex flex-col gap-2 w-full mt-2">
            <p>Gender: {gender} </p>
            <p>Age: {age} </p>
            <p>Height: {height} </p>
            <p>Weight: {weight} </p>
            <p>
              Psychical activity level:{" "}
              {pal === 1.2
                ? "Less active"
                : pal === 1.6
                ? "Moderate active"
                : pal === 2.2
                ? "Very active"
                : ""}{" "}
            </p>
            <p>Base metabolic rate: {bmr} kcal </p>
            <p>Total calories per day: {calories} kcal </p>
          </div>
        </div>
      )}
      <button
        onClick={toggleUserForm}
        className="px-4 py-2 w-auto bg-blue-300 rounded-lg text-white"
      >
        {userData ? "Update data" : "Add data"}{" "}
      </button>
    </div>
  );
}

export default User;
