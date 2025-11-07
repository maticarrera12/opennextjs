import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo/logo.png"
      alt="OpenNextJS Logo"
      width={33}
      height={33}
      priority
      style={{ width: "auto", height: "auto" }}
    />
  );
}
