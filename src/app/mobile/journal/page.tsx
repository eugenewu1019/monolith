"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JOURNAL_DATA } from "@/lib/journal-data";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";

export default function MobileJournalListPage() {
    const { locale } = useLocale();

    return (
        <div className="min-h-screen bg-black pb-32">
            {/* Header */}
            <header className="px-5 py-6 space-y-4">
                <Link href="/mobile" className="inline-flex items-center gap-2 text-white/50">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest">{locale === "zh-TW" ? "返回" : "Back"}</span>
                </Link>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-zodiac-gold" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zodiac-gold">
                            {locale === "zh-TW" ? "主廚專欄" : "Chef's Journal"}
                        </span>
                    </div>
                    <h1 className="text-3xl font-serif">
                        {locale === "zh-TW" ? "手記與思考" : "Notes & Thoughts"}
                    </h1>
                </div>
            </header>

            {/* Articles */}
            <div className="px-5 space-y-6">
                {JOURNAL_DATA.map((article, index) => (
                    <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={`/mobile/journal/${article.slug}`} className="block group">
                            <div className="aspect-[16/9] relative rounded-xl overflow-hidden border border-white/10 mb-3">
                                <Image
                                    src={getAssetPath(article.image)}
                                    alt={locale === "zh-TW" ? article.zhTitle : article.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[10px] text-white/40">
                                    <span className="text-zodiac-gold">{locale === "zh-TW" ? article.zhCategory : article.category}</span>
                                    <span>•</span>
                                    <span>{article.readTime} min</span>
                                </div>

                                <h2 className="font-serif text-xl text-white group-active:text-zodiac-gold transition-colors">
                                    {locale === "zh-TW" ? article.zhTitle : article.title}
                                </h2>

                                <p className="text-sm text-white/50 line-clamp-2 font-zh-serif">
                                    {locale === "zh-TW" ? article.zhExcerpt : article.excerpt}
                                </p>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </div>
    );
}
