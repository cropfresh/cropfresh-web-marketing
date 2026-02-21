"use client";

import { motion } from "framer-motion";
import { Container, Card } from "@/components/ui";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import { IndianRupee, Zap, ShieldCheck, Mic } from "lucide-react";

const benefits = [
    {
        icon: IndianRupee,
        title: "Fair Prices",
        titleKn: "ನ್ಯಾಯಯುತ ಬೆಲೆ",
        description: "No middlemen. Keep 100% of your earnings. Get market-fair prices calculated by AI.",
        descriptionKn: "ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲ. ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಗಳಿಕೆ ನಿಮಗೆ.",
        color: "text-green-400",
        bgGlow: "from-green-500/20 to-transparent",
    },
    {
        icon: Zap,
        title: "Instant Payment",
        titleKn: "ತಕ್ಷಣ ಪಾವತಿ",
        description: "Get paid via UPI the same day you sell (T+0). No waiting for 15-30 days.",
        descriptionKn: "ಮಾರಾಟದ ದಿನವೇ UPI ಮೂಲಕ ಪಾವತಿ ಪಡೆಯಿರಿ.",
        color: "text-yellow-400",
        bgGlow: "from-yellow-500/20 to-transparent",
    },
    {
        icon: ShieldCheck,
        title: "Free Quality Check",
        titleKn: "ಉಚಿತ ಗುಣಮಟ್ಟ ಪರಿಶೀಲನೆ",
        description: "Our agents verify quality at no cost to you. AI-powered grading ensures fair assessment.",
        descriptionKn: "ನಮ್ಮ ಏಜೆಂಟ್‌ಗಳು ಉಚಿತವಾಗಿ ಗುಣಮಟ್ಟ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.",
        color: "text-blue-400",
        bgGlow: "from-blue-500/20 to-transparent",
    },
    {
        icon: Mic,
        title: "Voice Listing",
        titleKn: "ಧ್ವನಿ ಮೂಲಕ ಪಟ್ಟಿ",
        description: "List crops by speaking in Kannada or English. No typing required.",
        descriptionKn: "ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ ಬೆಳೆಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ.",
        color: "text-purple-400",
        bgGlow: "from-purple-500/20 to-transparent",
    },
];

export function FarmerBenefits() {
    return (
        <section id="benefits" className="py-20 md:py-28 bg-slate-900/50 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent blur-3xl" />

            <Container>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section Header */}
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <span className="text-[var(--color-primary-400)] text-sm font-semibold uppercase tracking-wider mb-4 block">
                            Why CropFresh?
                        </span>
                        <h2 className="heading-section text-[var(--color-text-primary)] mb-4">
                            Why Farmers Love{" "}
                            <span className="text-gradient">CropFresh</span>
                        </h2>
                        <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
                            Join thousands of farmers who are earning more and getting paid faster
                        </p>
                        <p className="text-[var(--color-primary-400)] text-base mt-2">
                            ಸಾವಿರಾರು ರೈತರು ಹೆಚ್ಚು ಗಳಿಸುತ್ತಿದ್ದಾರೆ ಮತ್ತು ವೇಗವಾಗಿ ಪಾವತಿ ಪಡೆಯುತ್ತಿದ್ದಾರೆ
                        </p>
                    </motion.div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                variants={staggerItem}
                                custom={index}
                            >
                                <Card
                                    variant="glass"
                                    hover
                                    className="h-full group relative overflow-hidden"
                                >
                                    {/* Glow effect on hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${benefit.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                    />

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div
                                            className={`w-14 h-14 rounded-2xl bg-glass flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${benefit.color}`}
                                        >
                                            <benefit.icon className="w-7 h-7" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-display font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary-400)] transition-colors">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-sm text-[var(--color-primary-400)] mb-3">
                                            {benefit.titleKn}
                                        </p>

                                        {/* Description */}
                                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-2">
                                            {benefit.description}
                                        </p>
                                        <p className="text-sm text-[var(--color-text-muted)] italic">
                                            {benefit.descriptionKn}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
