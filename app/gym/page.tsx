import Link from "next/link";

function GymPage() {
  return (
    <div>
      <Link href="/gym/chest">Chest</Link>
      <Link href="/gym/back">back</Link>
      <Link href="/gym/legs">legs</Link>
    </div>
  );
}

export default GymPage;
