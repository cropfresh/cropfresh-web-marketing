"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
    Mic, ClipboardCheck, Brain, Truck,
    Leaf, Camera, Shield, Star,
    Zap, IndianRupee, QrCode, Route,
    ArrowDown
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─── */
interface Step {
    number: number;
    icon: LucideIcon;
    title: string;
    shortDesc: string;
    fullDesc: string;
    accentHex: string;
    visual: {
        mainIcon: LucideIcon;
        supportIcons: LucideIcon[];
        stat: string;
        statLabel: string;
    };
}

/* ─── Data ─── */
const steps: Step[] = [
    {
        number: 1,
        icon: Mic,
        title: "Farmer Lists Produce",
        shortDesc: "Voice or photo in Kannada — just speak, AI does the rest",
        fullDesc: "Farmers list their produce using voice commands in Kannada or by uploading photos. Our AI estimates quality grade and suggests fair pricing based on current market conditions.",
        accentHex: "#16a34a",
        visual: {
            mainIcon: Mic,
            supportIcons: [Camera, Leaf, Star],
            stat: "30 sec",
            statLabel: "to list",
        },
    },
    {
        number: 2,
        icon: ClipboardCheck,
        title: "Field Agent Verifies",
        shortDesc: "Physical inspection creates an immutable Digital Twin",
        fullDesc: "A trained Field Agent visits the farm for physical inspection. They verify quality, capture photos, and create an immutable Digital Twin record that follows the produce throughout its journey.",
        accentHex: "#0891b2",
        visual: {
            mainIcon: ClipboardCheck,
            supportIcons: [Shield, Camera, QrCode],
            stat: "5-pt",
            statLabel: "quality grade",
        },
    },
    {
        number: 3,
        icon: Brain,
        title: "AI Matches Buyer",
        shortDesc: "DPLE engine finds the best price/quality match instantly",
        fullDesc: "Our AI-powered Dynamic Price Learning Engine (DPLE) analyzes quality, quantity, location, and buyer preferences to find the perfect match. The system calculates a fair All-Inclusive Single Price (AISP).",
        accentHex: "#ea580c",
        visual: {
            mainIcon: Brain,
            supportIcons: [Zap, Star, IndianRupee],
            stat: "< 5 min",
            statLabel: "match time",
        },
    },
    {
        number: 4,
        icon: Truck,
        title: "Hauler Delivers",
        shortDesc: "Optimized route → QR confirmation → instant UPI payment",
        fullDesc: "Haulers receive optimized multi-stop routes. Upon delivery confirmation by the buyer via QR scan, payments are instantly transferred to farmers and haulers via UPI. T+0 settlement!",
        accentHex: "#7c3aed",
        visual: {
            mainIcon: Truck,
            supportIcons: [Route, QrCode, IndianRupee],
            stat: "T+0",
            statLabel: "instant pay",
        },
    },
];

/* ─── Visual Panel Component ─── */
function StepVisual({ visual, accentHex }: { visual: Step["visual"]; accentHex: string }) {
    const MainIcon = visual.mainIcon;
    return (
        <div
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: `${accentHex}08` }}
        >
            {/* Decorative circle */}
            <div
                className="absolute w-48 h-48 rounded-full opacity-[0.06]"
                style={{ background: accentHex, top: "-15%", right: "-10%" }}
            />
            <div
                className="absolute w-32 h-32 rounded-full opacity-[0.04]"
                style={{ background: accentHex, bottom: "5%", left: "5%" }}
            />

            {/* Floating support icons */}
            {visual.supportIcons.map((SIcon, i) => {
                const positions = [
                    { top: "12%", right: "15%" },
                    { bottom: "18%", left: "12%" },
                    { top: "50%", right: "10%" },
                ];
                const pos = positions[i % 3];
                return (
                    <motion.div
                        key={i}
                        className="absolute w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                            background: "white",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            ...pos,
                        }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
                    >
                        <SIcon className="w-4 h-4" style={{ color: accentHex }} />
                    </motion.div>
                );
            })}

            {/* Center */}
            <div className="relative z-10 flex flex-col items-center gap-3">
                <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
                    style={{
                        background: "white",
                        boxShadow: `0 6px 24px ${accentHex}18`,
                    }}
                >
                    <MainIcon
                        className="w-8 h-8 sm:w-10 sm:h-10"
                        style={{ color: accentHex }}
                        strokeWidth={1.5}
                    />
                </div>
                <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{ background: "white", boxShadow: `0 2px 10px ${accentHex}12` }}
                >
                    <span className="text-lg sm:text-xl font-display font-black leading-none" style={{ color: accentHex }}>
                        {visual.stat}
                    </span>
                    <span className="text-neutral-500 text-xs font-medium">{visual.statLabel}</span>
                </div>
            </div>
        </div>
    );
}

/* ─── Single Step Row ─── */
function StepRow({ step, index, isActive }: { step: Step; index: number; isActive: boolean }) {
    const Icon = step.icon;
    const reversed = index % 2 === 1;
    const ref = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        >
            <div className={`grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 items-center`}>
                {/* Left content / visual */}
                <div className={`${reversed ? "lg:order-3" : "lg:order-1"}`}>
                    {reversed ? (
                        /* Text on this side when reversed */
                        <div className="lg:pl-12">
                            <StepTextContent step={step} />
                        </div>
                    ) : (
                        /* Visual panel on this side */
                        <div className="lg:pr-12">
                            <StepVisual visual={step.visual} accentHex={step.accentHex} />
                        </div>
                    )}
                </div>

                {/* Center timeline node */}
                <div className="hidden lg:flex lg:order-2 flex-col items-center relative">
                    <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-500"
                        style={{
                            background: isActive ? step.accentHex : "white",
                            borderColor: isActive ? step.accentHex : "#e5e5e5",
                            boxShadow: isActive ? `0 0 20px ${step.accentHex}30` : "none",
                        }}
                    >
                        {isActive ? (
                            <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                        ) : (
                            <span className="text-sm font-bold text-neutral-400">{step.number}</span>
                        )}
                    </motion.div>
                </div>

                {/* Right content / visual */}
                <div className={`${reversed ? "lg:order-1" : "lg:order-3"}`}>
                    {reversed ? (
                        /* Visual on this side when reversed */
                        <div className="lg:pl-12">
                            <StepVisual visual={step.visual} accentHex={step.accentHex} />
                        </div>
                    ) : (
                        /* Text on this side */
                        <div className="lg:pl-12">
                            <StepTextContent step={step} />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Step Text Content ─── */
function StepTextContent({ step }: { step: Step }) {
    const Icon = step.icon;
    return (
        <div>
            {/* Step badge */}
            <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
                style={{ background: step.accentHex }}
            >
                Step {step.number}
            </span>

            {/* Mobile icon */}
            <div
                className="lg:hidden w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${step.accentHex}12` }}
            >
                <Icon className="w-5 h-5" style={{ color: step.accentHex }} />
            </div>

            <h3 className="font-display font-bold text-neutral-900 text-xl sm:text-2xl leading-snug mb-3">
                {step.title}
            </h3>

            <p className="text-neutral-500 text-sm font-medium mb-3">
                {step.shortDesc}
            </p>

            <p className="text-neutral-400 text-sm leading-relaxed">
                {step.fullDesc}
            </p>
        </div>
    );
}

/* ─── Main Component ─── */
export function HowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    /* Scroll-driven progress for the timeline connector */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

    /* Track which step is currently in view */
    useEffect(() => {
        const stepElements = document.querySelectorAll("[data-step-index]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number((entry.target as HTMLElement).dataset.stepIndex ?? 0);
                        setActiveStep(idx);
                    }
                });
            },
            { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
        );
        stepElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            className="relative py-24 md:py-32 bg-[#fafaf8]"
        >
            {/* Top divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {/* ── Header ── */}
                    <motion.div variants={fadeInUp} className="text-center mb-5">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-semibold uppercase tracking-wider mb-6">
                            <ArrowDown className="w-3.5 h-3.5" />
                            Simple Process
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-900 leading-tight mb-4"
                    >
                        Farm to Table in{" "}
                        <span className="text-cyan-600">4 Steps</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-center text-neutral-500 text-base sm:text-lg max-w-xl mx-auto mb-16 lg:mb-20"
                    >
                        From listing to delivery, everything happens on one platform.
                    </motion.p>
                </motion.div>

                {/* ── Timeline ── */}
                <div ref={timelineRef} className="relative">
                    {/* Vertical connector line (desktop only) */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-neutral-200 rounded-full">
                        {/* Animated fill */}
                        <motion.div
                            className="absolute top-0 left-0 right-0 rounded-full"
                            style={{
                                height: lineHeight,
                                background: "linear-gradient(to bottom, #16a34a, #0891b2, #ea580c, #7c3aed)",
                            }}
                        />
                    </div>

                    {/* Steps */}
                    <div className="space-y-16 lg:space-y-24">
                        {steps.map((step, index) => (
                            <div key={step.number} data-step-index={index}>
                                <StepRow
                                    step={step}
                                    index={index}
                                    isActive={activeStep >= index}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Completion Badge ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center mt-16"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-neutral-200 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-neutral-600 text-sm font-medium">
                            All done in <span className="font-bold text-emerald-600">under 24 hours</span> — from farm to buyer
                        </span>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
