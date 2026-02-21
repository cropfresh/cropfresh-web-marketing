// i18n configuration for CropFresh Marketing Site
// Note: Full locale routing disabled for now - using simple config

export const locales = ["en", "kn", "hi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
    en: "English",
    kn: "ಕನ್ನಡ",
    hi: "हिंदी",
};

// For future: when enabling full i18n routing, use next-intl properly
// with [locale] folder structure in app directory
