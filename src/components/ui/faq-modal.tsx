"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, X } from "lucide-react";
import { FAQ_DATA, FAQ_CATEGORIES, FAQItem } from "@/lib/faq-data";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
    const { locale } = useLocale();
    const question = locale === "zh-TW" ? item.zhQuestion : item.question;
    const answer = locale === "zh-TW" ? item.zhAnswer : item.answer;

    return (
        <div className="border-b border-white/10">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between text-left group"
            >
                <span className="text-base font-serif text-white group-hover:text-zodiac-gold transition-colors pr-8">
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                >
                    <ChevronDown className="w-4 h-4 text-zodiac-gold" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-sm text-white/60 leading-relaxed font-zh-serif">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface FAQModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FAQModal({ isOpen, onClose }: FAQModalProps) {
    const { locale } = useLocale();
    const [openId, setOpenId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const filteredFAQ = activeCategory === "all"
        ? FAQ_DATA
        : FAQ_DATA.filter(item => item.category === activeCategory);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-zodiac-gold" />
                                <h2 className="text-xl font-serif">
                                    {locale === "zh-TW" ? "常見問題" : "FAQ"}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="p-4 border-b border-white/5 shrink-0 overflow-x-auto">
                            <div className="flex gap-2 min-w-max">
                                <button
                                    onClick={() => setActiveCategory("all")}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-xs uppercase tracking-widest transition-all border whitespace-nowrap",
                                        activeCategory === "all"
                                            ? "bg-white text-black border-white"
                                            : "bg-transparent border-white/20 text-white/50 hover:border-white/40"
                                    )}
                                >
                                    {locale === "zh-TW" ? "全部" : "All"}
                                </button>
                                {Object.entries(FAQ_CATEGORIES).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveCategory(key)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full text-xs uppercase tracking-widest transition-all border whitespace-nowrap",
                                            activeCategory === key
                                                ? "bg-white text-black border-white"
                                                : "bg-transparent border-white/20 text-white/50 hover:border-white/40"
                                        )}
                                    >
                                        {locale === "zh-TW" ? value.zh : value.en}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Accordion */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="border-t border-white/10">
                                {filteredFAQ.map(item => (
                                    <AccordionItem
                                        key={item.id}
                                        item={item}
                                        isOpen={openId === item.id}
                                        onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                                    />
                                ))}
                            </div>

                            {/* Contact CTA */}
                            <div className="mt-8 text-center">
                                <p className="text-white/40 mb-3 text-sm font-zh-serif">
                                    {locale === "zh-TW" ? "找不到您的問題？" : "Can't find your question?"}
                                </p>
                                <a
                                    href="mailto:hello@monolith.tw"
                                    className="inline-flex items-center gap-2 px-5 py-2 border border-zodiac-gold/50 rounded-full text-zodiac-gold text-xs uppercase tracking-widest hover:bg-zodiac-gold hover:text-black transition-all"
                                >
                                    {locale === "zh-TW" ? "聯繫我們" : "Contact Us"}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
