"use client";

import { motion, useMotionValue, useTransform, useSpring, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

interface InteractiveHeroProps {
    title: string;
    zhTitle: string;
    subtitle: string;
    zhSubtitle: string;
    description: string;
    zhDescription: string;
}

export default function InteractiveHero({
    title,
    zhTitle,
    subtitle,
    zhSubtitle,
    description,
    zhDescription,
}: InteractiveHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring values for parallax
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Transform for parallax layers
    const textX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
    const textY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
    const coordX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
    const coordY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

    // Dynamic coordinates based on mouse
    const latDeg = useTransform(smoothX, [-0.5, 0.5], [24.8, 25.2]);
    const lngDeg = useTransform(smoothY, [-0.5, 0.5], [121.4, 121.7]);

    // Animated gradient position
    const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

    useAnimationFrame((time) => {
        const x = 50 + Math.sin(time / 3000) * 30;
        const y = 50 + Math.cos(time / 4000) * 20;
        setGradientPos({ x, y });
    });

    const handleMouseMove = (e: React.MouseEvent) => {
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
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
        >
            {/* Animated Gradient Overlay */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(ellipse 80% 60% at ${gradientPos.x}% ${gradientPos.y}%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)`,
                }}
            />

            {/* Subtle Grid Lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="w-full h-full bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:100px_100px]" />
            </div>

            {/* Dynamic Coordinates - Top Left */}
            <motion.div
                className="absolute top-12 left-8 md:left-16 font-mono text-[10px] tracking-widest opacity-40 z-20 space-y-1"
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

            {/* Index / Total - Bottom Right */}
            <motion.div
                className="absolute bottom-12 right-8 md:right-16 font-mono text-xs opacity-30 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1 }}
            >
                01 / 03
            </motion.div>

            {/* Main Content with Parallax */}
            <motion.div
                className="relative z-10 max-w-5xl w-full px-8 md:px-16"
                style={{ x: textX, y: textY }}
            >
                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <span className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-50">
                        {subtitle} <span className="mx-3 opacity-30">/</span> {zhSubtitle}
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-light tracking-tight leading-[0.85] mb-8"
                >
                    {title}
                    <motion.span
                        className="block text-3xl md:text-5xl lg:text-6xl mt-6 font-zh-serif opacity-50 ml-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.8 }}
                    >
                        {zhTitle}
                    </motion.span>
                </motion.h1>

                {/* Divider Line with Animation */}
                <motion.div
                    className="h-px bg-zodiac-gold origin-left mb-8"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{ maxWidth: 150 }}
                />

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="max-w-xl space-y-4 font-light text-base md:text-lg opacity-70"
                >
                    <p className="leading-relaxed">{description}</p>
                    <p className="font-zh-serif text-sm md:text-base leading-loose opacity-70">{zhDescription}</p>
                </motion.div>
            </motion.div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/10 pointer-events-none" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/10 pointer-events-none" />
        </div>
    );
}
