"use client";

import { useState } from "react";
import Image from "next/image";
import { Coffee, Gem, Leaf, Waves } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import MobileFluidBackground from "@/components/mobile/mobile-fluid-background";
import MobileTestimonialsSection from "@/components/mobile/testimonials-section";
import { FAQPreviewSection } from "@/components/mobile/faq-preview-section";
import FAQModal from "@/components/ui/faq-modal";

import { LanguageToggle } from "@/components/mobile/language-toggle";

export default function MobileHome() {
  const { t } = useTranslation();
  const [showFAQ, setShowFAQ] = useState(false);
  const originCards = [
    {
      icon: Leaf,
      title: t("ingredients.madagascar"),
      label: t("ingredients.vanilla"),
    },
    {
      icon: Coffee,
      title: t("ingredients.ujiKyoto"),
      label: t("ingredients.matcha"),
    },
    {
      icon: Waves,
      title: t("ingredients.brittany"),
      label: t("ingredients.seaSalt"),
    },
    {
      icon: Gem,
      title: t("ingredients.ecuador"),
      label: t("ingredients.cacao"),
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Fluid Background Layer */}
      <div className="fixed inset-0 z-0">
        <MobileFluidBackground />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 px-4 py-6 space-y-16 pb-24">
        {/* Header / Greeting */}
        <header className="flex justify-between items-end mt-2">
          <div>
            <h2 className="text-zodiac-gold text-xs font-mono uppercase tracking-widest mb-1">
              {t("common.welcome")}
            </h2>
            <h1 className="text-3xl font-serif leading-none">
              {t("common.brand")}
            </h1>
          </div>
          <LanguageToggle />
        </header>

        {/* Featured Item (More compact) */}
        <section className="group relative aspect-[4/3] w-full overflow-hidden rounded-md border border-white/10 shadow-[var(--elevation-mineral)]">
          <Image
            src={getAssetPath("/images/obsidian-tart.png")}
            alt={t("home.featuredName")}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-active:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="flex justify-between items-end">
              <div>
                <span className="inline-block rounded-sm bg-zodiac-gold px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                  {t("home.signature")}
                </span>
                <h3 className="mt-2 text-2xl font-serif">
                  {t("home.featuredName")}
                </h3>
                <p className="text-white/60 text-sm mt-1 line-clamp-2">
                  {t("home.featuredDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="space-y-6">
          <div className="border-l border-zodiac-gold pl-4">
            <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold block mb-2">
              {t("home.philosophyLabel")}
            </span>
            <h3 className="text-3xl font-serif leading-tight">
              {t("home.philosophyTitle")}
            </h3>
          </div>

          <div className="space-y-4 text-white/70 font-light">
            <p className="leading-relaxed font-zh-serif">
              {t("home.philosophyDesc")}
            </p>
          </div>
        </section>

        {/* Origin Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px bg-white/10 flex-1" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              {t("home.originLabel")}
            </span>
            <span className="h-px bg-white/10 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {originCards.map(({ icon: Icon, title, label }) => (
              <div
                key={label}
                className="space-y-3 rounded-md border border-white/10 bg-[var(--glass-panel)] p-4 shadow-[var(--elevation-glass)] backdrop-blur-[var(--glass-blur)]"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center border border-zodiac-gold/25 text-zodiac-gold"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h4 className="font-serif leading-tight">{title}</h4>
                <p className="text-[10px] uppercase tracking-widest text-white/45">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-center text-white/60 italic font-zh-serif">
            「{t("home.originQuote")}」
          </p>
        </section>

        {/* Chef Profile */}
        <section className="relative overflow-hidden rounded-md border border-white/10 bg-[var(--glass-panel)] shadow-[var(--elevation-glass)] backdrop-blur-[var(--glass-blur)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-zodiac-gold/5 blur-[80px] pointer-events-none" />

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-zodiac-gold">
                {t("home.chefLabel")}
              </span>
              <h3 className="text-4xl font-serif leading-none">
                Renzo
                <br />
                Hayashi
              </h3>
              <p className="font-zh-serif text-xl opacity-50">
                {t("home.chefName")}
              </p>
            </div>

            <div className="relative aspect-square w-full overflow-hidden rounded-md filter grayscale contrast-125">
              <Image
                src={getAssetPath("/images/chef-renzo.png")}
                alt="Renzo Hayashi"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-white/70 font-light">
              <p className="font-zh-serif leading-loose">
                {t("home.chefQuote")}
              </p>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/10">
              <div>
                <span className="block text-lg font-serif text-zodiac-gold">
                  2018
                </span>
                <span className="text-[9px] uppercase tracking-widest opacity-50">
                  {t("home.award2018")}
                  <br />
                  {t("home.award2018Sub")}
                </span>
              </div>
              <div>
                <span className="block text-lg font-serif text-white/40">
                  2022
                </span>
                <span className="text-[9px] uppercase tracking-widest opacity-50">
                  {t("home.award2022")}
                  <br />
                  {t("home.award2022Sub")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <MobileTestimonialsSection />

        {/* FAQ Preview Section */}
        <FAQPreviewSection onViewAll={() => setShowFAQ(true)} />
      </div>

      {/* FAQ Modal */}
      <FAQModal isOpen={showFAQ} onClose={() => setShowFAQ(false)} />
    </div>
  );
}
