"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { GALLERY_DATA } from "@/lib/gallery-data";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";

export default function MobileBehindScenesSection() {
    const { locale } = useLocale();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const goNext = () => setLightboxIndex((prev) => prev !== null ? (prev + 1) % GALLERY_DATA.length : null);
    const goPrev = () => setLightboxIndex((prev) => prev !== null ? (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length : null);

    return (
        <>
            <section className="px-5 py-12 border-t border-white/5 bg-[#050505]">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Camera className="w-4 h-4 text-zodiac-gold" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zodiac-gold">
                            {locale === "zh-TW" ? "幕後花絮" : "Behind the Scenes"}
                        </span>
                    </div>
                    <h2 className="text-2xl font-serif mb-2">
                        {locale === "zh-TW" ? "工藝的誕生" : "The Birth of Craft"}
                    </h2>
                    <p className="text-sm text-white/50 font-zh-serif">
                        {locale === "zh-TW"
                            ? "72 小時的精密工序，科學與直覺的交織"
                            : "72 hours of precision. Science meets intuition."}
                    </p>
                </div>

                {/* Horizontal Scroll Gallery */}
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 custom-scrollbar-none">
                    {GALLERY_DATA.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => openLightbox(index)}
                            className="flex-shrink-0 w-48 cursor-pointer group"
                        >
                            <div className="aspect-[3/4] relative rounded-xl overflow-hidden border border-white/10 mb-2">
                                <Image
                                    src={getAssetPath(item.image)}
                                    alt={locale === "zh-TW" ? item.zhTitle : item.title}
                                    fill
                                    className="object-cover grayscale group-active:grayscale-0 transition-all"
                                />
                            </div>
                            <h3 className="font-serif text-sm text-white/80">
                                {locale === "zh-TW" ? item.zhTitle : item.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 z-10 p-2 bg-white/10 rounded-full text-white/80"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image */}
                        <div className="flex-1 flex items-center justify-center p-8">
                            <motion.div
                                key={lightboxIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={getAssetPath(GALLERY_DATA[lightboxIndex].image)}
                                    alt={locale === "zh-TW" ? GALLERY_DATA[lightboxIndex].zhTitle : GALLERY_DATA[lightboxIndex].title}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* Caption & Navigation */}
                        <div className="px-8 pb-12 space-y-4">
                            <div className="text-center">
                                <h3 className="font-serif text-xl text-white mb-1">
                                    {locale === "zh-TW" ? GALLERY_DATA[lightboxIndex].zhTitle : GALLERY_DATA[lightboxIndex].title}
                                </h3>
                                <p className="text-sm text-white/60 font-zh-serif">
                                    {locale === "zh-TW" ? GALLERY_DATA[lightboxIndex].zhDescription : GALLERY_DATA[lightboxIndex].description}
                                </p>
                            </div>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={goPrev}
                                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 active:bg-white/10"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={goNext}
                                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 active:bg-white/10"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
