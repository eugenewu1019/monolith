"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Grid, CalendarDays, Hexagon, Lightbulb, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

export function BottomNav() {
    const pathname = usePathname();
    const { t } = useTranslation();

    // 5 tabs with Home in the center (index 2)
    const NAV_ITEMS = [
        { labelKey: "nav.insights", href: "/mobile/insights", icon: Lightbulb },
        { labelKey: "nav.craft", href: "/mobile/craft", icon: Hexagon },
        { labelKey: "nav.home", href: "/mobile", icon: null, isHome: true },
        { labelKey: "nav.menu", href: "/mobile/menu", icon: Grid },
        { labelKey: "nav.reserve", href: "/mobile/reservation", icon: CalendarDays },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom)] bg-black/90 backdrop-blur-xl border-t border-white/10">
            <nav className="flex items-center justify-around h-16 relative">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href === "/mobile" && pathname === "/");

                    // Special Home button in center
                    if (item.isHome) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative flex items-center justify-center -mt-6"
                            >
                                <motion.div
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className={cn(
                                        "w-14 h-14 rounded-full flex items-center justify-center shadow-lg",
                                        "bg-gradient-to-br from-zodiac-gold to-amber-600",
                                        "border-4 border-black"
                                    )}
                                >
                                    {/* Custom MONOLITH logo/hexagon */}
                                    <div className="relative">
                                        <Hexagon className="w-6 h-6 text-black" strokeWidth={2} fill="currentColor" />
                                        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-zodiac-gold">M</span>
                                    </div>
                                </motion.div>
                                {/* Glow effect */}
                                <div className="absolute inset-0 w-14 h-14 rounded-full bg-zodiac-gold/30 blur-xl -z-10" />
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center w-full h-full pt-1"
                        >
                            <motion.div
                                whileTap={{ scale: 0.85 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="flex flex-col items-center"
                            >
                                <div className={cn(
                                    "relative mb-0.5 transition-colors duration-300",
                                    isActive ? "text-zodiac-gold" : "text-white/40"
                                )}>
                                    {item.icon && <item.icon strokeWidth={1.5} className="w-5 h-5" />}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-glow"
                                            className="absolute inset-0 bg-zodiac-gold blur-lg opacity-40"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </div>
                                <span className={cn(
                                    "text-[9px] font-zh-serif tracking-widest transition-colors duration-300",
                                    isActive ? "text-zodiac-gold" : "text-white/40"
                                )}>
                                    {t(item.labelKey)}
                                </span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
