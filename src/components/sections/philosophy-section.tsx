"use client";

import { motion } from "framer-motion";

interface PhilosophySectionProps {
    title: string;
    zhTitle: string;
    subtitle: string;
    zhSubtitle: string;
    description: string;
    zhDescription: string;
}

export default function PhilosophySection({
    title,
    zhTitle,
    subtitle,
    zhSubtitle,
    description,
    zhDescription,
}: PhilosophySectionProps) {

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-visible px-8 py-40">

            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="w-full h-full bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:80px_80px]" />
            </div>

            {/* Section Index - Top Left */}
            <div className="absolute top-8 left-8 md:left-12 font-mono text-xs text-white/40">
                <span className="text-3xl font-light block">02</span>
                <div className="w-6 h-px bg-white/20 mt-3" />
                <div className="text-[10px] mt-2 tracking-widest opacity-70">PHILOSOPHY</div>
            </div>

            {/* Main Content - Centered */}
            <div className="relative z-10 max-w-3xl w-full text-center">

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h2 className="text-xs tracking-[0.3em] uppercase text-white/50 mb-6">
                        {subtitle} <span className="mx-2 opacity-30">/</span> {zhSubtitle}
                    </h2>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-8xl font-zh-serif font-bold text-white mb-4"
                >
                    {zhTitle}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-4xl font-serif text-white/40 mb-12 tracking-wider uppercase"
                >
                    {title}
                </motion.p>

                {/* Divider */}
                <motion.div
                    className="h-px w-24 bg-white/20 mx-auto mb-12"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                />

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-6"
                >
                    <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed max-w-2xl mx-auto">
                        {description}
                    </p>
                    <p className="text-base md:text-lg font-zh-serif text-white/40 leading-loose max-w-xl mx-auto">
                        {zhDescription}
                    </p>
                </motion.div>

                {/* Decorative Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-16 text-8xl font-serif text-white leading-none"
                >
                    &ldquo;
                </motion.div>
            </div>

            {/* Corner Decoration */}
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-white/10 pointer-events-none" />
        </div>
    );
}
