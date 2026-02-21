"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
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

/* ─── Feature Showcase Drawer ───────────────────────────── */

const showcaseItems = [
    {
        id: "source",
        title: "Direct from Source",
        description: "Zero middlemen markup. Connect directly with India's farmers.",
        image: "/images/hero/farmer.png",
        icon: <Sprout className="w-5 h-5 text-[#FF8C00]" />,
        bgClass: "bg-[#FF8C00]/20 border-[#FF8C00]/30",
        progressClass: "bg-[#FF8C00]"
    },
    {
        id: "quality",
        title: "AI Quality Verified",
        description: "Digital Twin scanning ensures premium A-Grade freshness.",
        image: "/images/hero/tomato.png",
        icon: <Scan className="w-5 h-5 text-emerald-400" />,
        bgClass: "bg-emerald-500/20 border-emerald-500/30",
        progressClass: "bg-emerald-500"
    },
    {
        id: "logistics",
        title: "Instant Settlement",
        description: "T+0 UPI payments with reliable, fast logistics tracking.",
        image: "/images/hero/truck.png",
        icon: <CheckCircle2 className="w-5 h-5 text-blue-400" />,
        bgClass: "bg-blue-500/20 border-blue-500/30",
        progressClass: "bg-blue-500"
    }
];

function FeatureShowcaseDrawer() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % showcaseItems.length);
        }, 4500); // 4.5 seconds per slide
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl group flex flex-col bg-[#0A0D14]/60 backdrop-blur-xl border border-white/10">
            {/* Full Width Image Slider Area */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-black/80">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={showcaseItems[activeIndex].image}
                            alt={showcaseItems[activeIndex].title}
                            fill
                            className="object-cover opacity-80"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/10 to-transparent"></div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Consolidated Floating Card (Badge + Text) - Ultra-Slim Horizontal Layout */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-[480px] z-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative flex flex-row items-center gap-3 md:gap-4 py-2.5 px-4 md:py-3 md:px-5 rounded-2xl overflow-hidden box-border backdrop-blur-xl bg-[#0A0D14]/70 border border-white/10 shadow-2xl"
                    >
                        {/* Background subtle highlight */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        />

                        {/* Icon - Left Side */}
                        <div className={`relative z-10 p-1.5 md:p-2 rounded-xl backdrop-blur-md border ${showcaseItems[activeIndex].bgClass} shadow-sm shrink-0`}>
                            {showcaseItems[activeIndex].icon}
                        </div>

                        {/* Text - Right Side (Stacked, Single Line) */}
                        <div className="relative z-10 flex flex-col justify-center overflow-hidden w-full">
                            <h3 className="font-bold text-sm sm:text-base text-white tracking-tight drop-shadow-md mb-0.5">
                                {showcaseItems[activeIndex].title}
                            </h3>
                            <p className="text-white/95 text-xs sm:text-sm font-medium drop-shadow-sm truncate">
                                {showcaseItems[activeIndex].description}
                            </p>
                        </div>

                        {/* Progress Bar indicating slider flow */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-0 overflow-hidden">
                            <motion.div
                                key={`progress-${activeIndex}`}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 4.5, ease: "linear" }}
                                className={`h-full ${showcaseItems[activeIndex].progressClass} shadow-[0_0_15px_currentColor]`}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Dots (Optional, purely aesthetic for indicating multiple items) */}
            <div className="absolute top-4 right-4 z-20 flex gap-1.5 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
                {showcaseItems.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
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

                        {/* Right Column: Feature Image Drawer */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="lg:col-span-6 relative w-full mt-8 lg:mt-0"
                        >
                            <FeatureShowcaseDrawer />
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

