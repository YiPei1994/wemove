import Link from "next/link";

function GymPage() {
  return (
    <div className="bg-slate-50 my-4 h-auto w-[90%] mx-auto rounded-xl p-4 flex flex-col gap-6">
      <header className="text-center w-auto text-3xl">
        What we training today?
      </header>
      <div className="flex flex-col gap-4 items-center">
        <Link
          className="px-6 py-2 rounded-lg text-white bg-green-600/90 w-auto text-center text-xl"
          href="/gym/chest"
        >
          Chest muscles
        </Link>
        <Link
          className="px-6 py-2 rounded-lg text-white bg-green-600/90 w-auto text-center text-xl"
          href="/gym/back"
        >
          Back muscles
        </Link>
        <Link
          className="px-6 py-2 rounded-lg text-white bg-green-600/90 w-auto text-center text-xl"
          href="/gym/legs"
        >
          Legs muscles
        </Link>
      </div>
    </div>
  );
}

export default GymPage;
