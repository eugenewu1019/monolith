"use client";

import { useLocale } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export function LanguageToggle() {
    const { locale, setLocale } = useLocale();

    const toggleLocale = () => {
        setLocale(locale === "zh-TW" ? "en-US" : "zh-TW");
    };

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleLocale}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-mono uppercase tracking-widest text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
            <Globe className="w-3.5 h-3.5" />
            <span>{locale === "zh-TW" ? "English" : "中文"}</span>
        </motion.button>
    );
}
