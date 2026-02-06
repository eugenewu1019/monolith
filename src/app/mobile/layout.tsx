"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MobileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    // Force dark mode and specialized viewport settings for mobile
    useEffect(() => {
        document.documentElement.classList.add("dark");
        // Prevent bounce scroll on body
        document.body.style.overscrollBehavior = "none";

        // Desktop Guard: Redirect to / if width > 768px
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                router.replace("/");
            }
        };

        // Check on mount
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            document.body.style.overscrollBehavior = "auto";
            window.removeEventListener("resize", handleResize);
        };
    }, [router]);

    return (
        <div className="min-h-screen bg-zodiac-black text-white relative overflow-hidden flex flex-col">
            {/* Safe Area Top Spacer (Dynamic Island) */}
            <div className="h-[env(safe-area-inset-top)] bg-black/20 w-full fixed top-0 z-[100] backdrop-blur-sm pointer-events-none" />

            {/* Main Content Area */}
            {/* Padding bottom 80px (16px * 5) to account for BottomNav + Safe Area */}
            <main className="flex-1 overflow-y-auto pb-24 pt-[env(safe-area-inset-top)] safe-area-top">
                {children}
            </main>


        </div>
    );
}
