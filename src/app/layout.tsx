import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/smooth-scroll";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import Header from "@/components/ui/header";
import { BottomNav } from "@/components/mobile/bottom-nav";
import { Providers } from "@/components/providers/providers";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["400", "500", "700"],
  subsets: ["latin"], // Noto Serif TC might not have specific subsets or handled automatically
  preload: false, // Often needed for large CJK fonts
  display: "swap",
});

export const metadata: Metadata = {
  title: "MONOLITH | High-End Patisserie",
  description: "Artisanal desserts in a gallery-inspired setting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="dark">
      <body
        className={`${cormorant.variable} ${inter.variable} ${notoSerifTC.variable} antialiased bg-zodiac-black text-zodiac-white`}
      >
        <NoiseOverlay />
        <Providers>
          <div className="hidden md:block">
            <Header />
          </div>
          <div className="block md:hidden">
            <BottomNav />
          </div>
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
