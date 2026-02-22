"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import {
    Instagram, Linkedin, Twitter, Youtube,
    Mail, Phone, MapPin, ArrowRight, Check,
    Heart
} from "lucide-react";

/* ─── Data ─── */
const navigation = {
    product: [
        { name: "For Farmers", href: "/farmers" },
        { name: "For Buyers", href: "/buyers" },
        { name: "For Haulers", href: "/haulers" },
        { name: "Pricing", href: "/pricing" },
        { name: "Download App", href: "#download" },
    ],
    company: [
        { name: "About Us", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Press Kit", href: "/press" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Refund Policy", href: "/refund" },
        { name: "Cookie Policy", href: "/cookies" },
    ],
    social: [
        { name: "Instagram", href: "https://instagram.com/cropfresh", icon: Instagram },
        { name: "LinkedIn", href: "https://linkedin.com/company/cropfresh", icon: Linkedin },
        { name: "Twitter", href: "https://twitter.com/cropfresh", icon: Twitter },
        { name: "YouTube", href: "https://youtube.com/@cropfresh", icon: Youtube },
    ],
};

/* ─── Footer Component ─── */
export function Footer() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail("");
        }
    };

    return (
        <footer className="relative overflow-hidden bg-[var(--color-background-alt)] border-t border-[var(--glass-border)] pt-4">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary-500)]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent-500)]/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Top accent — 10% accent orange stripe */}
            <div
                className="h-1 bg-gradient-to-r from-[var(--color-primary-500)] via-[var(--color-accent-500)] to-[var(--color-primary-500)]"
            />

            {/* ── Newsletter Banner ── */}
            <div className="relative z-10 pt-10 pb-6 border-b border-[var(--glass-border)]/50">
                <Container>
                    <div className="p-8 md:p-10 rounded-3xl glass-card relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Subtle Card Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-500)]/5 to-[var(--color-accent-500)]/5 pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="font-display font-bold text-xl mb-1 text-[var(--color-text-inverse)]">
                                Stay updated with CropFresh
                            </h3>
                            <p className="text-sm text-[var(--color-text-muted)]">
                                Get the latest news on features, farmer stories, and market insights.
                            </p>
                        </div>

                        <div className="w-full md:w-auto relative z-10">
                            {isSubscribed ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-2 text-sm font-medium text-[var(--color-success)]"
                                >
                                    <Check className="w-4 h-4" />
                                    Thanks for subscribing!
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-1 md:w-64 px-4 py-2.5 rounded-lg text-sm glass text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)] transition-colors"
                                        required
                                    />
                                    {/* 10% ACCENT — CTA button uses accent orange */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-sm flex items-center gap-1.5"
                                    >
                                        Subscribe
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </Container>
            </div>

            {/* ── Main Footer Grid ── */}
            <Container className="py-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-20 w-full text-center lg:text-left">
                    {/* Brand Column */}
                    <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start">
                        <Link href="/" className="inline-flex items-center justify-center lg:justify-start gap-3 mb-8 transition-transform hover:scale-105 duration-300">
                            <Image
                                src="/logo/cropfresh-logo.png"
                                alt="CropFresh"
                                width={180}
                                height={46}
                                className="h-10 w-auto drop-shadow-lg object-contain"
                            />
                        </Link>

                        <p className="text-sm leading-relaxed mb-10 max-w-sm text-[var(--color-text-secondary)]">
                            Rewriting the code of agriculture. Farm-fresh produce,
                            direct from farmers to buyers, powered by AI and transparency.
                        </p>

                        {/* Contact */}
                        <div className="space-y-5 mb-10 flex flex-col items-center lg:items-start w-full">
                            <a
                                href="mailto:hello@cropfresh.ai"
                                className="flex items-center gap-4 text-sm transition-all duration-300 group text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                            >
                                <div className="w-10 h-10 rounded-full glass border border-[var(--color-accent-500)]/30 flex items-center justify-center group-hover:bg-[var(--color-primary-500)]/20 group-hover:border-[var(--color-primary-500)]/40 transition-all shadow-sm">
                                    <Mail className="w-4 h-4 text-[var(--color-accent-400)] group-hover:text-[var(--color-primary-500)] group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="tracking-wide">hello@cropfresh.ai</span>
                            </a>
                            <a
                                href="tel:+918001234567"
                                className="flex items-center gap-4 text-sm transition-all duration-300 group text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                            >
                                <div className="w-10 h-10 rounded-full glass border border-[var(--color-accent-500)]/30 flex items-center justify-center group-hover:bg-[var(--color-primary-500)]/20 group-hover:border-[var(--color-primary-500)]/40 transition-all shadow-sm">
                                    <Phone className="w-4 h-4 text-[var(--color-accent-400)] group-hover:text-[var(--color-primary-500)] group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="tracking-wide">+91 800 123 4567</span>
                            </a>
                            <div className="flex items-start lg:items-center gap-4 text-sm text-[var(--color-text-muted)] group">
                                <div className="w-10 h-10 rounded-full glass border border-[var(--color-accent-500)]/30 flex shrink-0 items-center justify-center group-hover:bg-[var(--color-primary-500)]/20 group-hover:border-[var(--color-primary-500)]/40 transition-all shadow-sm">
                                    <MapPin className="w-4 h-4 text-[var(--color-accent-400)] group-hover:text-[var(--color-primary-500)]" />
                                </div>
                                <span className="tracking-wide text-center lg:text-left max-w-[200px]">Bangalore, Karnataka, India</span>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="flex justify-center lg:justify-start gap-4">
                            {navigation.social.map((item, idx) => {
                                const Icon = item.icon;
                                const hoverClass = idx % 2 === 0
                                    ? "hover:bg-[var(--color-primary-500)]/20 hover:border-[var(--color-primary-500)]/50 hover:shadow-[var(--glow-primary)]"
                                    : "hover:bg-[var(--color-accent-500)]/20 hover:border-[var(--color-accent-500)]/50 hover:shadow-[var(--glow-accent)]";

                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 glass group border border-[var(--color-accent-500)]/30 ${hoverClass}`}
                                        aria-label={item.name}
                                    >
                                        <Icon className={`w-5 h-5 text-[var(--color-accent-400)] transition-colors duration-300 ${idx % 2 === 0 ? "group-hover:text-[var(--color-primary-500)]" : "group-hover:text-[var(--color-accent-500)]"}`} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links Columns Container */}
                    <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 lg:pt-3">
                        {/* Product */}
                        <div className="flex flex-col items-center lg:items-start w-full">
                            <h4 className="font-semibold text-sm uppercase tracking-wider mb-8 text-[var(--color-primary-400)]">
                                Product
                            </h4>
                            <ul className="space-y-4">
                                {navigation.product.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-primary-400)] relative group inline-flex"
                                        >
                                            <span>{item.name}</span>
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary-500)] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col items-center lg:items-start w-full">
                            <h4 className="font-semibold text-sm uppercase tracking-wider mb-8 text-[var(--color-primary-400)]">
                                Company
                            </h4>
                            <ul className="space-y-4">
                                {navigation.company.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-accent-400)] relative group inline-flex"
                                        >
                                            <span>{item.name}</span>
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-accent-500)] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="flex flex-col items-center lg:items-start w-full">
                            <h4 className="font-semibold text-sm uppercase tracking-wider mb-8 text-[var(--color-primary-400)]">
                                Legal
                            </h4>
                            <ul className="space-y-4">
                                {navigation.legal.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-primary-400)] relative group inline-flex"
                                        >
                                            <span>{item.name}</span>
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary-500)] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>

            {/* ── Bottom Bar ── */}
            <div className="relative z-10 border-t border-[var(--glass-border)] bg-[var(--color-background)]/30 backdrop-blur-md">
                <Container>
                    <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-[var(--color-text-muted)] tracking-wide">
                            © {new Date().getFullYear()} CropFresh Technologies Pvt. Ltd. All rights reserved.
                        </p>

                        <p className="text-xs flex items-center gap-2 text-[var(--color-text-muted)] font-medium">
                            Made with
                            <Heart className="w-4 h-4 fill-[var(--color-primary-500)] text-[var(--color-primary-500)] animate-pulse" />
                            for Indian Farmers
                        </p>
                    </div>
                </Container>
            </div>
        </footer >
    );
}
