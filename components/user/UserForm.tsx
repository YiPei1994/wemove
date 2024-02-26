"use client";

import { HiOutlineCalculator } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDataSchema, userDataSchema } from "@/lib/userType";
import { useUpdateUserData } from "./hooks/useUpdateUserData";
import { useDisplayUserForm } from "@/store/useDisplayUserFrom";
import { useCurrentUser } from "../auth/hooks/useCurrentUser";

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<UserDataSchema>({ resolver: zodResolver(userDataSchema) });
  const { upsertData } = useUpdateUserData();
  const { toggleUserForm } = useDisplayUserForm();
  const { user } = useCurrentUser();

  function handleCalculateBMR(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const userGender = getValues("gender");
    const userAge = getValues("age");
    const userHeight = getValues("height");
    const userWeight = getValues("weight");

    if (!userGender || !userAge || !userHeight || !userWeight) return;
    if (userGender === "male") {
      const bmr = +(
        88.362 +
        13.397 * userWeight +
        4.799 * userHeight -
        5.677 * userAge
      ).toFixed();
      setValue("bmr", bmr);
    } else {
      const bmr = +(
        447.593 +
        9.247 * userWeight +
        3.098 * userHeight -
        4.33 * userAge
      ).toFixed();
      setValue("bmr", bmr);
    }
  }

  function handleCalculateCalories(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const userPal = getValues("pal");
    const userBmr = getValues("bmr");
    if (!userPal || !userBmr) return;
    const totalCalories = +(userBmr * userPal).toFixed();
    setValue("calories", totalCalories);
  }
  function onSubmit(data: UserDataSchema) {
    if (!data) return;

    const userId = user?.id;

    if (userId) {
      upsertData({ newData: data, id: userId });
      toggleUserForm();
    } else {
      console.error("User ID is undefined");
      // Handle the case where user ID is undefined, e.g., show an error message
    }
  }

  return (
    <>
      <h2 className="text-3xl text-center">User form</h2>
      <form
        className="flex flex-col gap-4 border  px-2 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="gender">Gender: </label>

          <select className="p-2 w-full" id="gender" {...register("gender")}>
            <option>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {errors.gender && <p>{`${errors.gender.message}`} </p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            placeholder="insert your age..."
            className="p-2 w-full"
            {...register("age")}
          />
          {errors.age && <p>{`${errors.age.message}`} </p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="height">Height in cm:</label>
          <input
            id="height"
            type="number"
            placeholder="insert your height..."
            className="p-2 w-full"
            {...register("height")}
          />
          {errors.height && <p>{`${errors.height.message}`} </p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="weight">Weight in kilos:</label>
          <input
            id="weight"
            type="number"
            placeholder="insert your weight..."
            className="p-2 w-full"
            {...register("weight")}
          />
          {errors.weight && <p>{`${errors.weight.message}`} </p>}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label htmlFor="bmr">BMR:</label>
            <button type="button" onClick={handleCalculateBMR}>
              <HiOutlineCalculator className="text-3xl " />
            </button>
          </div>
          <input
            id="bmr"
            type="number"
            placeholder="Calculate by clicking on icon..."
            readOnly
            className="p-2 w-full"
            {...register("bmr")}
          />
          {errors.bmr && <p>{`${errors.bmr.message}`} </p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pal">PAL: </label>

          <select id="pal" {...register("pal")} className="p-2 w-full">
            <option>select your activity level</option>
            <option value={1.2}> Less active</option>
            <option value={1.6}> Moderate active</option>
            <option value={2.2}> Very active</option>
          </select>
          {errors.pal && <p>{`${errors.pal.message}`} </p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between ">
            <label htmlFor="calories">Total daily calories:</label>
            <button type="button" onClick={handleCalculateCalories}>
              <HiOutlineCalculator className="text-3xl " />
            </button>
          </div>
          <input
            id="calories"
            type="number"
            placeholder="Calculate by clicking on icon..."
            readOnly
            className="p-2 w-full"
            {...register("calories")}
          />
          {errors.calories && <p>{`${errors.calories.message}`} </p>}
        </div>
        <div className="flex  gap-4 m-auto w-full justify-between items-center">
          <button
            disabled={isSubmitting}
            type="reset"
            className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm"
          >
            Reset
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm"
          >
            Save data
          </button>
        </div>
      </form>
    </>
  );
}

export default UserForm;
