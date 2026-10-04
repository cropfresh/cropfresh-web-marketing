"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import {
    heroStagger,
    heroChildFade,
} from "@/lib/animations";
import { trackCTAClick } from "@/lib/analytics";
import { homepageMessage } from "@/data/marketing";
import {
    Sprout,
    ChevronDown,
    Scan,
    CheckCircle2,
    Pause,
    Play,
} from "lucide-react";

/* ─── Feature Showcase Drawer ───────────────────────────── */

const showcaseItems = [
    {
        id: "source",
        title: "Produce listing concept",
        description: "Explore how farmers could share crop and harvest information.",
        alt: "Illustrative farmer image for the produce listing concept",
        image: "/images/hero/farmer.png",
        icon: <Sprout className="w-5 h-5 text-[#FF8C00]" />,
        bgClass: "bg-[#FF8C00]/20 border-[#FF8C00]/30",
        progressClass: "bg-[#FF8C00]"
    },
    {
        id: "quality",
        title: "Quality information concept",
        description: "See how photos and batch details could support sourcing decisions.",
        alt: "Illustrative tomatoes for the quality information concept",
        image: "/images/hero/tomato.png",
        icon: <Scan className="w-5 h-5 text-emerald-400" />,
        bgClass: "bg-emerald-500/20 border-emerald-500/30",
        progressClass: "bg-emerald-500"
    },
    {
        id: "logistics",
        title: "Delivery coordination concept",
        description: "Learn about the intended pickup and delivery workflow.",
        alt: "Illustrative delivery vehicle for the logistics concept",
        image: "/images/hero/truck.png",
        icon: <CheckCircle2 className="w-5 h-5 text-blue-400" />,
        bgClass: "bg-blue-500/20 border-blue-500/30",
        progressClass: "bg-blue-500"
    }
];

function subscribeToMotionPreference(onChange: () => void) {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", onChange);
    return () => preference.removeEventListener("change", onChange);
}

function getMotionPreference() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerMotionPreference() {
    // Keep the initial HTML and hydration identical; enable autoplay afterward.
    return true;
}

function FeatureShowcaseDrawer() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const reduceMotion = useSyncExternalStore(
        subscribeToMotionPreference,
        getMotionPreference,
        getServerMotionPreference,
    );

    useEffect(() => {
        if (isPaused || reduceMotion) return;
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % showcaseItems.length);
        }, 4500); // 4.5 seconds per slide
        return () => clearInterval(interval);
    }, [isPaused, reduceMotion]);

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
                            alt={showcaseItems[activeIndex].alt}
                            fill
                            className="object-cover opacity-80"
                            priority={activeIndex === 0}
                            sizes="(min-width: 1024px) 45vw, 90vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/10 to-transparent"></div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Consolidated Floating Card (Badge + Text) */}
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

                        {/* Text - Right Side */}
                        <div className="relative z-10 flex flex-col justify-center overflow-hidden w-full">
                            <h3 className="font-bold text-sm sm:text-base text-white tracking-tight drop-shadow-md mb-0.5">
                                {showcaseItems[activeIndex].title}
                            </h3>
                            <p className="text-white/95 text-xs sm:text-sm font-medium drop-shadow-sm leading-relaxed">
                                {showcaseItems[activeIndex].description}
                            </p>
                        </div>

                        {/* Progress Bar indicating slider flow */}
                        {!isPaused && !reduceMotion && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-0 overflow-hidden">
                            <motion.div
                                key={`progress-${activeIndex}`}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 4.5, ease: "linear" }}
                                className={`h-full ${showcaseItems[activeIndex].progressClass} shadow-[0_0_15px_currentColor]`}
                            />
                        </div>}
                    </motion.div>
                </AnimatePresence>
            </div>

            <span className="absolute top-4 left-4 z-20 rounded-full bg-black/70 px-3 py-2 text-xs font-semibold text-white border border-white/20">
                Illustrative product concepts
            </span>
            <div className="absolute top-16 right-4 z-20 flex gap-1 p-1 rounded-full bg-black/70 border border-white/20">
                {showcaseItems.map((item, idx) => (
                    <button
                        key={item.id}
                        type="button"
                        aria-label={`Show ${item.title}`}
                        aria-pressed={activeIndex === idx}
                        onClick={() => { setActiveIndex(idx); setIsPaused(true); }}
                        className="w-11 h-11 flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-white"
                    >
                        <span className={`h-2 rounded-full ${activeIndex === idx ? 'w-5 bg-white' : 'w-2 bg-white/50'}`} />
                    </button>
                ))}
                {!reduceMotion && <button
                    type="button"
                    aria-label={isPaused ? "Play product showcase" : "Pause product showcase"}
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-11 h-11 flex items-center justify-center text-white rounded-full focus-visible:outline-2 focus-visible:outline-white"
                >
                    {isPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
                </button>}
            </div>
        </div>
    );
}

/* ─── Hero Section ────────────────────────────────────── */

export function HeroSection() {
    return (
        <section
            id="hero"
            aria-labelledby="hero-heading"
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

                            <motion.p variants={heroChildFade} className="text-sm font-semibold text-emerald-300 mb-4">
                                {homepageMessage.eyebrow}
                            </motion.p>
                            <motion.h1
                                id="hero-heading"
                                variants={heroChildFade}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight"
                            >
                                {homepageMessage.headline}
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                variants={heroChildFade}
                                className="text-base md:text-lg lg:text-lg text-white/70 max-w-lg mb-6 leading-relaxed font-light"
                            >
                                {homepageMessage.description}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={heroChildFade}
                                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-0"
                            >
                                <Link
                                    href="/#choose-role"
                                    className="px-8 py-4 rounded-xl bg-[#FF8C00] text-black font-semibold flex items-center justify-center gap-2 hover:bg-[#FFA726] transition-colors shadow-lg shadow-[#FF8C00]/20 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
                                    onClick={() => trackCTAClick("hero_choose_role", "hero_section", "/#choose-role")}
                                >
                                    Choose your role
                                </Link>
                                <a
                                    href="#technology"
                                    className="px-8 py-4 rounded-xl bg-white/5 text-white font-semibold flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10 transition-colors group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                    onClick={() => trackCTAClick("hero_technology", "hero_section", "#technology")}
                                >
                                    Explore the technology
                                </a>
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

            <div className="relative z-20 w-full pb-20 px-6">
                <p className="max-w-4xl mx-auto rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 text-center text-sm text-white/80 leading-relaxed">
                    {homepageMessage.availability}
                </p>
            </div>

            {/* ─── Scroll Indicator ─── */}
            <motion.a
                href="#choose-role"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[15] hidden md:flex flex-col items-center gap-1 cursor-pointer group" // Hidden on mobile to save space
                aria-label="Explore audience paths"
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
            </motion.a>
        </section>
    );
}
