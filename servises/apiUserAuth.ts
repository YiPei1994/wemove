import { type UserLogin } from "@/lib/AuthType";
import supabase from "./supabase";

export const userLogin = async (user: UserLogin) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  if (error) {
    throw new Error("Wrong email or password");
  }

  return data;
};

export const userSignup = async (user: UserLogin) => {
  try {
    console.log(user);
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });

    if (error) {
      throw new Error(error.message || "Couldn't create a new user.");
    }

    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
