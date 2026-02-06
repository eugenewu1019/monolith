"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import zhTW from "./zh-TW.json";
import enUS from "./en-US.json";

export type Locale = "zh-TW" | "en-US";

type TranslationData = typeof zhTW;

const translations: Record<Locale, TranslationData> = {
    "zh-TW": zhTW,
    "en-US": enUS,
};

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>("zh-TW");

    const t = useCallback((key: string, params?: Record<string, string>): string => {
        const keys = key.split(".");
        let value: unknown = translations[locale];

        for (const k of keys) {
            if (value && typeof value === "object" && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        let translation = typeof value === "string" ? value : key;

        if (params) {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                translation = translation.replace(`{${paramKey}}`, paramValue);
            });
        }

        return translation;
    }, [locale]);

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useTranslation must be used within a LanguageProvider");
    }
    return context;
}

export function useLocale() {
    const { locale, setLocale } = useTranslation();
    return { locale, setLocale };
}
