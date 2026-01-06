import { getRequestConfig } from "next-intl/server";

// Supported locales
export const locales = ["en", "kn", "hi"] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = "en";

// Locale display names
export const localeNames: Record<Locale, string> = {
    en: "English",
    kn: "ಕನ್ನಡ",
    hi: "हिंदी",
};

// Load messages for the requested locale
export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;

    // Check if requested locale is valid, fallback to default
    const locale = locales.includes(requested as Locale)
        ? (requested as Locale)
        : defaultLocale;

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
