"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";
import { locales, localeNames, type Locale } from "@/i18n";
import { trackCTAClick, trackLanguageChange } from "@/lib/analytics";

const links = [
  { label: "Farmer demo", href: "/farmers" },
  { label: "Buyer demo", href: "/buyers" },
  { label: "Delivery partners", href: "/haulers" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "AI demo", href: "/ai" },
];

export function AgricultureNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    queueMicrotask(() => {
      onScroll();
      try {
        const saved = localStorage.getItem("cropfresh-locale");
        if (saved && locales.includes(saved as Locale)) setLocale(saved as Locale);
      } catch {
        // The public navigation remains usable when browser storage is blocked.
      }
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const changeLocale = (next: Locale) => {
    setLocale(next);
    try { localStorage.setItem("cropfresh-locale", next); } catch { /* Use the current-session preference. */ }
    trackLanguageChange(next);
    window.dispatchEvent(new CustomEvent("locale-change", { detail: next }));
  };

  const getStarted = () => {
    trackCTAClick("navbar_get_started", "navbar", "/#choose-role");
    setIsMenuOpen(false);
  };

  const languageSelect = (id: string) => (
    <select id={id} aria-label="Preferred language" className="agri-language" value={locale} onChange={(event) => changeLocale(event.target.value as Locale)}>
      {locales.map((value) => <option key={value} value={value}>{localeNames[value]}</option>)}
    </select>
  );

  return (
    <>
      <header className={`agri-navbar ${isScrolled ? "agri-navbar-scrolled" : ""}`}>
        <Container>
          <div className="agri-nav-inner">
            <Link href="/" aria-label="CropFresh home" className="agri-brand" onClick={() => setIsMenuOpen(false)}>
              <Image src="/logo/logo_horizontal_web.png" alt="CropFresh" width={176} height={29} priority />
            </Link>
            <nav className="agri-desktop-links" aria-label="Main navigation">
              {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
            </nav>
            <div className="agri-nav-actions">
              {languageSelect("desktop-language")}
              <Link href="/#choose-role" className="agri-button agri-button-harvest" onClick={getStarted}>Get started<ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
            <div className="agri-mobile-actions">
              {languageSelect("mobile-language")}
              <button ref={menuButton} className="agri-menu-toggle" aria-label={isMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={isMenuOpen} aria-controls="agri-mobile-navigation" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </Container>
      </header>
      {isMenuOpen && <div className="agri-mobile-menu">
        <button className="agri-menu-backdrop" aria-label="Close navigation" tabIndex={-1} onClick={() => setIsMenuOpen(false)} />
        <nav id="agri-mobile-navigation" aria-label="Mobile navigation">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setIsMenuOpen(false)}>Home</Link>
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setIsMenuOpen(false)}>{link.label}</Link>)}
          <Link href="/#choose-role" className="agri-button agri-button-harvest" onClick={getStarted}>Find your path<ArrowRight size={17} aria-hidden="true" /></Link>
        </nav>
      </div>}
    </>
  );
}
