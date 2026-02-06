"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ_DATA, FAQ_CATEGORIES, FAQItem } from "@/lib/faq-data";
import { useTranslation, useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
    const { locale } = useLocale();
    const question = locale === "zh-TW" ? item.zhQuestion : item.question;
    const answer = locale === "zh-TW" ? item.zhAnswer : item.answer;

    return (
        <div className="border-b border-white/10">
            <button
                onClick={onToggle}
                className="w-full py-5 flex items-center justify-between text-left group"
            >
                <span className="text-base font-serif text-white group-hover:text-zodiac-gold transition-colors pr-4">
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
                        <p className="pb-5 text-sm text-white/60 leading-relaxed font-zh-serif">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function MobileFAQSection() {
    const { locale } = useLocale();
    const [openId, setOpenId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const filteredFAQ = activeCategory === "all"
        ? FAQ_DATA
        : FAQ_DATA.filter(item => item.category === activeCategory);

    return (
        <section className="px-5 py-12 border-t border-white/5 bg-[#0a0a0a]">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                    <HelpCircle className="w-4 h-4 text-zodiac-gold" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zodiac-gold">
                        {locale === "zh-TW" ? "常見問題" : "FAQ"}
                    </span>
                </div>
                <h2 className="text-2xl font-serif mb-2">
                    {locale === "zh-TW" ? "您可能想知道的事" : "Questions We Often Hear"}
                </h2>
            </div>

            {/* Category Pills - Horizontal Scroll */}
            <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5 custom-scrollbar-none mb-6">
                <button
                    onClick={() => setActiveCategory("all")}
                    className={cn(
                        "px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border whitespace-nowrap",
                        activeCategory === "all"
                            ? "bg-white text-black border-white"
                            : "bg-transparent border-white/20 text-white/50"
                    )}
                >
                    {locale === "zh-TW" ? "全部" : "All"}
                </button>
                {Object.entries(FAQ_CATEGORIES).map(([key, value]) => (
                    <button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={cn(
                            "px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border whitespace-nowrap",
                            activeCategory === key
                                ? "bg-white text-black border-white"
                                : "bg-transparent border-white/20 text-white/50"
                        )}
                    >
                        {locale === "zh-TW" ? value.zh : value.en}
                    </button>
                ))}
            </div>

            {/* Accordion */}
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
                <p className="text-white/40 text-sm mb-3 font-zh-serif">
                    {locale === "zh-TW" ? "找不到您的問題？" : "Can't find your question?"}
                </p>
                <a
                    href="mailto:hello@monolith.tw"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-zodiac-gold/50 rounded-full text-zodiac-gold text-xs uppercase tracking-widest active:bg-zodiac-gold active:text-black transition-all"
                >
                    {locale === "zh-TW" ? "聯繫我們" : "Contact Us"}
                </a>
            </div>
        </section>
    );
}
