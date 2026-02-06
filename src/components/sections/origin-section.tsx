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
    { symbol: "V", name: "Vanilla", zhName: "香草", origin: "Madagascar" },
    { symbol: "Ma", name: "Matcha", zhName: "抹茶", origin: "Uji, Kyoto" },
    { symbol: "Na", name: "Sea Salt", zhName: "海鹽", origin: "Brittany" },
    { symbol: "C", name: "Cacao", zhName: "可可", origin: "Ecuador" },
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
        <div className="relative w-full h-full flex items-center justify-center overflow-visible px-8 py-40">

            {/* Background Subtle Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-zodiac-gold/5 blur-3xl" />
            </div>

            {/* Section Index - Top Left */}
            <div className="absolute top-8 left-8 md:left-12 font-mono text-xs text-zodiac-gold/50">
                <span className="text-3xl font-light block">03</span>
                <div className="w-6 h-px bg-zodiac-gold/30 mt-3" />
                <div className="text-[10px] mt-2 tracking-widest opacity-70">ORIGIN</div>
            </div>

            {/* Main Content - Centered */}
            <div className="relative z-10 max-w-4xl w-full text-center">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-xs tracking-[0.3em] uppercase text-zodiac-gold/60 mb-4">
                        {subtitle} <span className="mx-2 opacity-30">/</span> {zhSubtitle}
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-zh-serif font-bold text-zodiac-gold mb-4">
                        {zhTitle}
                    </h1>
                    <p className="text-2xl md:text-3xl font-serif text-zodiac-gold/50 tracking-widest uppercase">
                        {title}
                    </p>
                </motion.div>

                {/* Ingredient Selector - Horizontal Pills */}
                <div className="flex justify-center gap-4 md:gap-6 mb-16 flex-wrap">
                    {INGREDIENTS.map((ing, i) => (
                        <motion.button
                            key={ing.symbol}
                            onClick={() => setActiveIndex(i)}
                            className={`relative px-6 py-4 border transition-all duration-300 ${activeIndex === i
                                ? "border-zodiac-gold bg-zodiac-gold/10 text-zodiac-gold"
                                : "border-white/20 text-white/60 hover:border-white/40"
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="font-mono text-2xl font-bold block">{ing.symbol}</span>
                            <span className="text-[10px] uppercase tracking-widest mt-1 block opacity-60">
                                {ing.name}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* Active Ingredient Display */}
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="border border-zodiac-gold/20 bg-white/5 p-8 md:p-12 max-w-2xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-6 mb-6">
                        <span className="text-5xl md:text-6xl font-mono font-bold text-zodiac-gold">
                            {activeIngredient.symbol}
                        </span>
                        <div className="text-left">
                            <div className="text-xl md:text-2xl font-serif text-white">
                                {activeIngredient.name}
                            </div>
                            <div className="text-base font-zh-serif text-white/50">
                                {activeIngredient.zhName}
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-24 bg-zodiac-gold/30 mx-auto mb-6" />

                    <div className="text-sm uppercase tracking-widest text-zodiac-gold/70">
                        Origin: {activeIngredient.origin}
                    </div>
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 max-w-xl mx-auto space-y-4"
                >
                    <p className="text-base md:text-lg font-light text-white/60 leading-relaxed">
                        {description}
                    </p>
                    <p className="text-sm font-zh-serif text-white/40 leading-loose">
                        {zhDescription}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
