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
        <footer className="relative" style={{ background: "var(--color-neutral-900)" }}>
            {/* Top accent — 10% accent orange stripe */}
            <div
                className="h-1"
                style={{ background: "linear-gradient(to right, var(--color-primary-500), var(--color-accent-500), var(--color-primary-500))" }}
            />

            {/* ── Newsletter Banner ── */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <Container>
                    <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3
                                className="font-display font-bold text-xl mb-1"
                                style={{ color: "var(--color-text-inverse)" }}
                            >
                                Stay updated with CropFresh
                            </h3>
                            <p style={{ color: "var(--color-text-muted)" }} className="text-sm">
                                Get the latest news on features, farmer stories, and market insights.
                            </p>
                        </div>

                        <div className="w-full md:w-auto">
                            {isSubscribed ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-2 text-sm font-medium"
                                    style={{ color: "var(--color-success)" }}
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
                                        className="flex-1 md:w-64 px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-colors"
                                        style={{
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            color: "var(--color-text-inverse)",
                                        }}
                                        required
                                    />
                                    {/* 10% ACCENT — CTA button uses accent orange */}
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 hover:opacity-90"
                                        style={{
                                            background: "var(--color-accent-500)",
                                            color: "var(--color-text-inverse)",
                                        }}
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
            <Container className="py-14">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2 sm:col-span-3 lg:col-span-4">
                        <Link href="/" className="inline-flex items-center gap-3 mb-5">
                            <Image
                                src="/logo/cropfresh-logo.png"
                                alt="CropFresh"
                                width={140}
                                height={36}
                                className="h-9 w-auto"
                            />
                        </Link>

                        <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "var(--color-text-muted)" }}>
                            Rewriting the code of agriculture. Farm-fresh produce,
                            direct from farmers to buyers, powered by AI and transparency.
                        </p>

                        {/* Contact — 30% primary green for icons */}
                        <div className="space-y-2.5 mb-6">
                            <a
                                href="mailto:hello@cropfresh.ai"
                                className="flex items-center gap-2.5 text-sm transition-colors group"
                            >
                                <Mail className="w-4 h-4" style={{ color: "var(--color-primary-500)" }} />
                                <span className="group-hover:text-white transition-colors" style={{ color: "var(--color-text-muted)" }}>
                                    hello@cropfresh.ai
                                </span>
                            </a>
                            <a
                                href="tel:+918001234567"
                                className="flex items-center gap-2.5 text-sm transition-colors group"
                            >
                                <Phone className="w-4 h-4" style={{ color: "var(--color-primary-500)" }} />
                                <span className="group-hover:text-white transition-colors" style={{ color: "var(--color-text-muted)" }}>
                                    +91 800 123 4567
                                </span>
                            </a>
                            <div className="flex items-start gap-2.5 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-primary-500)" }} />
                                <span style={{ color: "var(--color-text-muted)" }}>
                                    Bangalore, Karnataka, India
                                </span>
                            </div>
                        </div>

                        {/* Social — primary green hover */}
                        <div className="flex gap-2">
                            {navigation.social.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-105"
                                        style={{
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            color: "var(--color-text-muted)",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "var(--color-primary-500)";
                                            e.currentTarget.style.borderColor = "var(--color-primary-500)";
                                            e.currentTarget.style.color = "var(--color-neutral-900)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                            e.currentTarget.style.color = "var(--color-text-muted)";
                                        }}
                                        aria-label={item.name}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Product */}
                    <div className="lg:col-span-2">
                        <h4
                            className="font-semibold text-sm uppercase tracking-wider mb-4"
                            style={{ color: "var(--color-primary-400)" }}
                        >
                            Product
                        </h4>
                        <ul className="space-y-2.5">
                            {navigation.product.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="lg:col-span-2">
                        <h4
                            className="font-semibold text-sm uppercase tracking-wider mb-4"
                            style={{ color: "var(--color-primary-400)" }}
                        >
                            Company
                        </h4>
                        <ul className="space-y-2.5">
                            {navigation.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="lg:col-span-2">
                        <h4
                            className="font-semibold text-sm uppercase tracking-wider mb-4"
                            style={{ color: "var(--color-primary-400)" }}
                        >
                            Legal
                        </h4>
                        <ul className="space-y-2.5">
                            {navigation.legal.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>

            {/* ── Bottom Bar ── */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <Container>
                    <div className="py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                        <p className="text-xs" style={{ color: "var(--color-neutral-500)" }}>
                            © {new Date().getFullYear()} CropFresh Technologies Pvt. Ltd. All rights reserved.
                        </p>

                        <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--color-neutral-500)" }}>
                            Made with
                            <Heart className="w-3 h-3 fill-current" style={{ color: "var(--color-primary-500)" }} />
                            for Indian Farmers
                        </p>
                    </div>
                </Container>
            </div>
        </footer>
    );
}
