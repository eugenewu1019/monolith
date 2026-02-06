"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn, getAssetPath } from "@/lib/utils";
import { DESSERTS } from "@/lib/data";
import Link from "next/link";
import MobileDessertQuiz from "@/components/mobile/mobile-dessert-quiz";
import { useTranslation, useLocale } from "@/lib/i18n";

export default function MobileMenuPage() {
    const { t } = useTranslation();
    const { locale } = useLocale();
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedDessert, setSelectedDessert] = useState<typeof DESSERTS[0] | null>(null);

    const CATEGORIES = [
        { key: "All", labelKey: "menu.catAll" },
        { key: "Tarts", labelKey: "menu.catTarts" },
        { key: "Cakes", labelKey: "menu.catCakes" },
        { key: "Seasonal", labelKey: "menu.catSeasonal" },
        { key: "Classics", labelKey: "menu.catClassics" },
    ];

    // Scroll lock when drawer is open
    useEffect(() => {
        if (selectedDessert) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedDessert]);

    // Filter logic (mock)
    const filteredDesserts = activeCategory === "All"
        ? DESSERTS
        : DESSERTS.filter(d => activeCategory === "Seasonal" ? d.stock < 5 : true); // Just mock logic for now

    return (
        <>
            <div className="px-5 py-6 space-y-8 min-h-screen pb-32 transition-all duration-300" style={{ filter: selectedDessert ? "blur(10px) brightness(0.5)" : "none", transform: selectedDessert ? "scale(0.95)" : "none" }}>
                {/* Header */}
                <header className="flex justify-between items-end">
                    <div>
                        <h2 className="text-zodiac-gold text-xs font-mono uppercase tracking-widest mb-1">{t("common.welcome")}</h2>
                        <h1 className="text-3xl font-serif leading-none">{t("common.brand")}</h1>
                    </div>
                    {/* Search / Filter (Visual only for now) */}
                    <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center active:bg-white/10 opacity-0 pointer-events-none">
                        <Search className="w-5 h-5 opacity-50" />
                    </button>
                </header>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 custom-scrollbar-none">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            className={cn(
                                "px-5 py-2 rounded-full border text-xs uppercase tracking-widest whitespace-nowrap transition-all",
                                activeCategory === cat.key
                                    ? "bg-zodiac-gold border-zodiac-gold text-black"
                                    : "bg-[#111] border-white/10 text-white/40"
                            )}
                        >
                            {t(cat.labelKey)}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-4">


                    {filteredDesserts.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: ((activeCategory === "All" ? 1 : 0) + i) * 0.05 }}
                        >
                            <div
                                onClick={() => setSelectedDessert(item)}
                                className="group block cursor-pointer relative"
                            >
                                <div className="aspect-square relative rounded-2xl overflow-hidden bg-[#111] border border-white/5 mb-3">
                                    <Image
                                        src={getAssetPath(item.image)}
                                        alt={locale === "zh-TW" ? item.zhName : item.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {item.stock <= 0 && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <span className="text-xs font-mono uppercase tracking-widest border border-white/30 px-2 py-1">{t("menu.soldOut")}</span>
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-1.5 rounded-full backdrop-blur-sm">
                                        <ArrowUpRight className="w-4 h-4 text-white" />
                                    </div>
                                    {item.isChefChoice && (
                                        <div className="absolute top-2 left-2 bg-zodiac-gold text-black text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-lg">
                                            {t("menu.chefChoice")}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-serif leading-none mb-1">{locale === "zh-TW" ? item.zhName : item.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white/40 uppercase tracking-widest">
                                            NT$ {item.price}
                                        </span>
                                        {item.stock < 5 && item.stock > 0 && (
                                            <span className="text-[10px] text-amber-500">• {t("menu.lowStock")}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Check if AI Quiz should be at the bottom - only for "All" category */}
                    {activeCategory === "All" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="col-span-2 mt-4"
                        >
                            <MobileDessertQuiz />
                        </motion.div>
                    )}
                </div>

                <div className="h-12 flex items-center justify-center">
                    <span className="text-[10px] text-white/20 font-mono">{t("menu.endOfCatalogue")}</span>
                </div>
            </div>

            {/* Detail Drawer Overlay */}
            <AnimatePresence>
                {selectedDessert && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDessert(null)}
                            className="fixed inset-0 bg-black/80 z-[105] backdrop-blur-sm"
                        />

                        {/* Drawer - z-index increased to 110 to cover BottomNav (100) */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 bg-[#161616] rounded-t-[32px] border-t border-white/10 z-[110] max-h-[90vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Fixed Header: Handle */}
                            <div className="shrink-0 pt-6 px-6 pb-2">
                                <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto" />
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto px-6 pb-20 custom-scrollbar-none">
                                <div className="space-y-8">
                                    {/* Header Info */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="text-zodiac-gold text-xs font-mono uppercase tracking-widest mb-2 block">
                                                    {t("menu.selection")}
                                                </span>
                                                <h2 className="text-3xl font-serif text-white mb-1 leading-none">
                                                    {locale === "zh-TW" ? selectedDessert.zhName : selectedDessert.name}
                                                </h2>
                                                <p className="font-zh-serif text-xl opacity-50">
                                                    {locale === "zh-TW" ? selectedDessert.name : selectedDessert.zhName}
                                                </p>
                                            </div>
                                            {selectedDessert.stock > 0 ? (
                                                <div className="px-3 py-1 rounded-full border border-green-500/30 text-green-500 text-[10px] uppercase tracking-widest bg-green-500/10">
                                                    {t("menu.inStock")}
                                                </div>
                                            ) : (
                                                <div className="px-3 py-1 rounded-full border border-red-500/30 text-red-500 text-[10px] uppercase tracking-widest bg-red-500/10">
                                                    {t("menu.soldOut")}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <p className="text-2xl text-white/90 font-mono">NT$ {selectedDessert.price}</p>
                                            {selectedDessert.isChefChoice && (
                                                <span className="bg-zodiac-gold text-black text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                                                    {t("menu.chefChoice")}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Main Image */}
                                    <div className="aspect-video w-full rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl">
                                        <Image
                                            src={getAssetPath(selectedDessert.image)}
                                            alt={locale === "zh-TW" ? selectedDessert.zhName : selectedDessert.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Description & Notes */}
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{t("menu.description")}</h3>
                                            <p className="text-white/80 leading-relaxed font-light text-base font-zh-serif">
                                                {locale === "zh-TW" ? selectedDessert.zhDescription : selectedDessert.description}
                                            </p>
                                        </div>

                                        {/* Flavor Profile Bars */}
                                        <div className="space-y-3">
                                            <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{t("menu.flavorProfile")}</h3>
                                            <div className="space-y-2">
                                                {selectedDessert.profile && Object.entries(selectedDessert.profile).map(([key, value]) => (
                                                    <div key={key} className="flex items-center gap-3">
                                                        <span className="text-[10px] uppercase text-white/50 w-16">{key}</span>
                                                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full bg-zodiac-gold" style={{ width: `${value * 20}%` }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Chef Note */}
                                        {selectedDessert.chefNote && (
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-3 opacity-10">
                                                    <span className="text-4xl text-zodiac-gold">❝</span>
                                                </div>
                                                <h4 className="text-[10px] uppercase tracking-widest text-zodiac-gold mb-2">{t("menu.chefNote")}</h4>
                                                <p className="text-sm italic text-white/70 leading-relaxed font-zh-serif">
                                                    &quot;{locale === "zh-TW" ? selectedDessert.zhChefNote : selectedDessert.chefNote}&quot;
                                                </p>
                                            </div>
                                        )}

                                        {/* Ingredients & Pairing */}
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{t("menu.ingredients")}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {(locale === "zh-TW" ? selectedDessert.zhIngredients : selectedDessert.ingredients)?.map(ing => (
                                                        <span key={ing} className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] text-white/60">
                                                            {ing}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{t("menu.pairing")}</h4>
                                                <p className="text-sm text-zodiac-gold/80 font-zh-serif">
                                                    {locale === "zh-TW" ? selectedDessert.zhPairing : selectedDessert.pairing}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* Fixed Footer: Action Button */}
                            <div className="shrink-0 p-6 pt-4 bg-[#161616] border-t border-white/5 pb-[env(safe-area-inset-bottom)]">
                                <Link href={`/mobile/reservation?preselect=${selectedDessert.id}`} className="block w-full">
                                    <button
                                        disabled={selectedDessert.stock <= 0}
                                        className="w-full bg-zodiac-gold text-black py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                    >
                                        {selectedDessert.stock > 0 ? t("menu.reserveNow") : t("menu.soldOut")}
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence >
        </>
    );
}
