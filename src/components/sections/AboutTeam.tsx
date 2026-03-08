"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/ui";
import { Users, Mail, Briefcase } from "lucide-react";

const teamMembers = [
    {
        name: "CropFresh Team",
        role: "Engineering & Operations",
        description: "A passionate team of engineers, agricultural experts, and operations specialists building the future of Indian agriculture.",
        emoji: "🌾",
    },
];

export function AboutTeam() {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-900/50 border-t border-white/5">
            <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-gradient-radial from-purple-500/5 to-transparent blur-3xl pointer-events-none" />
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
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-wider mb-6">
                            Our Team
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                            Built by People Who{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                Care
                            </span>
                        </h2>
                        <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                            We&apos;re a Karnataka-based team on a mission to make agriculture fair for everyone.
                        </p>
                    </motion.div>

                    {/* Team Card */}
                    <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
                        <div className="relative bg-[#0A0D14]/60 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center shadow-lg">
                            <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
                                <Users className="w-10 h-10 text-purple-400" strokeWidth={1.5} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                The CropFresh Team
                            </h3>
                            <p className="text-white/50 text-base leading-relaxed font-light max-w-lg mx-auto mb-8">
                                A passionate team of engineers, agricultural experts, and operations specialists building the future of Indian agriculture — one fair transaction at a time.
                            </p>

                            {/* Stats row */}
                            <div className="flex items-center justify-center gap-8 mb-8">
                                {[
                                    { icon: Briefcase, label: "Engineering", value: "AI & Full-Stack" },
                                    { icon: Users, label: "Operations", value: "Agri & Logistics" },
                                ].map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.label} className="text-center">
                                            <Icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                                            <p className="text-white/70 text-sm font-medium">{item.value}</p>
                                            <p className="text-white/40 text-xs">{item.label}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Hiring CTA */}
                            <a
                                href="mailto:careers@cropfresh.in"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium text-sm hover:bg-purple-500/20 transition-all duration-300"
                            >
                                <Mail className="w-4 h-4" />
                                We&apos;re Hiring — Join Us
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
