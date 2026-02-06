"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { COLLABORATIONS_DATA } from "@/lib/collaborations-data";
import { useTranslation } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";

export default function CollaborationsSection() {
    const { t, locale } = useTranslation();
    const [selectedCollab, setSelectedCollab] = useState<typeof COLLABORATIONS_DATA[0] | null>(null);

    return (
        <>
            <section className="py-32 px-12 md:px-24 border-t border-white/5 bg-zodiac-black">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Handshake className="w-5 h-5 text-zodiac-gold" />
                                <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold">
                                    {t("insightsPage.collaborations")}
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                                {t("collaboration.crossDiscipline")}
                            </h2>
                        </div>
                        <p className="text-white/50 font-zh-serif text-lg leading-relaxed max-w-md md:ml-auto">
                            {t("collaboration.crossDisciplineDesc")}
                        </p>
                    </div>

                    {/* Brand Logos */}
                    <div className="flex flex-wrap justify-center gap-12 mb-20 py-8 border-y border-white/5">
                        {COLLABORATIONS_DATA.map((collab) => (
                            <div
                                key={collab.id}
                                className="w-24 h-12 relative opacity-30 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                                onClick={() => setSelectedCollab(collab)}
                            >
                                <div className="w-full h-full bg-white/10 rounded flex items-center justify-center text-white/50 text-xs font-mono">
                                    {collab.brand.slice(0, 3).toUpperCase()}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Collaboration Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {COLLABORATIONS_DATA.map((collab) => (
                            <motion.div
                                key={collab.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedCollab(collab)}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden border border-white/10 mb-6">
                                    <Image
                                        src={getAssetPath(collab.image)}
                                        alt={locale === "zh-TW" ? collab.zhTitle : collab.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <span className="text-zodiac-gold text-xs font-mono uppercase tracking-widest">
                                            {collab.year}
                                        </span>
                                        <h3 className="font-serif text-2xl text-white mt-1">
                                            {locale === "zh-TW" ? collab.zhTitle : collab.title}
                                        </h3>
                                        <p className="text-white/60 text-sm mt-1">
                                            × {locale === "zh-TW" ? collab.zhBrand : collab.brand}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-zodiac-gold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                                    <span>{t("collaboration.viewDetails")}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedCollab && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-8"
                        onClick={() => setSelectedCollab(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#111] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="aspect-square md:aspect-auto relative">
                                <Image
                                    src={getAssetPath(selectedCollab.image)}
                                    alt={locale === "zh-TW" ? selectedCollab.zhTitle : selectedCollab.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8 flex flex-col">
                                <button
                                    onClick={() => setSelectedCollab(null)}
                                    className="self-end p-2 bg-white/10 rounded-full text-white/80 hover:bg-white/20 mb-6"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <span className="text-zodiac-gold text-xs font-mono uppercase tracking-widest">
                                    {selectedCollab.year} × {locale === "zh-TW" ? selectedCollab.zhBrand : selectedCollab.brand}
                                </span>
                                <h2 className="font-serif text-4xl text-white mt-2 mb-6">
                                    {locale === "zh-TW" ? selectedCollab.zhTitle : selectedCollab.title}
                                </h2>
                                <p className="text-white/70 font-zh-serif leading-relaxed flex-1">
                                    {locale === "zh-TW" ? selectedCollab.zhDescription : selectedCollab.description}
                                </p>

                                <button className="mt-8 w-full py-4 border border-zodiac-gold/50 text-zodiac-gold rounded-xl text-sm uppercase tracking-widest hover:bg-zodiac-gold hover:text-black transition-all">
                                    {t("collaboration.viewCollection")}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
