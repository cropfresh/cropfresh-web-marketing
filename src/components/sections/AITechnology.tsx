"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
    Brain, TrendingUp, Truck, Clock, Shield,
    MapPin, CheckCircle2, QrCode,
    ArrowRight, Sparkles, Eye
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─── */
interface AIFeature {
    icon: LucideIcon;
    name: string;
    description: string;
    accentHex: string;
    status: "Planned" | "Illustrative demo";
    size: "large" | "medium" | "small";
}

/* ─── Data ─── */
const aiFeatures: AIFeature[] = [
    {
        icon: Eye,
        name: "Quality-information workflow",
        description: "Proposed photo-assisted grading to support inspection. Crop-specific evaluation and human-review requirements need validation before use in real sourcing decisions.",
        accentHex: "#16a34a",
        status: "Planned",
        size: "large",
    },
    {
        icon: TrendingUp,
        name: "Pricing calculator",
        description: "A local calculator demonstrates possible price components. Illustrative calculations are not live market quotes or binding offers.",
        accentHex: "#ea580c",
        status: "Illustrative demo",
        size: "large",
    },
    {
        icon: Brain,
        name: "Buyer-matching concept",
        description: "The intended workflow considers crop, grade, quantity, and location. Sample matches do not establish real buyer demand or acceptance.",
        accentHex: "#7c3aed",
        status: "Planned",
        size: "medium",
    },
    {
        icon: Truck,
        name: "Route-coordination concept",
        description: "Proposed route planning brings pickup points, destinations, and vehicle capacity together. Fuel savings and live route availability have not been verified.",
        accentHex: "#0891b2",
        status: "Planned",
        size: "medium",
    },
    {
        icon: Clock,
        name: "Freshness-information concept",
        description: "The product direction explores how harvest and storage information could inform freshness estimates. This is not a validated shelf-life or food-safety prediction.",
        accentHex: "#d97706",
        status: "Planned",
        size: "small",
    },
    {
        icon: Shield,
        name: "Batch-record concept",
        description: "A proposed record links origin, harvest, inspection, and delivery details. A QR code alone does not establish a complete or tamper-proof history.",
        accentHex: "#059669",
        status: "Planned",
        size: "small",
    },
];

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
            className={`group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-white/20 hover:-translate-y-1
                ${isLarge ? "md:col-span-1 row-span-1" : ""}`}
        >
            {/* Top accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: feature.accentHex }}
            />

            <div className="p-6 sm:p-7 h-full flex flex-col relative z-10">
                {/* Icon + Name */}
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10 shadow-inner"
                        style={{ background: `${feature.accentHex}15` }}
                    >
                        <Icon className="w-6 h-6 drop-shadow-md" style={{ color: feature.accentHex }} />
                    </div>

                    {/* Stat */}
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-orange-300">
                        {feature.status}
                    </span>
                </div>

                <h3 className="font-display font-bold text-white text-xl mb-2">
                    {feature.name}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed flex-1">
                    {feature.description}
                </p>

            </div>
        </motion.div>
    );
}

/* ─── Journey Flow ─── */
const journeySteps = [
    { icon: MapPin, label: "Farm", color: "#16a34a" },
    { icon: CheckCircle2, label: "Inspection", color: "#0891b2" },
    { icon: Brain, label: "Sourcing", color: "#7c3aed" },
    { icon: Truck, label: "Delivery", color: "#ea580c" },
    { icon: QrCode, label: "Receipt", color: "#059669" },
];

/* ─── Main Component ─── */
export function AITechnology() {
    return (
        <section id="technology" className="relative py-24 md:py-32 bg-[#0A0D14] overflow-hidden">
            {/* ─── Layer 1: Animated Mesh Background ─── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full mix-blend-screen opacity-[0.07] filter blur-[120px]"
                    style={{ background: "radial-gradient(circle, #00E676 0%, transparent 70%)" }}
                />
            </div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] z-0" />

            {/* Top divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

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
                            Technology direction
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4"
                    >
                        AI & Technology{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Under the Hood</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-center text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-16"
                    >
                        Explore the proposed technology workflows and an illustrative pricing demo.
                        Planned capabilities are not verified production services.
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
                        className="max-w-5xl mx-auto relative z-10"
                    >
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden relative group hover:border-white/20 transition-all duration-500">
                            {/* Decorative blur */}
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-700" />
                            <div className="p-8 sm:p-10 lg:p-12 relative z-10">
                                {/* Banner Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
                                        <Shield className="w-7 h-7 text-emerald-400 drop-shadow-md" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-2">
                                            An illustrative batch journey
                                        </h3>
                                        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                                            The proposed batch record would connect information across these stages.
                                            This diagram explains the concept; it is not a record of a real delivery.
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
                                                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
                                                    <div
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center shadow-inner"
                                                        style={{ background: `${step.color}20`, border: `1px solid ${step.color}30` }}
                                                    >
                                                        <StepIcon className="w-4 h-4 drop-shadow-md" style={{ color: step.color }} />
                                                    </div>
                                                    <span className="text-sm font-semibold text-white/90">{step.label}</span>
                                                </div>

                                                {index < journeySteps.length - 1 && (
                                                    <motion.div
                                                        className="hidden sm:flex items-center mx-2"
                                                        animate={{ x: [0, 4, 0] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.15 }}
                                                    >
                                                        <ArrowRight className="w-5 h-5 text-white/20" />
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
