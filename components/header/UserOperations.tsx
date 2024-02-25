import { ModeToggle } from "../ui/darkModeToggle";
import { useCurrentUser } from "../auth/hooks/useCurrentUser";
import LogOut from "../auth/LogOut";

function UserOperations() {
  const { isAutenticated } = useCurrentUser();
  return (
    <div className="flex gap-4 items-center">
      <ModeToggle />
      {isAutenticated && <LogOut />}
    </div>
  );
}

export default UserOperations;
