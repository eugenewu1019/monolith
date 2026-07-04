"use client";

import { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, RotateCcw } from "lucide-react";
import { createPortal } from "react-dom";
import { useTranslation, useLocale } from "@/lib/i18n";

const QUESTIONS = [
  {
    id: 1,
    questionKey: "quiz.question1",
    options: [
      { textKey: "quiz.opt1_1", value: "calm", emoji: "🌙" },
      { textKey: "quiz.opt1_2", value: "bright", emoji: "☀️" },
      { textKey: "quiz.opt1_3", value: "indulgent", emoji: "✨" },
    ],
  },
  {
    id: 2,
    questionKey: "quiz.question2",
    options: [
      { textKey: "quiz.opt2_1", value: "rich", emoji: "🍫" },
      { textKey: "quiz.opt2_2", value: "floral", emoji: "🌸" },
      { textKey: "quiz.opt2_3", value: "caramel", emoji: "🍯" },
    ],
  },
  {
    id: 3,
    questionKey: "quiz.question3",
    options: [
      { textKey: "quiz.opt3_1", value: "stoic", emoji: "🪨" },
      { textKey: "quiz.opt3_2", value: "elegant", emoji: "🌹" },
      { textKey: "quiz.opt3_3", value: "bold", emoji: "⚡" },
    ],
  },
];

const CHEF_RECOMMENDATIONS: {
  [key: string]: { name: string; zhName: string; note: string; zhNote: string };
} = {
  "calm-rich-stoic": {
    name: "Obsidian Tart",
    zhName: "黑曜石塔",
    note: "One of my favorites. Rich cocoa and sea salt are perfect for moments of reflection.",
    zhNote: "這款是我最愛的作品之一，厚實的可可與海鹽很適合需要沉澱的時刻。",
  },
  "bright-floral-elegant": {
    name: "Nebula Eclair",
    zhName: "星雲閃電",
    note: "A combination of violet and blackberry, my tribute to those who love floral notes.",
    zhNote: "紫羅蘭與黑莓的組合，是我獻給喜歡花香調客人的心意。",
  },
  "calm-floral-elegant": {
    name: "Lunar Mousse",
    zhName: "月相慕斯",
    note: "The lightness of Earl Grey and lychee—many guests say it lifts their spirits.",
    zhNote: "伯爵茶與荔枝的輕盈，很多客人說吃完心情都變好了。",
  },
  "indulgent-rich-stoic": {
    name: "Concrete Matcha",
    zhName: "水泥抹茶",
    note: "If you appreciate the bitterness of matcha, this will not disappoint.",
    zhNote: "如果你喜歡抹茶的苦韻，這款絕對不會讓你失望。",
  },
  "indulgent-caramel-bold": {
    name: "Amber Saint",
    zhName: "琥珀聖道",
    note: "Whiskey caramel is my personal recommendation—a sophisticated, tipsy flavor.",
    zhNote: "威士忌焦糖是我的私心推薦，微醺的大人味。",
  },
  "bright-caramel-bold": {
    name: "Eclipse Macaron",
    zhName: "蝕日馬卡龍",
    note: "The salted egg yolk twist is a surprising favorite for many.",
    zhNote: "鹹蛋黃的創意，是很多客人的驚喜首選。",
  },
  default: {
    name: "Lunar Mousse",
    zhName: "月相慕斯",
    note: "Our most popular item. Highly recommended for first-time visitors.",
    zhNote: "這是我店裡最受歡迎的品項，第一次來的話很推薦試試。",
  },
};

type DessertQuizProps = {
  isActive?: boolean;
  openSignal?: number;
  onRequestOpen?: () => void;
  prefersReducedMotion?: boolean;
};

function getRecommendation(answers: string[]): {
  name: string;
  zhName: string;
  note: string;
  zhNote: string;
} {
  const key = answers.join("-");
  return CHEF_RECOMMENDATIONS[key] || CHEF_RECOMMENDATIONS["default"];
}

// Modal component using Portal
function QuizModal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Chef selection quiz"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-8"
          onClick={onClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default function DessertQuiz({
  isActive = false,
  openSignal = 0,
  onRequestOpen,
  prefersReducedMotion = false,
}: DessertQuizProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<{
    name: string;
    zhName: string;
    note: string;
    zhNote: string;
  } | null>(null);
  const { t } = useTranslation();
  const { locale } = useLocale();

  useEffect(() => {
    if (openSignal > 0) {
      setIsOpen(true);
    }
  }, [openSignal]);

  const requestOpen = () => {
    if (onRequestOpen) {
      onRequestOpen();
      return;
    }

    setIsOpen(true);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setResult(getRecommendation(newAnswers));
    }
  };

  const reset = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(reset, 300);
  }, [reset]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [close, isOpen]);

  return (
    <>
      {/* Subtle Easter Egg Card - Same height as dessert cards */}
      <motion.button
        type="button"
        onClick={requestOpen}
        aria-label={t("quiz.letChefChoose")}
        className="group relative h-[60vh] w-[40vh] min-w-[320px] flex-shrink-0 cursor-pointer overflow-hidden border border-dashed border-white/20 bg-black/20 text-center transition-all duration-500 hover:border-zodiac-gold/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zodiac-gold"
        animate={{
          y: isActive && !prefersReducedMotion ? -18 : 0,
          scale: isActive && !prefersReducedMotion ? 1.04 : 1,
          rotateY: isActive || prefersReducedMotion ? 0 : -8,
          opacity: isActive ? 1 : 0.82,
        }}
        whileHover={
          prefersReducedMotion ? undefined : { y: -10, rotateY: 0, scale: 1.02 }
        }
        transition={{ duration: prefersReducedMotion ? 0 : 0.38 }}
        style={{
          transformStyle: "preserve-3d",
          zIndex: isActive ? 34 : 12,
        }}
      >
        {/* Subtle Pulse Animation */}
        <motion.div
          className="absolute inset-0 bg-zodiac-gold/5"
          animate={
            prefersReducedMotion ? { opacity: 0.08 } : { opacity: [0, 0.1, 0] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <p className="text-xs uppercase tracking-widest text-white/30 mb-4">
            {t("quiz.secretMenu")}
          </p>
          <p className="text-lg font-serif text-white/60 mb-2">
            {t("quiz.stillHesitating")}
          </p>
          <p className="text-sm text-white/40 font-zh-serif mb-6">
            {t("quiz.letChefChoose")}
          </p>
          <div className="w-8 h-px bg-white/20 group-hover:bg-zodiac-gold/50 transition-colors" />
        </div>
      </motion.button>

      {/* Quiz Modal - Using Portal to escape overflow:hidden */}
      <QuizModal isOpen={isOpen} onClose={close}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-lg w-full bg-zodiac-charcoal border border-white/10 p-8 md:p-12"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!result ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <p className="text-xs uppercase tracking-widest text-zodiac-gold/60 mb-2">
                  {t("quiz.chefSelection")}
                </p>
                <h2 className="text-2xl font-serif text-white">
                  {t("quiz.letMeHelp")}
                </h2>
              </div>

              {/* Progress */}
              <div className="flex gap-2 justify-center mb-8">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-px transition-colors ${
                      i <= currentQuestion ? "bg-zodiac-gold" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <h3 className="text-lg text-white/80 mb-8 font-zh-serif">
                  {t(QUESTIONS[currentQuestion].questionKey)}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {QUESTIONS[currentQuestion].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="w-full p-4 border border-white/10 hover:border-zodiac-gold/50 hover:bg-white/5 transition-all flex items-center justify-between group"
                    >
                      <span className="text-lg">{opt.emoji}</span>
                      <span className="text-white/70 font-zh-serif">
                        {t(opt.textKey)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zodiac-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          ) : (
            /* Result - Chef's Personal Note */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <p className="text-xs uppercase tracking-widest text-zodiac-gold/60 mb-6">
                {t("quiz.chefRecommend")}
              </p>
              <h2 className="text-3xl font-serif text-white mb-2">
                {locale === "zh-TW" ? result.zhName : result.name}
              </h2>
              <p className="text-lg font-zh-serif text-white/50 mb-8">
                {locale === "zh-TW" ? result.name : result.zhName}
              </p>

              <div className="h-px w-16 bg-white/10 mx-auto mb-8" />

              {/* Chef's Personal Note */}
              <div className="bg-white/5 border-l-2 border-zodiac-gold/50 p-6 text-left mb-8">
                <p className="text-sm text-white/60 italic font-zh-serif leading-relaxed">
                  {t("quiz.resultNote", {
                    note: locale === "zh-TW" ? result.zhNote : result.note,
                  })}
                </p>
                <p className="text-xs text-white/30 mt-4">
                  {t("quiz.chefRenzo")}
                </p>
              </div>

              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-zodiac-gold/50 transition-colors text-sm text-white/60 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t("quiz.tryAgain")}</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </QuizModal>
    </>
  );
}
