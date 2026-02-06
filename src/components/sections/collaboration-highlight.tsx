"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Collaboration, COLLABORATIONS_DATA } from "@/lib/collaborations-data";
import { useTranslation } from "@/lib/i18n";
import { getAssetPath } from "@/lib/utils";
import CollaborationFloatingNav from "@/components/ui/collaboration-floating-nav";

interface Props {
    collab: Collaboration;
}

export default function CollaborationHighlight({ collab }: Props) {
    const { t, locale } = useTranslation();
    const [nextCollab, setNextCollab] = useState<Collaboration | null>(null);
    const { scrollY } = useScroll();

    // Parallax effects
    const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
    const textY = useTransform(scrollY, [0, 500], [0, 100]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    useEffect(() => {
        // Find next collaboration (loop back to start if at end)
        const currentIndex = COLLABORATIONS_DATA.findIndex(c => c.id === collab.id);
        const nextIndex = (currentIndex + 1) % COLLABORATIONS_DATA.length;
        setNextCollab(COLLABORATIONS_DATA[nextIndex]);
    }, [collab.id]);

    return (
        <main className="bg-zodiac-black min-h-screen pb-24">
            {/* Floating Navigation */}
            {nextCollab && <CollaborationFloatingNav nextCollabId={nextCollab.id} />}

            {/* Hero Section */}
            <section className="relative h-screen overflow-hidden">
                <motion.div style={{ y: heroY }} className="absolute inset-0">
                    <Image
                        src={getAssetPath(collab.image)}
                        alt={locale === "zh-TW" ? collab.zhBrand : collab.brand}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>

                <motion.div
                    style={{ y: textY, opacity }}
                    className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mb-6"
                    >
                        <span className="inline-block px-3 py-1 border border-white/30 rounded-full text-xs font-mono uppercase tracking-widest text-white/80 mb-4 bg-black/20 backdrop-blur-sm">
                            Waitlist Only
                        </span>
                        <h2 className="text-xl md:text-2xl font-zh-serif text-white/90 mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            {locale === "zh-TW" ? collab.zhBrand : collab.brand}
                        </h2>
                        <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight">
                            {locale === "zh-TW" ? collab.zhTitle : collab.title}
                        </h1>
                    </motion.div>
                </motion.div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                </div>
            </section>

            {/* Intro Quote Section */}
            <section className="py-32 px-8 md:px-24 bg-[#0a0a0a] border-b border-white/5 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="w-24 h-24 relative mx-auto mb-12 rounded-full overflow-hidden border border-white/10 bg-white p-4">
                        <Image
                            src={getAssetPath(collab.logo)}
                            alt={collab.brand}
                            fill
                            className="object-contain p-2"
                        />
                    </div>

                    <h3 className="text-3xl md:text-5xl font-serif leading-tight text-white mb-8">
                        &quot;{locale === "zh-TW" ? collab.zhQuote : collab.quote}&quot;
                    </h3>

                    <div className="flex flex-col items-center gap-1">
                        <span className="text-zodiac-gold font-mono uppercase tracking-widest text-sm">
                            {collab.quoteAuthor}
                        </span>
                        <span className="text-white/40 font-zh-serif text-xs">
                            {locale === "zh-TW" ? collab.zhQuoteAuthorTitle : collab.quoteAuthorTitle}
                        </span>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zodiac-gold/5 rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* Story Section */}
            <section className="py-32 px-8 md:px-24 bg-zodiac-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 space-y-8">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="h-px w-12 bg-zodiac-gold" />
                            <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold">The Dialogue</span>
                        </div>

                        <h2 className="text-4xl font-serif text-white leading-none">
                            {locale === "zh-TW" ? "工藝的對話" : "A Meeting of Minds"}
                        </h2>

                        <p className="text-lg text-white/70 leading-relaxed font-zh-serif">
                            {locale === "zh-TW" ? collab.zhStory : collab.story}
                        </p>
                    </div>

                    <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
                        <div className="aspect-[3/4] relative rounded-lg overflow-hidden translate-y-12">
                            <Image
                                src={getAssetPath(collab.gallery[0])}
                                alt="Gallery 1"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
                            <Image
                                src={getAssetPath(collab.gallery[1])}
                                alt="Gallery 2"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-32 px-8 md:px-24 bg-[#111] border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-serif text-center mb-16 text-white">
                        {locale === "zh-TW" ? "聯名系列" : "The Collection"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {collab.products.map((product, idx) => (
                            <div key={idx} className="group relative bg-black/50 border border-white/10 rounded-xl p-8 hover:border-zodiac-gold/50 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-serif text-white group-hover:text-zodiac-gold transition-colors">
                                        {locale === "zh-TW" ? product.zhName : product.name}
                                    </h3>
                                    <span className="font-mono text-sm text-white/50">{product.price}</span>
                                </div>
                                <p className="text-white/60 font-zh-serif leading-relaxed">
                                    {locale === "zh-TW" ? product.zhDescription : product.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
