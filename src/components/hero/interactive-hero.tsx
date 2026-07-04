"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { HERO_MODES, getHeroMode, type HeroMode } from "./hero-modes";

interface InteractiveHeroProps {
  title: string;
  zhTitle: string;
  subtitle: string;
  zhSubtitle: string;
  description: string;
  zhDescription: string;
  activeMode: HeroMode;
  onModeChange: (mode: HeroMode) => void;
}

export default function InteractiveHero({
  title,
  zhTitle,
  subtitle,
  zhSubtitle,
  description,
  zhDescription,
  activeMode,
  onModeChange,
}: InteractiveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeExhibit = getHeroMode(activeMode);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gradientX = useMotionValue(50);
  const gradientY = useMotionValue(50);

  // Smooth spring values for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform for parallax layers
  const textX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const coordX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const coordY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const titleRotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const titleRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const panelRotateY = useTransform(smoothX, [-0.5, 0.5], [6, -6]);
  const railDepth = useTransform(smoothY, [-0.5, 0.5], [-24, 24]);

  // Dynamic coordinates based on mouse
  const latDeg = useTransform(smoothX, [-0.5, 0.5], [24.8, 25.2]);
  const lngDeg = useTransform(smoothY, [-0.5, 0.5], [121.4, 121.7]);

  const glowBackground = useMotionTemplate`radial-gradient(ellipse 80% 60% at ${gradientX}% ${gradientY}%, ${activeExhibit.glow} 0%, transparent 60%)`;
  const titleRailTransform = useMotionTemplate`translateZ(${railDepth}px) rotateX(62deg)`;

  useAnimationFrame((time) => {
    if (prefersReducedMotion) return;
    const x = 50 + Math.sin(time / 3000) * 30;
    const y = 50 + Math.cos(time / 4000) * 20;
    gradientX.set(x);
    gradientY.set(y);
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none z-0"
        style={{ background: glowBackground }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-20 z-[2] hidden w-px bg-gradient-to-b from-transparent via-zodiac-gold/55 to-transparent md:block"
          initial={{ left: "18%", opacity: 0 }}
          animate={{
            left:
              activeMode === "structure"
                ? "28%"
                : activeMode === "texture"
                  ? "50%"
                  : "72%",
            opacity: [0, 0.85, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.25 }}
        />
      </AnimatePresence>

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 z-[1] hidden text-center font-serif text-[10rem] font-light leading-none text-white/[0.025] md:block lg:text-[13rem]"
      >
        MONOLITH
      </div>

      {/* Dynamic Coordinates - Top Left */}
      <motion.div
        className="absolute top-24 left-8 md:left-16 font-mono text-[10px] tracking-widest opacity-40 z-20 space-y-1"
        style={{ x: coordX, y: coordY }}
      >
        <motion.div className="flex gap-2">
          <span>N</span>
          <motion.span>{latDeg}</motion.span>
          <span>°</span>
        </motion.div>
        <motion.div className="flex gap-2">
          <span>E</span>
          <motion.span>{lngDeg}</motion.span>
          <span>°</span>
        </motion.div>
        <div className="w-12 h-px bg-current mt-3" />
        <div className="text-[8px] opacity-50 mt-2">TAIPEI, TW</div>
      </motion.div>

      {/* Main Editorial Composition */}
      <motion.div
        className="relative z-10 grid h-full w-full max-w-7xl grid-cols-1 items-center gap-8 px-8 py-28 md:grid-cols-12 md:px-16"
        style={{
          x: textX,
          y: textY,
          perspective: "var(--perspective-hero)",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: prefersReducedMotion ? 0 : 0.2,
            duration: prefersReducedMotion ? 0 : undefined,
          }}
          className="self-end border-l pl-5 md:col-span-3 md:self-center"
          style={{
            rotateY: prefersReducedMotion ? 0 : panelRotateY,
            transformStyle: "preserve-3d",
            z: prefersReducedMotion ? 0 : 34,
            borderColor: `${activeExhibit.accent}88`,
          }}
        >
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-zodiac-gold/70">
            {subtitle} <span className="mx-3 opacity-30">/</span> {zhSubtitle}
          </span>
          <div className="mt-10 hidden space-y-6 md:block">
            {HERO_MODES.map((mode) => {
              const isActive = mode.id === activeMode;

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onModeChange(mode.id)}
                  aria-pressed={isActive}
                  className="group grid w-full grid-cols-[2rem_1fr] gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zodiac-gold"
                >
                  <span
                    className={`font-mono text-xs transition-colors ${
                      isActive ? "text-zodiac-gold" : "text-white/30"
                    }`}
                  >
                    {mode.index}
                  </span>
                  <div>
                    <p
                      className={`font-mono text-[10px] uppercase tracking-[0.24em] transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-white/45 group-hover:text-white/75"
                      }`}
                    >
                      {mode.label}
                    </p>
                    <p className="mt-1 text-xs text-white/30">{mode.detail}</p>
                    <motion.div
                      className="mt-3 h-px origin-left"
                      style={{ backgroundColor: mode.accent }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex gap-2 md:hidden">
            {HERO_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => onModeChange(mode.id)}
                aria-pressed={mode.id === activeMode}
                className={`h-11 flex-1 border px-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                  mode.id === activeMode
                    ? "border-zodiac-gold/60 text-zodiac-gold"
                    : "border-white/10 text-white/45"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative md:col-span-6"
          style={{
            rotateX: prefersReducedMotion ? 0 : titleRotateX,
            rotateY: prefersReducedMotion ? 0 : titleRotateY,
            transformStyle: "preserve-3d",
            z: prefersReducedMotion ? 0 : 72,
          }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 top-[13%] h-[52%] border border-zodiac-gold/10 md:-inset-x-14"
            style={{
              transform: prefersReducedMotion
                ? "translateZ(-80px) rotateX(62deg)"
                : titleRailTransform,
              transformOrigin: "50% 100%",
            }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-8 top-[18%] h-16 w-[72%] rotate-[-4deg] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm"
            animate={{
              x:
                activeMode === "structure"
                  ? ["-18%", "8%"]
                  : activeMode === "texture"
                    ? ["8%", "28%"]
                    : ["28%", "48%"],
              opacity: prefersReducedMotion ? 0.18 : [0.12, 0.32, 0.12],
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1.4,
              repeat: prefersReducedMotion ? 0 : Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.h1
            key={activeMode}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.4,
              duration: prefersReducedMotion ? 0 : 0.8,
            }}
            className="relative font-serif text-7xl font-light leading-[0.88] tracking-normal text-white md:text-9xl lg:text-[9.5rem]"
          >
            <motion.span
              className="block"
              animate={{ x: activeMode === "texture" ? -8 : 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
            >
              MONO
            </motion.span>
            <motion.span
              className="block"
              animate={{
                x: activeMode === "time" ? 12 : 0,
                color: activeExhibit.accent,
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
            >
              LITH
            </motion.span>
          </motion.h1>

          <motion.div
            className="mt-8 h-px origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 1,
              duration: prefersReducedMotion ? 0 : 1,
            }}
            style={{ maxWidth: 220, backgroundColor: activeExhibit.accent }}
          />

          <motion.p
            className="mt-8 max-w-lg text-base font-light leading-relaxed text-white/70 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 1.2,
              duration: prefersReducedMotion ? 0 : undefined,
            }}
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.aside
          className="border border-white/10 bg-[var(--glass-panel)] p-5 shadow-[var(--elevation-glass)] backdrop-blur-[var(--glass-blur)] md:col-span-3"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: prefersReducedMotion ? 0 : 0.9,
            duration: prefersReducedMotion ? 0 : 0.7,
          }}
          style={{
            rotateY: prefersReducedMotion ? 0 : panelRotateY,
            transformStyle: "preserve-3d",
            z: prefersReducedMotion ? 0 : 42,
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
            Exhibit {activeExhibit.index}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            {title} <span className="mx-2 text-white/15">/</span> {zhTitle}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
            >
              <h2 className="mt-5 font-zh-serif text-4xl font-light leading-tight text-white/75">
                {activeExhibit.zhLabel}
              </h2>
              <p
                className="mt-4 text-xs uppercase tracking-[0.2em]"
                style={{ color: activeExhibit.accent }}
              >
                {activeExhibit.label}
              </p>
              <p className="mt-8 font-zh-serif text-sm leading-loose text-white/50">
                {activeExhibit.zhExhibit}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-white/30">
                {activeMode === "structure"
                  ? zhDescription
                  : activeExhibit.exhibit}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
            {HERO_MODES.map((mode) => (
              <span
                key={mode.id}
                className={mode.id === activeMode ? "text-white/70" : undefined}
              >
                {mode.label}
              </span>
            ))}
          </div>
        </motion.aside>
      </motion.div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/10 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/10 pointer-events-none" />
    </div>
  );
}
