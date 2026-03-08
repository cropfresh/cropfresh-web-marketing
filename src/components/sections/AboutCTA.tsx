"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/ui";
import { trackCTAClick } from "@/lib/analytics";
import Link from "next/link";
import { Sprout, ShoppingBag, Truck, ArrowRight } from "lucide-react";

const roles = [
    {
        title: "I'm a Farmer",
        description: "Sell your produce directly to buyers at fair prices with AI quality grading.",
        href: "/farmers",
        icon: Sprout,
        color: "text-green-400",
        bg: "from-green-500/20 to-green-500/5",
        border: "border-green-500/20",
        hoverGlow: "group-hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]",
        analyticsId: "about_cta_farmer",
    },
    {
        title: "I'm a Buyer",
        description: "Source verified, graded produce directly from farms with full traceability.",
        href: "/buyers",
        icon: ShoppingBag,
        color: "text-blue-400",
        bg: "from-blue-500/20 to-blue-500/5",
        border: "border-blue-500/20",
        hoverGlow: "group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]",
        analyticsId: "about_cta_buyer",
    },
    {
        title: "I'm a Hauler",
        description: "Earn more with optimized routes, instant payments, and flexible schedules.",
        href: "/haulers",
        icon: Truck,
        color: "text-orange-400",
        bg: "from-orange-500/20 to-orange-500/5",
        border: "border-orange-500/20",
        hoverGlow: "group-hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]",
        analyticsId: "about_cta_hauler",
    },
];

export function AboutCTA() {
    return (
        <section className="py-24 relative overflow-hidden bg-black border-t border-white/5">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-green-500/5 to-transparent blur-3xl pointer-events-none" />
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
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-wider mb-6">
                            Get Started
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                            Join the{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                                Movement
                            </span>
                        </h2>
                        <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                            Be part of the agricultural revolution. Choose your role and get started.
                        </p>
                    </motion.div>

                    {/* Role CTA Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {roles.map((role, index) => {
                            const Icon = role.icon;
                            return (
                                <motion.div
                                    key={role.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <Link
                                        href={role.href}
                                        onClick={() => trackCTAClick(role.analyticsId, "about_page", role.href)}
                                        className={`group block relative bg-[#0A0D14]/60 backdrop-blur-xl border ${role.border} rounded-2xl p-8 text-center transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-1 ${role.hoverGlow}`}
                                    >
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.bg} border ${role.border} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className={`w-8 h-8 ${role.color}`} strokeWidth={1.5} />
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                            {role.title}
                                        </h3>
                                        <p className="text-white/50 text-sm leading-relaxed font-light mb-6">
                                            {role.description}
                                        </p>

                                        <div className={`inline-flex items-center gap-2 ${role.color} text-sm font-medium group-hover:gap-3 transition-all duration-300`}>
                                            Learn More <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Contact CTA */}
                    <motion.div variants={fadeInUp} className="text-center mt-12">
                        <p className="text-white/40 text-sm mb-4">Have questions? Want to partner?</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-300"
                        >
                            Contact Us <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
