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
        tagline: "Empowering India's agricultural heroes",
        accentHex: "#16a34a",
        accentLight: "#f0fdf4",
        solutions: [
            {
                icon: Wallet,
                title: "Better Prices, Instant Payment",
                description: "Get 20-40% higher prices with T+0 UPI payment directly to your bank. No more waiting weeks for middlemen to pay.",
                features: ["No middlemen cuts", "Same-day UPI payment", "Fair price discovery", "Transparent bidding"],
                visual: { mainIcon: IndianRupee, supportIcons: [Wallet, Zap, Shield], stat: "40%", statLabel: "higher earnings" },
            },
            {
                icon: Mic,
                title: "Voice Listing in Kannada",
                description: "List your produce using simple voice commands in your native language. Just speak — AI does the rest.",
                features: ["Kannada & Hindi support", "Photo-based listing", "AI quality estimation", "Zero typing needed"],
                visual: { mainIcon: Mic, supportIcons: [Globe, Star, Smartphone], stat: "30s", statLabel: "to list produce" },
            },
            {
                icon: BarChart3,
                title: "Real-time Market Prices",
                description: "See exactly what buyers are paying across all markets. Make informed decisions backed by live data.",
                features: ["Live price updates", "Quality-based pricing", "Demand forecasts", "Price history trends"],
                visual: { mainIcon: TrendingUp, supportIcons: [BarChart3, Leaf, Clock], stat: "100+", statLabel: "markets tracked" },
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
                title: "Verified Quality Grades",
                description: "Every batch is field-verified with our 5-point grading system. Know exactly what you're getting before it arrives.",
                features: ["A/B/C quality grades", "Photo verification", "Digital Twin record", "Rejection-free ordering"],
                visual: { mainIcon: CheckCircle2, supportIcons: [Shield, Star, Leaf], stat: "5-pt", statLabel: "grading system" },
            },
            {
                icon: QrCode,
                title: "Farm-to-Fork Traceability",
                description: "Know exactly where your produce comes from and when it was harvested. Complete transparency for food safety.",
                features: ["QR code scanning", "Complete journey history", "Food safety compliance", "Origin certificates"],
                visual: { mainIcon: QrCode, supportIcons: [Map, Clock, Shield], stat: "100%", statLabel: "traceable" },
            },
            {
                icon: CalendarCheck,
                title: "Reliable Supply Chain",
                description: "Consistent supply with scheduled deliveries you can count on. No more last-minute stockouts.",
                features: ["Subscription ordering", "Demand forecasting", "Multi-farmer sourcing", "Guaranteed delivery"],
                visual: { mainIcon: CalendarCheck, supportIcons: [Truck, Star, Clock], stat: "99%", statLabel: "delivery reliability" },
            },
        ],
    },
    hauler: {
        title: "Haulers",
        emoji: "🚚",
        tagline: "Maximize earnings, minimize effort",
        accentHex: "#0891b2",
        accentLight: "#ecfeff",
        solutions: [
            {
                icon: Map,
                title: "Optimized Multi-Stop Routes",
                description: "AI-planned routes that maximize loads and minimize distance. More deliveries, less fuel, more earnings.",
                features: ["Smart routing", "Multi-pickup optimization", "Fuel savings up to 30%", "Live traffic updates"],
                visual: { mainIcon: Route, supportIcons: [Map, Truck, Zap], stat: "30%", statLabel: "fuel saved" },
            },
            {
                icon: Zap,
                title: "Instant Payment on Delivery",
                description: "Get paid the moment buyer confirms delivery via QR scan. No more chasing payments for weeks.",
                features: ["T+0 settlement", "Direct UPI transfer", "No payment delays", "Earnings dashboard"],
                visual: { mainIcon: Zap, supportIcons: [Wallet, IndianRupee, Shield], stat: "T+0", statLabel: "instant payment" },
            },
            {
                icon: Smartphone,
                title: "Easy Load Discovery",
                description: "Find loads heading your way without endless phone calls. Get matched automatically based on your location.",
                features: ["Location-based matching", "Load notifications", "Transparent pricing", "Rating system"],
                visual: { mainIcon: Smartphone, supportIcons: [Globe, Star, Route], stat: "3x", statLabel: "more loads found" },
            },
        ],
    },
};

const userTypes = ["farmer", "buyer", "hauler"] as const;

/* ─── Visual Panel Component ─── */
function SolutionVisual({
    visual,
    accentHex,
    accentLight,
    reversed,
}: {
    visual: Solution["visual"];
    accentHex: string;
    accentLight: string;
    reversed: boolean;
}) {
    const MainIcon = visual.mainIcon;
    return (
        <div
            className={`relative w-full aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden flex items-center justify-center ${reversed ? "lg:order-2" : ""}`}
            style={{ background: accentLight }}
        >
            {/* Decorative circles */}
            <div
                className="absolute w-64 h-64 rounded-full opacity-[0.07]"
                style={{
                    background: accentHex,
                    top: "-10%",
                    right: "-10%",
                }}
            />
            <div
                className="absolute w-40 h-40 rounded-full opacity-[0.05]"
                style={{
                    background: accentHex,
                    bottom: "5%",
                    left: "5%",
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
                        className="absolute w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                            background: "white",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
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
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                        background: "white",
                        boxShadow: `0 8px 32px ${accentHex}20`,
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
                    className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                    style={{
                        background: "white",
                        boxShadow: `0 2px 12px ${accentHex}15`,
                    }}
                >
                    <span
                        className="text-xl sm:text-2xl font-display font-black leading-none"
                        style={{ color: accentHex }}
                    >
                        {visual.stat}
                    </span>
                    <span className="text-neutral-500 text-xs sm:text-sm font-medium">
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
            className="relative py-24 md:py-32 bg-white"
        >
            {/* Top divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {/* ── Header ── */}
                    <motion.div variants={fadeInUp} className="text-center mb-5">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            The Solution
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-900 leading-tight mb-4"
                    >
                        How CropFresh{" "}
                        <span className="text-emerald-600">Solves It</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-center text-neutral-500 text-base sm:text-lg max-w-2xl mx-auto mb-14"
                    >
                        One platform connecting farmers, buyers, and haulers with
                        transparency, instant payments, and verified quality.
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
                                    onClick={() => handleTabChange(type)}
                                    className={`
                                        relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold
                                        transition-all duration-250 outline-none
                                        ${active
                                            ? "text-white shadow-md"
                                            : "bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-900"
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
                                                accentLight={activeData.accentLight}
                                                reversed={reversed}
                                            />

                                            {/* Text Content */}
                                            <div className={reversed ? "lg:order-1" : ""}>
                                                {/* Icon + Title */}
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div
                                                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                                        style={{ background: `${activeData.accentHex}12` }}
                                                    >
                                                        <Icon
                                                            className="w-5 h-5"
                                                            style={{ color: activeData.accentHex }}
                                                        />
                                                    </div>
                                                    <h3 className="font-display font-bold text-neutral-900 text-xl sm:text-2xl leading-snug">
                                                        {solution.title}
                                                    </h3>
                                                </div>

                                                {/* Description */}
                                                <p className="text-neutral-500 text-base leading-relaxed mb-6">
                                                    {solution.description}
                                                </p>

                                                {/* Feature List */}
                                                <ul className="space-y-3 mb-6">
                                                    {solution.features.map((feature) => (
                                                        <li
                                                            key={feature}
                                                            className="flex items-center gap-3 text-sm text-neutral-700"
                                                        >
                                                            <span
                                                                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                                                style={{ background: `${activeData.accentHex}15` }}
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
                                                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                                                    style={{ color: activeData.accentHex }}
                                                >
                                                    Learn more
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
