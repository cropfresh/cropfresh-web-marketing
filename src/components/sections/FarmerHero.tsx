"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button, Container } from "@/components/ui";
import { fadeInUp, staggerContainer, heroReveal, counterReveal } from "@/lib/animations";
import { trackCTAClick } from "@/lib/analytics";

/**
 * Animated counter component for "500+ farmers" stat
 */
function AnimatedCounter({ target, isVisible }: { target: number; isVisible: boolean }) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isVisible || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2000;
        const steps = 50;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [target, isVisible]);

    return <span className="tabular-nums">{count.toLocaleString("en-IN")}+</span>;
}

export function FarmerHero() {
    const [counterVisible, setCounterVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);

    // Parallax scroll effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

    // Intersection observer for counter
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCounterVisible(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleDownloadClick = () => {
        trackCTAClick("farmer_hero_download", "farmer_hero", "#download");
        document.querySelector("#download")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleCallbackClick = () => {
        trackCTAClick("farmer_hero_callback", "farmer_hero", "#callback");
        document.querySelector("#callback")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Parallax Background */}
            <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
                <Image
                    src="/images/farmer-hero-bg.jpg"
                    alt="Happy Indian farmer in green field"
                    fill
                    className="object-cover scale-110"
                    priority
                    quality={85}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/95 via-[var(--color-background)]/70 to-[var(--color-background)]" />
                {/* Gradient mesh overlay */}
                <div className="absolute inset-0 gradient-mesh" />
            </motion.div>

            {/* Glow Orbs */}
            <div className="glow-orb glow-orb-primary w-[400px] h-[400px] -top-48 -left-48 animate-float-slow" />
            <div
                className="glow-orb glow-orb-teal w-[300px] h-[300px] top-1/3 -right-32 animate-float"
                style={{ animationDelay: "-2s" }}
            />
            <div
                className="glow-orb glow-orb-accent w-[250px] h-[250px] bottom-24 left-1/4 animate-float-slow"
                style={{ animationDelay: "-4s" }}
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            {/* Main Content */}
            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="relative z-10 w-full"
            >
                <Container className="text-center py-16 md:py-24">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl mx-auto"
                    >
                        {/* Eyebrow Badge with Counter */}
                        <motion.div
                            ref={counterRef}
                            variants={fadeInUp}
                            className="flex justify-center mb-8"
                        >
                            <div className="glass-accent px-5 py-2.5 rounded-full inline-flex items-center gap-3 animate-glow-pulse">
                                <span className="text-2xl">🌾</span>
                                <span className="text-sm md:text-base font-medium text-[var(--color-primary-400)] tracking-wide">
                                    Join{" "}
                                    <motion.span
                                        variants={counterReveal}
                                        className="text-white font-bold"
                                    >
                                        <AnimatedCounter target={500} isVisible={counterVisible} />
                                    </motion.span>{" "}
                                    farmers earning more with CropFresh
                                </span>
                            </div>
                        </motion.div>

                        {/* Main Headline - Kannada-friendly */}
                        <motion.h1
                            variants={heroReveal}
                            className="heading-hero mb-6 font-display"
                        >
                            <span className="text-gradient text-glow">Fair Prices.</span>
                            <br />
                            <span className="text-gradient-accent text-glow-accent">Instant Payment.</span>
                            <br />
                            <span className="text-[var(--color-text-primary)]">Your Produce, Your Profit.</span>
                        </motion.h1>

                        {/* Kannada tagline */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-[var(--color-primary-400)] text-lg md:text-xl font-medium mb-4"
                        >
                            ನಿಮ್ಮ ಬೆಳೆ, ನಿಮ್ಮ ಲಾಭ
                        </motion.p>

                        {/* Subheadline */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            Sell directly to buyers. No middlemen. Get paid via{" "}
                            <span className="text-[var(--color-accent-400)] font-semibold">UPI the same day</span>.
                            List your crops by speaking in{" "}
                            <span className="text-[var(--color-teal)] font-semibold">Kannada or English</span>.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            {/* Primary CTA - Download App */}
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleDownloadClick}
                                className="group min-w-[200px]"
                            >
                                <span className="text-xl">📲</span>
                                <span>Download App</span>
                                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
                                    →
                                </span>
                            </Button>

                            {/* Secondary CTA - Get a Call Back */}
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={handleCallbackClick}
                                className="group min-w-[200px]"
                            >
                                <span className="text-xl">📞</span>
                                <span>Get a Call Back</span>
                                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
                                    →
                                </span>
                            </Button>
                        </motion.div>
                    </motion.div>
                </Container>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    onClick={() => {
                        document.querySelector("#benefits")?.scrollIntoView({
                            behavior: "smooth",
                        });
                    }}
                >
                    <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-[0.2em] font-medium group-hover:text-[var(--color-primary-400)] transition-colors">
                        See Benefits
                    </span>
                    <div className="w-6 h-10 border-2 border-[var(--color-primary-500)]/40 rounded-full flex justify-center pt-2 group-hover:border-[var(--color-primary-500)] transition-colors">
                        <motion.div
                            className="w-1.5 h-1.5 bg-[var(--color-primary-500)] rounded-full"
                            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
