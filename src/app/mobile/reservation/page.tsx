"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ChevronRight, ChevronLeft, CreditCard, ShoppingBag, Check } from "lucide-react";
import { cn, getAssetPath } from "@/lib/utils";
import Image from "next/image";
import { DESSERTS } from "@/lib/data";
import { useTranslation, useLocale } from "@/lib/i18n";

// Mock Time Slots
const TIME_SLOTS = ["13:00", "14:30", "16:00", "17:30", "19:00"];

function ReservationContent() {
    const { t } = useTranslation();
    const { locale } = useLocale();
    const searchParams = useSearchParams();
    const preselectId = searchParams.get("preselect");

    const [step, setStep] = useState(1);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [cart, setCart] = useState<{ [id: number]: number }>({});

    useEffect(() => {
        if (preselectId) {
            const id = parseInt(preselectId);
            if (!isNaN(id)) {
                setCart((prev: { [id: number]: number }) => ({ ...prev, [id]: 1 }));
            }
        }
    }, [preselectId]);

    // Simple Date Generator (Next 7 days)
    const dates = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return d;
    });

    const addToCart = (id: number) => {
        setCart((prev: { [id: number]: number }) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const removeFromCart = (id: number) => {
        setCart((prev: { [id: number]: number }) => {
            const newCount = (prev[id] || 0) - 1;
            if (newCount <= 0) {
                const { [id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [id]: newCount };
        });
    };

    const totalItems = Object.values(cart).reduce((a: number, b: number) => a + b, 0);
    const totalPrice = Object.entries(cart).reduce((total: number, [id, count]: [string, number]) => {
        const item = DESSERTS.find(d => d.id === Number(id));
        return total + (item ? item.price * count : 0);
    }, 0);

    return (
        <div className="px-5 py-6 space-y-8 min-h-screen pb-32">
            {/* Header - Standardized */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-zodiac-gold text-xs font-mono uppercase tracking-widest mb-1">{t("common.welcome")}</h2>
                    <h1 className="text-3xl font-serif leading-none">{t("common.brand")}</h1>
                </div>
            </div>

            {/* Step Indicator */}
            <div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">Step 0{step} / 03</span>
                <h2 className="text-xl font-serif mt-1">
                    {step === 1 && t("reservation.step1")}
                    {step === 2 && t("reservation.step2")}
                    {step === 3 && t("reservation.step3")}
                </h2>
            </div>

            <AnimatePresence mode="wait">
                {/* Step 1: Date & Time */}
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                        {/* Date Horizontal Scroll */}
                        <div className="space-y-3">
                            <label className="text-xs uppercase tracking-widest text-white/50 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> {t("reservation.dateLabel")}
                            </label>
                            <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 custom-scrollbar-none">
                                {dates.map((d, i) => {
                                    const isSelected = date?.getDate() === d.getDate();
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setDate(d)}
                                            className={cn(
                                                "flex-shrink-0 w-20 h-24 rounded-2xl border flex flex-col items-center justify-center transition-all",
                                                isSelected
                                                    ? "bg-zodiac-gold border-zodiac-gold text-black"
                                                    : "bg-[#111] border-white/10 text-white/50 hover:border-white/30"
                                            )}
                                        >
                                            <span className="text-xs font-mono uppercase">{d.toLocaleDateString(locale === "zh-TW" ? 'zh-TW' : 'en-US', { weekday: 'short' })}</span>
                                            <span className="text-2xl font-serif mt-1">{d.getMonth() + 1}/{d.getDate()}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Time Grid */}
                        <div className="space-y-3">
                            <label className="text-xs uppercase tracking-widest text-white/50 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> {t("reservation.timeLabel")}
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {TIME_SLOTS.map((t) => {
                                    const isSelected = time === t;
                                    return (
                                        <button
                                            key={t}
                                            onClick={() => setTime(t)}
                                            className={cn(
                                                "py-3 rounded-xl border text-sm font-mono transition-all",
                                                isSelected
                                                    ? "bg-white text-black border-white"
                                                    : "bg-[#111] border-white/10 text-white/60 hover:bg-white/5"
                                            )}
                                        >
                                            {t}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Selection (Carousel) */}
                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        {/* Summary Bar */}
                        <div className="flex justify-between items-center bg-[#111] p-4 rounded-xl border border-white/5">
                            <div>
                                <span className="block text-xs text-white/40 uppercase">{t("reservation.reservationFor")}</span>
                                <span className="font-serif text-zodiac-gold">
                                    {date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} @ {time}
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs text-white/40 uppercase">{t("reservation.total")}</span>
                                <span className="font-mono">NT$ {totalPrice}</span>
                            </div>
                        </div>

                        {/* Horizontal Snap Carousel */}
                        <div className="flex gap-4 overflow-x-auto pb-8 -mx-5 px-5 snap-x snap-mandatory custom-scrollbar-none">
                            {DESSERTS.map((item) => {
                                const count = cart[item.id] || 0;
                                return (
                                    <div key={item.id} className="snap-center flex-shrink-0 w-[80vw] bg-[#111] rounded-3xl border border-white/10 overflow-hidden flex flex-col">
                                        <div className="aspect-[4/3] relative">
                                            <Image src={getAssetPath(item.image)} alt={item.name} fill className="object-cover" />
                                            {item.stock <= 0 && <div className="absolute inset-0 bg-black/60 flex items-center justify-center font-mono uppercase tracking-widest">{t("menu.soldOut")}</div>}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="font-serif text-2xl mb-1">{locale === "zh-TW" ? item.zhName : item.name}</h3>
                                            <p className="font-mono text-zodiac-gold text-sm mb-4">NT$ {item.price}</p>
                                            <p className="text-white/40 text-sm line-clamp-3 mb-6">
                                                {locale === "zh-TW" ? item.zhDescription : (item.description || "A masterpiece of structure and flavor.")}
                                            </p>

                                            <div className="mt-auto flex items-center justify-between bg-white/5 rounded-full p-2">
                                                <button
                                                    disabled={count === 0}
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:bg-white/20 disabled:opacity-30"
                                                >
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>
                                                <span className="font-mono text-xl w-8 text-center">{count}</span>
                                                <button
                                                    disabled={item.stock <= 0 || item.stock <= count}
                                                    onClick={() => addToCart(item.id)}
                                                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center active:bg-white/90 disabled:bg-white/20 disabled:text-white"
                                                >
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        {/* Ticket/Receipt Style Card */}
                        <div className="bg-white text-black rounded-2xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
                            {/* Decorative holes */}
                            <div className="absolute top-1/2 left-0 w-4 h-8 bg-[#0a0a0a] rounded-r-full -translate-y-1/2" />
                            <div className="absolute top-1/2 right-0 w-4 h-8 bg-[#0a0a0a] rounded-l-full -translate-y-1/2" />
                            <div className="border-b-2 border-dashed border-black/10 absolute top-1/2 left-4 right-4 -translate-y-1/2" />

                            {/* Top Half */}
                            <div className="space-y-4 pb-4">
                                <div className="text-center">
                                    <h3 className="uppercase tracking-[0.2em] text-xs opacity-50 mb-2">{t("reservation.ticketTitle")}</h3>
                                    <h2 className="font-serif text-3xl">{t("common.brand")}</h2>
                                </div>
                                <div className="flex justify-between items-end border-b border-black/10 pb-4">
                                    <div>
                                        <span className="block text-[10px] uppercase opacity-50">{t("reservation.date")}</span>
                                        <span className="font-mono text-lg">{date?.toLocaleDateString()}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-[10px] uppercase opacity-50">{t("reservation.time")}</span>
                                        <span className="font-mono text-lg">{time}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Half */}
                            <div className="pt-4 space-y-2">
                                {Object.entries(cart).map(([id, count]: [string, number]) => {
                                    const item = DESSERTS.find(d => d.id === Number(id));
                                    if (!item) return null;
                                    return (
                                        <div key={id} className="flex justify-between text-sm">
                                            <span>{locale === "zh-TW" ? item.zhName : item.name} <span className="opacity-50">x{count}</span></span>
                                            <span className="font-mono">NT$ {item.price * count}</span>
                                        </div>
                                    );
                                })}
                                <div className="flex justify-between border-t border-black/10 pt-4 mt-4 font-bold">
                                    <span>{t("reservation.total")}</span>
                                    <span className="font-mono">NT$ {totalPrice}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full bg-black text-white h-14 rounded-xl flex items-center justify-center gap-2 font-bold active:scale-95 transition-transform">
                                <span className="text-xl"></span> {t("reservation.payApple")}
                            </button>
                            <button className="w-full bg-[#1c1c1e] text-white/50 h-14 rounded-xl flex items-center justify-center gap-2 font-medium text-sm active:scale-95 transition-transform">
                                {t("reservation.payCredit")}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation Buttons (FABs) */}
            <div className="fixed bottom-24 right-5 left-5 z-40 flex justify-between pointer-events-none">
                {step > 1 && (
                    <button
                        className="h-16 w-16 bg-[#1c1c1e] border border-white/10 rounded-full flex items-center justify-center text-white pointer-events-auto shadow-lg active:scale-95 transition-transform"
                        onClick={() => setStep(prev => prev - 1)}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}

                {step < 3 && (
                    <button
                        disabled={(step === 1 && (!date || !time)) || (step === 2 && totalItems === 0)}
                        className="h-16 w-16 bg-zodiac-gold rounded-full flex items-center justify-center text-black shadow-lg shadow-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto ml-auto transition-all active:scale-95"
                        onClick={() => setStep(prev => prev + 1)}
                    >
                        {step === 2 ? <Check className="w-6 h-6" /> : <ChevronRight className="w-8 h-8" />}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function MobileReservationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <ReservationContent />
        </Suspense>
    );
}
