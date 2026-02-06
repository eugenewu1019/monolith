"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import { COLLABORATIONS_DATA } from "@/lib/collaborations-data";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";

export default function MobileCollaborationsSection() {
    const { locale } = useLocale();
    const [selectedCollab, setSelectedCollab] = useState<typeof COLLABORATIONS_DATA[0] | null>(null);

    return (
        <>
            <section className="px-5 py-12 border-t border-white/5">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Handshake className="w-4 h-4 text-zodiac-gold" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zodiac-gold">
                            {locale === "zh-TW" ? "聯名合作" : "Collaborations"}
                        </span>
                    </div>
                    <h2 className="text-2xl font-serif">
                        {locale === "zh-TW" ? "跨界共創" : "Cross-Discipline"}
                    </h2>
                </div>

                {/* Horizontal Scroll Cards */}
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 custom-scrollbar-none">
                    {COLLABORATIONS_DATA.map((collab) => (
                        <motion.div
                            key={collab.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedCollab(collab)}
                            className="flex-shrink-0 w-64 cursor-pointer group"
                        >
                            <div className="aspect-[3/4] relative rounded-xl overflow-hidden border border-white/10 mb-3">
                                <Image
                                    src={getAssetPath(collab.image)}
                                    alt={locale === "zh-TW" ? collab.zhTitle : collab.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="text-zodiac-gold text-[10px] font-mono uppercase tracking-widest">
                                        {collab.year}
                                    </span>
                                    <h3 className="font-serif text-lg text-white mt-1">
                                        {locale === "zh-TW" ? collab.zhTitle : collab.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-zodiac-gold text-xs">
                                <span>× {locale === "zh-TW" ? collab.zhBrand : collab.brand}</span>
                                <ChevronRight className="w-3 h-3" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedCollab && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex flex-col"
                    >
                        {/* Close */}
                        <button
                            onClick={() => setSelectedCollab(null)}
                            className="absolute top-6 right-6 z-10 p-2 bg-white/10 rounded-full text-white/80"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image */}
                        <div className="aspect-square relative">
                            <Image
                                src={getAssetPath(selectedCollab.image)}
                                alt={locale === "zh-TW" ? selectedCollab.zhTitle : selectedCollab.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 overflow-y-auto">
                            <span className="text-zodiac-gold text-xs font-mono uppercase tracking-widest">
                                {selectedCollab.year} × {locale === "zh-TW" ? selectedCollab.zhBrand : selectedCollab.brand}
                            </span>
                            <h2 className="font-serif text-3xl text-white mt-2 mb-4">
                                {locale === "zh-TW" ? selectedCollab.zhTitle : selectedCollab.title}
                            </h2>
                            <p className="text-white/70 font-zh-serif leading-relaxed">
                                {locale === "zh-TW" ? selectedCollab.zhDescription : selectedCollab.description}
                            </p>

                            <button
                                onClick={() => setSelectedCollab(null)}
                                className="mt-8 w-full py-4 border border-white/20 text-white/60 rounded-xl text-xs uppercase tracking-widest active:bg-white/10"
                            >
                                {locale === "zh-TW" ? "關閉" : "Close"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
