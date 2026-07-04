"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, setLocale } = useLocale();
  const isMobile = pathname?.startsWith("/mobile");

  if (isMobile) return null;

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

  const navItemClass =
    "px-4 py-2 text-xs uppercase tracking-widest text-white/72 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zodiac-gold";

  return (
    <motion.header
      className="pointer-events-none fixed left-0 top-0 z-50 w-full px-6 py-5 text-white md:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-28 border-b border-white/5 bg-[radial-gradient(circle_at_50%_0%,rgba(160,128,96,0.18),transparent_34%),linear-gradient(180deg,rgba(7,7,7,0.94),rgba(7,7,7,0.68)_58%,transparent)] backdrop-blur-md"
      />

      <div className="relative flex items-center justify-between">
        <Link
          href="/"
          className="pointer-events-auto border border-white/10 bg-black/45 px-3 py-2 shadow-[0_18px_60px_-34px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors hover:border-zodiac-gold/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zodiac-gold"
        >
          <div className="flex flex-col leading-none group cursor-pointer">
            <span className="text-xl font-serif tracking-tight text-white transition-opacity group-hover:opacity-80">
              MONOLITH
            </span>
            <span className="text-[10px] font-zh-serif tracking-widest text-white/58 transition-opacity group-hover:text-zodiac-gold/80">
              原石結構
            </span>
          </div>
        </Link>

        <nav className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 border border-white/10 bg-black/55 px-3 py-2 shadow-[0_18px_80px_-38px_rgba(0,0,0,0.95)] backdrop-blur-xl md:flex">
          <button onClick={handleMenuClick} className={navItemClass}>
            Menu / 菜單
          </button>
          <Link href="/craft" className={navItemClass}>
            The Craft / 工藝
          </Link>
          <Link href="/insights" className={navItemClass}>
            Insights / 洞見
          </Link>

          {/* Language Toggle - 中/英 or CN/EN mode */}
          <div className="ml-2 flex items-center gap-1 border-l border-white/10 pl-3 text-xs tracking-widest">
            <button
              onClick={() => setLocale("zh-TW")}
              className={`px-2 py-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zodiac-gold ${
                locale === "zh-TW"
                  ? "text-white"
                  : "text-white/42 hover:text-white/75"
              }`}
            >
              {locale === "zh-TW" ? "中" : "CN"}
            </button>
            <span className="text-white/25">/</span>
            <button
              onClick={() => setLocale("en-US")}
              className={`px-2 py-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zodiac-gold ${
                locale === "en-US"
                  ? "text-white"
                  : "text-white/42 hover:text-white/75"
              }`}
            >
              {locale === "zh-TW" ? "英" : "EN"}
            </button>
          </div>
        </nav>

        <Link
          href="/reservation"
          className="pointer-events-auto group relative overflow-hidden border border-white/20 bg-black/55 px-5 py-3 shadow-[0_18px_70px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-colors hover:border-zodiac-gold/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zodiac-gold"
        >
          <span className="relative z-10 font-mono text-xs uppercase tracking-widest text-white/78 transition-colors duration-300 group-hover:text-black">
            Order / 預約取貨
          </span>
          <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
        </Link>
      </div>
    </motion.header>
  );
}
