"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import { Download, UserPlus, Banknote } from "lucide-react";

const steps = [
    {
        number: 1,
        icon: Download,
        title: "Download the App",
        titleKn: "ಅಪ್ಲಿಕೇಶನ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
        description: "Get CropFresh Farmer from Play Store or download APK directly",
        descriptionKn: "Play Store ನಿಂದ ಅಥವಾ ನೇರವಾಗಿ APK ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
        color: "from-green-400 to-emerald-600",
    },
    {
        number: 2,
        icon: UserPlus,
        title: "Register",
        titleKn: "ನೋಂದಣಿ ಮಾಡಿ",
        description: "Sign up with your phone number. OTP verification takes 30 seconds.",
        descriptionKn: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ನೋಂದಾಯಿಸಿ. 30 ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ OTP ಪರಿಶೀಲನೆ",
        color: "from-blue-400 to-cyan-600",
    },
    {
        number: 3,
        icon: Banknote,
        title: "Start Selling",
        titleKn: "ಮಾರಾಟ ಪ್ರಾರಂಭಿಸಿ",
        description: "List your crop using voice, get matched with buyers, and get paid!",
        descriptionKn: "ಧ್ವನಿ ಬಳಸಿ ನಿಮ್ಮ ಬೆಳೆ ಪಟ್ಟಿ ಮಾಡಿ, ಖರೀದಿದಾರರೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆ ಪಡೆಯಿರಿ ಮತ್ತು ಪಾವತಿ ಪಡೆಯಿರಿ!",
        color: "from-yellow-400 to-orange-600",
    },
];

export function FarmerGetStarted() {
    return (
        <section id="get-started" className="py-20 md:py-28 bg-slate-800/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 grid-pattern opacity-10" />

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
                            Simple Process
                        </span>
                        <h2 className="heading-section text-[var(--color-text-primary)] mb-4">
                            How to{" "}
                            <span className="text-gradient-accent">Get Started</span>
                        </h2>
                        <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto">
                            Start selling in 3 easy steps
                        </p>
                        <p className="text-[var(--color-primary-400)] text-base mt-2">
                            3 ಸುಲಭ ಹಂತಗಳಲ್ಲಿ ಮಾರಾಟ ಪ್ರಾರಂಭಿಸಿ
                        </p>
                    </motion.div>

                    {/* Steps */}
                    <div className="relative">
                        {/* Connector line - hidden on mobile */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary-500)]/30 to-transparent -translate-y-8" />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.number}
                                    variants={staggerItem}
                                    custom={index}
                                    className="relative"
                                >
                                    {/* Mobile connector */}
                                    {index < steps.length - 1 && (
                                        <div className="lg:hidden absolute left-1/2 top-full h-8 w-0.5 bg-gradient-to-b from-[var(--color-primary-500)]/50 to-transparent -translate-x-1/2" />
                                    )}

                                    <div className="glass-premium group cursor-default">
                                        <div className="glass-premium-inner p-8 text-center">
                                            {/* Step Number Badge */}
                                            <motion.div
                                                className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <span className="text-2xl font-display font-bold text-white">
                                                    {step.number}
                                                </span>
                                            </motion.div>

                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-xl bg-glass flex items-center justify-center mx-auto mb-5 text-[var(--color-primary-400)]">
                                                <step.icon className="w-6 h-6" />
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-display font-semibold text-[var(--color-text-primary)] mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-[var(--color-primary-400)] mb-4">
                                                {step.titleKn}
                                            </p>

                                            {/* Description */}
                                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-2">
                                                {step.description}
                                            </p>
                                            <p className="text-sm text-[var(--color-text-muted)] italic">
                                                {step.descriptionKn}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
