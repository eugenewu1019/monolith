"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import { Hexagon, Droplet, Wind, Thermometer, Flower } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import MobileBehindScenesSection from "@/components/mobile/behind-scenes-section";

export default function MobileCraftPage() {
    const { t } = useTranslation();
    const [activeIngredientIndex, setActiveIngredientIndex] = useState(0);

    const INGREDIENTS = [
        { symbol: "V", nameKey: "ingredients.vanilla", originKey: "ingredients.madagascar" },
        { symbol: "Ma", nameKey: "ingredients.matcha", originKey: "ingredients.ujiKyoto" },
        { symbol: "Na", nameKey: "ingredients.seaSalt", originKey: "ingredients.brittany" },
        { symbol: "C", nameKey: "ingredients.cacao", originKey: "ingredients.ecuador" },
    ];

    const CRAFT_STEPS = [
        { titleKey: "process.sourcing", descKey: "process.sourcingDesc", icon: Hexagon },
        { titleKey: "process.precision", descKey: "process.precisionDesc", icon: Droplet },
        { titleKey: "process.atmosphere", descKey: "process.atmosphereDesc", icon: Wind },
        { titleKey: "process.assembly", descKey: "process.assemblyDesc", icon: Thermometer },
    ];

    const activeIngredient = INGREDIENTS[activeIngredientIndex];

    return (
        <div className="bg-black min-h-screen pb-32 overflow-x-hidden">
            {/* Header */}
            <header className="px-5 py-6 flex justify-between items-end relative z-20">
                <div>
                    <h2 className="text-zodiac-gold text-xs font-mono uppercase tracking-widest mb-1">{t("craft.craftsmanship")}</h2>
                    <h1 className="text-3xl font-serif leading-none">{t("common.brand")}</h1>
                </div>
            </header>

            {/* Section 1: Philosophy (Architecture of Taste) */}
            <section className="relative px-5 py-12 border-b border-white/5">
                <div className="absolute top-0 right-0 p-5 opacity-20">
                    <span className="font-mono text-6xl text-white outline-text">01</span>
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="border-l border-zodiac-gold pl-4">
                        <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold block mb-2">{t("craft.philosophyLabel")}</span>
                        <h2 className="text-4xl font-serif leading-[0.9] text-white">
                            {t("craft.architectureOfTaste")}
                        </h2>
                    </div>

                    <div className="space-y-6 pt-4">
                        <p className="text-base font-zh-serif text-white/80 leading-relaxed">
                            {t("home.philosophyDesc")}
                        </p>
                    </div>

                    <div className="relative h-64 w-full rounded-2xl overflow-hidden grayscale contrast-125 mt-8 border border-white/10">
                        <Image
                            src={getAssetPath("/images/texture-concrete.png")}
                            alt="Philosophy"
                            fill
                            className="object-cover opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-serif text-3xl italic text-white/40">&quot;瞬時&quot;</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Origin (Interactive) */}
            <section className="relative px-5 py-16 bg-[#0a0a0a]">
                <div className="absolute top-0 left-0 p-5 opacity-20">
                    <span className="font-mono text-6xl text-white outline-text">02</span>
                </div>

                <div className="mb-10 text-center">
                    <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold border border-zodiac-gold/30 bg-zodiac-gold/10 px-3 py-1 rounded-full mb-4 inline-block">
                        {t("craft.traceableWild")}
                    </span>
                    <h2 className="text-3xl font-serif text-white mb-1">{t("craft.origin")}</h2>
                </div>

                {/* Ingredient Selector */}
                <div className="grid grid-cols-4 gap-2 mb-8">
                    {INGREDIENTS.map((ing, i) => (
                        <button
                            key={ing.symbol}
                            onClick={() => setActiveIngredientIndex(i)}
                            className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all ${activeIngredientIndex === i
                                ? "bg-zodiac-gold text-black border-zodiac-gold"
                                : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                }`}
                        >
                            <span className="text-lg font-bold font-mono">{ing.symbol}</span>
                        </button>
                    ))}
                </div>

                {/* Active Specifics */}
                <motion.div
                    key={activeIngredientIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-zodiac-gold/10 blur-[50px] pointer-events-none" />

                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-serif text-white mb-1">{t(activeIngredient.nameKey)}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest text-zodiac-gold">{t("craft.origin")}</p>
                            <p className="font-mono text-white/80">{t(activeIngredient.originKey)}</p>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/10 mb-4" />

                    <p className="text-sm text-white/60 leading-relaxed font-zh-serif">
                        來自單一莊園直送。嚴選風味濃郁度與純度最佳的頂級原料。
                    </p>
                </motion.div>
            </section>

            {/* Section 3: The Process (Steps) */}
            <section className="px-5 py-12 space-y-12">
                <div className="text-center mb-8">
                    <h2 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">{t("craft.theProcess")}</h2>
                    <h3 className="text-2xl font-serif text-white">{t("craft.precisionSoul")}</h3>
                </div>

                {CRAFT_STEPS.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex gap-5"
                    >
                        <div className="relative shrink-0">
                            {i !== CRAFT_STEPS.length - 1 && (
                                <div className="absolute left-1/2 top-12 bottom-[-48px] w-px bg-white/10 -translate-x-1/2" />
                            )}
                            <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center z-10 relative">
                                <step.icon className="w-5 h-5 text-zodiac-gold" strokeWidth={1.5} />
                            </div>
                        </div>
                        <div className="pt-1 pb-6 border-b border-white/5 w-full">
                            <h4 className="text-xl font-serif text-white mb-2">{t(step.titleKey)}</h4>
                            <p className="text-sm text-white/60 leading-relaxed font-zh-serif">
                                {t(step.descKey)}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Behind the Scenes */}
            <MobileBehindScenesSection />

            {/* Footer Quote */}
            <div className="px-8 py-12 text-center border-t border-white/5 bg-[#050505]">
                <Flower className="w-6 h-6 text-zodiac-gold mx-auto mb-6 opacity-50" />
                <p className="font-zh-serif text-xl italic text-white/80 leading-relaxed mb-6">
                    {t("craft.footerQuote")}
                </p>
                <div className="flex justify-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zodiac-gold opacity-50" />
                    <span className="w-1 h-1 rounded-full bg-zodiac-gold opacity-30" />
                    <span className="w-1 h-1 rounded-full bg-zodiac-gold opacity-10" />
                </div>
            </div>
        </div>
    );
}
