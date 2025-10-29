"use client";

import React from "react";
import { Button } from "../../../../components/ui/button";
// import Image from "next/image";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("hero");

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none">
              {t("heading.part1")}{" "}
              <span className="text-blue-600">{t("heading.highlight")}</span>{" "}
              {t("heading.part2")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {t("description.part1")}{" "}
              <span className="font-semibold">
                {t("description.highlight")}
              </span>{" "}
              {t("description.part2")}
            </p>
            <div className="flex justify-center gap-4 lg:justify-start">
              <Button
                onClick={() => (window.location.href = "/app")}
                className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                size="lg"
              >
                {t("cta")}
              </Button>

              <Button
                onClick={() => (window.location.href = "/docs")}
                className="h-14 px-8 rounded-md cursor-pointer border-2 bg-transparent border-indigo-700 hover:bg-indigo-700 text-foreground"
                size="lg"
              >
                Docs
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-2xl font-bold text-muted-foreground">
                {t("imagePlaceholder")}
              </p>
            </div>
            {/* Uncomment and add your image when ready */}
            {/* <Image
              src="/path-to-your-image.jpg"
              alt="Product showcase"
              fill
              className="object-cover rounded-lg"
              priority
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
