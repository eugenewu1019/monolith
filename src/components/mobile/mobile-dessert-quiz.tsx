"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";
import { DESSERTS } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

// Map result keys to Dessert IDs from data.ts
// Note: Ensure these names match data.ts
const RECOMMENDATION_MAP: { [key: string]: string } = {
    "calm-rich-stoic": "Obsidian Tart",
    "bright-floral-elegant": "Nebula Eclair",
    "calm-floral-elegant": "Lunar Mousse",
    "indulgent-rich-stoic": "Concrete Matcha",
    "indulgent-caramel-bold": "Amber Saint",
    "bright-caramel-bold": "Eclipse Macaron",
    "default": "Lunar Mousse",
};

function getRecommendationResult(answers: string[]) {
    const key = answers.join("-");
    const dessertName = RECOMMENDATION_MAP[key] || RECOMMENDATION_MAP["default"];
    return DESSERTS.find(d => d.name === dessertName) || DESSERTS[0];
}

// Modal component using Portal
function QuizModal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black/95 flex flex-col"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}

export default function MobileDessertQuiz() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<typeof DESSERTS[0] | null>(null);

    const QUESTIONS = [
        {
            id: 1,
            question: t("quiz.question1"),
            options: [
                { text: t("quiz.opt1_1"), value: "calm", emoji: "🌙" },
                { text: t("quiz.opt1_2"), value: "bright", emoji: "☀️" },
                { text: t("quiz.opt1_3"), value: "indulgent", emoji: "✨" },
            ],
        },
        {
            id: 2,
            question: t("quiz.question2"),
            options: [
                { text: t("quiz.opt2_1"), value: "rich", emoji: "🍫" },
                { text: t("quiz.opt2_2"), value: "floral", emoji: "🌸" },
                { text: t("quiz.opt2_3"), value: "caramel", emoji: "🍯" },
            ],
        },
        {
            id: 3,
            question: t("quiz.question3"),
            options: [
                { text: t("quiz.opt3_1"), value: "stoic", emoji: "🪨" },
                { text: t("quiz.opt3_2"), value: "elegant", emoji: "🌹" },
                { text: t("quiz.opt3_3"), value: "bold", emoji: "⚡" },
            ],
        },
    ];


    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate result with a slight delay for drama
            setTimeout(() => {
                setResult(getRecommendationResult(newAnswers));
            }, 500);
        }
    };

    const reset = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setResult(null);
    };

    const close = () => {
        setIsOpen(false);
        setTimeout(reset, 300);
    };

    return (
        <>
            {/* Entry Point */}
            <div
                onClick={() => setIsOpen(true)}
                className="w-full relative rounded-2xl overflow-hidden bg-gradient-to-r from-zodiac-gold/20 via-[#1a1a1a] to-zodiac-charcoal border border-zodiac-gold/30 p-5 flex items-center justify-between cursor-pointer group"
            >
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-zodiac-gold" />
                        <p className="text-[10px] font-mono uppercase tracking-widest text-zodiac-gold">AI Sommelier</p>
                    </div>
                    <h3 className="text-xl font-serif text-white leading-none mb-1">{t("quiz.cardTitle")}</h3>
                    <p className="text-[10px] text-white/60">{t("quiz.cardDesc")}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-zodiac-gold font-bold uppercase tracking-wider bg-black/20 px-4 py-2 rounded-lg border border-white/5 group-hover:bg-zodiac-gold group-hover:text-black transition-all">
                    <span>{t("quiz.startQuizButton")}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>

            {/* Quiz Full Screen Modal */}
            <QuizModal isOpen={isOpen} onClose={close}>
                {/* Close Button */}
                <button
                    onClick={close}
                    className="absolute top-6 right-6 z-10 p-2 bg-white/10 rounded-full text-white/80 hover:bg-white/20 transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex-1 flex flex-col justify-center px-8 relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zodiac-gold/5 via-transparent to-transparent pointer-events-none" />

                    {!result ? (
                        <div className="relative z-10 max-w-sm mx-auto w-full">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <p className="text-xs uppercase tracking-widest text-zodiac-gold/80 mb-3">
                                    Question {currentQuestion + 1} / {QUESTIONS.length}
                                </p>
                                <h2 className="text-2xl font-serif text-white leading-tight">
                                    {QUESTIONS[currentQuestion].question}
                                </h2>
                            </div>

                            {/* Options */}
                            <div className="space-y-4">
                                {QUESTIONS[currentQuestion].options.map((opt, idx) => (
                                    <motion.button
                                        key={opt.value}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="w-full p-5 rounded-xl border border-white/10 bg-white/5 active:bg-zodiac-gold/20 active:border-zodiac-gold/50 transition-all flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl">{opt.emoji}</span>
                                            <span className="text-base text-white/90 font-zh-serif">{opt.text}</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-white/30 group-active:text-zodiac-gold transition-colors" />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Result View */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative z-10 w-full max-w-sm mx-auto flex flex-col h-full py-12"
                        >
                            <div className="flex-1 flex flex-col justify-center items-center text-center">
                                <p className="text-xs uppercase tracking-widest text-zodiac-gold/80 mb-6">
                                    {t("quiz.perfectMatch")}
                                </p>

                                <div className="aspect-square w-64 relative rounded-full overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(160,128,96,0.1)] mb-8">
                                    <Image
                                        src={getAssetPath(result.image)}
                                        alt={result.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <h2 className="text-3xl font-serif text-white mb-2">{result.name}</h2>
                                <p className="text-xl font-zh-serif text-white/50 mb-6">{result.zhName}</p>

                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative mb-8">
                                    <p className="text-sm text-white/70 italic font-zh-serif leading-relaxed">
                                        &quot;{result.chefNote || result.description}&quot;
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 space-y-3">
                                <Link href={`/mobile/reservation?preselect=${result.id}`} className="block w-full">
                                    <button className="w-full bg-zodiac-gold text-black py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                        {t("quiz.reserveThis")}
                                    </button>
                                </Link>

                                <button
                                    onClick={reset}
                                    className="w-full py-4 rounded-xl border border-white/10 text-white/40 text-xs uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    <span>{t("quiz.restartQuiz")}</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </QuizModal>
        </>
    );
}
