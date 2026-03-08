"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
    ClipboardCheck, MapPin, QrCode, Truck,
    UserCircle, ShieldCheck, BellRing, Route,
    ScanLine, PackageCheck, IndianRupee, Zap,
    ArrowDown
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─── */
interface Step {
    number: number;
    icon: LucideIcon;
    title: string;
    description: string;
    accentHex: string;
    visual: {
        mainIcon: LucideIcon;
        supportIcons: LucideIcon[];
        stat: string;
        statLabel: string;
    };
}

/* ─── Visual Panel Component ─── */
function StepVisual({ visual, accentHex }: { visual: Step["visual"]; accentHex: string }) {
    const MainIcon = visual.mainIcon;
    return (
        <div
            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden flex items-center justify-center group transition-all duration-500 hover:-translate-y-2 backdrop-blur-2xl border"
            style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, ${accentHex}15 100%)`,
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: `0 20px 40px -20px ${accentHex}30`
            }}
        >
            {/* Decorative circle */}
            <div
                className="absolute w-48 h-48 rounded-full opacity-[0.15] mix-blend-screen filter blur-[40px]"
                style={{ background: accentHex, top: "-15%", right: "-10%" }}
            />
            <div
                className="absolute w-32 h-32 rounded-full opacity-[0.1] mix-blend-screen filter blur-[30px]"
                style={{ background: accentHex, bottom: "5%", left: "5%" }}
            />

            {/* Floating support icons */}
            {visual.supportIcons.map((SIcon, i) => {
                const positions = [
                    { top: "15%", right: "15%" },
                    { bottom: "20%", left: "15%" },
                    { top: "50%", right: "10%" },
                ];
                const pos = positions[i % 3];
                return (
                    <motion.div
                        key={i}
                        className="absolute w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-md"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            ...pos,
                        }}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
                    >
                        <SIcon className="w-5 h-5 drop-shadow-sm opacity-80" style={{ color: accentHex }} />
                    </motion.div>
                );
            })}

            {/* Center */}
            <div className="relative z-10 flex flex-col items-center gap-4">
                <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-xl group-hover:scale-110 transition-transform duration-500 relative overflow-hidden"
                    style={{
                        background: "rgba(20,20,20,0.8)",
                        boxShadow: `0 10px 30px ${accentHex}40`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                    <MainIcon
                        className="w-10 h-10 sm:w-12 sm:h-12 relative z-10"
                        style={{ color: accentHex, filter: `drop-shadow(0 0 10px ${accentHex}80)` }}
                        strokeWidth={1.5}
                    />
                </div>
                <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md bg-black/40"
                    style={{ boxShadow: `0 4px 15px ${accentHex}20` }}
                >
                    <span className="text-lg sm:text-xl font-bold leading-none" style={{ color: accentHex }}>
                        {visual.stat}
                    </span>
                    <span className="text-white/70 text-xs font-medium uppercase tracking-wider">{visual.statLabel}</span>
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
            <div className={`grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-0 items-center`}>
                {/* Left content / visual */}
                <div className={`${reversed ? "lg:order-3" : "lg:order-1"}`}>
                    {reversed ? (
                        <div className="lg:pl-16">
                            <StepTextContent step={step} />
                        </div>
                    ) : (
                        <div className="lg:pr-16">
                            <StepVisual visual={step.visual} accentHex={step.accentHex} />
                        </div>
                    )}
                </div>

                {/* Center timeline node */}
                <div className="hidden lg:flex lg:order-2 flex-col items-center relative z-20">
                    <motion.div
                        className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-black relative"
                        style={{
                            borderColor: isActive ? step.accentHex : "rgba(255,255,255,0.1)",
                            boxShadow: isActive ? `0 0 25px ${step.accentHex}60, inset 0 0 10px ${step.accentHex}40` : "none",
                        }}
                    >
                        {isActive ? (
                            <Icon className="w-6 h-6 text-white" strokeWidth={2} style={{ filter: `drop-shadow(0 0 5px ${step.accentHex})` }} />
                        ) : (
                            <span className="text-base font-bold text-white/30">{step.number}</span>
                        )}

                        {/* Pulse effect when active */}
                        {isActive && (
                            <motion.div
                                className="absolute inset-0 rounded-full border border-white opacity-50"
                                style={{ borderColor: step.accentHex }}
                                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                    </motion.div>
                </div>

                {/* Right content / visual */}
                <div className={`${reversed ? "lg:order-1" : "lg:order-3"}`}>
                    {reversed ? (
                        <div className="lg:pr-16">
                            <StepVisual visual={step.visual} accentHex={step.accentHex} />
                        </div>
                    ) : (
                        <div className="lg:pl-16">
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
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white mb-5 shadow-sm border border-white/10"
                style={{ background: `linear-gradient(135deg, ${step.accentHex} 0%, ${step.accentHex}dd 100%)` }}
            >
                Step {step.number}
            </span>

            {/* Mobile icon */}
            <div
                className="lg:hidden w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/10"
                style={{ background: `${step.accentHex}15` }}
            >
                <Icon className="w-6 h-6" style={{ color: step.accentHex }} />
            </div>

            <h3 className="font-bold text-white text-2xl sm:text-3xl leading-snug mb-4 tracking-tight">
                {step.title}
            </h3>

            <p className="text-white/60 text-lg leading-relaxed font-light">
                {step.description}
            </p>
        </div>
    );
}

/* ─── Main Component ─── */
export function HaulerHowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    const steps: Step[] = [
        {
            number: 1,
            icon: ClipboardCheck,
            title: "Sign Up & Get Verified",
            description: "Register with your license and vehicle details",
            accentHex: "#f97316", // orange-500
            visual: {
                mainIcon: ClipboardCheck,
                supportIcons: [UserCircle, ShieldCheck, Route],
                stat: "10 mins",
                statLabel: "to onboard",
            },
        },
        {
            number: 2,
            icon: MapPin,
            title: "Accept Assignments",
            description: "Get delivery requests matched to your location",
            accentHex: "#f59e0b", // amber-500
            visual: {
                mainIcon: MapPin,
                supportIcons: [BellRing, Route, Zap],
                stat: "Smart",
                statLabel: "matching",
            },
        },
        {
            number: 3,
            icon: QrCode,
            title: "Pick Up & Scan",
            description: "Collect produce from farmers, scan QR for tracking",
            accentHex: "#eab308", // yellow-500
            visual: {
                mainIcon: ScanLine,
                supportIcons: [PackageCheck, QrCode, ClipboardCheck],
                stat: "100%",
                statLabel: "traceable",
            },
        },
        {
            number: 4,
            icon: Truck,
            title: "Deliver & Earn",
            description: "Complete delivery, get paid instantly via UPI",
            accentHex: "#10b981", // emerald-500
            visual: {
                mainIcon: Truck,
                supportIcons: [IndianRupee, Zap, Route],
                stat: "T+0",
                statLabel: "instant pay",
            },
        },
    ];

    /* Scroll-driven progress for the timeline connector */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"],
    });

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

    /* Track which step is currently in view */
    useEffect(() => {
        const stepElements = document.querySelectorAll("[data-haul-step-index]");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number((entry.target as HTMLElement).dataset.haulStepIndex ?? 0);
                        if (idx > activeStep) {
                            setActiveStep(idx);
                        }
                    }
                });
            },
            { threshold: 0.6, rootMargin: "-10% 0px -40% 0px" }
        );
        stepElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [activeStep]);

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            className="relative py-24 md:py-32 overflow-hidden bg-black"
        >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0 bg-black">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] mix-blend-screen pointer-events-none" />
            </div>

            <Container className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {/* ── Header ── */}
                    <motion.div variants={fadeInUp} className="text-center mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                            <ArrowDown className="w-3.5 h-3.5" />
                            Streamlined Flow
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-center text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6 tracking-tight"
                    >
                        How It Works
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-center text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-20 md:mb-28 font-light"
                    >
                        Join the fleet in 4 simple steps and start earning the same day.
                    </motion.p>
                </motion.div>

                <div ref={timelineRef} className="relative mt-12 pl-4 lg:pl-0">
                    {/* Vertical connector line (desktop only) */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/5 rounded-full overflow-hidden">
                        {/* Animated fill */}
                        <motion.div
                            className="absolute top-0 left-0 right-0 rounded-full w-full"
                            style={{
                                height: lineHeight,
                                background: "linear-gradient(to bottom, #f97316, #f59e0b, #eab308, #10b981)",
                                boxShadow: "0 0 10px rgba(249,115,22,0.8)"
                            }}
                        />
                    </div>

                    {/* Mobile vertical line base */}
                    <div className="lg:hidden absolute left-[30px] top-6 bottom-12 w-0.5 bg-white/10 rounded-full" />

                    {/* Mobile animated line */}
                    <div className="lg:hidden absolute left-[30px] top-6 bottom-12 w-0.5 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 right-0 w-full"
                            style={{
                                height: lineHeight,
                                background: "linear-gradient(to bottom, #f97316, #10b981)",
                            }}
                        />
                    </div>

                    {/* Steps */}
                    <div className="space-y-20 lg:space-y-32">
                        {steps.map((step, index) => (
                            <div key={step.number} data-haul-step-index={index}>
                                <StepRow
                                    step={step}
                                    index={index}
                                    isActive={activeStep >= index}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
