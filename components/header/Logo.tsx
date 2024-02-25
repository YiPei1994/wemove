import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 ">
      <Image
        loading="lazy"
        src="/otherIcons/logo.png"
        alt="chest"
        width={24}
        height={24}
      />
      <p>
        Re<span className="text-primary">Link</span>
      </p>
    </Link>
  );
}

export default Logo;
