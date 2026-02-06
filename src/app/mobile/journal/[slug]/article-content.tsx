"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JOURNAL_DATA } from "@/lib/journal-data";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";
import { notFound } from "next/navigation";

interface ArticleContentProps {
    slug: string;
}

export default function MobileJournalArticleContent({ slug }: ArticleContentProps) {
    const { locale } = useLocale();
    const article = JOURNAL_DATA.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    const content = locale === "zh-TW" ? article.zhContent : article.content;
    const paragraphs = content.split("\n\n").filter(Boolean);

    return (
        <div className="min-h-screen bg-black pb-32">
            {/* Back Link */}
            <header className="px-5 py-6">
                <Link href="/mobile/journal" className="inline-flex items-center gap-2 text-white/50">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest">{locale === "zh-TW" ? "返回專欄" : "Back"}</span>
                </Link>
            </header>

            {/* Featured Image */}
            <div className="aspect-[16/9] relative">
                <Image
                    src={getAssetPath(article.image)}
                    alt={locale === "zh-TW" ? article.zhTitle : article.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <article className="px-5 py-6 space-y-6">
                {/* Meta */}
                <div className="flex items-center gap-3 text-[10px] text-white/40">
                    <span className="text-zodiac-gold">{locale === "zh-TW" ? article.zhCategory : article.category}</span>
                    <span>•</span>
                    <span>{new Date(article.date).toLocaleDateString(locale === "zh-TW" ? "zh-TW" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime} min</span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-3xl leading-tight">
                    {locale === "zh-TW" ? article.zhTitle : article.title}
                </h1>

                {/* Body */}
                <div className="space-y-4">
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className="text-white/80 font-zh-serif leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Author */}
                <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-zodiac-gold/20 flex items-center justify-center text-zodiac-gold font-serif text-lg">
                        R
                    </div>
                    <div>
                        <p className="font-serif">Renzo Hayashi</p>
                        <p className="text-xs text-white/50">
                            {locale === "zh-TW" ? "主廚 & 創辦人" : "Chef & Founder"}
                        </p>
                    </div>
                </div>

                {/* Share */}
                <button className="w-full py-3 border border-white/20 rounded-xl text-white/60 text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:bg-white/10">
                    <Share2 className="w-4 h-4" />
                    <span>{locale === "zh-TW" ? "分享文章" : "Share Article"}</span>
                </button>
            </article>
        </div>
    );
}
