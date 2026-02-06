"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JOURNAL_DATA } from "@/lib/journal-data";
import { useTranslation } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";

export default function JournalPreviewSection() {
    const { t, locale } = useTranslation();
    const latestArticles = JOURNAL_DATA.slice(0, 3);

    return (
        <section className="py-32 px-12 md:px-24 border-t border-white/5 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="w-5 h-5 text-zodiac-gold" />
                            <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold">
                                {t("journalPage.chefsJournal")}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif">
                            {t("journalPage.notesThoughts")}
                        </h2>
                    </div>
                    <Link
                        href="/journal"
                        className="hidden md:flex items-center gap-2 text-zodiac-gold text-sm uppercase tracking-widest hover:gap-4 transition-all"
                    >
                        <span>{t("journalPage.viewAll")}</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestArticles.map((article, index) => (
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

                {/* Mobile CTA */}
                <div className="mt-8 md:hidden">
                    <Link
                        href="/journal"
                        className="flex items-center justify-center gap-2 w-full py-4 border border-white/20 rounded-xl text-zodiac-gold text-sm uppercase tracking-widest"
                    >
                        <span>{t("journalPage.viewAllArticles")}</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
