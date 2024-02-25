import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ExitIcon } from "@radix-ui/react-icons";
import { useLogOut } from "./hooks/useLogout";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

function LogOut() {
  const { logOut } = useLogOut();
  const router = useRouter();
  function handleLogOut() {
    logOut(undefined, {
      onSuccess: () => {
        router.push("/login");
        toast({
          description: "User logged out!",
        });
      },
    });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <ExitIcon className="text-primary" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogOut}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LogOut;
