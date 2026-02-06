"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { X, ChefHat, Wine, Activity } from "lucide-react";
import DessertQuiz from "./dessert-quiz";
import { getAssetPath } from "@/lib/utils";
import { useTranslation, useLocale } from "@/lib/i18n";
import { DESSERTS } from "@/lib/data";

export default function HorizontalGallery() {
    const targetRef = useRef<HTMLDivElement>(null);
    const [selectedDessert, setSelectedDessert] = useState<typeof DESSERTS[0] | null>(null);
    const { t } = useTranslation();
    const { locale } = useLocale();

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

    // Variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    const barVariants: Variants = {
        hidden: { width: 0 },
        visible: (score: number) => ({
            width: `${score * 20}%`,
            transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.4 }
        })
    };

    return (
        <>
            <section id="menu" ref={targetRef} className="relative h-[300vh] bg-zodiac-charcoal">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
                        <div className="flex h-[60vh] w-[40vh] min-w-[300px] flex-col justify-center flex-shrink-0">
                            <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">
                                {t("gallery.seasonalCollection").split(' ').map((word, i) => (
                                    <span key={i}>{word}<br /></span>
                                ))}
                            </h2>
                            <p className="text-sm font-zh-serif text-white/50 max-w-[200px] leading-relaxed">
                                {t("gallery.inspiredBy")}
                            </p>
                            <div className="w-12 h-[1px] bg-zodiac-gold mt-8" />
                        </div>

                        {DESSERTS.map((dessert) => (
                            <div
                                key={dessert.id}
                                onClick={() => setSelectedDessert(dessert)}
                                className="group relative h-[60vh] w-[40vh] min-w-[300px] flex-shrink-0 cursor-pointer overflow-hidden bg-white/5 border border-white/10 transition-all duration-500 hover:border-zodiac-gold/30"
                            >
                                <Image
                                    src={getAssetPath(dessert.image)}
                                    alt={locale === "zh-TW" ? dessert.zhName : dessert.name}
                                    fill
                                    className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-90 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                    <div className="text-right">
                                        <span className="font-mono text-sm tracking-widest text-zodiac-gold">NT$ {dessert.price}</span>
                                    </div>
                                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                        <h3 className="font-zh-serif text-2xl font-bold text-white mb-1 group-hover:text-zodiac-gold transition-colors">
                                            {locale === "zh-TW" ? dessert.zhName : dessert.name}
                                        </h3>
                                        <p className="font-serif text-white/50 text-xs mb-4 uppercase tracking-wider">
                                            {locale === "zh-TW" ? dessert.name : dessert.zhName}
                                        </p>
                                        <div className="w-0 group-hover:w-full h-px bg-zodiac-gold transition-all duration-500" />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <DessertQuiz />
                        <div className="w-[10vw] flex-shrink-0" />
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {selectedDessert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedDessert(null)}
                    >
                        {/* Compact Horizontal Card */}
                        <motion.div
                            layoutId={`card-${selectedDessert.id}`}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            // Dimensions: max-w-5xl, fixed height md:h-[500px]
                            className="relative w-full max-w-5xl md:h-[550px] bg-zodiac-charcoal border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-sm"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedDessert(null)}
                                className="absolute top-4 right-4 z-20 p-2 text-white/50 hover:text-white transition-colors hover:bg-white/10 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image Side - Square & Compact (Aspect Square) */}
                            <div className="relative w-full md:w-auto md:aspect-square h-48 md:h-full flex-shrink-0 bg-neutral-900 border-r border-white/5">
                                <Image
                                    src={getAssetPath(selectedDessert.image)}
                                    alt={selectedDessert.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zodiac-charcoal/50 to-transparent" />
                            </div>

                            {/* Content Side - Flex 1 */}
                            <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar md:overflow-visible flex flex-col justify-center">
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="flex flex-col h-full gap-6"
                                >
                                    {/* Header Group */}
                                    <motion.div variants={itemVariants} className="flex justify-between items-start border-b border-white/10 pb-4">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-zodiac-gold mb-2">{t("gallery.seasonalCollection")}</p>
                                            <h2 className="text-3xl md:text-4xl font-zh-serif text-white mb-1">
                                                {locale === "zh-TW" ? selectedDessert.zhName : selectedDessert.name}
                                            </h2>
                                            <p className="text-sm font-serif text-white/40 tracking-wide">
                                                {locale === "zh-TW" ? selectedDessert.name : selectedDessert.zhName}
                                            </p>
                                        </div>
                                        <p className="font-mono text-xl text-zodiac-gold pt-2">NT$ {selectedDessert.price}</p>
                                    </motion.div>

                                    {/* Description & Note Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <motion.div variants={itemVariants} className="space-y-4">
                                            <p className="text-sm md:text-base text-white/80 font-zh-serif font-light leading-relaxed">
                                                {locale === "zh-TW" ? selectedDessert.zhDescription : selectedDessert.description}
                                            </p>

                                            {/* Chef Note with Icon */}
                                            <div className="bg-white/5 p-3 rounded-sm border-l-2 border-zodiac-gold">
                                                <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zodiac-gold/80 mb-1">
                                                    <ChefHat className="w-3 h-3" /> {t("gallery.chefNote")}
                                                </h4>
                                                <p className="text-xs italic text-white/60">
                                                    {locale === "zh-TW" ? selectedDessert.zhChefNote : selectedDessert.chefNote}
                                                </p>
                                            </div>
                                        </motion.div>

                                        {/* Flavor Profile & Pairing */}
                                        <motion.div variants={itemVariants} className="space-y-5">
                                            {/* Flavor Bars - Compact */}
                                            <div className="space-y-2">
                                                <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zodiac-gold/60">
                                                    <Activity className="w-3 h-3" /> {t("gallery.flavorProfile")}
                                                </h4>
                                                <div className="space-y-1.5">
                                                    {["sweetness", "acidity", "texture"].map((key) => (
                                                        <div key={key} className="flex items-center gap-2 text-[10px] text-white/50">
                                                            <span className="w-12">{t(`gallery.${key}`)}</span>
                                                            <div className="flex-1 h-0.5 bg-white/10 rounded-full">
                                                                <motion.div
                                                                    custom={selectedDessert.profile[key as keyof typeof selectedDessert.profile]}
                                                                    variants={barVariants}
                                                                    className="h-full bg-zodiac-gold"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Pairing */}
                                            <div className="pt-2">
                                                <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zodiac-gold/60 mb-1">
                                                    <Wine className="w-3 h-3" /> {t("gallery.perfectPairing")}
                                                </h4>
                                                <p className="text-xs text-white/70 font-zh-serif">
                                                    {locale === "zh-TW" ? selectedDessert.zhPairing : selectedDessert.pairing}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Ingredients - Footer */}
                                    <motion.div variants={itemVariants} className="mt-auto flex flex-wrap gap-1.5 pt-2">
                                        {(locale === "zh-TW" ? selectedDessert.zhIngredients : selectedDessert.ingredients).map((ing) => (
                                            <span
                                                key={ing}
                                                className="px-2 py-0.5 text-[10px] border border-white/5 text-white/30 rounded-full"
                                            >
                                                {ing}
                                            </span>
                                        ))}
                                    </motion.div>

                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
