"use client";

import { MdCalculate } from "react-icons/md";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserDataSchema, userDataSchema } from "@/lib/userType";

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserDataSchema>({ resolver: zodResolver(userDataSchema) });

  function onSubmit(data: UserDataSchema) {
    console.log(data);
  }
  return (
    <div className="bg-slate-50 my-4 h-auto w-[90%] mx-auto rounded-xl p-4 flex flex-col gap-6">
      <header className="text-center w-auto">Lets set up your data!</header>
      <div className="flex flex-col gap-4">
        <p>Fill the form to get Calories!</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="gender">Gender: </label>

            <select id="gender" {...register("gender")}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p>{`${errors.gender.message}`} </p>}
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              id="age"
              type="number"
              placeholder="insert your age..."
              {...register("age")}
            />
            {errors.age && <p>{`${errors.age.message}`} </p>}
          </div>
          <div>
            <label htmlFor="height">Height in cm:</label>
            <input
              id="height"
              type="number"
              placeholder="insert your height..."
              {...register("height")}
            />
            {errors.height && <p>{`${errors.height.message}`} </p>}
          </div>
          <div>
            <label htmlFor="weight">Weight in kilos:</label>
            <input
              id="weight"
              type="number"
              placeholder="insert your weight..."
              {...register("weight")}
            />
            {errors.weight && <p>{`${errors.weight.message}`} </p>}
          </div>
          <div>
            <label htmlFor="pal">PAL: </label>

            <select id="pal" {...register("pal")}>
              <option value="">Select activity level</option>
              <option value={1.2}>Less active</option>
              <option value={1.6}>Moderate active</option>
              <option value={2.2}>Highly active</option>
            </select>
            {errors.pal && <p>{`${errors.pal.message}`} </p>}
          </div>
          <div>
            <div>
              <label htmlFor="bmr">BMR:</label>
              <MdCalculate />
            </div>
            <input
              id="bmr"
              type="number"
              placeholder="Calculate by clicking on icon..."
              {...register("bmr")}
            />
            {errors.bmr && <p>{`${errors.bmr.message}`} </p>}
          </div>

          <div>
            <div>
              <label htmlFor="calories">Total daily calories:</label>
              <MdCalculate />
            </div>
            <input
              id="calories"
              type="number"
              placeholder="Calculate by clicking on icon..."
              {...register("calories")}
            />
            {errors.calories && <p>{`${errors.calories.message}`} </p>}
          </div>
          <div>
            <button disabled={isSubmitting} type="reset">
              Reset
            </button>
            <button disabled={isSubmitting} type="submit">
              Save data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
