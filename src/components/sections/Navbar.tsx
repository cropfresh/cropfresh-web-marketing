"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Container } from "@/components/ui";
import { trackCTAClick, trackLanguageChange } from "@/lib/analytics";
import { locales, localeNames, type Locale } from "@/i18n";
import { Globe, ChevronDown, Check, Languages } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Farmers", href: "/farmers" },
    { name: "Buyers", href: "/buyers" },
    { name: "Haulers", href: "/haulers" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [currentLocale, setCurrentLocale] = useState<Locale>("en");
    const languageRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Dynamic text colors based on scroll state
    const linkColor = isScrolled
        ? "text-[var(--color-text-secondary)] hover:text-[var(--color-accent-500)]"
        : "text-white/80 hover:text-white";
    const barColor = isScrolled ? "bg-[var(--color-text-primary)]" : "bg-white";

    // Load saved language preference
    useEffect(() => {
        const savedLocale = localStorage.getItem("cropfresh-locale") as Locale;
        if (savedLocale && locales.includes(savedLocale)) {
            setCurrentLocale(savedLocale);
            document.documentElement.lang = savedLocale;
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close language dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
                setIsLanguageOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleGetStarted = () => {
        trackCTAClick("navbar_get_started", "navbar", "/signup");
    };

    const handleLanguageChange = (locale: Locale) => {
        setCurrentLocale(locale);
        localStorage.setItem("cropfresh-locale", locale);
        document.documentElement.lang = locale;
        setIsLanguageOpen(false);

        // Track analytics
        trackLanguageChange(locale);

        // Dispatch custom event for other components to react
        window.dispatchEvent(new CustomEvent("locale-change", { detail: locale }));
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
                    : "bg-white/5 backdrop-blur-xl border-b border-white/10"
                    }`}
            >
                <Container>
                    <nav className="flex items-center justify-between h-24">
                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <div className="relative h-11 w-[180px] sm:w-[210px] transition-transform group-hover:scale-[1.03]">
                                <Image
                                    src="/logo/logo_horizontal_web.png"
                                    alt="CropFresh"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`${linkColor} transition-colors font-medium text-sm relative group ${isActive ? "!text-[var(--color-accent-500)]" : ""
                                            }`}
                                    >
                                        {link.name}
                                        <span
                                            className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--color-accent-500)] transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                                }`}
                                        />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right: Language → Login → Get Started (primary CTA rightmost) */}
                        <div className="hidden lg:flex items-center gap-3">
                            {/* 1. Language Selector (utility, least prominent) */}
                            <div ref={languageRef} className="relative">
                                <button
                                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg transition-all text-sm ${isScrolled
                                        ? "hover:bg-[var(--color-primary-500)]/5"
                                        : "hover:bg-white/10"
                                        }`}
                                    aria-label="Select language"
                                    aria-expanded={isLanguageOpen}
                                >
                                    <Languages className={`w-5 h-5 ${isScrolled ? "text-[#FF8C00]" : "text-white/90"}`} />
                                    <span className={`text-lg font-medium ${isScrolled ? "text-white/90" : "text-white/90"}`}>
                                        {localeNames[currentLocale]}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${isLanguageOpen ? "rotate-180" : ""} ${isScrolled ? "text-white/70" : "text-white/70"
                                            }`}
                                    />
                                </button>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {isLanguageOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-50 p-1"
                                        >
                                            {locales.map((locale) => (
                                                <button
                                                    key={locale}
                                                    onClick={() => handleLanguageChange(locale)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-white/10 transition-colors ${currentLocale === locale
                                                        ? "bg-white/5"
                                                        : ""
                                                        }`}
                                                >
                                                    <div className={`p-2 rounded-lg ${currentLocale === locale ? "bg-[#FF8C00]/10 text-[#FF8C00]" : "bg-white/5 text-white/70"}`}>
                                                        <Languages className="w-5 h-5" />
                                                    </div>
                                                    <span
                                                        className={`flex-1 text-base ${currentLocale === locale
                                                            ? "text-[#FF8C00] font-semibold"
                                                            : "text-white/80 font-medium"
                                                            }`}
                                                    >
                                                        {localeNames[locale]}
                                                    </span>
                                                    {currentLocale === locale && (
                                                        <Check className="w-5 h-5 text-[#FF8C00]" />
                                                    )}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Divider */}
                            <div className={`w-px h-5 ${isScrolled ? "bg-[var(--glass-border)]" : "bg-white/20"}`} />

                            {/* 2. Login (secondary — ghost button) */}
                            <Link
                                href="/login"
                                className={`px-4 py-2 rounded-lg font-medium text-base transition-all ${isScrolled
                                    ? "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-primary-500)]/5"
                                    : "text-white/85 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                Login
                            </Link>

                            {/* 3. Get Started (primary CTA — rightmost, most prominent) */}
                            <button
                                onClick={handleGetStarted}
                                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-base text-white bg-gradient-to-r from-[var(--color-accent-500)] to-[#FF8C00] hover:from-[#FF7A00] hover:to-[#FF6D00] shadow-[0_2px_12px_rgba(255,140,0,0.35)] hover:shadow-[0_4px_20px_rgba(255,140,0,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Get Started
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                                        <path d="M1 5H9M9 5L5.5 1.5M9 5L5.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </button>
                        </div>

                        {/* Mobile: Language + Menu Button */}
                        <div className="lg:hidden flex items-center gap-2">
                            {/* Mobile Language Button */}
                            <div ref={languageRef} className="relative">
                                <button
                                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${isScrolled
                                        ? "bg-glass border border-glass-border"
                                        : "bg-white/10 border border-white/20"
                                        }`}
                                    aria-label="Select language"
                                >
                                    <Languages className={`w-6 h-6 ${isScrolled ? "text-[#FF8C00]" : "text-white/90"}`} />
                                </button>

                                {/* Mobile Dropdown */}
                                <AnimatePresence>
                                    {isLanguageOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-[var(--color-surface)] border border-glass-border shadow-xl overflow-hidden z-50"
                                        >
                                            {locales.map((locale) => (
                                                <button
                                                    key={locale}
                                                    onClick={() => handleLanguageChange(locale)}
                                                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-[var(--color-primary-500)]/10 transition-colors ${currentLocale === locale
                                                        ? "bg-[var(--color-primary-500)]/5"
                                                        : ""
                                                        }`}
                                                >
                                                    <div className={`p-1.5 rounded-md ${currentLocale === locale ? "bg-[#FF8C00]/10 text-[#FF8C00]" : "bg-white/5 text-white/50"}`}>
                                                        <Languages className="w-4 h-4" />
                                                    </div>
                                                    <span
                                                        className={`flex-1 text-base ${currentLocale === locale
                                                            ? "text-[var(--color-primary-400)] font-medium"
                                                            : "text-[var(--color-text-secondary)]"
                                                            }`}
                                                    >
                                                        {localeNames[locale]}
                                                    </span>
                                                    {currentLocale === locale && (
                                                        <Check className="w-3.5 h-3.5 text-[var(--color-primary-400)]" />
                                                    )}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                                aria-label="Toggle menu"
                            >
                                <motion.span
                                    animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                    className={`w-6 h-0.5 ${barColor} transition-colors`}
                                />
                                <motion.span
                                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                    className={`w-6 h-0.5 ${barColor} transition-colors`}
                                />
                                <motion.span
                                    animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                    className={`w-6 h-0.5 ${barColor} transition-colors`}
                                />
                            </button>
                        </div>
                    </nav>
                </Container>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 lg:hidden pt-20"
                    >
                        <div
                            className="absolute inset-0 bg-[var(--color-background)]/95 backdrop-blur-xl"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.nav
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="relative bg-[var(--color-surface)] border-b border-[var(--glass-border)]"
                        >
                            <Container className="py-6">
                                <div className="flex flex-col gap-4">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 * index }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block py-3 text-xl font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-500)] transition-colors border-b border-[var(--glass-border)]"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    <div className="flex flex-col gap-3 pt-4">
                                        <Link
                                            href="/login"
                                            className="text-center py-3 text-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors font-medium"
                                        >
                                            Login
                                        </Link>
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            onClick={() => {
                                                handleGetStarted();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full"
                                        >
                                            Get Started
                                        </Button>
                                    </div>
                                </div>
                            </Container>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
