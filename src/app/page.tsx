"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { StickyDeck, StickySection } from "@/components/ui/sticky-deck";
import { MoveDown } from "lucide-react";
import Image from "next/image";
import FluidBackground from "@/components/hero/fluid-background";
import InteractiveHero from "@/components/hero/interactive-hero";
import PhilosophySection from "@/components/sections/philosophy-section";
import OriginSection from "@/components/sections/origin-section";
import HorizontalGallery from "@/components/gallery/horizontal-gallery";
import ChefProfile from "@/components/chef/chef-profile";
import TestimonialsSection from "@/components/sections/testimonials-section";
import FAQModal from "@/components/ui/faq-modal";
import MobileHome from "@/app/mobile/page";

export default function Home() {
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const { t, locale } = useTranslation();
  const stickySections = [
    {
      id: "hero",
      title: "MONOLITH",
      subtitle: "Geological Pastry",
      description: "Edible strata. Time captured in sugar and silence.",
      zhTitle: "原石結構",
      zhSubtitle: "地質甜點學",
      zhDescription: "可食用的地層。將時間封存於糖與靜謐之中。",
      color: "bg-zodiac-black",
      text: "text-zodiac-white",
      hasFluid: true,
    },
    {
      id: "philosophy",
      title: "Philosophy",
      subtitle: "The Architecture of Taste",
      description: "We deconstruct the concept of sweetness, rebuilding it through texture, temperature, and time. Each creation is a sculpture meant to disappear.",
      zhTitle: "品牌哲學",
      zhSubtitle: "味覺建築",
      zhDescription: "我們解構「甜」的概念，透過質地、溫度與時間重塑。每一件作品，都是為了消逝而存在的雕塑。",
      color: "bg-zodiac-concrete",
      text: "text-zinc-300",
      hasFluid: false,
    },
    {
      id: "ingredients",
      title: "Origin",
      subtitle: "Traceable & Wild",
      description: "Vanilla from Madagascar, Matcha from Uji, Sea Salt from Brittany. We honor the raw imperfections of nature's finest materials.",
      zhTitle: "溯源與野性",
      zhSubtitle: "頂級產地",
      zhDescription: "馬達加斯加的香草、宇治的抹茶、布列塔尼的海鹽。我們以此致敬自然界中最原始且完美的瑕疵。",
      color: "bg-zinc-900",
      text: "text-zodiac-gold",
      hasFluid: false,
    },
  ];

  return (
    <main className="min-h-screen bg-zodiac-black">
      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileHome />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        {/* Sticky Deck for Intro Sections */}
        <StickyDeck>
          {stickySections.map((section, index) => (
            <StickySection
              key={section.id}
              index={index}
              total={stickySections.length}
              className={`${section.color} flex flex-col items-center justify-center p-8 md:p-24 border-b border-white/5 relative overflow-hidden`}
            >
              {section.hasFluid && <FluidBackground />}

              {/* Use specialized components for each section */}
              {section.id === 'hero' ? (
                <InteractiveHero
                  title={section.title}
                  zhTitle={section.zhTitle}
                  subtitle={section.subtitle}
                  zhSubtitle={section.zhSubtitle}
                  description={section.description}
                  zhDescription={section.zhDescription}
                />
              ) : section.id === 'philosophy' ? (
                <PhilosophySection
                  title={section.title}
                  zhTitle={section.zhTitle}
                  subtitle={section.subtitle}
                  zhSubtitle={section.zhSubtitle}
                  description={section.description}
                  zhDescription={section.zhDescription}
                />
              ) : section.id === 'ingredients' ? (
                <OriginSection
                  title={section.title}
                  zhTitle={section.zhTitle}
                  subtitle={section.subtitle}
                  zhSubtitle={section.zhSubtitle}
                  description={section.description}
                  zhDescription={section.zhDescription}
                />
              ) : (
                <div className={`max-w-6xl w-full ${section.text} relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full max-h-[80vh]`}>

                  {/* Left Column: Vertical Line & Subtitle */}
                  <div className="hidden md:flex flex-col items-center col-span-1 h-full justify-center opacity-30 border-r border-current/20 pr-8">
                    <span className="writing-vertical-rl py-8 text-xs tracking-[0.3em] uppercase rotate-180 transform">{section.subtitle}</span>
                    <div className="w-px h-24 bg-current" />
                    <span className="font-mono text-[10px] mt-4">0{index + 1}</span>
                  </div>

                  {/* Center Content : Asymmetric */}
                  <div className="col-span-1 md:col-span-8 flex flex-col items-center md:items-start text-center md:text-left space-y-12 pl-0 md:pl-12">
                    <div className="space-y-6 relative">
                      {/* Decorative Coordinates */}
                      <div className="absolute -top-12 -left-4 md:-left-12 opacity-30 font-mono text-[9px] tracking-widest hidden md:block">
                        N 25° 02' 1.5"
                      </div>

                      <h2 className="md:hidden text-xs tracking-[0.2em] uppercase opacity-70">
                        {section.subtitle} <span className="mx-2">/</span> {section.zhSubtitle}
                      </h2>
                      <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-tight leading-[0.85]">
                        {section.title}
                        <span className="block text-3xl md:text-5xl lg:text-6xl mt-6 font-zh-serif opacity-60 ml-1">
                          {section.zhTitle}
                        </span>
                      </h1>
                    </div>

                    <div className="h-px w-full max-w-[120px] bg-current opacity-30" />

                    <div className="max-w-xl space-y-6 font-light text-lg md:text-xl opacity-80 pl-0 md:pl-2 leading-relaxed">
                      <p>{section.description}</p>
                      <p className="font-zh-serif text-base md:text-lg leading-loose opacity-70">{section.zhDescription}</p>
                    </div>
                  </div>

                  {/* Right Column: Decorative Graphic */}
                  <div className="col-span-3 hidden md:flex flex-col justify-end items-end h-full opacity-20 pb-24">
                    {section.id === 'ingredients' ? (
                      <div className="text-9xl font-serif rotate-90 origin-right">∗</div>
                    ) : (
                      <div className="w-full h-px bg-current" />
                    )}
                  </div>
                </div>
              )}
            </StickySection>
          ))}
        </StickyDeck>

        {/* Horizontal Scroll Gallery Section (Scrolls naturally after sticky deck) */}
        <HorizontalGallery />

        {/* Testimonials Section */}
        <TestimonialsSection />



        {/* Chef Profile Section */}
        <ChefProfile />

        {/* Footer */}
        <footer className="relative z-50 py-24 px-8 bg-black text-white border-t border-white/10 font-light">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-3xl font-serif">MONOLITH</h3>
              <p className="text-sm opacity-60 max-w-sm">
                {t("footer.tagline")}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest opacity-50">{t("footer.visitUs")}</h4>
              <p className="opacity-80">
                No. 123, Sec. 4, Xinyi Rd.<br />
                Taipei City, Taiwan 106<br />
                <span className="text-xs opacity-50 mt-2 block">台北市信義區信義路四段 123 號</span>
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest opacity-50">{t("footer.hours")}</h4>
              <ul className="opacity-80 space-y-1">
                <li className="flex justify-between"><span>{t("footer.tueSun")}</span> <span>13:00 - 19:00</span></li>
                <li className="flex justify-between opacity-50"><span>{t("footer.mon")}</span> <span>{t("footer.closed")}</span></li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-xs opacity-40">
            <p>© 2026 MONOLITH. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsFAQOpen(true)}
                className="hover:text-zodiac-gold transition-colors opacity-100"
              >
                FAQ
              </button>
              <p>vibe coding by WU YUNG CHIEN</p>
            </div>
          </div>
        </footer>

        {/* FAQ Modal */}
        <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
      </div>
    </main>
  );
}
