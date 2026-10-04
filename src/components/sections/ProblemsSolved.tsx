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
        subtitle: "Questions to consider before selling produce",
        accentHex: "#16a34a",          // green-600
        impactStat: "Clarity",
        impactLabel: "on listing, pricing, and payment terms",
        problems: [
            {
                icon: TrendingDown,
                title: "Understanding the price",
                description: "Intermediaries and unclear deductions can make it harder to understand the amount received for a harvest.",
                stat: "Price",
                statLabel: "Know the breakdown",
            },
            {
                icon: Clock,
                title: "Planning for payment",
                description: "Clear settlement conditions and payment timing help farmers plan their next growing cycle.",
                stat: "Timing",
                statLabel: "Confirm payment terms",
            },
            {
                icon: Eye,
                title: "Understanding buyer needs",
                description: "Knowing the requested crop, quantity, and delivery location can support a more informed selling decision.",
                stat: "Demand",
                statLabel: "Discuss buyer needs",
            },
            {
                icon: ShieldOff,
                title: "Describing produce quality",
                description: "Photos and agreed inspection criteria can help farmers explain the condition of their produce.",
                stat: "Quality",
                statLabel: "Agree on criteria",
            },
        ],
    },
    buyer: {
        title: "Buyers",
        emoji: "🏪",
        subtitle: "Hotels, restaurants & retailers struggle with supply",
        accentHex: "#ea580c",          // orange-600
        impactStat: "Context",
        impactLabel: "for quality, origin, and sourcing decisions",
        problems: [
            {
                icon: HelpCircle,
                title: "Comparing quality",
                description: "Buyers need clear grade definitions and inspection information to compare produce for their business.",
                stat: "Grade",
                statLabel: "Understand the criteria",
            },
            {
                icon: RefreshCw,
                title: "Planning supply",
                description: "Crop availability, quantities, and delivery windows need confirmation before a sourcing commitment.",
                stat: "Supply",
                statLabel: "Confirm availability",
            },
            {
                icon: MapPin,
                title: "Understanding origin",
                description: "Batch and harvest information can provide useful context; traceability is separate from certification.",
                stat: "Origin",
                statLabel: "Review batch details",
            },
            {
                icon: IndianRupee,
                title: "Comparing delivered costs",
                description: "Produce cost, logistics, and applicable charges should be understood together when comparing offers.",
                stat: "Cost",
                statLabel: "Review included charges",
            },
        ],
    },
    hauler: {
        title: "Delivery partners",
        emoji: "🚚",
        subtitle: "Logistics partners face daily inefficiencies",
        accentHex: "#0891b2",          // cyan-600
        impactStat: "Planning",
        impactLabel: "for routes, vehicle fit, and payout terms",
        problems: [
            {
                icon: Truck,
                title: "Planning return journeys",
                description: "Load availability and return routes affect trip economics; a return load cannot be assumed.",
                stat: "Loads",
                statLabel: "Check route availability",
            },
            {
                icon: CreditCard,
                title: "Understanding payout terms",
                description: "Delivery confirmation, deductions, and settlement timing should be agreed before accepting a trip.",
                stat: "Payout",
                statLabel: "Confirm the conditions",
            },
            {
                icon: Route,
                title: "Evaluating a route",
                description: "Distance, stops, vehicle capacity, and fuel costs matter when deciding whether a route is a fit.",
                stat: "Route",
                statLabel: "Account for trip costs",
            },
            {
                icon: Phone,
                title: "Coordinating pickups",
                description: "Clear pickup details and contact information can help partners prepare for each delivery.",
                stat: "Pickup",
                statLabel: "Clarify the next step",
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
            className="relative py-24 md:py-32"
        >
            {/* Soft top divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
                            Audience needs
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4"
                    >
                        Better connections start with{" "}
                        <span className="text-orange-400">clearer information</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-center text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-14"
                    >
                        Explore the questions CropFresh is being designed to help each audience address.
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
                                    aria-pressed={active}
                                    onClick={() => handleTabChange(type)}
                                    className={`
                                        relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold
                                        transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white
                                        ${active
                                            ? "text-white shadow-lg shadow-black/20"
                                            : "glass-accent text-white/70 border border-white/10 hover:border-white/30 hover:text-white"
                                        }
                                    `}
                                    style={{
                                        background: active ? d.accentHex : undefined,
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
                                <span className="text-white/70 text-sm sm:text-base font-medium">
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
                                            className="group relative cursor-default"
                                        >
                                            <div
                                                className="relative h-full glass-card z-10"
                                                style={{
                                                    borderColor: "rgba(255,255,255,0.1)"
                                                }}
                                            >
                                                {/* Hover Highlight Border */}
                                                <div
                                                    className="absolute inset-0 border-2 rounded-2xl opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-20"
                                                    style={{ borderColor: activeData.accentHex }}
                                                />

                                                {/* Left accent */}
                                                <div
                                                    className="absolute left-0 top-0 bottom-0 w-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
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
                                                    <span className="block text-[11px] text-white/50 font-semibold mt-1 uppercase tracking-widest">
                                                        {problem.statLabel}
                                                    </span>
                                                </div>

                                                {/* Icon + Title */}
                                                <div className="flex items-center gap-3 mb-3 pl-2">
                                                    <div
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
                                                        style={{
                                                            background: `${activeData.accentHex}15`,
                                                            border: `1px solid ${activeData.accentHex}30`
                                                        }}
                                                    >
                                                        <Icon
                                                            className="w-5 h-5 drop-shadow-sm"
                                                            style={{ color: activeData.accentHex }}
                                                        />
                                                    </div>
                                                    <h4 className="font-semibold text-white text-[15px] leading-snug">
                                                        {problem.title}
                                                    </h4>
                                                </div>

                                                {/* Description */}
                                                <p className="text-white/70 text-sm leading-relaxed pl-2">
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
                            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-[15px] border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
                            style={{
                                color: "white",
                                background: activeData.accentHex,
                                borderColor: "transparent",
                                boxShadow: `0 10px 25px -5px ${activeData.accentHex}60`
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                 Explore the product approach
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
