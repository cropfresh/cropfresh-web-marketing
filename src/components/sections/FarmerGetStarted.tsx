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
        titleKn: "ಆಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
        description: "Get CropFresh Farmer from Play Store or download APK directly",
        descriptionKn: "Play Store ನಿಂದ ಅಥವಾ ನೇರವಾಗಿ APK ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
        glowColor: "text-[var(--color-primary-400)] shadow-[var(--color-primary-400)]",
    },
    {
        number: 2,
        icon: UserPlus,
        title: "Register",
        titleKn: "ನೋಂದಣಿ ಮಾಡಿ",
        description: "Sign up with your phone number. OTP verification takes 30 seconds.",
        descriptionKn: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ನೋಂದಾಯಿಸಿ. 30 ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ OTP ಪರಿಶೀಲನೆ",
        glowColor: "text-[var(--color-accent-400)] shadow-amber-400",
    },
    {
        number: 3,
        icon: Banknote,
        title: "Start Selling",
        titleKn: "ಮಾರಾಟ ಪ್ರಾರಂಭಿಸಿ",
        description: "List your crop using voice, get matched with buyers, and get paid!",
        descriptionKn: "ಧ್ವನಿ ಬಳಸಿ ನಿಮ್ಮ ಬೆಳೆ ಪಟ್ಟಿ ಮಾಡಿ, ಖರೀದಿದಾರರೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆ ಪಡೆಯಿರಿ ಮತ್ತು ಪಾವತಿ ಪಡೆಯಿರಿ!",
        glowColor: "text-[var(--color-teal)] shadow-[var(--color-teal)]",
    },
];

export function FarmerGetStarted() {
    return (
        <section id="get-started" className="py-24 relative overflow-hidden bg-[#070A0F] border-t border-white/5">
            {/* Dark Aesthetic Background textures */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] pointer-events-none" />
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-[var(--color-primary-500)]/6 to-transparent blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-gradient-radial from-[var(--color-accent-500)]/5 to-transparent blur-3xl pointer-events-none" />

            <Container className="relative z-10 w-full max-w-7xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section Header */}
                    <motion.div variants={fadeInUp} className="text-center mb-24 flex flex-col items-center">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm mb-6">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-primary-400)] mr-2" />
                            <span className="text-[var(--color-primary-300)] text-sm font-medium tracking-wide uppercase">
                                Simple Process
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                            How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-teal)]">Get Started</span>
                        </h2>
                        <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed mb-2">
                            Start selling directly to buyers in 3 easy steps
                        </p>
                        <p className="text-[var(--color-primary-400)]/80 text-sm font-kannada tracking-wide">
                            3 ಸುಲಭ ಹಂತಗಳಲ್ಲಿ ಮಾರಾಟ ಪ್ರಾರಂಭಿಸಿ
                        </p>
                    </motion.div>

                    {/* Staggered Horizontal Flow */}
                    <div className="relative">
                        {/* Connecting Line (Desktop only) */}
                        <div className="hidden lg:block absolute top-[120px] left-[10%] right-[10%] h-[1px] bg-white/10">
                            <motion.div
                                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                initial={{ x: "-100%" }}
                                whileInView={{ x: "100%" }}
                                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pb-12">
                            {steps.map((step, index) => {
                                // Stagger calculation: Middle step drops down
                                const isMiddle = index === 1;

                                return (
                                    <motion.div
                                        key={step.number}
                                        variants={staggerItem}
                                        custom={index}
                                        className={`relative flex flex-col items-center group ${isMiddle ? 'lg:translate-y-16' : ''}`}
                                    >
                                        {/* Mobile Connecting Line */}
                                        {index < steps.length - 1 && (
                                            <div className="lg:hidden absolute left-1/2 top-full h-8 w-px bg-white/10 -translate-x-1/2" />
                                        )}

                                        {/* Step Card Container */}
                                        <div className="bg-[#0A0D14]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] w-full p-8 sm:p-10 relative overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-[#111623]/80 shadow-2xl flex flex-col items-center text-center z-10">

                                            {/* Glowing Shine Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                            {/* Icon Header block */}
                                            <div className="relative mb-8">
                                                {/* Soft internal card glow behind icon */}
                                                <div className="absolute inset-0 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                <div className={`relative w-20 h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500 ${step.glowColor}`}>
                                                    <step.icon className="w-9 h-9" strokeWidth={1.5} />

                                                    {/* Floating Step Number */}
                                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#1A2130] border border-white/20 flex items-center justify-center shadow-lg text-white font-bold text-sm">
                                                        {step.number}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Text Content */}
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors tracking-tight">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm font-medium text-white/50 mb-6 font-kannada tracking-wide">
                                                {step.titleKn}
                                            </p>

                                            <p className="text-white/70 font-light leading-relaxed mb-3">
                                                {step.description}
                                            </p>
                                            <p className="text-sm text-white/40 italic font-kannada mt-auto">
                                                {step.descriptionKn}
                                            </p>

                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
