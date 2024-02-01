"use client";

import React from "react";
import FormRow from "../FormRow";
import { MdCalculate } from "react-icons/md";
import { useForm } from "react-hook-form";

function UserForm() {
  const { handleSubmit, reset, formState } = useForm();
  return (
    <div className="bg-slate-50 my-4 h-auto w-[90%] mx-auto rounded-xl p-4 flex flex-col gap-6">
      <header className="text-center w-auto">Lets set up your data!</header>
      <div className="flex flex-col gap-4">
        <p>Fill the form to get Calories!</p>
        <form className="flex flex-col gap-4">
          <FormRow name="gender" type="text">
            Gender:
          </FormRow>
          <FormRow name="age" type="number">
            Age:
          </FormRow>
          <FormRow name="weight" type="number">
            Weight in kilos:
          </FormRow>
          <FormRow name="height" type="number">
            Height in cm:
          </FormRow>
          <FormRow name="BMR" type="number">
            BMR:
            <button>
              <MdCalculate className="text-3xl" />
            </button>
          </FormRow>
          <FormRow name="PAL" type="number">
            PAL
            <button>
              <MdCalculate className="text-3xl" />
            </button>
          </FormRow>
          <FormRow name="calories" type="number">
            Daily max calories:
            <button>
              <MdCalculate className="text-3xl" />
            </button>
          </FormRow>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
