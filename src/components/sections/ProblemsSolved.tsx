"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
    AlertTriangle, TrendingDown, Clock, Eye, ShieldOff,
    ArrowRight, HelpCircle, RefreshCw, MapPin, IndianRupee,
    Route, Truck, Phone, CreditCard
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─── */
interface Problem {
    icon: LucideIcon;
    title: string;
    description: string;
    stat: string;
    statLabel: string;
}

interface UserTypeProblems {
    title: string;
    emoji: string;
    subtitle: string;
    accentHex: string;
    impactStat: string;
    impactLabel: string;
    problems: Problem[];
}

/* ─── Data ─── */
const problemsByUser: Record<string, UserTypeProblems> = {
    farmer: {
        title: "Farmers",
        emoji: "👨‍🌾",
        subtitle: "The backbone of India faces daily struggles",
        accentHex: "#16a34a",          // green-600
        impactStat: "60%",
        impactLabel: "revenue lost to middlemen",
        problems: [
            {
                icon: TrendingDown,
                title: "Low Price Realization",
                description: "Middlemen take 40-60% of the final selling price, leaving farmers with minimal profit margins.",
                stat: "60%",
                statLabel: "lost to middlemen",
            },
            {
                icon: Clock,
                title: "Delayed Payments",
                description: "Waiting weeks or months for payment creates cash flow problems and financial stress.",
                stat: "30-90",
                statLabel: "days wait",
            },
            {
                icon: Eye,
                title: "No Market Visibility",
                description: "Farmers don't know real market prices or buyer demands, leading to poor selling decisions.",
                stat: "0%",
                statLabel: "price transparency",
            },
            {
                icon: ShieldOff,
                title: "Quality Not Rewarded",
                description: "No differentiation between quality grades means no incentive to produce better crops.",
                stat: "0",
                statLabel: "quality incentive",
            },
        ],
    },
    buyer: {
        title: "Buyers",
        emoji: "🏪",
        subtitle: "Hotels, restaurants & retailers struggle with supply",
        accentHex: "#ea580c",          // orange-600
        impactStat: "30%",
        impactLabel: "quality variance in every order",
        problems: [
            {
                icon: HelpCircle,
                title: "Inconsistent Quality",
                description: "No way to verify produce quality before purchase leads to unpredictable product standards.",
                stat: "30%",
                statLabel: "quality variance",
            },
            {
                icon: RefreshCw,
                title: "Supply Uncertainty",
                description: "Unreliable supply chains cause menu changes and disappointed customers.",
                stat: "Weekly",
                statLabel: "stockouts",
            },
            {
                icon: MapPin,
                title: "No Traceability",
                description: "Can't trace origin for food safety compliance or customer transparency.",
                stat: "0%",
                statLabel: "farm visibility",
            },
            {
                icon: IndianRupee,
                title: "Price Volatility",
                description: "Unpredictable pricing makes budgeting impossible and eats into margins.",
                stat: "40%",
                statLabel: "price swings",
            },
        ],
    },
    hauler: {
        title: "Haulers",
        emoji: "🚚",
        subtitle: "Logistics partners face daily inefficiencies",
        accentHex: "#0891b2",          // cyan-600
        impactStat: "60%",
        impactLabel: "of trips return empty",
        problems: [
            {
                icon: Truck,
                title: "Empty Return Trips",
                description: "60% of trips return empty, wasting fuel and time without earning potential.",
                stat: "60%",
                statLabel: "empty runs",
            },
            {
                icon: CreditCard,
                title: "Delayed Payments",
                description: "Waiting for payment after delivery creates cash flow and family planning issues.",
                stat: "15-30",
                statLabel: "days delay",
            },
            {
                icon: Route,
                title: "Inefficient Routes",
                description: "No optimization means longer drives, more fuel, and less daily earnings.",
                stat: "40%",
                statLabel: "extra distance",
            },
            {
                icon: Phone,
                title: "Fragmented Bookings",
                description: "Finding loads requires constant phone calls and waiting at mandis.",
                stat: "3+ hrs",
                statLabel: "daily wasted",
            },
        ],
    },
};

const userTypes = ["farmer", "buyer", "hauler"] as const;

/* ─── Component ─── */
export function ProblemsSolved() {
    const [activeTab, setActiveTab] = useState<"farmer" | "buyer" | "hauler">("farmer");
    const [direction, setDirection] = useState(0);
    const activeData = problemsByUser[activeTab];
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true); });
            },
            { threshold: 0.12 }
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

    /* slide left / right based on tab direction */
    const slide = {
        enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
        exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.2 } }),
    };

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
    };

    const cardAnim = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    };

    return (
        <section
            ref={sectionRef}
            id="problems"
            className="relative py-24 md:py-32 bg-[#fafaf8]"
        >
            {/* Soft top divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {/* ── Section Header ── */}
                    <motion.div variants={fadeInUp} className="text-center mb-5">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold uppercase tracking-wider mb-6">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            The Problem
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-900 leading-tight mb-4"
                    >
                        India&apos;s{" "}
                        <span className="relative inline-block">
                            <span className="text-red-600">₹40 Lakh Crore</span>
                            <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 200 6" fill="none">
                                <path d="M1 4C50 1.5 150 1.5 199 4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" />
                            </svg>
                        </span>{" "}
                        Agri Supply Chain
                        <br className="hidden md:block" />
                        <span className="text-neutral-400"> is </span>
                        <span className="text-red-600">Broken</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-center text-neutral-500 text-base sm:text-lg max-w-xl mx-auto mb-14"
                    >
                        Every stakeholder suffers. Here&apos;s what each faces daily.
                    </motion.p>

                    {/* ── Tabs ── */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex justify-center gap-2 sm:gap-3 mb-12 flex-wrap"
                    >
                        {userTypes.map((type) => {
                            const d = problemsByUser[type];
                            const active = activeTab === type;
                            return (
                                <button
                                    key={type}
                                    onClick={() => handleTabChange(type)}
                                    className={`
                                        relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold
                                        transition-all duration-250 outline-none
                                        ${active
                                            ? "text-white shadow-md"
                                            : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-900"
                                        }
                                    `}
                                    style={{
                                        background: active ? d.accentHex : undefined,
                                        boxShadow: active ? `0 4px 14px ${d.accentHex}40` : undefined,
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

                    {/* ── Impact Banner ── */}
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={`impact-${activeTab}`}
                            custom={direction}
                            variants={slide}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="flex justify-center mb-10"
                        >
                            <div
                                className="inline-flex items-center gap-4 px-6 py-3 rounded-xl"
                                style={{
                                    background: `${activeData.accentHex}08`,
                                    border: `1px solid ${activeData.accentHex}20`,
                                }}
                            >
                                <span
                                    className="text-3xl sm:text-4xl font-display font-black leading-none"
                                    style={{ color: activeData.accentHex }}
                                >
                                    {activeData.impactStat}
                                </span>
                                <span className="text-neutral-500 text-sm sm:text-base font-medium">
                                    {activeData.impactLabel}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* ── Cards Grid ── */}
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
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto"
                            >
                                {activeData.problems.map((problem) => {
                                    const Icon = problem.icon;
                                    return (
                                        <motion.div
                                            key={problem.title}
                                            variants={cardAnim}
                                            className="group"
                                        >
                                            <div
                                                className="relative h-full bg-white rounded-2xl border border-neutral-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-neutral-300"
                                            >
                                                {/* Left accent */}
                                                <div
                                                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                                                    style={{ background: activeData.accentHex }}
                                                />

                                                {/* Stat number */}
                                                <div className="mb-5 pl-2">
                                                    <span
                                                        className="text-3xl font-display font-black leading-none"
                                                        style={{ color: activeData.accentHex }}
                                                    >
                                                        {problem.stat}
                                                    </span>
                                                    <span className="block text-[11px] text-neutral-400 font-semibold mt-1 uppercase tracking-widest">
                                                        {problem.statLabel}
                                                    </span>
                                                </div>

                                                {/* Icon + Title */}
                                                <div className="flex items-center gap-3 mb-3 pl-2">
                                                    <div
                                                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                                                        style={{
                                                            background: `${activeData.accentHex}12`,
                                                        }}
                                                    >
                                                        <Icon
                                                            className="w-[18px] h-[18px]"
                                                            style={{ color: activeData.accentHex }}
                                                        />
                                                    </div>
                                                    <h4 className="font-semibold text-neutral-800 text-[15px] leading-snug">
                                                        {problem.title}
                                                    </h4>
                                                </div>

                                                {/* Description */}
                                                <p className="text-neutral-500 text-sm leading-relaxed pl-2">
                                                    {problem.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* ── Bottom CTA ── */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex justify-center mt-14"
                    >
                        <a
                            href="#solutions"
                            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                            style={{
                                color: activeData.accentHex,
                                borderColor: `${activeData.accentHex}35`,
                                background: `${activeData.accentHex}06`,
                            }}
                        >
                            See How CropFresh Fixes This
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
