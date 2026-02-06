"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Play } from "lucide-react";
import Image from "next/image";
import { GALLERY_DATA } from "@/lib/gallery-data";
import { useTranslation } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";

export default function BehindScenesSection() {
    const { t, locale } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

    return (
        <section ref={containerRef} className="py-32 px-12 md:px-24 border-t border-white/5 bg-[#050505] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('/images/noise.png')] bg-repeat" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Camera className="w-5 h-5 text-zodiac-gold" />
                            <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold">
                                {t("behindScenes.behindTheScenes")}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                            {t("behindScenes.birthOfCraft")}
                        </h2>
                    </div>
                    <p className="text-white/50 font-zh-serif text-lg leading-relaxed max-w-md md:ml-auto">
                        {t("behindScenes.birthOfCraftDesc")}
                    </p>
                </div>

                {/* Masonry Grid with Parallax */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Column 1 */}
                    <motion.div style={{ y: y1 }} className="space-y-6">
                        {GALLERY_DATA.filter((_, i) => i % 3 === 0).map((item) => (
                            <GalleryCard key={item.id} item={item} locale={locale} />
                        ))}
                    </motion.div>

                    {/* Column 2 */}
                    <motion.div style={{ y: y2 }} className="space-y-6 md:mt-24">
                        {GALLERY_DATA.filter((_, i) => i % 3 === 1).map((item) => (
                            <GalleryCard key={item.id} item={item} locale={locale} />
                        ))}
                    </motion.div>

                    {/* Column 3 */}
                    <motion.div style={{ y: y1 }} className="space-y-6">
                        {GALLERY_DATA.filter((_, i) => i % 3 === 2).map((item) => (
                            <GalleryCard key={item.id} item={item} locale={locale} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function GalleryCard({ item, locale }: { item: typeof GALLERY_DATA[0]; locale: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111]"
        >
            <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                    src={getAssetPath(item.image)}
                    alt={locale === "zh-TW" ? item.zhTitle : item.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-zodiac-gold group-hover:border-zodiac-gold transition-all">
                            <Play className="w-6 h-6 text-white group-hover:text-black ml-1" />
                        </div>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-serif text-xl text-white mb-1">
                    {locale === "zh-TW" ? item.zhTitle : item.title}
                </h3>
                <p className="text-sm text-white/60 font-zh-serif">
                    {locale === "zh-TW" ? item.zhDescription : item.description}
                </p>
            </div>
        </motion.div>
    );
}
