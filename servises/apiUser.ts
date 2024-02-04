import { UserDataSchema } from "@/lib/userType";
import supabase from "./supabase";

export const getUserData = async (id: string) => {
  const { data, error } = await supabase
    .from("userData")
    .select()
    .eq("userId", id)
    .single();

  if (error) {
    throw new Error("Could not find specific user data");
  }

  return data;
};
export const upsertUserStat = async (newData: UserDataSchema, id: string) => {
  // Check if a row with the given userId already exists
  const existingRow = await supabase
    .from("userData")
    .select()
    .eq("userId", id)
    .single();

  if (existingRow.data) {
    // If a row exists, perform an update
    const { data, error } = await supabase
      .from("userData")
      .update({ ...newData })
      .eq("userId", id)
      .select();

    if (error) {
      throw new Error("Updating userData failed.");
    }

    return data;
  } else {
    // If no row exists, perform an insert
    const { data, error } = await supabase
      .from("userData")
      .insert([{ ...newData, userId: id }])
      .select();

    if (error) {
      throw new Error("Adding userData failed.");
    }

    return data;
  }
};
