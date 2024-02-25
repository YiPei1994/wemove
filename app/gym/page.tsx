import Image from "next/image";
import Link from "next/link";
function GymPage() {
  return (
    <div className=" my-4 h-auto w-[90%] mx-auto rounded-sm p-4 flex flex-col gap-6">
      <header className="text-center w-auto text-3xl">
        What we training today?
      </header>
      <div className="flex flex-wrap items-center justify-between">
        <Link
          className="px-4 py-2 rounded-sm  w-auto max-w-1/3 my-2 text-center text-sm"
          href="/gym/chest"
        >
          <Image
            loading="lazy"
            src="/bodyIcon/chest.png"
            alt="chest"
            width={64}
            height={64}
          />
          <p className="mt-2 text-md">Chest</p>
        </Link>
        <Link
          className="px-4 py-2 rounded-sm  w-auto max-w-1/3 my-2 text-center text-sm"
          href="/gym/back"
        >
          <Image
            loading="lazy"
            src="/bodyIcon/back.png"
            alt="chest"
            width={64}
            height={64}
          />
          <p className="mt-2 text-md">Back</p>
        </Link>
        <Link
          className="px-4 py-2 rounded-sm  w-auto max-w-1/3 my-2 text-center text-sm"
          href="/gym/legs"
        >
          <Image
            loading="lazy"
            src="/bodyIcon/legs.png"
            alt="chest"
            width={64}
            height={64}
          />
          <p className="mt-2 text-md">Legs</p>
        </Link>
        <Link
          className="px-4 py-2 rounded-sm  w-auto max-w-1/3 my-2 text-center text-sm"
          href="/gym/shoulder"
        >
          <Image
            loading="lazy"
            src="/bodyIcon/shoulder.png"
            alt="shoulder"
            width={64}
            height={64}
          />
          <p className="mt-2 text-md">Shoulder</p>
        </Link>
        <Link
          className="px-4 py-2 rounded-sm  w-auto max-w-1/3 my-2 text-center text-sm"
          href="/gym/triceps"
        >
          <Image
            loading="lazy"
            src="/bodyIcon/triceps.png"
            alt="triceps"
            width={64}
            height={64}
          />
          <p className="mt-2 text-md">Triceps</p>
        </Link>
        <Link
          className="px-4 py-2 rounded-sm  w-auto max-w-1/3 my-2 text-center text-sm"
          href="/gym/biceps"
        >
          <Image
            loading="lazy"
            src="/bodyIcon/biceps.png"
            alt="biceps"
            width={64}
            height={64}
          />
          <p className="mt-2 text-md">Biceps</p>
        </Link>
        <Link
          className="px-4 py-2 rounded-sm  w-auto max-w-1/3 my-2 text-center text-sm"
          href="/gym/core"
        >
          <Image
            loading="lazy"
            src="/bodyIcon/core.png"
            alt="core"
            width={64}
            height={64}
          />
          <p className="mt-2 text-md">Core</p>
        </Link>
        <Link
          className="px-4 py-2 rounded-sm   w-auto max-w-1/3 my-2 text-center text-sm"
          href="/gym/cardio"
        >
          <Image
            loading="lazy"
            src="/bodyIcon/cardio.png"
            alt="chest"
            width={64}
            height={64}
          />
          <p className="mt-2 text-md">Cardio</p>
        </Link>
      </div>
    </div>
  );
}

export default GymPage;
