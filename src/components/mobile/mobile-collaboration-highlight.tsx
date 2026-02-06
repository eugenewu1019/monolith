"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Collaboration } from "@/lib/collaborations-data";
import { useLocale } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";

interface Props {
    collab: Collaboration;
}
export default function MobileCollaborationHighlight({ collab }: Props) {
    const { locale } = useLocale();

    return (
        <div className="bg-black min-h-screen pb-12">
            {/* Header/Close */}
            <header className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center pointer-events-none">
                <Link href="/mobile/insights" className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
            </header>

            {/* Hero Image */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={getAssetPath(collab.image)}
                    alt={locale === "zh-TW" ? collab.zhBrand : collab.brand}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent pt-24">
                    <div className="inline-block px-2 py-1 border border-white/30 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/80 mb-4 bg-black/20 backdrop-blur-sm">
                        {collab.year} Collection
                    </div>
                    <h1 className="text-4xl font-serif text-white leading-none">
                        {locale === "zh-TW" ? collab.zhTitle : collab.title}
                    </h1>
                </div>
            </div>

            {/* Content Body */}
            <div className="px-6 -mt-4 relative z-10 space-y-12">
                {/* Brand Header */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden border border-white/20 bg-white shadow-lg shrink-0">
                        <Image
                            src={getAssetPath(collab.logo)}
                            alt={collab.brand}
                            fill
                            className="object-contain p-2"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-serif text-zodiac-gold">
                            {locale === "zh-TW" ? collab.zhBrand : collab.brand}
                        </h2>
                        <div className="h-px w-full bg-white/20 my-2" />
                        <p className="text-xs text-white/50 uppercase tracking-widest">
                            Limited Collaboration
                        </p>
                    </div>
                </div>

                {/* Story */}
                <div className="space-y-4">
                    <p className="text-lg font-zh-serif text-white/90 leading-relaxed">
                        {locale === "zh-TW" ? collab.zhDescription : collab.description}
                    </p>

                    <div className="p-6 bg-[#111] border-l-2 border-zodiac-gold rounded-r-xl my-8">
                        <p className="font-serif text-xl italic text-white/80 mb-4">
                            &quot;{locale === "zh-TW" ? collab.zhQuote : collab.quote}&quot;
                        </p>
                        <p className="text-xs font-mono uppercase tracking-widest text-zodiac-gold text-right">
                            — {collab.quoteAuthor}
                        </p>
                    </div>

                    <p className="text-sm font-zh-serif text-white/60 leading-loose">
                        {locale === "zh-TW" ? collab.zhStory : collab.story}
                    </p>
                </div>

                {/* Gallery Carousel */}
                <div className="overflow-x-auto -mx-6 px-6 pb-4 flex gap-4 no-scrollbar snap-x">
                    {collab.gallery.map((img, idx) => (
                        <div key={idx} className="relative w-[80vw] aspect-[3/4] shrink-0 rounded-lg overflow-hidden snap-center border border-white/10">
                            <Image
                                src={getAssetPath(img)}
                                alt={`Gallery ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Products */}
                <div className="space-y-6">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 text-center">
                        {locale === "zh-TW" ? "系列作品" : "The Collection"}
                    </h3>

                    {collab.products.map((product, idx) => (
                        <div key={idx} className="bg-[#111] border border-white/10 rounded-xl p-5 active:scale-[0.98] transition-transform">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-serif text-white">
                                    {locale === "zh-TW" ? product.zhName : product.name}
                                </h4>
                                <span className="text-xs font-mono text-zodiac-gold border border-zodiac-gold/30 px-2 py-0.5 rounded">
                                    {product.price}
                                </span>
                            </div>
                            <p className="text-sm text-white/50 font-zh-serif">
                                {locale === "zh-TW" ? product.zhDescription : product.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer Space */}
                <div className="h-12 flex items-center justify-center text-white/20">
                    <span className="text-[10px] tracking-widest uppercase">Monolith x {collab.year}</span>
                </div>
            </div>
        </div>
    );
}
