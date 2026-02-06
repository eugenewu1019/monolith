"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/lib/testimonials-data";
import { useTranslation } from "@/lib/i18n";

function TypewriterText({ text, isActive }: { text: string; isActive: boolean }) {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!isActive) {
            setDisplayText("");
            setIsComplete(false);
            return;
        }

        let index = 0;
        setDisplayText("");
        setIsComplete(false);

        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayText(text.slice(0, index + 1));
                index++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [text, isActive]);

    return (
        <span>
            {displayText}
            {!isComplete && isActive && <span className="animate-pulse">|</span>}
        </span>
    );
}

export default function TestimonialsSection() {
    const { t, locale } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const testimonial = TESTIMONIALS_DATA[activeIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-32 px-12 md:px-24 border-t border-white/5 bg-zodiac-black relative overflow-hidden">
            {/* Background Quote Mark */}
            <div className="absolute top-24 left-12 opacity-5 pointer-events-none">
                <Quote className="w-48 h-48 text-zodiac-gold" strokeWidth={1} />
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold block mb-4">
                        {t("testimonials.testimonials")}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif">
                        {t("testimonials.whatTheySay")}
                    </h2>
                </div>

                {/* Main Testimonial */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                    {/* Quote Content */}
                    <div className="md:col-span-8 space-y-8">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Stars */}
                            <div className="flex gap-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-zodiac-gold text-zodiac-gold" />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed text-white/90 min-h-[180px] md:min-h-[150px]">
                                <TypewriterText
                                    text={locale === "zh-TW" ? testimonial.zhContent : testimonial.content}
                                    isActive={true}
                                />
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                                <div className="w-12 h-12 rounded-full bg-zodiac-gold/20 flex items-center justify-center text-zodiac-gold font-serif text-lg">
                                    {(locale === "zh-TW" ? testimonial.zhName : testimonial.name).charAt(0)}
                                </div>
                                <div>
                                    <p className="font-serif text-lg text-white">
                                        {locale === "zh-TW" ? testimonial.zhName : testimonial.name}
                                    </p>
                                    <p className="text-sm text-white/50">
                                        {locale === "zh-TW" ? testimonial.zhRole : testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="md:col-span-4 flex md:flex-col gap-3 md:items-end">
                        {TESTIMONIALS_DATA.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`transition-all duration-300 ${i === activeIndex
                                    ? "w-12 h-3 bg-zodiac-gold rounded-full"
                                    : "w-3 h-3 bg-white/20 rounded-full hover:bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
