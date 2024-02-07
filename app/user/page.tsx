"use client";
import { useDisplayUserForm } from "../../store/bearStore/displayUserFrom";
import UserForm from "@/components/user/UserForm";
import User from "@/components/user/User";

function Userpage() {
  const { displayUserForm } = useDisplayUserForm();
  return (
    <div className="bg-slate-50 my-4 h-auto w-[90%] mx-auto rounded-xl p-4 flex flex-col gap-6">
      <header className="text-center w-auto text-3xl">
        Lets set up your data!
      </header>
      <div className="flex flex-col gap-4">
        <User />
        {displayUserForm && <UserForm />}
      </div>
    </div>
  );
}

export default Userpage;