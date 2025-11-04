"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HoursSavedSection() {
  const t = useTranslations("hoursSaved");

  const features = [
    {
      title: t("features.auth.title"),
      hours: t("features.auth.hours"),
      desc: t("features.auth.desc"),
    },
    {
      title: t("features.payments.title"),
      hours: t("features.payments.hours"),
      desc: t("features.payments.desc"),
    },
    {
      title: t("features.admin.title"),
      hours: t("features.admin.hours"),
      desc: t("features.admin.desc"),
    },
    {
      title: t("features.superAdmin.title"),
      hours: t("features.superAdmin.hours"),
      desc: t("features.superAdmin.desc"),
    },
    {
      title: t("features.infrastructure.title"),
      hours: t("features.infrastructure.hours"),
      desc: t("features.infrastructure.desc"),
    },
    {
      title: t("features.ui.title"),
      hours: t("features.ui.hours"),
      desc: t("features.ui.desc"),
    },
    {
      title: t("features.ux.title"),
      hours: t("features.ux.hours"),
      desc: t("features.ux.desc"),
    },
    {
      title: t("features.legal.title"),
      hours: t("features.legal.hours"),
      desc: t("features.legal.desc"),
    },
    {
      title: t("features.analytics.title"),
      hours: t("features.analytics.hours"),
      desc: t("features.analytics.desc"),
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <h2 className="text-4xl font-bold leading-tight">
          <span className="text-muted-foreground">{t("title.part1")} </span>
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
            <CountUp end={140} duration={2.5} />h
          </span>{" "}
          {t("title.part2")}
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">{t("subtitle")}</p>
      </motion.div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
            <p className="text-primary font-bold mt-3 text-xl">
              {item.hours} {t("hoursSaved")}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-14"
      >
        <Link
          href="/waitlist"
          className="inline-block text-primary font-semibold hover:underline"
        >
          {t("cta")}
        </Link>
      </motion.div>
    </section>
  );
}
