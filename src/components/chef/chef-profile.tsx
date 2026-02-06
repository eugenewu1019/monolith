"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import { useRef } from "react";
import { useTranslation } from "@/lib/i18n";

export default function ChefProfile() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Parallax Effects
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const yImg = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
    const opacitySig = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

    return (
        <section ref={sectionRef} className="relative min-h-[140vh] bg-zodiac-charcoal flex items-center justify-center overflow-hidden py-40">

            {/* 1. Dynamic Background Typography (Parallax) */}
            <motion.div
                style={{ y: yBg }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none"
            >
                <h1 className="text-[20vw] md:text-[25vw] font-serif leading-none text-white whitespace-nowrap rotate-90 md:rotate-0 transform origin-center">
                    RENZO HAYASHI
                </h1>
            </motion.div>

            {/* 2. Asymmetric Grid Layout - Fixed Alignment */}
            <div className="container mx-auto px-8 relative z-10 w-full h-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12 h-full items-center">

                    {/* Left Column: Text Content (Span 5) */}
                    <div className="col-span-1 md:col-span-5 flex flex-col justify-center order-2 md:order-1 relative z-20">
                        {/* Title Group - No more negative margin overlap causing issues */}
                        <div className="mb-12 relative pl-4 md:pl-0">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <p className="font-mono text-xs tracking-[0.5em] text-zodiac-gold mb-4 uppercase">{t("chef.headPastryChef")}</p>
                                <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] text-white">
                                    Renzo<br />Hayashi
                                </h2>
                                <p className="text-3xl md:text-4xl font-zh-serif opacity-50 mt-4 text-white/80">林 練造</p>
                            </motion.div>

                            {/* Vertical Line */}
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: "100px" }}
                                transition={{ duration: 1, ease: "circOut" }}
                                className="absolute -left-6 top-2 w-px bg-zodiac-gold/50 hidden md:block"
                            />
                        </div>

                        {/* Narrative Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8 pl-4 md:pl-0"
                        >
                            <div className="space-y-6 text-lg font-light text-white/80 leading-relaxed max-w-md">
                                <p>
                                    "Pastry is ephemeral architecture. It must stand, it must hold space, and then it must collapse into memory."
                                </p>
                                <p className="font-zh-serif text-base text-white/60 leading-loose">
                                    「甜點是瞬時的建築。它必須佇立，佔據空間，然後在味蕾中崩塌成為記憶。」
                                </p>
                            </div>

                            {/* Awards */}
                            <div className="pt-8 border-t border-white/10 flex gap-8">
                                <div>
                                    <span className="block text-2xl font-serif text-zodiac-gold">2018</span>
                                    <span className="text-[10px] uppercase tracking-widest opacity-50">{t("chef.coupeDuMonde")}<br />{t("chef.silverMedal")}</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-serif text-white/40">2022</span>
                                    <span className="text-[10px] uppercase tracking-widest opacity-50">{t("chef.asias50Best")}<br />{t("chef.pastryChef")}</span>
                                </div>
                            </div>

                            {/* Signature Placeholder - Using Text since Image Gen Failed */}
                            <div className="pt-12 opacity-70">
                                <span className="font-serif italic text-4xl text-white/60" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Renzo Hayashi</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Parallax Image (Span 7) */}
                    <div className="col-span-1 md:col-span-7 h-[60vh] md:h-[80vh] relative order-1 md:order-2 overflow-hidden bg-neutral-900">
                        {/* Image Wrapper */}
                        <motion.div style={{ y: yImg }} className="relative w-full h-[120%] -top-[10%] filter grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-1000 ease-out">
                            <Image
                                src={getAssetPath("/images/chef-renzo.png")}
                                alt="Renzo Hayashi Portrait"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zodiac-charcoal via-transparent to-transparent opacity-80" />
                        </motion.div>

                        {/* Decorative Frames - Adjusted */}
                        <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-white/20" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-white/20" />
                    </div>

                </div>
            </div>
        </section>
    );
}
