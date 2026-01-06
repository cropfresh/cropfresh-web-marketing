import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
    // List of all supported locales
    locales,

    // Default locale when no locale is detected
    defaultLocale,

    // Use 'as-needed' to only show locale prefix for non-default locales
    // e.g., / for English, /kn for Kannada
    localePrefix: "as-needed",
});

export const config = {
    // Match all paths except for:
    // - API routes
    // - Next.js internals (_next)
    // - Static files (favicon, images, etc.)
    matcher: [
        // Match all pathnames except for
        "/((?!api|_next|_vercel|.*\\..*).*)",
        // Match root
        "/",
    ],
};
