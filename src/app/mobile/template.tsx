"use client";

import { PageTransition } from "@/components/mobile/page-transition";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <PageTransition>
            {children}
        </PageTransition>
    );
}
