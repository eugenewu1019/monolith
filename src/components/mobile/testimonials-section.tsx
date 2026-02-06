"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/lib/testimonials-data";
import { useLocale } from "@/lib/i18n";

export default function MobileTestimonialsSection() {
    const { locale } = useLocale();
    const [activeIndex, setActiveIndex] = useState(0);

    const goNext = () => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    const goPrev = () => setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);

    useEffect(() => {
        const interval = setInterval(goNext, 6000);
        return () => clearInterval(interval);
    }, []);

    const testimonial = TESTIMONIALS_DATA[activeIndex];

    return (
        <section className="px-5 py-12 border-t border-white/5">
            {/* Header */}
            <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zodiac-gold block mb-2">
                    {locale === "zh-TW" ? "顧客評價" : "Testimonials"}
                </span>
                <h2 className="text-2xl font-serif">
                    {locale === "zh-TW" ? "他們這樣說" : "What They Say"}
                </h2>
            </div>

            {/* Carousel */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-4"
                    >
                        {/* Stars */}
                        <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-zodiac-gold text-zodiac-gold" />
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-base font-serif leading-relaxed text-white/90 font-zh-serif">
                            "{locale === "zh-TW" ? testimonial.zhContent : testimonial.content}"
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                            <div className="w-10 h-10 rounded-full bg-zodiac-gold/20 flex items-center justify-center text-zodiac-gold font-serif text-sm">
                                {(locale === "zh-TW" ? testimonial.zhName : testimonial.name).charAt(0)}
                            </div>
                            <div>
                                <p className="font-serif text-sm text-white">
                                    {locale === "zh-TW" ? testimonial.zhName : testimonial.name}
                                </p>
                                <p className="text-[10px] text-white/50">
                                    {locale === "zh-TW" ? testimonial.zhRole : testimonial.role}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                        {TESTIMONIALS_DATA.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`transition-all duration-300 rounded-full ${i === activeIndex
                                        ? "w-6 h-2 bg-zodiac-gold"
                                        : "w-2 h-2 bg-white/20"
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={goPrev}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 active:bg-white/10"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={goNext}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 active:bg-white/10"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
