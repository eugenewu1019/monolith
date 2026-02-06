"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { FAQ_DATA } from "@/lib/faq-data";
import { useLocale, useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface FAQPreviewSectionProps {
    onViewAll: () => void;
}

export function FAQPreviewSection({ onViewAll }: FAQPreviewSectionProps) {
    const { locale } = useLocale();
    const { t } = useTranslation();
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // Show first 3 FAQs as preview
    const previewFAQs = FAQ_DATA.slice(0, 3);

    return (
        <section className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold">
                        {locale === "zh-TW" ? "常見問題" : "FAQ"}
                    </span>
                    <h3 className="font-serif text-xl mt-1">
                        {locale === "zh-TW" ? "您可能想知道" : "You May Wonder"}
                    </h3>
                </div>
            </div>

            {/* FAQ Cards */}
            <div className="space-y-3">
                {previewFAQs.map((faq) => {
                    const isExpanded = expandedId === faq.id;
                    const question = locale === "zh-TW" ? faq.zhQuestion : faq.question;
                    const answer = locale === "zh-TW" ? faq.zhAnswer : faq.answer;

                    return (
                        <motion.div
                            key={faq.id}
                            className={cn(
                                "bg-[#111] border rounded-xl overflow-hidden transition-colors",
                                isExpanded ? "border-zodiac-gold/30" : "border-white/5"
                            )}
                        >
                            <button
                                onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                                className="w-full flex items-center justify-between p-4 text-left active:bg-white/5"
                            >
                                <span className="font-zh-serif text-sm pr-4 leading-relaxed">
                                    {question}
                                </span>
                                <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown className={cn(
                                        "w-4 h-4 transition-colors",
                                        isExpanded ? "text-zodiac-gold" : "text-white/30"
                                    )} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-4 pb-4 pt-0">
                                            <div className="border-t border-white/5 pt-3">
                                                <p className="text-sm text-white/60 leading-relaxed font-zh-serif">
                                                    {answer}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>

            {/* View All Button */}
            <button
                onClick={onViewAll}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm text-white/50 hover:text-zodiac-gold transition-colors group"
            >
                <span className="font-zh-serif">
                    {locale === "zh-TW" ? "查看全部問題" : "View All Questions"}
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </section>
    );
}
