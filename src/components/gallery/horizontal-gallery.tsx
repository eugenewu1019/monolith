"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { X, ChefHat, Wine, Activity } from "lucide-react";
import DessertQuiz from "./dessert-quiz";
import { getAssetPath } from "@/lib/utils";
import { useTranslation, useLocale } from "@/lib/i18n";
import { DESSERTS } from "@/lib/data";

type TastingNote = {
  dessertId: number;
  mineral: string;
  zhMineral: string;
  aroma: string;
  zhAroma: string;
  texture: string;
  zhTexture: string;
  origin: string;
  zhOrigin: string;
  glow: string;
  accent: string;
};

type Dessert = (typeof DESSERTS)[number];
type PendingDessertOpen = {
  dessert: Dessert;
  stationIndex: number;
};

const QUIZ_STATION_INDEX = DESSERTS.length;
const TOTAL_STATIONS = DESSERTS.length + 1;
const GALLERY_PROGRESS_START = 0.1;
const GALLERY_PROGRESS_END = 0.9;

function getStationProgress(stationIndex: number) {
  return (
    GALLERY_PROGRESS_START +
    ((stationIndex + 0.5) / TOTAL_STATIONS) *
      (GALLERY_PROGRESS_END - GALLERY_PROGRESS_START)
  );
}

const TASTING_NOTES: TastingNote[] = [
  {
    dessertId: 1,
    mineral: "Obsidian / Smoked Salt",
    zhMineral: "黑曜石 / 煙燻海鹽",
    aroma: "Bitter cacao, ash, vanilla",
    zhAroma: "苦可可、灰燼、大溪地香草",
    texture: "Glass glaze over mineral crust",
    zhTexture: "鏡面淋醬與礦物塔殼",
    origin: "Ecuador / Taipei lab",
    zhOrigin: "厄瓜多 / 台北實驗室",
    glow: "rgba(160,128,96,0.26)",
    accent: "#a08060",
  },
  {
    dessertId: 2,
    mineral: "Moonstone / White Velvet",
    zhMineral: "月光石 / 白色絨面",
    aroma: "Earl Grey, lychee, cold cream",
    zhAroma: "伯爵茶、荔枝、冷乳香",
    texture: "Zero-gravity mousse",
    zhTexture: "零重力慕斯",
    origin: "Tea room / Lunar orbit",
    zhOrigin: "茶室 / 月球軌道",
    glow: "rgba(210,215,214,0.2)",
    accent: "#d6d9d2",
  },
  {
    dessertId: 3,
    mineral: "Violet Ore / Blackberry Vein",
    zhMineral: "紫羅蘭礦 / 黑莓礦脈",
    aroma: "Floral acid, berry ink",
    zhAroma: "花香酸度、莓果墨色",
    texture: "Linear choux fracture",
    zhTexture: "線性泡芙裂層",
    origin: "Tahitian vanilla / Nebula glaze",
    zhOrigin: "大溪地香草 / 星雲淋面",
    glow: "rgba(116,84,142,0.24)",
    accent: "#8d6da8",
  },
  {
    dessertId: 4,
    mineral: "Concrete / Matcha Sediment",
    zhMineral: "水泥 / 抹茶沉積",
    aroma: "Uji matcha, black sesame",
    zhAroma: "宇治抹茶、黑芝麻",
    texture: "Dense, brutalist, bitter",
    zhTexture: "緻密、建築感、苦韻",
    origin: "Uji Kyoto / Stone plate",
    zhOrigin: "宇治京都 / 石盤",
    glow: "rgba(74,82,64,0.28)",
    accent: "#7c8766",
  },
  {
    dessertId: 5,
    mineral: "Amber / Caramel Strata",
    zhMineral: "琥珀 / 焦糖地層",
    aroma: "Whiskey apple, burnt sugar",
    zhAroma: "威士忌蘋果、焦糖苦香",
    texture: "Thousand-layer shatter",
    zhTexture: "千層碎裂感",
    origin: "Cellar / Orchard memory",
    zhOrigin: "酒窖 / 果園記憶",
    glow: "rgba(196,129,57,0.28)",
    accent: "#c48139",
  },
  {
    dessertId: 6,
    mineral: "Eclipse / Sesame Shell",
    zhMineral: "蝕日 / 黑芝麻殼層",
    aroma: "Roasted sesame, salted yolk",
    zhAroma: "烘焙芝麻、鹹蛋黃",
    texture: "Crisp shell, umami core",
    zhTexture: "薄脆外殼、旨味核心",
    origin: "Solar shadow / Tea pairing",
    zhOrigin: "日影 / 茶席搭配",
    glow: "rgba(124,87,54,0.26)",
    accent: "#9b704a",
  },
];

function getTastingNote(dessertId: number) {
  return (
    TASTING_NOTES.find((note) => note.dessertId === dessertId) ??
    TASTING_NOTES[0]
  );
}

export default function HorizontalGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedDessert, setSelectedDessert] = useState<Dessert | null>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [pendingDessertOpen, setPendingDessertOpen] =
    useState<PendingDessertOpen | null>(null);
  const [pendingQuizOpen, setPendingQuizOpen] = useState(false);
  const [quizOpenSignal, setQuizOpenSignal] = useState(0);
  const { t } = useTranslation();
  const { locale } = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress,
    [GALLERY_PROGRESS_START, GALLERY_PROGRESS_END],
    ["0%", "-74%"],
  );
  const progressScale = useTransform(
    scrollYProgress,
    [GALLERY_PROGRESS_START, GALLERY_PROGRESS_END],
    [0, 1],
  );
  const activeIndex = Math.min(activeStationIndex, DESSERTS.length - 1);
  const activeDessert = DESSERTS[activeIndex] ?? DESSERTS[0];
  const activeNote = getTastingNote(activeDessert.id);
  const selectedNote = selectedDessert
    ? getTastingNote(selectedDessert.id)
    : activeNote;
  const isZh = locale === "zh-TW";
  const isQuizStation = activeStationIndex === QUIZ_STATION_INDEX;
  const stationName = isQuizStation
    ? isZh
      ? "主廚挑選"
      : "Chef Selection"
    : isZh
      ? activeDessert.zhName
      : activeDessert.name;
  const stationMeta = isQuizStation
    ? isZh
      ? "隱藏菜單 / 風味測驗"
      : "Secret menu / flavor quiz"
    : isZh
      ? activeNote.zhMineral
      : activeNote.mineral;
  const progressLabel = isQuizStation
    ? isZh
      ? "主廚挑選 / 隱藏菜單"
      : "Chef selection / Secret menu"
    : isZh
      ? activeNote.zhOrigin
      : activeNote.origin;

  const scrollToStation = useCallback(
    (stationIndex: number) => {
      const section = targetRef.current;
      if (!section) return false;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollableDistance = Math.max(
        0,
        section.offsetHeight - window.innerHeight,
      );

      window.scrollTo({
        top: sectionTop + scrollableDistance * getStationProgress(stationIndex),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      return true;
    },
    [prefersReducedMotion],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const normalized = Math.min(
      0.999,
      Math.max(
        0,
        (latest - GALLERY_PROGRESS_START) /
          (GALLERY_PROGRESS_END - GALLERY_PROGRESS_START),
      ),
    );
    const nextStationIndex = Math.floor(normalized * TOTAL_STATIONS);
    setActiveStationIndex((currentIndex) =>
      currentIndex === nextStationIndex ? currentIndex : nextStationIndex,
    );
  });

  useEffect(() => {
    if (!selectedDessert) return;

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedDessert(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedDessert]);

  useEffect(() => {
    if (!pendingDessertOpen) return;
    if (activeStationIndex !== pendingDessertOpen.stationIndex) return;

    const openTimer = window.setTimeout(
      () => {
        setSelectedDessert(pendingDessertOpen.dessert);
        setPendingDessertOpen(null);
      },
      prefersReducedMotion ? 0 : 240,
    );

    return () => window.clearTimeout(openTimer);
  }, [activeStationIndex, pendingDessertOpen, prefersReducedMotion]);

  useEffect(() => {
    if (!pendingQuizOpen || activeStationIndex !== QUIZ_STATION_INDEX) return;

    const openTimer = window.setTimeout(
      () => {
        setQuizOpenSignal((signal) => signal + 1);
        setPendingQuizOpen(false);
      },
      prefersReducedMotion ? 0 : 240,
    );

    return () => window.clearTimeout(openTimer);
  }, [activeStationIndex, pendingQuizOpen, prefersReducedMotion]);

  const requestDessertOpen = useCallback(
    (dessert: Dessert, stationIndex: number) => {
      if (activeStationIndex === stationIndex) {
        setSelectedDessert(dessert);
        return;
      }

      setPendingDessertOpen({ dessert, stationIndex });
      if (!scrollToStation(stationIndex)) {
        setSelectedDessert(dessert);
        setPendingDessertOpen(null);
      }
    },
    [activeStationIndex, scrollToStation],
  );

  const requestQuizOpen = useCallback(() => {
    if (activeStationIndex === QUIZ_STATION_INDEX) {
      setQuizOpenSignal((signal) => signal + 1);
      return;
    }

    setPendingQuizOpen(true);
    if (!scrollToStation(QUIZ_STATION_INDEX)) {
      setQuizOpenSignal((signal) => signal + 1);
      setPendingQuizOpen(false);
    }
  }, [activeStationIndex, scrollToStation]);

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const barVariants: Variants = {
    hidden: { width: 0 },
    visible: (score: number) => ({
      width: `${score * 20}%`,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.4 },
    }),
  };

  return (
    <>
      <section
        id="menu"
        ref={targetRef}
        className="relative h-[380vh] bg-zodiac-charcoal"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          animate={{
            background: `radial-gradient(circle at 48% 42%, ${activeNote.glow}, transparent 34%), linear-gradient(110deg, #111 0%, #1a1a1a 44%, #080808 100%)`,
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        />
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="pointer-events-none absolute left-8 top-24 z-20 hidden w-52 text-white/50 md:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zodiac-gold/80">
              Tasting Journey
            </p>
            <div className="mt-5 border-l border-white/10 pl-5">
              <p className="font-mono text-[10px] text-white/30">
                Station {String(activeStationIndex + 1).padStart(2, "0")} /{" "}
                {String(TOTAL_STATIONS).padStart(2, "0")}
              </p>
              <p className="mt-3 font-zh-serif text-xl text-white">
                {stationName}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/45">
                {stationMeta}
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[12vw] bottom-[12vh] top-[18vh] z-10 hidden md:block"
            style={{ perspective: 1200 }}
          >
            <div
              className="absolute inset-x-0 bottom-0 h-[58%] border-x border-t border-zodiac-gold/10"
              style={{
                transform: "rotateX(68deg) translate3d(0, 18%, -180px)",
                transformOrigin: "50% 100%",
              }}
            />
            <div
              className="absolute inset-x-[10%] top-[10%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
              style={{ transform: "translateZ(-120px)" }}
            />
            <div
              className="absolute inset-x-[18%] top-[38%] h-px bg-gradient-to-r from-transparent via-zodiac-gold/20 to-transparent"
              style={{ transform: "translateZ(-40px)" }}
            />
          </div>

          <motion.div
            style={{
              x,
              perspective: "var(--perspective-gallery)",
              transformStyle: "preserve-3d",
            }}
            className="relative z-20 flex gap-12 px-12 md:px-24"
          >
            <div className="flex h-[60vh] w-[44vh] min-w-[320px] flex-shrink-0 flex-col justify-center border-l border-white/10 pl-8">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-zodiac-gold/70">
                01 / Curated Sequence
              </p>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">
                {t("gallery.seasonalCollection")
                  .split(" ")
                  .map((word, i) => (
                    <span key={i}>
                      {word}
                      <br />
                    </span>
                  ))}
              </h2>
              <p className="text-sm font-zh-serif text-white/50 max-w-[200px] leading-relaxed">
                {t("gallery.inspiredBy")}
              </p>
              <div className="mt-8 grid max-w-[240px] grid-cols-3 gap-3 text-[10px] uppercase tracking-[0.18em] text-white/35">
                <span>Structure</span>
                <span>Texture</span>
                <span>Time</span>
              </div>
              <div className="w-12 h-[1px] bg-zodiac-gold mt-8" />
            </div>

            {DESSERTS.map((dessert, index) => {
              const note = getTastingNote(dessert.id);
              const isActive = index === activeStationIndex;
              const cardOffset = index - activeStationIndex;
              const cardDepth = Math.min(Math.abs(cardOffset), 3);
              const rotateY =
                !prefersReducedMotion && !isActive
                  ? cardOffset < 0
                    ? 11
                    : -11
                  : 0;

              return (
                <motion.button
                  key={dessert.id}
                  type="button"
                  aria-label={`${t("gallery.seasonalCollection")}: ${locale === "zh-TW" ? dessert.zhName : dessert.name}`}
                  onClick={() => requestDessertOpen(dessert, index)}
                  animate={{
                    y: isActive && !prefersReducedMotion ? -20 : 0,
                    scale: isActive && !prefersReducedMotion ? 1.04 : 1,
                    rotateX: !prefersReducedMotion && isActive ? -2 : 0,
                    rotateY,
                    opacity: isActive ? 1 : 0.74,
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
                  className="group relative h-[60vh] w-[40vh] min-w-[300px] flex-shrink-0 cursor-pointer overflow-hidden border border-white/10 bg-white/5 text-left transition-colors duration-500 [transform-style:preserve-3d] hover:border-zodiac-gold/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zodiac-gold"
                  style={{
                    borderColor: isActive ? `${note.accent}80` : undefined,
                    zIndex: isActive ? 30 : Math.max(1, 12 - cardDepth),
                    boxShadow: isActive
                      ? `var(--elevation-mineral), 0 0 0 1px ${note.accent}2f`
                      : `0 18px 58px -46px ${note.accent}`,
                  }}
                >
                  <Image
                    src={getAssetPath(dessert.image)}
                    alt={locale === "zh-TW" ? dessert.zhName : dessert.name}
                    fill
                    sizes="(min-width: 768px) 40vh, 300px"
                    className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-90 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ transform: "translateZ(26px)" }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 42%, ${note.glow}, transparent 44%)`,
                      transform: "translateZ(10px)",
                    }}
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-between p-8"
                    style={{ transform: "translateZ(34px)" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                          Specimen {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-2 max-w-[160px] text-[10px] leading-relaxed text-white/45">
                          {isZh ? note.zhMineral : note.mineral}
                        </p>
                      </div>
                      <span className="font-mono text-sm tracking-widest text-zodiac-gold">
                        NT$ {dessert.price}
                      </span>
                    </div>
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="mb-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                        <span>
                          Depth {String(cardDepth + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px flex-1 bg-white/10" />
                        <span>{isActive ? "Foreground" : "Archive"}</span>
                      </div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {[
                          isZh ? note.zhAroma : note.aroma,
                          isZh ? note.zhTexture : note.texture,
                        ].map((label) => (
                          <span
                            key={label}
                            className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[10px] text-white/55 backdrop-blur"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-zh-serif text-2xl font-bold text-white mb-1 group-hover:text-zodiac-gold transition-colors">
                        {locale === "zh-TW" ? dessert.zhName : dessert.name}
                      </h3>
                      <p className="font-serif text-white/50 text-xs mb-4 uppercase tracking-wider">
                        {locale === "zh-TW" ? dessert.name : dessert.zhName}
                      </p>
                      <div className="w-0 group-hover:w-full h-px bg-zodiac-gold transition-all duration-500" />
                    </div>
                  </div>
                </motion.button>
              );
            })}

            <DessertQuiz
              isActive={isQuizStation}
              openSignal={quizOpenSignal}
              onRequestOpen={requestQuizOpen}
              prefersReducedMotion={!!prefersReducedMotion}
            />
            <div className="w-[18vw] flex-shrink-0" />
          </motion.div>

          <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden w-[min(760px,70vw)] -translate-x-1/2 md:block">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
              <span>Sequence progress</span>
              <span>{progressLabel}</span>
            </div>
            <div className="relative h-px bg-white/10">
              <motion.div
                className="absolute left-0 top-0 h-px origin-left bg-zodiac-gold"
                style={{ scaleX: progressScale }}
              />
              {Array.from({ length: TOTAL_STATIONS }).map((_, index) => (
                <span
                  key={index}
                  className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-white/20 bg-zodiac-charcoal"
                  style={{
                    left: `${(index / (TOTAL_STATIONS - 1)) * 100}%`,
                    backgroundColor:
                      index === activeStationIndex
                        ? index < DESSERTS.length
                          ? getTastingNote(DESSERTS[index].id).accent
                          : "#c99a62"
                        : undefined,
                    borderColor:
                      index === activeStationIndex
                        ? index < DESSERTS.length
                          ? getTastingNote(DESSERTS[index].id).accent
                          : "#c99a62"
                        : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedDessert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedDessert(null)}
          >
            {/* Compact Horizontal Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`dessert-detail-${selectedDessert.id}`}
              layoutId={`card-${selectedDessert.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              // Dimensions: max-w-5xl, fixed height md:h-[500px]
              className="relative w-full max-w-6xl md:h-[590px] bg-zodiac-charcoal border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-sm backdrop-blur-[var(--glass-blur)]"
              style={{
                boxShadow: `var(--elevation-mineral), 0 36px 120px -58px ${selectedNote.accent}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedDessert(null)}
                aria-label="Close dessert details"
                className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center text-white/50 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zodiac-gold"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Side - Square & Compact (Aspect Square) */}
              <div className="relative w-full md:w-auto md:aspect-square h-48 md:h-full flex-shrink-0 bg-neutral-900 border-r border-white/5">
                <Image
                  src={getAssetPath(selectedDessert.image)}
                  alt={
                    locale === "zh-TW"
                      ? selectedDessert.zhName
                      : selectedDessert.name
                  }
                  fill
                  sizes="(min-width: 768px) 550px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zodiac-charcoal/50 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur">
                  {isZh ? selectedNote.zhMineral : selectedNote.mineral}
                </div>
              </div>

              {/* Content Side - Flex 1 */}
              <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar md:overflow-visible flex flex-col justify-center">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col h-full gap-6"
                >
                  {/* Header Group */}
                  <motion.div
                    variants={itemVariants}
                    className="flex justify-between items-start border-b border-white/10 pb-4"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-zodiac-gold mb-2">
                        {t("gallery.seasonalCollection")}
                      </p>
                      <h2
                        id={`dessert-detail-${selectedDessert.id}`}
                        className="text-3xl md:text-4xl font-zh-serif text-white mb-1"
                      >
                        {locale === "zh-TW"
                          ? selectedDessert.zhName
                          : selectedDessert.name}
                      </h2>
                      <p className="text-sm font-serif text-white/40 tracking-wide">
                        {locale === "zh-TW"
                          ? selectedDessert.name
                          : selectedDessert.zhName}
                      </p>
                    </div>
                    <p className="font-mono text-xl text-zodiac-gold pt-2">
                      NT$ {selectedDessert.price}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 gap-3 border-b border-white/10 pb-5 md:grid-cols-3"
                  >
                    {[
                      {
                        label: "Aroma",
                        zhLabel: "香氣",
                        value: selectedNote.aroma,
                        zhValue: selectedNote.zhAroma,
                      },
                      {
                        label: "Texture",
                        zhLabel: "質地",
                        value: selectedNote.texture,
                        zhValue: selectedNote.zhTexture,
                      },
                      {
                        label: "Origin",
                        zhLabel: "產地",
                        value: selectedNote.origin,
                        zhValue: selectedNote.zhOrigin,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="border border-white/10 bg-white/[0.03] p-3"
                      >
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zodiac-gold/70">
                          {isZh ? item.zhLabel : item.label}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-white/65">
                          {isZh ? item.zhValue : item.value}
                        </p>
                      </div>
                    ))}
                  </motion.div>

                  {/* Description & Note Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={itemVariants} className="space-y-4">
                      <p className="text-sm md:text-base text-white/80 font-zh-serif font-light leading-relaxed">
                        {locale === "zh-TW"
                          ? selectedDessert.zhDescription
                          : selectedDessert.description}
                      </p>

                      {/* Chef Note with Icon */}
                      <div className="bg-white/5 p-3 rounded-sm border-l-2 border-zodiac-gold">
                        <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zodiac-gold/80 mb-1">
                          <ChefHat className="w-3 h-3" />{" "}
                          {t("gallery.chefNote")}
                        </h4>
                        <p className="text-xs italic text-white/60">
                          {locale === "zh-TW"
                            ? selectedDessert.zhChefNote
                            : selectedDessert.chefNote}
                        </p>
                      </div>
                    </motion.div>

                    {/* Flavor Profile & Pairing */}
                    <motion.div variants={itemVariants} className="space-y-5">
                      {/* Flavor Bars - Compact */}
                      <div className="space-y-2">
                        <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zodiac-gold/60">
                          <Activity className="w-3 h-3" />{" "}
                          {t("gallery.flavorProfile")}
                        </h4>
                        <div className="space-y-1.5">
                          {["sweetness", "acidity", "texture"].map((key) => (
                            <div
                              key={key}
                              className="flex items-center gap-2 text-[10px] text-white/50"
                            >
                              <span className="w-12">
                                {t(`gallery.${key}`)}
                              </span>
                              <div className="flex-1 h-0.5 bg-white/10 rounded-full">
                                <motion.div
                                  custom={
                                    selectedDessert.profile[
                                      key as keyof typeof selectedDessert.profile
                                    ]
                                  }
                                  variants={barVariants}
                                  className="h-full bg-zodiac-gold"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pairing */}
                      <div className="pt-2">
                        <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zodiac-gold/60 mb-1">
                          <Wine className="w-3 h-3" />{" "}
                          {t("gallery.perfectPairing")}
                        </h4>
                        <p className="text-xs text-white/70 font-zh-serif">
                          {locale === "zh-TW"
                            ? selectedDessert.zhPairing
                            : selectedDessert.pairing}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Ingredients - Footer */}
                  <motion.div
                    variants={itemVariants}
                    className="mt-auto flex flex-wrap gap-1.5 pt-2"
                  >
                    {(locale === "zh-TW"
                      ? selectedDessert.zhIngredients
                      : selectedDessert.ingredients
                    ).map((ing) => (
                      <span
                        key={ing}
                        className="px-2 py-0.5 text-[10px] border border-white/5 text-white/30 rounded-full"
                      >
                        {ing}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
