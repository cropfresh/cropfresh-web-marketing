"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button, Container } from "@/components/ui";
import { trackCTAClick } from "@/lib/analytics";
import { heroStagger, heroChildFade } from "@/lib/animations";
import { ChevronDown } from "lucide-react";

export function HaulerHero() {
    const sectionRef = useRef<HTMLElement>(null);

    const handleDownloadClick = () => {
        trackCTAClick("hauler_hero_download", "hauler_hero", "#download");
        document.querySelector("#download")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleCallbackClick = () => {
        trackCTAClick("hauler_hero_callback", "hauler_hero", "#callback");
        document.querySelector("#callback")?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToNext = () => {
        document.querySelector("#benefits")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden bg-black"
        >
            {/* ─── Layer 1: Animated Mesh Background (Hauler Theme: Orange/Amber) ─── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen opacity-20 filter blur-[120px]"
                    style={{ background: "radial-gradient(circle, var(--color-orange-500, #f97316) 0%, transparent 70%)" }}
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full mix-blend-screen opacity-20 filter blur-[100px]"
                    style={{ background: "radial-gradient(circle, var(--color-amber-500, #f59e0b) 0%, transparent 70%)" }}
                />
            </div>

            {/* ─── Layer 1: Enhanced Grid Pattern ─── */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] z-10" />

            {/* ─── Layer 2: Main Content ─── */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center pt-[140px] pb-12">
                <Container className="w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl mx-auto max-w-7xl">

                        {/* Left Column: Typography */}
                        <motion.div
                            variants={heroStagger}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-6 flex flex-col items-start text-left"
                        >
                            {/* Badge */}
                            <motion.div variants={heroChildFade} className="mb-6">
                                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                    </span>
                                    <span className="text-orange-300 text-sm font-medium tracking-wide font-kannada">
                                        ವಿತರಣಾ ಪಾಲುದಾರ / Delivery Partner
                                    </span>
                                </div>
                            </motion.div>

                            {/* Main Headline */}
                            <motion.h1
                                variants={heroChildFade}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-lg"
                            >
                                Earn More,<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                                    Drive Smart</span>
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                variants={heroChildFade}
                                className="text-base md:text-lg lg:text-xl text-white/70 max-w-lg mb-8 leading-relaxed font-light"
                            >
                                Join CropFresh as a delivery partner — optimized routes, instant pay, no empty returns
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                variants={heroChildFade}
                                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                            >
                                <Button
                                    variant="default"
                                    size="lg"
                                    onClick={handleDownloadClick}
                                    className="w-full sm:w-auto min-w-[200px] h-14 text-lg rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)] transition-all font-semibold border-none"
                                >
                                    <span className="mr-2">📲</span> Get Started
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    onClick={handleCallbackClick}
                                    className="w-full sm:w-auto min-w-[200px] h-14 text-lg rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-xl transition-all font-semibold"
                                >
                                    Talk to Expert
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Image in Glass Frame */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="lg:col-span-6 relative w-full h-[350px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mt-8 lg:mt-0 group"
                        >
                            <Image
                                src="/images/farmer-hero-award.jpg"
                                alt="Delivery Partner"
                                fill
                                className="object-cover object-[50%_30%] group-hover:scale-105 transition-transform duration-1000 hue-rotate-180"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Inner vignette so text pops */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-6">
                                {/* Floating Social Proof Card */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="bg-[#0A0D14]/70 backdrop-blur-md border border-white/10 p-4 rounded-2xl max-w-sm inline-block shadow-xl"
                                >
                                    <p className="text-white font-medium text-sm mb-2 drop-shadow-md">Join 1000+ Active Haulers</p>
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full border-2 border-[#0A0D14] bg-orange-600 flex items-center justify-center text-xs text-white shadow-sm z-[4]">🚚</div>
                                        <div className="w-8 h-8 rounded-full border-2 border-[#0A0D14] bg-amber-600 flex items-center justify-center text-xs text-white shadow-sm z-[3]">📦</div>
                                        <div className="w-8 h-8 rounded-full border-2 border-[#0A0D14] bg-yellow-600 flex items-center justify-center text-[10px] text-white font-bold z-[1] shadow-sm">
                                            +1k
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </div>

            {/* ─── Scroll Indicator ─── */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[15] hidden md:flex flex-col items-center gap-1 cursor-pointer group"
                onClick={scrollToNext}
            >
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium group-hover:text-white/80 transition-colors">
                    Explore Benefits
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown size={18} className="text-white/40 group-hover:text-orange-500 transition-colors" />
                </motion.div>
            </motion.div>
        </section>
    );
}
