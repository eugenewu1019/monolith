"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n";
import { Globe } from "lucide-react";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { locale, setLocale } = useLocale();
    const isMobile = pathname?.startsWith("/mobile");

    if (isMobile) return null;

    const toggleLocale = () => {
        setLocale(locale === "zh-TW" ? "en-US" : "zh-TW");
    };

    const handleMenuClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (pathname === "/") {
            // On home page, smooth scroll to menu section
            const menuSection = document.getElementById("menu");
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // On other pages, navigate to home with hash
            router.push("/#menu");
        }
    };

    return (
        <motion.header
            className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <Link href="/" className="pointer-events-auto">
                <div className="flex flex-col leading-none group cursor-pointer">
                    <span className="text-xl font-serif tracking-tight group-hover:opacity-70 transition-opacity">MONOLITH</span>
                    <span className="text-[10px] font-zh-serif tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">原石結構</span>
                </div>
            </Link>

            <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-8 items-center pointer-events-auto">
                <button onClick={handleMenuClick} className="text-xs uppercase tracking-widest hover:text-white/70 transition-colors">Menu / 菜單</button>
                <Link href="/craft" className="text-xs uppercase tracking-widest hover:text-white/70 transition-colors">The Craft / 工藝</Link>
                <Link href="/insights" className="text-xs uppercase tracking-widest hover:text-white/70 transition-colors">Insights / 洞見</Link>

                {/* Language Toggle - 中/英 or CN/EN mode */}
                <div className="flex items-center gap-1 text-xs tracking-widest">
                    <button
                        onClick={() => setLocale("zh-TW")}
                        className={`transition-all ${locale === "zh-TW"
                                ? "text-white font-medium"
                                : "text-white/40 hover:text-white/70"
                            }`}
                    >
                        {locale === "zh-TW" ? "中" : "CN"}
                    </button>
                    <span className="text-white/30">/</span>
                    <button
                        onClick={() => setLocale("en-US")}
                        className={`transition-all ${locale === "en-US"
                                ? "text-white font-medium"
                                : "text-white/40 hover:text-white/70"
                            }`}
                    >
                        {locale === "zh-TW" ? "英" : "EN"}
                    </button>
                </div>
            </nav>

            <Link href="/reservation" className="pointer-events-auto">
                <button className="relative group overflow-hidden px-4 py-2 border border-white/30 hover:border-white transition-colors">
                    <span className="relative z-10 text-xs uppercase tracking-widest font-mono group-hover:text-black transition-colors duration-300">
                        Order / 預約取貨
                    </span>
                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
                </button>
            </Link>
        </motion.header>
    );
}
