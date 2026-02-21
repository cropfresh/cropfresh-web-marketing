"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container, Button } from "@/components/ui";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { trackCTAClick } from "@/lib/analytics";
import { Download, Smartphone } from "lucide-react";

export function FarmerDownload() {
    const handlePlayStoreClick = () => {
        trackCTAClick("play_store_download", "farmers_download", "https://play.google.com/store/apps/details?id=com.cropfresh.farmer");
        // In production, this would navigate to Play Store
        window.open("https://play.google.com/store/apps/details?id=com.cropfresh.farmer", "_blank");
    };

    const handleAPKDownload = () => {
        trackCTAClick("apk_download", "farmers_download", "/downloads/cropfresh-farmer.apk");
        // In production, this would download the APK
        alert("APK download coming soon! The app will be available on Play Store first.");
    };

    return (
        <section id="download" className="py-20 md:py-28 bg-slate-800/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="glow-orb glow-orb-primary w-[400px] h-[400px] -bottom-48 -right-48 animate-float-slow" />

            <Container>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                >
                    {/* Content */}
                    <motion.div variants={fadeInLeft} className="text-center lg:text-left">
                        <span className="text-[var(--color-primary-400)] text-sm font-semibold uppercase tracking-wider mb-4 block">
                            Get the App
                        </span>
                        <h2 className="heading-section text-[var(--color-text-primary)] mb-4">
                            Download{" "}
                            <span className="text-gradient">CropFresh Farmer</span>
                        </h2>
                        <p className="text-[var(--color-text-secondary)] text-lg mb-2">
                            Start selling your produce today
                        </p>
                        <p className="text-[var(--color-primary-400)] text-base mb-8">
                            ಇಂದೇ ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳನ್ನು ಮಾರಾಟ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿ
                        </p>

                        {/* App Features */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-500)]/20 flex items-center justify-center">
                                    <span className="text-lg">✓</span>
                                </div>
                                <span className="text-[var(--color-text-secondary)]">
                                    Voice listing in Kannada & English
                                </span>
                            </div>
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-500)]/20 flex items-center justify-center">
                                    <span className="text-lg">✓</span>
                                </div>
                                <span className="text-[var(--color-text-secondary)]">
                                    Instant UPI payments
                                </span>
                            </div>
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-500)]/20 flex items-center justify-center">
                                    <span className="text-lg">✓</span>
                                </div>
                                <span className="text-[var(--color-text-secondary)]">
                                    AI-powered fair pricing
                                </span>
                            </div>
                        </div>

                        {/* Download Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {/* Play Store Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handlePlayStoreClick}
                                className="inline-flex items-center gap-3 px-6 py-4 bg-black rounded-xl border border-white/20 hover:border-white/40 transition-colors group"
                            >
                                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
                                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
                                </svg>
                                <div className="text-left">
                                    <p className="text-xs text-white/60 uppercase tracking-wide">Get it on</p>
                                    <p className="text-lg font-semibold text-white group-hover:text-[var(--color-primary-400)] transition-colors">
                                        Google Play
                                    </p>
                                </div>
                            </motion.button>

                            {/* APK Download Button */}
                            <Button
                                variant="ghost"
                                size="lg"
                                onClick={handleAPKDownload}
                                className="flex items-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                <span>Download APK</span>
                            </Button>
                        </div>

                        {/* Coming soon note */}
                        <p className="text-sm text-[var(--color-text-muted)] mt-4">
                            📱 App launching soon! Register your interest below.
                        </p>
                    </motion.div>

                    {/* Phone Mockup */}
                    <motion.div
                        variants={fadeInRight}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-64 md:w-72">
                            {/* Phone frame */}
                            <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 rounded-[3rem] p-2 shadow-2xl shadow-primary/10">
                                {/* Screen */}
                                <div className="bg-slate-800 rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                                    {/* Phone content placeholder */}
                                    <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
                                        {/* Status bar */}
                                        <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center">
                                            <div className="w-24 h-5 bg-black rounded-full" />
                                        </div>

                                        {/* App content mockup */}
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center mb-4 shadow-lg">
                                            <span className="text-3xl">🌾</span>
                                        </div>
                                        <p className="text-white font-display font-bold text-lg mb-1">
                                            CropFresh
                                        </p>
                                        <p className="text-white/60 text-sm mb-6">Farmer App</p>

                                        {/* Feature icons */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-glass flex items-center justify-center mb-1">
                                                    <span className="text-lg">🎤</span>
                                                </div>
                                                <span className="text-[10px] text-white/50">Voice</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-glass flex items-center justify-center mb-1">
                                                    <span className="text-lg">💰</span>
                                                </div>
                                                <span className="text-[10px] text-white/50">Pay</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-glass flex items-center justify-center mb-1">
                                                    <span className="text-lg">📊</span>
                                                </div>
                                                <span className="text-[10px] text-white/50">Track</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative glow */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-[var(--color-primary-500)]/20 to-transparent blur-2xl -z-10" />
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
