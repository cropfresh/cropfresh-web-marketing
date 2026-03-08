"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/ui";
import { Brain, Link2, Truck, Shield } from "lucide-react";

const pillars = [
    {
        icon: Brain,
        title: "AI-Powered Quality Grading",
        description: "Objective, consistent quality assessment using computer vision that ensures fair prices for farmers and reliability for buyers.",
        color: "text-cyan-400",
        bg: "from-cyan-500/20 to-cyan-500/5",
        border: "border-cyan-500/20",
        glow: "from-cyan-500/10",
    },
    {
        icon: Link2,
        title: "Direct Farm-to-Buyer",
        description: "Eliminating middlemen so farmers keep more earnings and buyers get fresher, traceable produce at better prices.",
        color: "text-green-400",
        bg: "from-green-500/20 to-green-500/5",
        border: "border-green-500/20",
        glow: "from-green-500/10",
    },
    {
        icon: Truck,
        title: "Optimized Logistics",
        description: "AI-planned multi-stop routes with real-time tracking to reduce waste, cut costs, and ensure on-time delivery.",
        color: "text-amber-400",
        bg: "from-amber-500/20 to-amber-500/5",
        border: "border-amber-500/20",
        glow: "from-amber-500/10",
    },
    {
        icon: Shield,
        title: "Digital Twin Traceability",
        description: "Complete transparency from seed to shelf with tamper-proof digital records that consumers and businesses can verify.",
        color: "text-purple-400",
        bg: "from-purple-500/20 to-purple-500/5",
        border: "border-purple-500/20",
        glow: "from-purple-500/10",
    },
];

export function AboutValuePillars() {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-900/50 border-t border-white/5">
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-teal-500/5 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section header */}
                    <motion.div variants={fadeInUp} className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase tracking-wider mb-6">
                            What We Do
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                            Technology for a{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">
                                Fairer Future
                            </span>
                        </h2>
                        <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                            Four pillars of innovation that power the CropFresh ecosystem.
                        </p>
                    </motion.div>

                    {/* Pillar Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pillars.map((pillar, index) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.div
                                    key={pillar.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="group relative"
                                >
                                    {/* Subtle glow on hover */}
                                    <div className={`absolute -inset-1 bg-gradient-to-br ${pillar.glow} to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                                    <div className={`relative bg-[#0A0D14]/60 backdrop-blur-xl border ${pillar.border} rounded-2xl p-8 shadow-lg hover:bg-white/[0.04] transition-all duration-500`}>
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.bg} border ${pillar.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className={`w-7 h-7 ${pillar.color}`} strokeWidth={1.5} />
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-white/90 transition-colors">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-white/50 text-sm leading-relaxed font-light">
                                            {pillar.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
