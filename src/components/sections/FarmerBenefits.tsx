"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import { IndianRupee, Zap, ShieldCheck, Mic } from "lucide-react";

const benefits = [
    {
        icon: IndianRupee,
        title: "Fair Prices",
        titleKn: "ನ್ಯಾಯಯುತ ಬೆಲೆ",
        description: "No middlemen. Keep 100% of your earnings. Get market-fair prices calculated by AI.",
        descriptionKn: "ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲ. ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಗಳಿಕೆ ನಿಮಗೆ.",
        color: "text-[var(--color-primary-400)]",
    },
    {
        icon: Zap,
        title: "Instant Payment",
        titleKn: "ತಕ್ಷಣ ಪಾವತಿ",
        description: "Get paid via UPI the same day you sell (T+0). No waiting for 15-30 days.",
        descriptionKn: "ಮಾರಾಟದ ದಿನವೇ UPI ಮೂಲಕ ಪಾವತಿ ಪಡೆಯಿರಿ.",
        color: "text-[var(--color-accent-400)]",
    },
    {
        icon: ShieldCheck,
        title: "Free Quality Check",
        titleKn: "ಉಚಿತ ಗುಣಮಟ್ಟ ಪರಿಶೀಲನೆ",
        description: "Our agents verify quality at no cost to you. AI-powered grading ensures fair assessment.",
        descriptionKn: "ನಮ್ಮ ಏಜೆಂಟ್‌ಗಳು ಉಚಿತವಾಗಿ ಗುಣಮಟ್ಟ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.",
        color: "text-[var(--color-teal)]",
    },
    {
        icon: Mic,
        title: "Voice Listing",
        titleKn: "ಧ್ವನಿ ಮೂಲಕ ಪಟ್ಟಿ",
        description: "List crops by speaking in Kannada or English. No typing required.",
        descriptionKn: "ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ ಬೆಳೆಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ.",
        color: "text-[var(--color-primary-400)]",
    },
];

export function FarmerBenefits() {
    return (
        <section id="benefits" className="py-24 relative overflow-hidden bg-[#070A0F] border-t border-white/5">
            {/* Background Texture - Dark and Ethereal without neon */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.04] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-radial from-[var(--color-primary-500)]/8 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-gradient-radial from-[var(--color-teal)]/5 to-transparent blur-3xl pointer-events-none" />

            <Container className="relative z-10 w-full max-w-7xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section Header */}
                    <motion.div variants={fadeInUp} className="text-center mb-16 flex flex-col items-center">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm mb-6">
                            <span className="text-[var(--color-primary-300)] text-sm font-medium tracking-wide uppercase">
                                Why CropFresh?
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                            Why Farmers Love <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-teal)]">CropFresh</span>
                        </h2>
                        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-2">
                            Join thousands of farmers who are earning more and getting paid faster
                        </p>
                        <p className="text-[var(--color-primary-400)]/80 text-base font-kannada">
                            ಸಾವಿರಾರು ರೈತರು ಹೆಚ್ಚು ಗಳಿಸುತ್ತಿದ್ದಾರೆ ಮತ್ತು ವೇಗವಾಗಿ ಪಾವತಿ ಪಡೆಯುತ್ತಿದ್ದಾರೆ
                        </p>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {benefits.map((benefit, index) => {
                            // Asymmetrical Bento Layout: First and last cards are wide
                            const isLarge = index === 0 || index === 3;
                            return (
                                <motion.div
                                    key={benefit.title}
                                    variants={staggerItem}
                                    custom={index}
                                    className={`${isLarge ? "lg:col-span-2" : "lg:col-span-1"}`}
                                >
                                    <div className="bg-[#0A0D14]/80 backdrop-blur-2xl border border-white/10 rounded-3xl h-full group hover:bg-[#111623]/80 hover:border-white/20 transition-all duration-500 overflow-hidden relative shadow-2xl">

                                        {/* Subtle Shine Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                        <div className="relative z-10 p-8 sm:p-10 flex flex-col h-full">
                                            {/* Header Layer (Icon + Title) */}
                                            <div className={`flex ${isLarge ? 'flex-row items-center gap-6' : 'flex-col gap-6'} mb-6`}>
                                                <div className={`shrink-0 w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500 ${benefit.color}`}>
                                                    <benefit.icon className="w-8 h-8" strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors duration-300 tracking-tight">
                                                        {benefit.title}
                                                    </h3>
                                                    <p className="text-sm font-medium text-white/50 tracking-wide font-kannada">
                                                        {benefit.titleKn}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Description Layer */}
                                            <div className="mt-auto">
                                                <p className="text-white/70 leading-relaxed font-light text-base sm:text-lg mb-3">
                                                    {benefit.description}
                                                </p>
                                                <p className="text-sm text-white/40 italic font-kannada">
                                                    {benefit.descriptionKn}
                                                </p>
                                            </div>
                                        </div>
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
