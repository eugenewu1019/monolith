"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Minus, Plus, Calendar, Clock, ShoppingBag, ArrowLeft, CreditCard, Download, Copy, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

// --- Mock Data ---
import { DESSERTS } from "@/lib/data";

// --- Components ---

function StepIndicator({ current, total }: { current: number, total: number }) {
    return (
        <div className="flex gap-2">
            {[...Array(total)].map((_, i) => (
                <div
                    key={i}
                    className={`h-1 w-8 rounded-full transition-all duration-500 ${i + 1 <= current ? "bg-zodiac-gold" : "bg-white/10"}`}
                />
            ))}
        </div>
    );
}

function DateSelector({ selected, onSelect }: { selected: string, onSelect: (d: string) => void }) {
    const dates = [...Array(14)].map((_, i) => {
        const d = new Date(2026, 4, 20 + i);
        return {
            full: d.toISOString().split("T")[0],
            day: d.getDate(),
            month: d.getMonth() + 1,
            weekday: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][d.getDay()]
        };
    });

    return (
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex gap-4 min-w-max px-1">
                {dates.map((date) => (
                    <button
                        key={date.full}
                        onClick={() => onSelect(date.full)}
                        className={`
                            relative flex flex-col items-center justify-center w-20 h-24 border rounded-sm transition-all duration-300
                            ${selected === date.full
                                ? "border-zodiac-gold bg-zodiac-gold/10 text-white"
                                : "border-white/10 text-white/50 hover:bg-white/5 hover:border-white/30"}
                        `}
                    >
                        <span className="text-[10px] tracking-widest mb-1">{date.weekday}</span>
                        <span className="text-2xl font-mono font-light">{date.month}/{date.day}</span>
                        {selected === date.full && (
                            <motion.div
                                layoutId="activeDate"
                                className="absolute inset-0 border-2 border-zodiac-gold rounded-sm"
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

function TimeGrid({ selected, onSelect }: { selected: string, onSelect: (t: string) => void }) {
    const times = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];

    return (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
            {times.map((t) => (
                <button
                    key={t}
                    onClick={() => onSelect(t)}
                    className={`
                        py-3 font-mono text-sm border rounded-sm transition-all
                        ${selected === t
                            ? "bg-white text-black border-white"
                            : "border-white/10 text-white/60 hover:border-white/40"}
                    `}
                >
                    {t}
                </button>
            ))}
        </div>
    );
}

function IndustrialStepper({
    id,
    value,
    max,
    disabled,
    onAdd,
    onRemove
}: {
    id: number,
    value: number,
    max: number,
    disabled: boolean,
    onAdd: () => void,
    onRemove: () => void
}) {
    return (
        <div className="flex items-center gap-1 border border-white/10 bg-black/50 p-1 rounded-sm w-full md:w-auto">
            <button
                onClick={onRemove}
                disabled={!value}
                className="w-8 h-8 flex items-center justify-center bg-white/5 text-white hover:bg-zodiac-gold hover:text-black disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-white transition-colors rounded-sm"
            >
                <Minus className="w-3 h-3" />
            </button>
            <div className="flex-1 md:w-8 h-8 flex items-center justify-center font-mono text-sm border-x border-white/5 bg-white/[0.02]">
                {value || 0}
            </div>
            <button
                onClick={onAdd}
                disabled={disabled || value >= max}
                className="w-8 h-8 flex items-center justify-center bg-white/5 text-white hover:bg-zodiac-gold hover:text-black disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-white transition-colors rounded-sm"
            >
                <Plus className="w-3 h-3" />
            </button>
        </div>
    );
}

function TicketReceipt({
    date,
    time,
    cart,
    totalPrice
}: {
    date: string,
    time: string,
    cart: { [key: number]: number },
    totalPrice: number
}) {
    // Deterministic ID (traceable + stable across re-renders)
    const cartKey = Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([id, qty]) => `${id}x${qty}`)
        .join("-");

    const raw = `${date}|${time}|${totalPrice}|${cartKey}`;
    const checksum = raw.split("").reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 10000, 7);

    const dateKey = date.split("-").join("").slice(2); // YYMMDD
    const timeKey = time.replace(":", ""); // HHmm
    const code = String(checksum).padStart(4, "0");

    const ticketId = `#${dateKey}-${timeKey}-${code}`;

    return (
        <div id="ticket-receipt" className="bg-white text-black p-8 rounded-sm font-mono relative overflow-hidden w-full max-w-sm mx-auto shadow-2xl rotate-1">
            {/* Perforation Top */}
            <div className="absolute top-0 left-0 w-full h-4 bg-zodiac-black -mt-2 opacity-100"
                style={{ maskImage: "radial-gradient(circle at 10px 0, transparent 6px, black 6.5px)", maskSize: "20px 10px", maskRepeat: "repeat-x" }}
            />
            {/* Perforation Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-4 bg-zodiac-black -mb-2 opacity-100"
                style={{ maskImage: "radial-gradient(circle at 10px 10px, transparent 6px, black 6.5px)", maskSize: "20px 10px", maskRepeat: "repeat-x" }}
            />

            <div className="text-center border-b border-black/10 pb-6 mb-6">
                <h2 className="font-serif text-2xl tracking-tight mb-2">MONOLITH</h2>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Pickup Confirmed</p>
            </div>

            <div className="flex justify-between text-xs mb-8">
                <div>
                    <span className="block opacity-40 uppercase">Date</span>
                    <span className="font-bold">{date}</span>
                </div>
                <div className="text-right">
                    <span className="block opacity-40 uppercase">Time</span>
                    <span className="font-bold">{time}</span>
                </div>
            </div>

            <div className="space-y-3 mb-8 text-xs border-b border-black/10 pb-6">
                {Object.entries(cart).map(([id, qty]) => {
                    const item = DESSERTS.find(d => d.id === Number(id));
                    if (!item || qty === 0) return null;
                    return (
                        <div key={id} className="flex justify-between">
                            <span>{item.name} <span className="opacity-40">x{qty}</span></span>
                            <span>${item.price * qty}</span>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between items-end mb-8">
                <span className="text-xs uppercase opacity-40">Total Amount</span>
                <span className="text-xl font-bold">NT$ {totalPrice}</span>
            </div>

            <div className="flex justify-between items-center">
                <div className="w-12 h-12 border border-black/10 flex items-center justify-center">
                    <span className="text-[8px] text-center leading-tight opacity-50">QR<br />CODE</span>
                </div>
                <div className="text-[10px] text-right opacity-40">
                    ID: {ticketId}<br />
                    AUTH: VERIFIED
                </div>
            </div>

            {/* Stamp Animation */}
            <motion.div
                initial={{ opacity: 0, scale: 2, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 12 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-red-800 rounded-full flex items-center justify-center opacity-80 mix-blend-multiply pointer-events-none"
            >
                <div className="absolute inset-0 border border-red-800 rounded-full m-1" />
                <span className="text-red-800 font-black uppercase text-xl rotate-12 -mt-2">PAID</span>
            </motion.div>
        </div>
    );
}

export default function ReservationPage() {
    const { t, locale } = useTranslation();
    const [step, setStep] = useState(1);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [cart, setCart] = useState<{ [key: number]: number }>({});

    // Payment State
    const [accountLast5, setAccountLast5] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [verifying, setVerifying] = useState(false);

    // Formatting for display
    const formattedDate = date;

    const addToCart = (id: number) => {
        const item = DESSERTS.find(d => d.id === id);
        if (item && item.stock > 0 && (!cart[id] || cart[id] < item.stock)) {
            setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
        }
    };

    const removeFromCart = (id: number) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[id] > 0) newCart[id]--;
            return newCart;
        });
    };

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = Object.entries(cart).reduce((total, [id, qty]) => {
        const item = DESSERTS.find((d) => d.id === Number(id));
        return total + (item ? item.price * qty : 0);
    }, 0);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handlePaymentSubmit = () => {
        if (!accountLast5 || !transferAmount) return;
        setVerifying(true);
        // Simulate API check delay
        setTimeout(() => {
            setVerifying(false);
            setStep(4);
        }, 1500);
    };

    const handleDownload = () => {
        alert("Image download functionality would be implemented here (e.g., using html2canvas).");
    };

    return (
        <main className="min-h-screen bg-zodiac-black text-white flex flex-col relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_40%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a0a0a,transparent)] pointer-events-none h-32" />

            {/* Main Content Container - Expanded for 3-col grid */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-6 pt-24 min-h-screen">
                <motion.div
                    layout
                    className="w-full max-w-6xl bg-[#111] border border-white/5 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-sm flex flex-col lg:flex-row min-h-[600px] max-h-[90vh]"
                >
                    {/* Left Panel: Navigation & Context (Sticky on Desktop) */}
                    <div className="w-full lg:w-[280px] p-6 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.02] flex flex-col justify-between relative shrink-0">
                        <div>
                            <div className="mb-6 md:mb-8">
                                <h1 className="text-2xl font-serif mb-2">Pickup Service</h1>
                                <p className="text-zodiac-gold text-xs font-mono tracking-widest uppercase">Digital Concierge / 預約取貨</p>
                            </div>

                            <div className="space-y-4 hidden lg:block">
                                <div className={`transition-opacity duration-300 ${step >= 1 ? "opacity-100" : "opacity-30"}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Calendar className="w-4 h-4 text-zodiac-gold" />
                                        <span className="text-[10px] uppercase tracking-widest">{t("reservation.step1")}</span>
                                    </div>
                                    {date && time && step > 1 && (
                                        <p className="pl-7 text-xs opacity-60 font-mono">{date} <br /> {time}</p>
                                    )}
                                </div>

                                <div className={`transition-opacity duration-300 ${step >= 2 ? "opacity-100" : "opacity-30"}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <ShoppingBag className="w-4 h-4 text-zodiac-gold" />
                                        <span className="text-[10px] uppercase tracking-widest">{t("reservation.step2")}</span>
                                    </div>
                                    {totalItems > 0 && step > 2 && (
                                        <p className="pl-7 text-xs opacity-60 font-mono">{totalItems} Items <br /> NT$ {totalPrice}</p>
                                    )}
                                </div>

                                <div className={`transition-opacity duration-300 ${step >= 3 ? "opacity-100" : "opacity-30"}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <CreditCard className="w-4 h-4 text-zodiac-gold" />
                                        <span className="text-[10px] uppercase tracking-widest">{t("reservation.step3")}</span>
                                    </div>
                                </div>

                                <div className={`transition-opacity duration-300 ${step >= 4 ? "opacity-100" : "opacity-30"}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Check className="w-4 h-4 text-zodiac-gold" />
                                        <span className="text-[10px] uppercase tracking-widest">{t("reservation.step4")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 lg:mt-0">
                            <StepIndicator current={step} total={4} />
                        </div>
                    </div>

                    {/* Right Panel: Active Step Content */}
                    <div className="flex-1 p-6 lg:p-10 relative bg-zodiac-black/50 overflow-y-auto custom-scrollbar">
                        <AnimatePresence mode="wait">
                            {/* STEP 1: Date & Time */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="min-h-full flex flex-col"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-xl font-serif mb-6">{t("reservation.dateLabel")}</h2>
                                        <DateSelector selected={date} onSelect={setDate} />
                                    </div>

                                    <div className="mb-8 flex-1">
                                        <h2 className="text-xl font-serif mb-6">{t("reservation.timeLabel")}</h2>
                                        <TimeGrid selected={time} onSelect={setTime} />
                                    </div>

                                    <div className="flex justify-end pt-6 border-t border-white/5 mt-auto">
                                        <button
                                            onClick={handleNext}
                                            disabled={!date || !time}
                                            className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zodiac-gold hover:text-white transition-all font-mono text-sm uppercase tracking-wider"
                                        >
                                            {t("reservation.continue")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: Selection (3-Column Grid) */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="h-full flex flex-col overflow-hidden"
                                >
                                    <h2 className="text-xl font-serif mb-6 shrink-0">{t("reservation.curate")}</h2>

                                    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar -mr-4 pr-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 pt-2 px-1">
                                            {DESSERTS.map(item => {
                                                const isSoldOut = item.stock <= 0;
                                                const isLowStock = item.stock > 0 && item.stock < 5;

                                                return (
                                                    <div key={item.id} className={`group flex flex-col border border-white/5 bg-white/[0.02] rounded-sm overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl ${isSoldOut ? 'opacity-50 grayscale' : ''}`}>
                                                        {/* Image Area */}
                                                        <div className="aspect-[4/3] w-full relative">
                                                            <Image src={getAssetPath(item.image)} alt={item.name} fill className="object-cover" />
                                                        </div>

                                                        {/* Info Area */}
                                                        <div className="p-4 flex flex-col gap-3 flex-1 min-h-[160px]">
                                                            <div>
                                                                {/* Status Badges - Moved out of image */}
                                                                <div className="flex gap-2 mb-2">
                                                                    {isSoldOut ? (
                                                                        <span className="text-[10px] font-mono uppercase bg-neutral-800 text-white px-2 py-0.5 rounded-sm shrink-0">{t("reservation.soldOut")}</span>
                                                                    ) : isLowStock ? (
                                                                        <span className="text-[10px] font-mono uppercase text-amber-500 flex items-center gap-1 shrink-0">
                                                                            <AlertCircle className="w-3 h-3" /> {t("reservation.onlyLeft")} {item.stock}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-[10px] font-mono uppercase text-white/30 shrink-0">{t("reservation.inStock")}</span>
                                                                    )}
                                                                </div>

                                                                <h3 className="font-serif text-lg leading-tight mb-1">{item.name}</h3>
                                                                <p className="text-xs font-mono text-zodiac-gold">NT$ {item.price}</p>
                                                            </div>

                                                            {/* Quantity Control - Industrial Stepper */}
                                                            <div className="mt-auto pt-2 w-full">
                                                                <IndustrialStepper
                                                                    id={item.id}
                                                                    value={cart[item.id] || 0}
                                                                    max={item.stock}
                                                                    disabled={isSoldOut}
                                                                    onAdd={() => addToCart(item.id)}
                                                                    onRemove={() => removeFromCart(item.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-6 mt-6 border-t border-white/5 shrink-0">
                                        <button onClick={handleBack} className="text-sm opacity-50 hover:opacity-100 uppercase tracking-wider flex items-center gap-2">
                                            <ArrowLeft className="w-4 h-4" /> {t("reservation.back")}
                                        </button>
                                        <div className="flex items-center gap-6">
                                            <span className="font-mono text-lg text-zodiac-gold">NT$ {totalPrice}</span>
                                            <button
                                                onClick={handleNext}
                                                disabled={totalItems === 0}
                                                className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zodiac-gold hover:text-white transition-all font-mono text-sm uppercase tracking-wider"
                                            >
                                                {t("reservation.payment")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: Payment (Bank Transfer) */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="h-full flex flex-col"
                                >
                                    <h2 className="text-xl font-serif mb-6">{t("reservation.paymentVerification")}</h2>

                                    <div className="bg-white/5 border border-white/10 p-6 rounded-sm mb-8 space-y-4">
                                        <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 mb-2">
                                            <AlertCircle className="w-4 h-4" /> {t("reservation.transferInstructions")}
                                        </div>
                                        <p className="text-sm opacity-80 leading-relaxed">
                                            {t("reservation.transferNote")}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                            <div className="bg-black/50 p-4 border border-white/10 rounded-sm group relative cursor-pointer active:scale-95 transition-transform" onClick={() => navigator.clipboard.writeText("808")}>
                                                <span className="text-[10px] uppercase opacity-50 block mb-1">{t("reservation.bankCode")}</span>
                                                <span className="font-mono text-lg text-white">808 (Monolith Bank)</span>
                                                <Copy className="absolute top-4 right-4 w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                            </div>
                                            <div className="bg-black/50 p-4 border border-white/10 rounded-sm group relative cursor-pointer active:scale-95 transition-transform" onClick={() => navigator.clipboard.writeText("1234-5678-9012")}>
                                                <span className="text-[10px] uppercase opacity-50 block mb-1">{t("reservation.accountNumber")}</span>
                                                <span className="font-mono text-lg text-white">1234-5678-9012</span>
                                                <Copy className="absolute top-4 right-4 w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center bg-zodiac-gold/10 p-4 border border-zodiac-gold/30 rounded-sm">
                                            <span className="text-xs uppercase tracking-widest text-zodiac-gold">{t("reservation.totalAmount")}</span>
                                            <span className="font-mono text-2xl text-zodiac-gold font-bold">NT$ {totalPrice}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-sm font-mono uppercase opacity-70 border-b border-white/10 pb-2">{t("reservation.verificationDetails")}</h3>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase opacity-50">{t("reservation.accountLast5")}</label>
                                                <input
                                                    type="text"
                                                    value={accountLast5}
                                                    onChange={(e) => setAccountLast5(e.target.value)}
                                                    maxLength={5}
                                                    placeholder={locale === "zh-TW" ? "例: 12345" : "e.g. 12345"}
                                                    className="w-full bg-transparent border-b border-white/20 py-2 focus:border-zodiac-gold outline-none transition-colors font-mono text-lg"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase opacity-50">{t("reservation.transferredAmount")}</label>
                                                <input
                                                    type="number"
                                                    value={transferAmount}
                                                    onChange={(e) => setTransferAmount(e.target.value)}
                                                    placeholder="NT$"
                                                    className="w-full bg-transparent border-b border-white/20 py-2 focus:border-zodiac-gold outline-none transition-colors font-mono text-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-6 mt-auto border-t border-white/5 shrink-0">
                                        <button onClick={handleBack} className="text-sm opacity-50 hover:opacity-100 uppercase tracking-wider flex items-center gap-2">
                                            <ArrowLeft className="w-4 h-4" /> {t("reservation.back")}
                                        </button>
                                        <button
                                            onClick={handlePaymentSubmit}
                                            disabled={!accountLast5 || !transferAmount || verifying}
                                            className="group flex items-center gap-3 bg-zodiac-gold text-black px-6 py-3 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-all font-mono text-sm uppercase tracking-wider min-w-[160px] justify-center"
                                        >
                                            {verifying ? (
                                                <span className="animate-pulse">{t("reservation.verifying")}</span>
                                            ) : (
                                                <>{t("reservation.confirmPayment")} <Check className="w-4 h-4" /></>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: Confirmation (Ticket) */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="h-full flex flex-col items-center justify-center py-8"
                                >
                                    <div className="relative group">
                                        <TicketReceipt date={date} time={time} cart={cart} totalPrice={totalPrice} />
                                        <button
                                            onClick={handleDownload}
                                            className="absolute -right-16 top-0 p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-lg hidden group-hover:flex items-center justify-center tooltip-trigger"
                                            title="Download Ticket"
                                        >
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="mt-12 text-center space-y-6">
                                        <div className="flex gap-4 justify-center">
                                            <button
                                                onClick={handleDownload}
                                                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-colors uppercase text-xs tracking-widest"
                                            >
                                                <Download className="w-4 h-4" /> {t("reservation.saveTicket")}
                                            </button>
                                            <Link
                                                href="/"
                                                className="flex items-center gap-2 px-6 py-3 bg-zodiac-gold text-black rounded-sm hover:bg-white transition-colors uppercase text-xs tracking-widest font-bold"
                                            >
                                                {t("reservation.backToHome")}
                                            </Link>
                                        </div>
                                        <p className="text-xs opacity-30 font-mono">
                                            {locale === "zh-TW" ? "訂單已完成" : "ORDER COMPLETED"}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
