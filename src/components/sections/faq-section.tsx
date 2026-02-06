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
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className="text-lg font-serif text-white group-hover:text-zodiac-gold transition-colors pr-8">
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                >
                    <ChevronDown className="w-5 h-5 text-zodiac-gold" />
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
                        <p className="pb-6 text-white/60 leading-relaxed font-zh-serif">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQSection() {
    const { t } = useTranslation();
    const { locale } = useLocale();
    const [openId, setOpenId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const filteredFAQ = activeCategory === "all"
        ? FAQ_DATA
        : FAQ_DATA.filter(item => item.category === activeCategory);

    return (
        <section className="py-32 px-12 md:px-24 border-t border-white/5 bg-[#0a0a0a]">
            {/* Header */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <HelpCircle className="w-5 h-5 text-zodiac-gold" />
                        <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold">
                            {t("common.faq")}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif mb-4">
                        {t("faq.questionsWeOftenHear")}
                    </h2>
                    <p className="text-white/40 font-zh-serif">
                        {t("faq.everythingAbout")}
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        onClick={() => setActiveCategory("all")}
                        className={cn(
                            "px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all border",
                            activeCategory === "all"
                                ? "bg-white text-black border-white"
                                : "bg-transparent border-white/20 text-white/50 hover:border-white/40"
                        )}
                    >
                        {t("faq.all")}
                    </button>
                    {Object.entries(FAQ_CATEGORIES).map(([key, value]) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={cn(
                                "px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all border",
                                activeCategory === key
                                    ? "bg-white text-black border-white"
                                    : "bg-transparent border-white/20 text-white/50 hover:border-white/40"
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
                <div className="mt-16 text-center">
                    <p className="text-white/40 mb-4 font-zh-serif">
                        {t("faq.cantFindQuestion")}
                    </p>
                    <a
                        href="mailto:hello@monolith.tw"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-zodiac-gold/50 rounded-full text-zodiac-gold text-sm uppercase tracking-widest hover:bg-zodiac-gold hover:text-black transition-all"
                    >
                        {t("faq.contactUs")}
                    </a>
                </div>
            </div>
        </section>
    );
}
