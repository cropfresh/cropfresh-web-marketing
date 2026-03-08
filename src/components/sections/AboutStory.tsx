"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/ui";
import { Lightbulb, Code, Users, Rocket } from "lucide-react";

const milestones = [
    {
        year: "2025",
        title: "Ideation & Research",
        description: "Observed farmer exploitation by middlemen; began researching AI solutions",
        icon: Lightbulb,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
    },
    {
        year: "2025",
        title: "Platform Built",
        description: "Built AI grading engine, marketplace, and logistics system",
        icon: Code,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
    {
        year: "2026",
        title: "First Farmers Onboarded",
        description: "Partnered with farmers across Kolar, Chikkaballapur, and Tumkur",
        icon: Users,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
    },
    {
        year: "2026",
        title: "Karnataka Launch",
        description: "Full marketplace launch across Karnataka with AI grading and logistics",
        icon: Rocket,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
    },
];

export function AboutStory() {
    return (
        <section className="py-24 relative overflow-hidden bg-black border-t border-white/5">
            {/* Background glow */}
            <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-radial from-green-500/5 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section header */}
                    <motion.div variants={fadeInUp} className="max-w-3xl mb-16">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-wider mb-6">
                            Our Story
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                            Why We Built{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                                CropFresh
                            </span>
                        </h2>
                        <p className="text-white/60 text-base md:text-lg leading-relaxed font-light">
                            Indian farmers lose 30–40% of their earnings to middlemen, while buyers struggle with inconsistent quality and opaque pricing. We saw this broken system firsthand in Karnataka&apos;s agricultural markets — and set out to fix it with AI and direct farm-to-buyer connections.
                        </p>
                    </motion.div>

                    {/* Timeline */}
                    <motion.div variants={fadeInUp} className="relative">
                        {/* Horizontal line (desktop) / Vertical line (mobile) */}
                        <div className="hidden md:block absolute top-[42px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="md:hidden absolute top-0 bottom-0 left-[23px] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
                            {milestones.map((milestone, index) => {
                                const Icon = milestone.icon;
                                return (
                                    <motion.div
                                        key={milestone.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15, duration: 0.5 }}
                                        className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0"
                                    >
                                        {/* Dot on timeline */}
                                        <div className={`relative z-10 w-12 h-12 rounded-xl ${milestone.bg} border ${milestone.border} flex items-center justify-center flex-shrink-0 shadow-lg md:mb-6`}>
                                            <Icon className={`w-5 h-5 ${milestone.color}`} />
                                        </div>

                                        {/* Content */}
                                        <div className="md:text-center">
                                            <span className={`text-sm font-bold ${milestone.color} tracking-wide`}>
                                                {milestone.year}
                                            </span>
                                            <h3 className="text-lg font-bold text-white mt-1 mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-white/50 text-sm leading-relaxed font-light">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
