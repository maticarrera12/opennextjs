"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { src: "/assets/nextjs.svg", alt: "Next.js" },
  { src: "/assets/nextjs.svg", alt: "Next.js" },
  { src: "/assets/nextjs.svg", alt: "Next.js" },
  { src: "/assets/nextjs.svg", alt: "Next.js" },
  { src: "/assets/nextjs.svg", alt: "Next.js" },
];

export default function LogoMarquee() {
  // Duplicar los logos 4 veces para crear un loop infinito suave
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="relative flex w-full overflow-hidden py-10 bg-background">
      {/* Overlay con gradientes en los costados */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Track de logos */}
      <motion.div
        className="flex gap-16 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 50, // velocidad ajustada
          repeat: Infinity,
        }}
      >
        {duplicatedLogos.map((logo, i) => (
          <div
            key={i}
            className="relative h-14 w-40 shrink-0 opacity-70 transition hover:opacity-100 md:h-16 md:w-48"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain dark:invert"
              sizes="(max-width: 768px) 160px, 192px"
              priority={i < 4}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
