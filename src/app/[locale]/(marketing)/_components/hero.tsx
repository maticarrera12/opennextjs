"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";

import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import CloneCommand from "@/components/CloneCommand";

const Hero = () => {
  const t = useTranslations("hero");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const videoRef = useRef<React.ElementRef<"video">>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intentar reproducir cuando el video esté listo
    const playVideo = () => {
      video.play().catch(() => {
        // Si falla la reproducción automática, no hacer nada
      });
    };

    // Manejar el loop manualmente para asegurar que el video termine completamente
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener("ended", handleEnded);

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8">
      <div className="container max-w-3xl mx-auto">
        <div className="flex flex-col items-center space-y-12 py-20">
          {/* Content Section */}
          <div className="text-center space-y-6 max-w-3xl">
            <h1
              className="bg-linear-to-r from-pink-500 to-purple-800 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight inline-block px-6 py-3 rounded-lg -skew-x-3 transform -rotate-1 text-gray-900 dark:text-gray-900
  "
            >
              {t("heading.part1")} <span className="text-pink-200">{t("heading.highlight")}</span>{" "}
              {t("heading.part2")}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("description.part1")}{" "}
              <span className="font-semibold text-pink-200">{t("description.highlight")}</span>{" "}
              {t("description.part2")}
            </p>
            <div className="flex-col md:flex-row items-center justify-center gap-4 pt-4">
              <AnimatedButton
                label={t("cta")}
                route={`/${locale}/waitlist`}
                animate={true}
                animateOnScroll={true}
                delay={0.2}
              />

              {/* <Link
                href="/docs"
                className="group flex items-center gap-2 h-14 px-8 rounded-md bg-transparent text-foreground transition-all duration-200 hover:-translate-y-1"
              >
                <span>Docs</span>
                <ArrowRightIcon size={20} />
              </Link> */}
              <CloneCommand />
            </div>
          </div>

          {/* Image Section */}
          <div className="relative w-full max-w-5xl pt-10">
            {/* Blur effect behind image - blob effect above image */}
            <div
              className="absolute left-1/2 -translate-x-1/2 z-0 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent blur-3xl pointer-events-none rounded-full"
              style={{
                width: "100%",
                height: "400px",
              }}
            ></div>
            <div className="relative aspect-[4/3] bg-muted rounded-lg flex items-center justify-center overflow-hidden z-10">
              <video
                ref={videoRef}
                src="/video/video-hero.mp4"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                playsInline
                muted
                autoPlay
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
