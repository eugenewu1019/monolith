"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface OriginSectionProps {
  title: string;
  zhTitle: string;
  subtitle: string;
  zhSubtitle: string;
  description: string;
  zhDescription: string;
}

const INGREDIENTS = [
  {
    symbol: "V",
    name: "Vanilla",
    zhName: "香草",
    origin: "Madagascar",
    coordinate: "S 18.8792 / E 47.5079",
    note: "Warm volatile sweetness",
  },
  {
    symbol: "Ma",
    name: "Matcha",
    zhName: "抹茶",
    origin: "Uji, Kyoto",
    coordinate: "N 34.8845 / E 135.7997",
    note: "Bitter green sediment",
  },
  {
    symbol: "Na",
    name: "Sea Salt",
    zhName: "海鹽",
    origin: "Brittany",
    coordinate: "N 48.2020 / W 2.9326",
    note: "Smoke and mineral lift",
  },
  {
    symbol: "C",
    name: "Cacao",
    zhName: "可可",
    origin: "Ecuador",
    coordinate: "S 1.8312 / W 78.1834",
    note: "Dark structural mass",
  },
];

export default function OriginSection({
  title,
  zhTitle,
  subtitle,
  zhSubtitle,
  description,
  zhDescription,
}: OriginSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIngredient = INGREDIENTS[activeIndex];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[18%] top-[18%] h-64 w-64 rounded-full bg-zodiac-moss/15 blur-3xl" />
        <div className="absolute bottom-[12%] right-[18%] h-72 w-72 rounded-full bg-zodiac-gold/10 blur-3xl" />
      </div>

      <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zodiac-gold/60">
            03 / Origin Archive
          </p>
          <h2 className="mt-8 font-zh-serif text-6xl font-light leading-tight text-zodiac-gold md:text-7xl">
            {zhTitle}
          </h2>
          <p className="mt-4 font-serif text-3xl font-light uppercase tracking-normal text-zodiac-gold/45">
            {title}
          </p>
          <p className="mt-5 max-w-sm text-xs uppercase tracking-[0.24em] text-zodiac-gold/55">
            {subtitle} / {zhSubtitle}
          </p>
          <div className="mt-10 max-w-md space-y-5">
            <p className="text-base font-light leading-relaxed text-white/65">
              {description}
            </p>
            <p className="font-zh-serif text-sm leading-loose text-white/45">
              {zhDescription}
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 md:col-span-4">
          {INGREDIENTS.map((ing, i) => (
            <motion.button
              key={ing.symbol}
              onClick={() => setActiveIndex(i)}
              className={`grid grid-cols-[4rem_1fr] items-center gap-5 border p-4 text-left transition-colors duration-300 ${
                activeIndex === i
                  ? "border-zodiac-gold bg-zodiac-gold/10 text-zodiac-gold"
                  : "border-white/10 bg-black/15 text-white/55 hover:border-white/30"
              }`}
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="font-mono text-3xl font-bold">{ing.symbol}</span>
              <span>
                <span className="block font-serif text-xl text-white">
                  {ing.name}
                </span>
                <span className="mt-1 block font-zh-serif text-sm text-white/45">
                  {ing.zhName}
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="border border-zodiac-gold/25 bg-black/25 p-8 backdrop-blur md:col-span-4"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-zodiac-gold/65">
            Provenance record
          </p>
          <div className="mt-8 flex items-end justify-between gap-6">
            <div>
              <span className="font-mono text-7xl font-bold leading-none text-zodiac-gold">
                {activeIngredient.symbol}
              </span>
              <p className="mt-4 font-serif text-3xl text-white">
                {activeIngredient.name}
              </p>
              <p className="mt-1 font-zh-serif text-lg text-white/45">
                {activeIngredient.zhName}
              </p>
            </div>
            <p className="max-w-[9rem] text-right font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
              {activeIngredient.coordinate}
            </p>
          </div>
          <div className="mt-8 h-px bg-zodiac-gold/25" />
          <dl className="mt-8 grid gap-5">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                Origin
              </dt>
              <dd className="mt-2 text-lg text-white/75">
                {activeIngredient.origin}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                Function
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/55">
                {activeIngredient.note}
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </div>
  );
}
