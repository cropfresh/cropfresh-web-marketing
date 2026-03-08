"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { heroStagger, heroChildFade } from "@/lib/animations";
import { Heart, Sprout } from "lucide-react";

export function AboutHero() {
    return (
        <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden bg-black">
            {/* ─── Layer 1: Animated Mesh Background ─── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen opacity-15 filter blur-[120px]"
                    style={{ background: "radial-gradient(circle, var(--color-teal, #14b8a6) 0%, transparent 70%)" }}
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full mix-blend-screen opacity-15 filter blur-[100px]"
                    style={{ background: "radial-gradient(circle, var(--color-primary-500, #22c55e) 0%, transparent 70%)" }}
                />
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] z-[1]" />

            {/* ─── Content ─── */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center py-32">
                <Container className="w-full max-w-5xl text-center">
                    <motion.div
                        variants={heroStagger}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center"
                    >
                        {/* Badge */}
                        <motion.div variants={heroChildFade} className="mb-8">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm">
                                <Sprout className="w-4 h-4 text-green-400" />
                                <span className="text-green-300 text-sm font-medium tracking-wide">
                                    Our Mission
                                </span>
                            </div>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={heroChildFade}
                            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-tight drop-shadow-lg"
                        >
                            Fair Prices,{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                                Zero Waste
                            </span>
                        </motion.h1>

                        {/* Mission statement */}
                        <motion.p
                            variants={heroChildFade}
                            className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mb-10 leading-relaxed font-light"
                        >
                            CropFresh bridges the gap between farmers and buyers through AI-powered technology — ensuring fair prices, quality assurance, and efficient delivery across Karnataka.
                        </motion.p>

                        {/* Trust pills */}
                        <motion.div
                            variants={heroChildFade}
                            className="flex flex-wrap items-center justify-center gap-4"
                        >
                            {[
                                { label: "Founded in Karnataka", icon: "🇮🇳" },
                                { label: "AI-First Platform", icon: "🤖" },
                                { label: "Farm-to-Fork", icon: "🌾" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-white/70"
                                >
                                    <span>{item.icon}</span>
                                    {item.label}
                                </div>
                            ))}
                        </motion.div>

                        {/* Scroll hint */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="mt-16 flex flex-col items-center gap-2"
                        >
                            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                                Scroll to explore
                            </span>
                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Heart className="w-4 h-4 text-white/20" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </Container>
            </div>
        </section>
    );
}
