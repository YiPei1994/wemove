import { UserDataSchema } from "@/lib/userType";
import supabase from "./supabase";

export const getUserData = async () => {
  const { data, error } = await supabase
    .from("userData")
    .select()
    .eq("id", 1)
    .single();

  if (error) {
    throw new Error("Could not find specific user data");
  }

  return data;
};

export const updateUserStat = async (newData: UserDataSchema) => {
  const { data, error } = await supabase
    .from("userData")
    .update({ ...newData })
    .eq("id", 1)
    .select();

  if (error) {
    throw new Error("Updating userData failed.");
  }

  return data;
};

export async function getCurrentUser() {
  const { data: sesssion } = await supabase.auth.getSession();
  if (!sesssion.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
