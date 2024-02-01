"use client";

import React, { type ReactNode, type ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";

type InputProps = {
  name: string;
  type: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"input">;

export default function FormRow({
  name,
  type,
  children,
  ...props
}: InputProps) {
  const { register } = useForm();
  return (
    <div className="w-full  flex flex-col gap-4">
      <label className="flex justify-between items-center" htmlFor={name}>
        {children}{" "}
      </label>
      <input
        className="p-4"
        id={name}
        type={type}
        {...register(name, { required: true })}
        {...props}
      />
    </div>
  );
}
