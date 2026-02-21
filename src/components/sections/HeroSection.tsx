"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image"; // Added Image import
import { Container } from "@/components/ui";
import {
    heroStagger,
    heroChildFade,
    counterReveal,
    staggerContainer,
} from "@/lib/animations";
import { trackCTAClick } from "@/lib/analytics";
import {
    Sprout,
    Truck,
    IndianRupee,
    ChevronDown,
    Leaf,
    Mic,
    Scan,
    CheckCircle2,
    Languages,
    TrendingUp,
    ShieldCheck,
    HandCoins,
    PackageCheck
} from "lucide-react";

/* ─── Data ────────────────────────────────────────────── */

const rotatingWords = ["Farmers", "Buyers", "Haulers", "India", "Farmers"];

const stats = [
    { value: 35, suffix: "%+", label: "Farmer Income Boost", Icon: TrendingUp },
    { value: 25, suffix: "%", label: "Less Wastage", Icon: ShieldCheck },
    { value: 0, suffix: "Same Day", label: "UPI Payments", Icon: HandCoins },
    { value: 40, suffix: "%", label: "Logistics Savings", Icon: PackageCheck },
];

/* ─── Animated Counter ────────────────────────────────── */

function AnimatedNumber({
    value,
    suffix,
    prefix = "",
    isVisible,
}: {
    value: number;
    suffix: string;
    prefix?: string;
    isVisible: boolean;
}) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isVisible || hasAnimated.current || value === 0) return;
        hasAnimated.current = true;

        const duration = 2500;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value, isVisible]);

    if (value === 0) {
        return <span>{suffix}</span>;
    }

    return (
        <span className="tabular-nums">
            {prefix}
            {count.toLocaleString("en-IN")}
            {suffix}
        </span>
    );
}

/* ─── Word Rotator ────────────────────────────────────── */

function WordRotator({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % (words.length - 1));
        }, 2800);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <span className="word-rotator inline-block" style={{ height: "1.15em", overflow: "hidden" }}>
            <motion.span
                key={index}
                initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-block"
                style={{
                    color: "#FFA726",
                    textShadow: "0 2px 10px rgba(255,167,38,0.4)",
                }}
            >
                {words[index]}
            </motion.span>
        </span>
    );
}

/* ─── Bento Tech Cards ────────────────────────────────── */

function VoiceTranslationCard() {
    const langs = ["Kannada", "Hindi", "Telugu", "Tamil", "Marathi", "English"];
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIdx(i => (i + 1) % langs.length), 2000);
        return () => clearInterval(interval);
    }, [langs.length]);

    return (
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-2xl shadow-2xl w-56 z-20 hidden md:block"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-full">
                    <Mic className="text-blue-400" size={16} />
                </div>
                <span className="text-sm font-semibold text-white">Voice AI</span>
            </div>
            <p className="text-xs text-white/70 mb-2 font-medium">Translating to {langs[idx]}...</p>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    key={idx}
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1.8, ease: "linear" }}
                    className="h-full bg-blue-400"
                />
            </div>
        </motion.div>
    );
}

function AIDigitalTwinCard() {
    return (
        <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-32 -left-6 w-72 sm:w-80 rounded-2xl p-5 border shadow-2xl z-30 overflow-hidden hidden sm:block"
            style={{
                background: "rgba(20, 20, 20, 0.4)",
                backdropFilter: "blur(24px)",
                borderColor: "rgba(255,255,255,0.08)",
            }}
        >
            {/* Realistic Tomato Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero/tomato.png"
                    alt="Digital Twin Quality Analysis"
                    fill
                    className="object-cover opacity-[0.65] mix-blend-screen scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/80 to-transparent"></div>
            </div>

            {/* Card Content Overlay */}
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[var(--color-primary-500)]/20 rounded-xl border border-[var(--color-primary-400)]/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                            <Scan className="text-[var(--color-primary-400)]" size={16} />
                        </div>
                        <span className="text-base font-semibold text-white tracking-wide">Digital Twin</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-primary-400)] bg-[var(--color-primary-400)]/10 border border-[var(--color-primary-500)]/20 px-2.5 py-1 rounded-full">Verified</span>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-xs border-b border-white/10 pb-2">
                        <span className="text-white/60">Quality Grade</span>
                        <span className="text-white font-mono font-medium">A-Premium</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-white/60">Shelf Life</span>
                        <span className="text-white font-mono font-medium">14 Days</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function UPISettlementCard() {
    return (
        <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-6 -right-2 w-64 rounded-2xl p-5 border shadow-2xl z-20 overflow-hidden hidden md:block"
            style={{
                background: "rgba(20, 20, 20, 0.4)",
                backdropFilter: "blur(24px)",
                borderColor: "rgba(255,255,255,0.08)",
            }}
        >
            {/* Realistic Truck Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero/truck.png"
                    alt="Logistics Network"
                    fill
                    className="object-cover opacity-[0.55] mix-blend-screen scale-110 object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/80 to-transparent"></div>
            </div>

            {/* Card Content Overlay */}
            <div className="relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 rounded-xl border border-emerald-400/30 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                        <CheckCircle2 className="text-emerald-400" size={16} />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold text-white tracking-wide">Fund Settled</h4>
                        <p className="text-[11px] text-white/60 font-medium">Instant T+0 UPI Transfer</p>
                    </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-sm">
                    <span className="text-white/60">Farmer AC</span>
                    <span className="text-emerald-400 font-bold tracking-tight text-base">₹12,450</span>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Hero Section ────────────────────────────────────── */

export function HeroSection() {
    const [statsVisible, setStatsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setStatsVisible(true);
                });
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    const handleCTAClick = useCallback(
        (userType: string, path: string) => {
            trackCTAClick(`hero_${userType}_cta`, "hero_section", path);
        },
        []
    );

    const scrollToNext = useCallback(() => {
        document.querySelector("#problems")?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <section
            ref={sectionRef}
            id="hero"
            role="banner"
            aria-label="CropFresh — Farm-Fresh Produce, Direct to You"
            className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden bg-black"
        >
            {/* ─── Layer 1: Animated Mesh Background ─── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen opacity-20 filter blur-[120px]"
                    style={{ background: "radial-gradient(circle, #FF8C00 0%, transparent 70%)" }}
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full mix-blend-screen opacity-20 filter blur-[100px]"
                    style={{ background: "radial-gradient(circle, #2E7D32 0%, transparent 70%)" }}
                />
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full mix-blend-screen opacity-10 filter blur-[80px]"
                    style={{ background: "radial-gradient(circle, #00BFA5 0%, transparent 70%)" }}
                />
            </div>

            {/* ─── Layer 1: Enhanced Grid Pattern ─── */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] z-10" />

            {/* ─── Layer 2: Main Content (Two Columns) ─── */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center pt-[140px] pb-12">
                <Container className="w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl mx-auto max-w-7xl">

                        {/* Left Column: Typography */}
                        <motion.div
                            variants={heroStagger}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-6 flex flex-col items-start text-left"
                        >

                            {/* Headline */}
                            <motion.h1
                                variants={heroChildFade}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight"
                            >
                                Empowering <WordRotator words={rotatingWords} />.<br />
                                <span className="text-[#FF8C00]">Zero Middlemen.</span> Pure Intelligence.
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                variants={heroChildFade}
                                className="text-base md:text-lg lg:text-lg text-white/70 max-w-lg mb-6 leading-relaxed font-light"
                            >
                                India's first AI-powered Agri-Intelligence Marketplace.
                                Farmers get 0% commission and T+0 payments.
                                Buyers get 25% lower costs with AI-verified 'Digital Twin' quality.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={heroChildFade}
                                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-0"
                            >
                                <button
                                    className="px-8 py-4 rounded-xl bg-[#FF8C00] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#E67E22] transition-colors shadow-lg shadow-[#FF8C00]/20 group"
                                    onClick={() => handleCTAClick("market", "/join")}
                                >
                                    Join the Marketplace
                                </button>
                                <button
                                    className="px-8 py-4 rounded-xl bg-white/5 text-white font-semibold flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10 transition-colors group"
                                    onClick={() => document.querySelector("#ai-tech")?.scrollIntoView({ behavior: "smooth" })}
                                >
                                    See How AI Works
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Floating Bento Box Cards */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="lg:col-span-6 relative w-full h-[320px] sm:h-[360px] lg:h-[400px] mt-8 lg:mt-0"
                        >
                            {/* Central Abstract Platform Map */}
                            <div className="absolute inset-4 sm:inset-10 bg-gradient-to-br from-white/5 to-white/[0.01] backdrop-blur-sm border border-white/5 rounded-[2rem] overflow-hidden shadow-xl flex items-center justify-center transform scale-95 lg:scale-100 origin-center">
                                {/* Dot Matrix Map Background */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />

                                {/* Central App Mockup Concept */}
                                <div className="relative w-48 h-64 sm:w-56 sm:h-80 bg-black/40 rounded-3xl border border-white/10 flex flex-col p-4 backdrop-blur-md shadow-2xl overflow-hidden">
                                    <div className="w-full flex justify-between items-center mb-6">
                                        <div className="w-1/2 h-4 bg-white/10 rounded-full" />
                                        <div className="w-8 h-8 rounded-full bg-white/5" />
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div className="w-full h-32 bg-gradient-to-tr from-[#FF8C00]/20 to-[#2E7D32]/20 rounded-2xl" />
                                        <div className="w-3/4 h-3 bg-white/10 rounded-full" />
                                        <div className="w-1/2 h-3 bg-white/10 rounded-full" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
                                </div>
                            </div>

                            {/* Floating Tech Cards */}
                            <VoiceTranslationCard />
                            <AIDigitalTwinCard />
                            <UPISettlementCard />
                        </motion.div>
                    </div>
                </Container>
            </div>

            {/* ─── Layer 3: Single Bento Trust Box ─── */}
            <div className="relative z-20 w-full mt-auto pb-12 px-4 md:px-8">
                <motion.div
                    ref={statsRef}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10px" }}
                    className="max-w-7xl mx-auto flex justify-center"
                >
                    {/* Unified Bento Box */}
                    <motion.div
                        variants={heroChildFade}
                        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-around gap-6 shadow-2xl transition-all hover:bg-white/10 w-full"
                    >
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center min-w-[160px]">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                                        <stat.Icon size={20} className="text-[#FF8C00]" aria-hidden="true" />
                                    </div>
                                    <p className="stat-value text-3xl font-light text-white leading-none">
                                        <AnimatedNumber
                                            value={stat.value}
                                            suffix={stat.suffix}
                                            isVisible={statsVisible}
                                        />
                                    </p>
                                </div>
                                <p className="text-sm text-white/60 font-medium tracking-wide text-center">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* ─── Scroll Indicator ─── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[15] hidden md:flex flex-col items-center gap-1 cursor-pointer group" // Hidden on mobile to save space
                onClick={scrollToNext}
            >
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium group-hover:text-white/80 transition-colors">
                    Explore
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown size={18} className="text-white/40 group-hover:text-[#FF8C00] transition-colors" />
                </motion.div>
            </motion.div>
        </section>
    );
}

