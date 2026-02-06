"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll } from "framer-motion";

interface StickySectionProps {
    children: ReactNode;
    index: number;
    total: number;
    className?: string;
}

export function StickyDeck({ children }: { children: ReactNode }) {
    return <div className="relative w-full">{children}</div>;
}

export function StickySection({
    children,
    index,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    total: _total,
    className = "",
}: StickySectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { scrollYProgress: _scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"], // Starts tracking when top of section hits bottom of viewport
    });

    // Example entry interaction:
    // As it scrolls into view (0 to 1), maybe it scales up or fades in?
    // Current behavior requested: "Sticky", new info slides in over old.
    // The simplest "Sticky Deck" is just CSS sticky.
    // But to add "various angles" or "transparency", we manipulate the child.

    // Let's rely on CSS sticky for the main positioning, and use motion for internal effects if needed.
    // Actually, standard sticky stacking works well.
    // We can add a parallax mask or simple fade.

    return (
        <div
            ref={ref}
            className={`sticky top-0 h-screen w-full ${className}`}
            style={{
                zIndex: index * 10,
            }}
        >
            {/* Disable entry animation for the first section (Hero) to ensure immediate visibility */}
            <motion.div
                className="h-full w-full relative"
                initial={index === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                whileInView={index === 0 ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
}
