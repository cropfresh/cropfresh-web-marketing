"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
    Brain, Search, TrendingUp, Truck, Clock, Shield,
    Zap, Leaf, MapPin, CheckCircle2, QrCode,
    ArrowRight, Sparkles, Eye
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─── */
interface AIFeature {
    icon: LucideIcon;
    name: string;
    description: string;
    accentHex: string;
    stat: string;
    statLabel: string;
    size: "large" | "medium" | "small";
}

/* ─── Data ─── */
const aiFeatures: AIFeature[] = [
    {
        icon: Eye,
        name: "Quality Grading AI",
        description: "Deep learning analyzes produce photos to assign A/B/C quality grades with 95% accuracy. No subjective guesswork.",
        accentHex: "#16a34a",
        stat: "95%",
        statLabel: "accuracy",
        size: "large",
    },
    {
        icon: TrendingUp,
        name: "Dynamic Pricing Engine",
        description: "DPLE calculates fair All-Inclusive Single Prices using real-time demand, supply curves, and seasonal patterns.",
        accentHex: "#ea580c",
        stat: "Real-time",
        statLabel: "pricing",
        size: "large",
    },
    {
        icon: Brain,
        name: "Matchmaking Engine",
        description: "Pairs farmers to best-fit buyers based on quality, quantity, proximity, and preference history.",
        accentHex: "#7c3aed",
        stat: "< 5 min",
        statLabel: "match time",
        size: "medium",
    },
    {
        icon: Truck,
        name: "Route Optimizer",
        description: "Creates optimal multi-stop delivery routes for maximum load efficiency and 30% fuel savings.",
        accentHex: "#0891b2",
        stat: "30%",
        statLabel: "fuel saved",
        size: "medium",
    },
    {
        icon: Clock,
        name: "Shelf-Life Predictor",
        description: "ML estimates freshness duration to minimize wastage and optimize inventory across the supply chain.",
        accentHex: "#d97706",
        stat: "40%",
        statLabel: "less waste",
        size: "small",
    },
    {
        icon: Shield,
        name: "Digital Twin",
        description: "Immutable, tamper-proof record of every batch — from field to fork. Complete traceability via QR.",
        accentHex: "#059669",
        stat: "100%",
        statLabel: "traceable",
        size: "small",
    },
];

/* ─── Animated Counter ─── */
function AnimatedStat({ value, label, accentHex }: { value: string; label: string; accentHex: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const numericMatch = value.match(/^(\d+)/);
    const numericValue = numericMatch ? parseInt(numericMatch[1]) : null;
    const suffix = numericMatch ? value.slice(numericMatch[1].length) : value;
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView && numericValue !== null) {
            let start = 0;
            const duration = 1200;
            const step = Math.max(1, Math.floor(numericValue / 40));
            const interval = duration / (numericValue / step);
            const timer = setInterval(() => {
                start += step;
                if (start >= numericValue) {
                    setCount(numericValue);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, interval);
            return () => clearInterval(timer);
        }
    }, [isInView, numericValue]);

    return (
        <div ref={ref} className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-display font-black leading-none" style={{ color: accentHex }}>
                {numericValue !== null ? (isInView ? `${count}${suffix}` : "0") : value}
            </span>
            <span className="text-neutral-400 text-xs font-medium">{label}</span>
        </div>
    );
}

/* ─── Bento Card ─── */
function BentoCard({ feature, index }: { feature: AIFeature; index: number }) {
    const Icon = feature.icon;
    const isLarge = feature.size === "large";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
            className={`group relative rounded-2xl border border-neutral-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-neutral-300 hover:-translate-y-0.5
                ${isLarge ? "md:col-span-1 row-span-1" : ""}`}
        >
            {/* Top accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: feature.accentHex }}
            />

            <div className="p-6 sm:p-7 h-full flex flex-col">
                {/* Icon + Name */}
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${feature.accentHex}10` }}
                    >
                        <Icon className="w-5 h-5" style={{ color: feature.accentHex }} />
                    </div>

                    {/* Stat */}
                    <AnimatedStat
                        value={feature.stat}
                        label={feature.statLabel}
                        accentHex={feature.accentHex}
                    />
                </div>

                <h3 className="font-display font-bold text-neutral-900 text-lg mb-2">
                    {feature.name}
                </h3>

                <p className="text-neutral-500 text-sm leading-relaxed flex-1">
                    {feature.description}
                </p>

                {/* Subtle hover indicator */}
                <div
                    className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <span className="text-xs font-semibold" style={{ color: feature.accentHex }}>
                        Learn more
                    </span>
                    <ArrowRight className="w-3 h-3" style={{ color: feature.accentHex }} />
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Journey Flow ─── */
const journeySteps = [
    { icon: MapPin, label: "Farm", color: "#16a34a" },
    { icon: CheckCircle2, label: "Verified", color: "#0891b2" },
    { icon: Brain, label: "AI Matched", color: "#7c3aed" },
    { icon: Truck, label: "In Transit", color: "#ea580c" },
    { icon: QrCode, label: "Delivered", color: "#059669" },
];

/* ─── Main Component ─── */
export function AITechnology() {
    return (
        <section id="technology" className="relative py-24 md:py-32 bg-[#fafaf8]">
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
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold uppercase tracking-wider mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            Powered by Innovation
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-900 leading-tight mb-4"
                    >
                        AI & Technology{" "}
                        <span className="text-violet-600">Under the Hood</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-center text-neutral-500 text-base sm:text-lg max-w-2xl mx-auto mb-16"
                    >
                        Six intelligent systems working behind the scenes to ensure fair pricing,
                        verified quality, and transparent operations — all powered by cutting-edge AI.
                    </motion.p>

                    {/* ── Bento Grid ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-16 lg:mb-20">
                        {aiFeatures.map((feature, index) => (
                            <BentoCard key={feature.name} feature={feature} index={index} />
                        ))}
                    </div>

                    {/* ── Digital Twin Journey Banner ── */}
                    <motion.div
                        variants={fadeInUp}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
                            <div className="p-8 sm:p-10 lg:p-12">
                                {/* Banner Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                                        <Shield className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-neutral-900 text-xl sm:text-2xl mb-1">
                                            Trust Through{" "}
                                            <span className="text-emerald-600">Transparency</span>
                                        </h3>
                                        <p className="text-neutral-500 text-sm sm:text-base">
                                            Every batch has a <strong className="text-neutral-700">Digital Twin</strong> — a tamper-proof
                                            record from farm to fork. Buyers verify origin, grading, and journey via QR scan.
                                        </p>
                                    </div>
                                </div>

                                {/* Journey Flow */}
                                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-0">
                                    {journeySteps.map((step, index) => {
                                        const StepIcon = step.icon;
                                        return (
                                            <motion.div
                                                key={step.label}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.12 + 0.2 }}
                                                className="flex items-center"
                                            >
                                                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                                                    <div
                                                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                                                        style={{ background: `${step.color}12` }}
                                                    >
                                                        <StepIcon className="w-3.5 h-3.5" style={{ color: step.color }} />
                                                    </div>
                                                    <span className="text-sm font-medium text-neutral-700">{step.label}</span>
                                                </div>

                                                {index < journeySteps.length - 1 && (
                                                    <motion.div
                                                        className="hidden sm:flex items-center mx-2"
                                                        animate={{ x: [0, 3, 0] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.15 }}
                                                    >
                                                        <ArrowRight className="w-4 h-4 text-neutral-300" />
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
