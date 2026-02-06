"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake, BookOpen, ArrowRight, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { COLLABORATIONS_DATA } from "@/lib/collaborations-data";
import { JOURNAL_DATA } from "@/lib/journal-data";
import { useTranslation } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

function InsightsContent() {
    const { t, locale } = useTranslation();
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");
    const [activeTab, setActiveTab] = useState<"collaborations" | "journal">("collaborations");

    useEffect(() => {
        if (tabParam === "journal") {
            setActiveTab("journal");
        } else {
            setActiveTab("collaborations");
        }
    }, [tabParam]);

    return (
        <main className="bg-zodiac-black min-h-screen">
            {/* Hero */}
            <section className="h-[40vh] flex flex-col items-center justify-center relative overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tighter text-white mb-2">INSIGHTS</h1>
                        <p className="text-lg md:text-xl font-zh-serif text-zodiac-gold tracking-[0.5em] uppercase">{t("insightsPage.insights")}</p>
                    </motion.div>
                </div>
            </section>

            {/* Tab Navigation */}
            <div className="sticky top-0 z-40 bg-zodiac-black/90 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-center gap-8">
                    <button
                        onClick={() => setActiveTab("collaborations")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all border ${activeTab === "collaborations"
                            ? "bg-white text-black border-white"
                            : "bg-transparent border-white/20 text-white/50 hover:border-white/40"
                            }`}
                    >
                        <Handshake className="w-4 h-4" />
                        {t("insightsPage.collaborations")}
                    </button>
                    <button
                        onClick={() => setActiveTab("journal")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all border ${activeTab === "journal"
                            ? "bg-white text-black border-white"
                            : "bg-transparent border-white/20 text-white/50 hover:border-white/40"
                            }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        {t("insightsPage.journal")}
                    </button>
                </div>
            </div>

            {/* Content */}
            <section className="py-24 px-8 md:px-24">
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        {activeTab === "collaborations" ? (
                            <motion.div
                                key="collaborations"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Collaborations Header */}
                                <div className="mb-16">
                                    <h2 className="text-4xl md:text-5xl font-serif mb-4">
                                        {t("insightsPage.dialoguesWithMasters")}
                                    </h2>
                                    <p className="text-white/50 font-zh-serif max-w-2xl">
                                        {t("insightsPage.dialoguesDesc")}
                                    </p>
                                </div>

                                {/* Collaborations Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {COLLABORATIONS_DATA.map((collab, index) => (
                                        <motion.div
                                            key={collab.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link href={`/insights/collab/${collab.id}`} className="group block cursor-pointer">
                                                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden border border-white/10 mb-4">
                                                    <Image
                                                        src={getAssetPath(collab.image)}
                                                        alt={locale === "zh-TW" ? collab.zhBrand : collab.brand}
                                                        fill
                                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                    <div className="absolute bottom-6 left-6 right-6">
                                                        <span className="text-xs text-zodiac-gold font-mono">{collab.year}</span>
                                                        <h3 className="text-2xl font-serif text-white mt-1">
                                                            {locale === "zh-TW" ? collab.zhTitle : collab.title}
                                                        </h3>
                                                        <p className="text-sm text-white/60 mt-2">
                                                            {locale === "zh-TW" ? collab.zhBrand : collab.brand}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="journal"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Journal Header */}
                                <div className="mb-16">
                                    <h2 className="text-4xl md:text-5xl font-serif mb-4">
                                        {t("insightsPage.chefsNotes")}
                                    </h2>
                                    <p className="text-white/50 font-zh-serif max-w-2xl">
                                        {t("insightsPage.chefsNotesDesc")}
                                    </p>
                                </div>

                                {/* Journal Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {JOURNAL_DATA.map((article, index) => (
                                        <motion.div
                                            key={article.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link href={`/journal/${article.slug}`} className="group block">
                                                <div className="aspect-[16/10] relative rounded-xl overflow-hidden border border-white/10 mb-4">
                                                    <Image
                                                        src={getAssetPath(article.image)}
                                                        alt={locale === "zh-TW" ? article.zhTitle : article.title}
                                                        fill
                                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3 text-xs text-white/40">
                                                        <span className="text-zodiac-gold">{locale === "zh-TW" ? article.zhCategory : article.category}</span>
                                                        <span>•</span>
                                                        <span>{article.readTime} min read</span>
                                                    </div>
                                                    <h3 className="font-serif text-xl text-white group-hover:text-zodiac-gold transition-colors">
                                                        {locale === "zh-TW" ? article.zhTitle : article.title}
                                                    </h3>
                                                    <p className="text-sm text-white/50 line-clamp-2 font-zh-serif">
                                                        {locale === "zh-TW" ? article.zhExcerpt : article.excerpt}
                                                    </p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </main >
    );
}

export default function InsightsPage() {
    return (
        <Suspense>
            <InsightsContent />
        </Suspense>
    );
}
