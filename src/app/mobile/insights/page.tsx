"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake, BookOpen, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { COLLABORATIONS_DATA } from "@/lib/collaborations-data";
import { JOURNAL_DATA } from "@/lib/journal-data";
import { useLocale, useTranslation } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";

export default function MobileInsightsPage() {
    const { locale } = useLocale();
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<"collaborations" | "journal">("collaborations");
    const [selectedCollab, setSelectedCollab] = useState<typeof COLLABORATIONS_DATA[0] | null>(null);

    return (
        <div className="bg-black min-h-screen pb-24">
            {/* Header */}
            <header className="px-5 py-6 flex justify-between items-end">
                <div>
                    <h2 className="text-zodiac-gold text-xs font-mono uppercase tracking-widest mb-1">
                        {locale === "zh-TW" ? "跨界共創 & 手記" : "Collaborations & Journal"}
                    </h2>
                    <h1 className="text-3xl font-serif leading-none">{t("nav.insights")}</h1>
                </div>
            </header>

            {/* Tab Navigation */}
            <div className="px-5 mb-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab("collaborations")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all border ${activeTab === "collaborations"
                            ? "bg-white text-black border-white"
                            : "bg-transparent border-white/20 text-white/50"
                            }`}
                    >
                        <Handshake className="w-3 h-3" />
                        {locale === "zh-TW" ? "共創" : "Collabs"}
                    </button>
                    <button
                        onClick={() => setActiveTab("journal")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all border ${activeTab === "journal"
                            ? "bg-white text-black border-white"
                            : "bg-transparent border-white/20 text-white/50"
                            }`}
                    >
                        <BookOpen className="w-3 h-3" />
                        {locale === "zh-TW" ? "手記" : "Journal"}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-5">
                <AnimatePresence mode="wait">
                    {activeTab === "collaborations" ? (
                        <motion.div
                            key="collaborations"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="space-y-4"
                        >
                            {COLLABORATIONS_DATA.map((collab) => (
                                <motion.div
                                    key={collab.id}
                                    className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10 active:scale-[0.98] transition-transform"
                                >
                                    <Link href={`/mobile/insights/collab/${collab.id}`} className="block h-full w-full">
                                        <Image
                                            src={getAssetPath(collab.image)}
                                            alt={locale === "zh-TW" ? collab.zhBrand : collab.brand}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <span className="text-[10px] text-zodiac-gold font-mono">{collab.year}</span>
                                            <h3 className="text-lg font-serif text-white">
                                                {locale === "zh-TW" ? collab.zhTitle : collab.title}
                                            </h3>
                                            <p className="text-xs text-white/60">
                                                {locale === "zh-TW" ? collab.zhBrand : collab.brand}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="journal"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-4"
                        >
                            {JOURNAL_DATA.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/mobile/journal/${article.slug}`}
                                    className="block"
                                >
                                    <div className="flex gap-4 p-4 bg-[#111] rounded-xl border border-white/5 active:bg-white/5 transition-colors">
                                        <div className="w-20 h-20 relative rounded-lg overflow-hidden shrink-0">
                                            <Image
                                                src={getAssetPath(article.image)}
                                                alt={locale === "zh-TW" ? article.zhTitle : article.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-[10px] text-zodiac-gold font-mono">
                                                {locale === "zh-TW" ? article.zhCategory : article.category}
                                            </span>
                                            <h3 className="font-serif text-white text-sm line-clamp-1">
                                                {locale === "zh-TW" ? article.zhTitle : article.title}
                                            </h3>
                                            <p className="text-xs text-white/50 line-clamp-2 mt-1 font-zh-serif">
                                                {locale === "zh-TW" ? article.zhExcerpt : article.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
