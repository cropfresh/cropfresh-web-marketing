"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/ui";

export function ContactHero() {
    return (
        <section className="relative pt-40 pb-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/95 to-slate-900/80" />
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-radial from-green-500/8 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] pointer-events-none" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="text-center max-w-3xl mx-auto"
                >
                    <motion.p
                        variants={fadeInUp}
                        className="text-sm font-semibold tracking-widest uppercase text-[var(--color-accent-500)] mb-4"
                    >
                        We&apos;re Here to Help
                    </motion.p>
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
                    >
                        Whether you&apos;re a farmer, buyer, or partner — we&apos;d love to hear from you.
                        Reach out for support, partnerships, or any questions.
                    </motion.p>
                </motion.div>
            </Container>
        </section>
    );
}
