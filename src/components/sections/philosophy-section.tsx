"use client";

import { motion } from "framer-motion";

interface PhilosophySectionProps {
  title: string;
  zhTitle: string;
  subtitle: string;
  zhSubtitle: string;
  description: string;
  zhDescription: string;
}

export default function PhilosophySection({
  title,
  zhTitle,
  subtitle,
  zhSubtitle,
  description,
  zhDescription,
}: PhilosophySectionProps) {
  const manifesto = [
    ["01", "Structure", "It must stand before it disappears."],
    ["02", "Texture", "Rough mineral skin, precise interior."],
    ["03", "Time", "The final form is memory."],
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div className="h-full w-full bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="absolute right-8 top-24 hidden font-serif text-[8rem] font-light leading-none text-white/[0.035] md:block lg:text-[11rem]">
        TASTE
      </div>

      <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="border-l border-white/15 pl-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
              02 / Philosophy
            </p>
            <h2 className="mt-8 font-zh-serif text-6xl font-light leading-tight text-white md:text-7xl">
              {zhTitle}
            </h2>
            <p className="mt-5 max-w-sm text-sm uppercase tracking-[0.24em] text-zodiac-gold/70">
              {subtitle} / {zhSubtitle}
            </p>
          </motion.div>
        </div>

        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="border border-white/10 bg-black/20 p-8 backdrop-blur"
          >
            <p className="font-serif text-4xl font-light leading-tight text-white md:text-6xl">
              {title}
            </p>
            <div className="mt-8 h-px w-32 bg-zodiac-gold/70" />
            <p className="mt-8 text-base font-light leading-relaxed text-white/70 md:text-lg">
              {description}
            </p>
            <p className="mt-6 font-zh-serif text-sm leading-loose text-white/45 md:text-base">
              {zhDescription}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid gap-3 md:col-span-3"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.75, delay: 0.2 }}
        >
          {manifesto.map(([index, label, copy]) => (
            <div
              key={index}
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/10 py-4"
            >
              <span className="font-mono text-xs text-zodiac-gold/60">
                {index}
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  {copy}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
