"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";

interface Props {
    nextSlug?: string;
}

export default function JournalFloatingNav({ nextSlug }: Props) {
    const { locale } = useLocale();

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.4 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-1.5 pr-6 shadow-2xl shadow-black/50">
                <Link
                    href="/insights?tab=journal"
                    className="
                        flex items-center gap-2 px-4 py-2.5 rounded-full 
                        bg-white/5 hover:bg-white/10 text-white/70 hover:text-white 
                        transition-all duration-300 group
                    "
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-mono uppercase tracking-widest">
                        {locale === "zh-TW" ? "返回專欄" : "Back to Journal"}
                    </span>
                </Link>

                {nextSlug && (
                    <>
                        <div className="w-px h-4 bg-white/10 mx-2" />

                        <Link
                            href={`/journal/${nextSlug}`}
                            className="flex items-center gap-2 pl-2 text-white hover:text-zodiac-gold transition-colors group"
                        >
                            <span className="text-xs font-mono uppercase tracking-widest">
                                {locale === "zh-TW" ? "下一篇" : "Next Article"}
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </>
                )}
            </div>
        </motion.div>
    );
}
