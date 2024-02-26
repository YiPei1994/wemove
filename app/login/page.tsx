import LogIn from "@/components/auth/LogIn";
import SignUp from "@/components/auth/SignUp";

function LoginPage() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <LogIn />
      <SignUp />
    </div>
  );
}

export default LoginPage;
