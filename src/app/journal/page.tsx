"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JOURNAL_DATA } from "@/lib/journal-data";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";
export default function JournalListPage() {
    const { locale } = useLocale();

    return (
        <main className="min-h-screen bg-zodiac-black text-white pt-32 pb-24">

            <div className="max-w-5xl mx-auto px-8">
                {/* Header */}
                <div className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm uppercase tracking-widest">Back</span>
                    </Link>

                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-zodiac-gold" />
                        <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold">
                            {locale === "zh-TW" ? "主廚專欄" : "Chef's Journal"}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif mb-4">
                        {locale === "zh-TW" ? "手記與思考" : "Notes & Thoughts"}
                    </h1>
                    <p className="text-white/50 font-zh-serif text-lg max-w-2xl">
                        {locale === "zh-TW"
                            ? "Renzo 主廚關於食材、技法、與甜點哲學的隨筆。"
                            : "Chef Renzo's musings on ingredients, technique, and the philosophy of pastry."}
                    </p>
                </div>

                {/* Articles List */}
                <div className="space-y-12">
                    {JOURNAL_DATA.map((article, index) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={`/journal/${article.slug}`} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                                <div className="md:col-span-5 aspect-[16/10] relative rounded-xl overflow-hidden border border-white/10">
                                    <Image
                                        src={getAssetPath(article.image)}
                                        alt={locale === "zh-TW" ? article.zhTitle : article.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <div className="md:col-span-7 space-y-4">
                                    <div className="flex items-center gap-4 text-xs text-white/40">
                                        <span className="text-zodiac-gold">{locale === "zh-TW" ? article.zhCategory : article.category}</span>
                                        <span>•</span>
                                        <span>{new Date(article.date).toLocaleDateString(locale === "zh-TW" ? "zh-TW" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                                        <span>•</span>
                                        <span>{article.readTime} min read</span>
                                    </div>

                                    <h2 className="font-serif text-3xl text-white group-hover:text-zodiac-gold transition-colors">
                                        {locale === "zh-TW" ? article.zhTitle : article.title}
                                    </h2>

                                    <p className="text-white/60 font-zh-serif leading-relaxed">
                                        {locale === "zh-TW" ? article.zhExcerpt : article.excerpt}
                                    </p>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </main>
    );
}
