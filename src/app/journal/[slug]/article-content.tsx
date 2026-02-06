"use client";

import { motion } from "framer-motion";
import { Clock, Share2 } from "lucide-react";
import Image from "next/image";
import { JOURNAL_DATA } from "@/lib/journal-data";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";
import { notFound } from "next/navigation";
import JournalFloatingNav from "@/components/ui/journal-floating-nav";

interface ArticleContentProps {
    slug: string;
}

export default function JournalArticleContent({ slug }: ArticleContentProps) {
    const { locale } = useLocale();
    const article = JOURNAL_DATA.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    // Find next article
    const currentIndex = JOURNAL_DATA.findIndex((a) => a.slug === slug);
    const nextIndex = (currentIndex + 1) % JOURNAL_DATA.length;
    const nextArticle = JOURNAL_DATA[nextIndex];

    const content = locale === "zh-TW" ? article.zhContent : article.content;
    const paragraphs = content.split("\n\n").filter(Boolean);

    return (
        <main className="min-h-screen bg-zodiac-black text-white pt-32 pb-48">
            <JournalFloatingNav nextSlug={nextArticle?.slug} />

            <article className="max-w-3xl mx-auto px-8">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                        <span className="text-zodiac-gold">{locale === "zh-TW" ? article.zhCategory : article.category}</span>
                        <span>•</span>
                        <span>{new Date(article.date).toLocaleDateString(locale === "zh-TW" ? "zh-TW" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>

                    <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
                        {locale === "zh-TW" ? article.zhTitle : article.title}
                    </h1>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime} min read</span>
                        </div>
                        <button className="p-2 rounded-full bg-white/5 text-white/50 hover:bg-white/10 transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </motion.header>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-white/10 mb-12"
                >
                    <Image
                        src={getAssetPath(article.image)}
                        alt={locale === "zh-TW" ? article.zhTitle : article.title}
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-invert prose-lg max-w-none"
                >
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className="text-white/80 font-zh-serif leading-relaxed mb-6 text-lg">
                            {paragraph}
                        </p>
                    ))}
                </motion.div>

                {/* Author */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 pt-8 border-t border-white/10 flex items-center gap-4"
                >
                    <div className="w-16 h-16 rounded-full bg-zodiac-gold/20 flex items-center justify-center text-zodiac-gold font-serif text-2xl">
                        R
                    </div>
                    <div>
                        <p className="font-serif text-lg">Renzo Hayashi</p>
                        <p className="text-sm text-white/50">
                            {locale === "zh-TW" ? "主廚 & 創辦人" : "Chef & Founder"}
                        </p>
                    </div>
                </motion.div>
            </article>
        </main>
    );
}
