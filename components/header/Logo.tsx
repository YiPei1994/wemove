import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center gap-4">
      {" "}
      <Link href="/">
        <Image
          loading="lazy"
          src="/otherIcons/logo.png"
          alt="chest"
          width={24}
          height={24}
        />
      </Link>
      <span>MoveIn</span>
    </div>
  );
}

export default Logo;
