"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
    Sparkles, Wallet, Mic, BarChart3, ArrowRight,
    CheckCircle2, QrCode, CalendarCheck, Map,
    Zap, Smartphone, Check, ArrowUpRight,
    IndianRupee, Globe, TrendingUp, Star, Shield,
    Leaf, Clock, Truck, Route
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─── */
interface Solution {
    icon: LucideIcon;
    title: string;
    description: string;
    features: string[];
    visual: {
        mainIcon: LucideIcon;
        supportIcons: LucideIcon[];
        stat: string;
        statLabel: string;
    };
}

interface UserSolutions {
    title: string;
    emoji: string;
    tagline: string;
    accentHex: string;
    accentLight: string;
    solutions: Solution[];
}

/* ─── Data ─── */
const solutionsByUser: Record<string, UserSolutions> = {
    farmer: {
        title: "Farmers",
        emoji: "👨‍🌾",
        tagline: "A clearer listing and selling process",
        accentHex: "#16a34a",
        accentLight: "#f0fdf4",
        solutions: [
            {
                icon: Wallet,
                title: "Understand pricing and payout terms",
                description: "The product direction brings listing and offer information together. Fees and payment conditions need confirmation before participation.",
                features: ["Sample offer information", "Illustrative price breakdowns", "Fees subject to confirmation", "No income or payment guarantee"],
                visual: { mainIcon: IndianRupee, supportIcons: [Wallet, Zap, Shield], stat: "Preview", statLabel: "pricing workflow" },
            },
            {
                icon: Mic,
                title: "Explore assisted produce listing",
                description: "Try the demonstration to see how crop information could be captured. Voice capability and supported languages depend on the configured service.",
                features: ["Sample listing workflow", "Manual produce entry", "Review details before submitting", "Demo data stays separate from real sales"],
                visual: { mainIcon: Mic, supportIcons: [Globe, Star, Smartphone], stat: "Demo", statLabel: "listing workflow" },
            },
            {
                icon: BarChart3,
                title: "Explore pricing information",
                description: "Sample dashboard information illustrates a possible pricing experience. It is not a live market feed or a quote for your harvest.",
                features: ["Illustrative price information", "Crop and quantity context", "Sample dashboard views", "Market-data integration planned"],
                visual: { mainIcon: TrendingUp, supportIcons: [BarChart3, Leaf, Clock], stat: "Sample", statLabel: "price information" },
            },
        ],
    },
    buyer: {
        title: "Buyers",
        emoji: "🏪",
        tagline: "Premium quality with complete transparency",
        accentHex: "#ea580c",
        accentLight: "#fff7ed",
        solutions: [
            {
                icon: CheckCircle2,
                title: "Review sample quality information",
                description: "The demo shows how grades and produce details could be presented. Inspection criteria and dispute terms need confirmation for any real order.",
                features: ["Illustrative quality grades", "Produce details", "Proposed inspection workflow", "No quality guarantee from a demo"],
                visual: { mainIcon: CheckCircle2, supportIcons: [Shield, Star, Leaf], stat: "Demo", statLabel: "quality information" },
            },
            {
                icon: QrCode,
                title: "Understand the batch-record concept",
                description: "A proposed batch record brings origin, harvest, inspection, and delivery information together. It does not establish certification or food-safety compliance.",
                features: ["Origin information concept", "Harvest details", "Inspection context", "Proposed delivery history"],
                visual: { mainIcon: QrCode, supportIcons: [Map, Clock, Shield], stat: "Planned", statLabel: "batch records" },
            },
            {
                icon: CalendarCheck,
                title: "Discuss your sourcing requirements",
                description: "Crop, quantity, location, and delivery needs provide the starting point for a sourcing discussion. Supply and delivery windows are subject to confirmation.",
                features: ["Crop requirements", "Quantity and grade needs", "Location and delivery expectations", "Availability confirmed separately"],
                visual: { mainIcon: CalendarCheck, supportIcons: [Truck, Star, Clock], stat: "Planned", statLabel: "sourcing coordination" },
            },
        ],
    },
    hauler: {
        title: "Delivery partners",
        emoji: "🚚",
        tagline: "Explore a proposed delivery workflow",
        accentHex: "#0891b2",
        accentLight: "#ecfeff",
        solutions: [
            {
                icon: Map,
                title: "Explore route coordination",
                description: "The proposed workflow considers pickup points, destinations, and vehicle capacity. Route availability and trip costs need individual review.",
                features: ["Pickup and destination context", "Vehicle-capacity requirements", "Trip-cost considerations", "No fuel-savings guarantee"],
                visual: { mainIcon: Route, supportIcons: [Map, Truck, Zap], stat: "Planned", statLabel: "route workflow" },
            },
            {
                icon: Zap,
                title: "Understand delivery and payout conditions",
                description: "Delivery confirmation is part of the intended workflow. Payout timing, deductions, and exceptions must be agreed before a trip.",
                features: ["Delivery confirmation concept", "Payout terms subject to confirmation", "Review applicable deductions", "No instant-payment promise"],
                visual: { mainIcon: Zap, supportIcons: [Wallet, IndianRupee, Shield], stat: "Planned", statLabel: "payout workflow" },
            },
            {
                icon: Smartphone,
                title: "Discuss load and vehicle fit",
                description: "Area, vehicle type, and capacity help establish whether the proposed partner program is suitable. Registering interest does not guarantee loads or employment.",
                features: ["Area and vehicle discussion", "Capacity requirements", "Program eligibility review", "Load availability confirmed separately"],
                visual: { mainIcon: Smartphone, supportIcons: [Globe, Star, Route], stat: "Planned", statLabel: "partner workflow" },
            },
        ],
    },
};

const userTypes = ["farmer", "buyer", "hauler"] as const;

/* ─── Visual Panel Component ─── */
function SolutionVisual({
    visual,
    accentHex,
    reversed,
}: {
    visual: Solution["visual"];
    accentHex: string;
    reversed: boolean;
}) {
    const MainIcon = visual.mainIcon;
    return (
        <div
            className={`relative w-full aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden flex items-center justify-center border border-white/10 ${reversed ? "lg:order-2" : ""}`}
            style={{ background: "rgba(255, 255, 255, 0.02)", backdropFilter: "blur(20px)" }}
        >
            {/* Decorative circles */}
            <div
                className="absolute w-64 h-64 rounded-full opacity-[0.15]"
                style={{
                    background: accentHex,
                    top: "-10%",
                    right: "-10%",
                    filter: "blur(60px)"
                }}
            />
            <div
                className="absolute w-40 h-40 rounded-full opacity-[0.1]"
                style={{
                    background: accentHex,
                    bottom: "5%",
                    left: "5%",
                    filter: "blur(40px)"
                }}
            />

            {/* Floating support icons */}
            {visual.supportIcons.map((SIcon, i) => {
                const positions = [
                    { top: "15%", right: "18%", delay: "0s" },
                    { bottom: "20%", left: "15%", delay: "1s" },
                    { top: "55%", right: "12%", delay: "2s" },
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
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeInOut",
                        }}
                    >
                        <SIcon className="w-5 h-5" style={{ color: accentHex }} />
                    </motion.div>
                );
            })}

            {/* Center main icon */}
            <div className="relative z-10 flex flex-col items-center gap-4">
                <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-xl"
                    style={{
                        background: "rgba(255,255,255,0.1)",
                        boxShadow: `0 8px 32px ${accentHex}30`,
                    }}
                >
                    <MainIcon
                        className="w-10 h-10 sm:w-12 sm:h-12"
                        style={{ color: accentHex }}
                        strokeWidth={1.5}
                    />
                </div>

                {/* Stat badge */}
                <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
                    style={{
                        background: "rgba(255,255,255,0.05)",
                        boxShadow: `0 4px 16px ${accentHex}20`,
                    }}
                >
                    <span
                        className="text-xl sm:text-2xl font-display font-black leading-none"
                        style={{ color: accentHex }}
                    >
                        {visual.stat}
                    </span>
                    <span className="text-white/80 text-xs sm:text-sm font-medium">
                        {visual.statLabel}
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ─── Component ─── */
export function SolutionsSection() {
    const [activeTab, setActiveTab] = useState<"farmer" | "buyer" | "hauler">("farmer");
    const [direction, setDirection] = useState(0);
    const activeData = solutionsByUser[activeTab];
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true); });
            },
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleTabChange = (type: typeof userTypes[number]) => {
        const curr = userTypes.indexOf(activeTab);
        const next = userTypes.indexOf(type);
        setDirection(next > curr ? 1 : -1);
        setActiveTab(type);
    };

    const slide = {
        enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
        exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2 } }),
    };

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
    };

    const rowAnim = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
    };

    return (
        <section
            ref={sectionRef}
            id="solutions"
            className="relative py-24 md:py-32 bg-[#0A0D14] overflow-hidden"
        >
            {/* ─── Layer 1: Animated Mesh Background ─── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full mix-blend-screen opacity-10 filter blur-[100px]"
                    style={{ background: `radial-gradient(circle, ${activeData.accentHex} 0%, transparent 70%)` }}
                />
            </div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] z-0" />

            {/* Top divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {/* ── Header ── */}
                    <motion.div variants={fadeInUp} className="text-center mb-5">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5" />
                            Product direction
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4"
                    >
                        What CropFresh is{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(135deg, ${activeData.accentHex} 0%, ${activeData.accentLight} 100%)` }}
                        >
                            Building
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-center text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-14"
                    >
                        Explore the intended farmer, buyer, and delivery-partner workflows.
                        Demo and planned features are described separately from service availability.
                    </motion.p>

                    {/* ── Tabs ── */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex justify-center gap-2 sm:gap-3 mb-16 flex-wrap"
                    >
                        {userTypes.map((type) => {
                            const d = solutionsByUser[type];
                            const active = activeTab === type;
                            return (
                                <button
                                    key={type}
                                    aria-pressed={active}
                                    onClick={() => handleTabChange(type)}
                                    className={`
                                        relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold
                                        transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white border
                                        ${active
                                            ? "text-white shadow-lg"
                                            : "bg-white/5 backdrop-blur-sm text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                                        }
                                    `}
                                    style={{
                                        background: active ? d.accentHex : undefined,
                                        borderColor: active ? d.accentHex : undefined,
                                        boxShadow: active ? `0 8px 20px -4px ${d.accentHex}60` : undefined,
                                    }}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg leading-none">{d.emoji}</span>
                                        {d.title}
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* ── Solution Rows (Split Layout) ── */}
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={activeTab}
                            custom={direction}
                            variants={slide}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                animate={isVisible ? "visible" : "hidden"}
                                className="space-y-12 lg:space-y-20 max-w-6xl mx-auto"
                            >
                                {activeData.solutions.map((solution, index) => {
                                    const Icon = solution.icon;
                                    const reversed = index % 2 === 1;
                                    return (
                                        <motion.div
                                            key={solution.title}
                                            variants={rowAnim}
                                            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center`}
                                        >
                                            {/* Visual Panel */}
                                            <SolutionVisual
                                                visual={solution.visual}
                                                accentHex={activeData.accentHex}
                                                reversed={reversed}
                                            />

                                            {/* Text Content */}
                                            <div className={reversed ? "lg:order-1" : ""}>
                                                {/* Icon + Title */}
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div
                                                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                                                        style={{ background: `${activeData.accentHex}20` }}
                                                    >
                                                        <Icon
                                                            className="w-5 h-5 drop-shadow-sm"
                                                            style={{ color: activeData.accentHex }}
                                                        />
                                                    </div>
                                                    <h3 className="font-display font-bold text-white text-xl sm:text-2xl leading-snug">
                                                        {solution.title}
                                                    </h3>
                                                </div>

                                                {/* Description */}
                                                <p className="text-white/70 text-base leading-relaxed mb-6">
                                                    {solution.description}
                                                </p>

                                                {/* Feature List */}
                                                <ul className="space-y-3 mb-6">
                                                    {solution.features.map((feature) => (
                                                        <li
                                                            key={feature}
                                                            className="flex items-center gap-3 text-sm text-white/80"
                                                        >
                                                            <span
                                                                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                                                style={{ background: `${activeData.accentHex}30` }}
                                                            >
                                                                <Check
                                                                    className="w-3 h-3"
                                                                    style={{ color: activeData.accentHex }}
                                                                />
                                                            </span>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Learn more link */}
                                                <a
                                                    href="#how-it-works"
                                                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-white"
                                                    style={{ color: activeData.accentHex }}
                                                >
                                                     See the intended workflow
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* ── Dividers between rows (visual connector) ── */}

                    {/* ── Bottom CTA ── */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex justify-center mt-16 lg:mt-20"
                    >
                        <a
                            href="#how-it-works"
                            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                            style={{
                                background: activeData.accentHex,
                                boxShadow: `0 4px 14px ${activeData.accentHex}30`,
                            }}
                        >
                            See How It Works
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
