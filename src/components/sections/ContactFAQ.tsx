"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Container } from "@/components/ui";
import { ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const faqItems = [
    {
        question: "How do I sign up as a farmer?",
        answer: "Download the CropFresh Farmer App from Google Play or request a callback on our Farmers page. A field agent will guide you through the onboarding process, including KYC verification and your first crop listing.",
    },
    {
        question: "What areas does CropFresh operate in?",
        answer: "CropFresh currently operates across Karnataka, with coverage expanding to key agricultural regions. We focus on connecting farmers in Kolar, Chikkaballapur, Ramanagara, and surrounding districts to buyers in Bangalore.",
    },
    {
        question: "How does quality grading work?",
        answer: "Our AI-powered quality grading system analyzes photos of your produce to assign A, B, or C grades with 95% accuracy. A field agent then verifies the grade physically, and a Digital Twin record is created for full traceability.",
    },
    {
        question: "How quickly do farmers receive payment?",
        answer: "Farmers receive payment via UPI on the same day of delivery confirmation (T+0). Once the buyer confirms receipt, payment is instantly released to your registered UPI account.",
    },
    {
        question: "How can I become a delivery partner?",
        answer: "Visit our Haulers page and fill out the callback form, or download the CropFresh Hauler App. You'll need a valid driving license, a suitable vehicle (pickup truck, mini truck, tempo, or auto), and a smartphone.",
    },
    {
        question: "What technology does CropFresh use?",
        answer: "CropFresh uses AI for quality grading, dynamic pricing (DPLE), and farmer-buyer matchmaking. We also use Digital Twin technology for immutable produce traceability, and route optimization algorithms for delivery efficiency.",
    },
];

export function ContactFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        const isOpening = openIndex !== index;
        setOpenIndex(isOpening ? index : null);

        if (isOpening) {
            trackEvent("contact_faq_toggle", {
                question: faqItems[index].question.substring(0, 50),
            });
        }
    };

    return (
        <section className="py-20 bg-slate-900/50">
            <Container>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.h2
                        variants={fadeInUp}
                        className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-white/50 text-center mb-12 max-w-lg mx-auto"
                    >
                        Quick answers to common questions about CropFresh.
                    </motion.p>

                    <div className="max-w-3xl mx-auto">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                className="border-b border-white/10"
                            >
                                <button
                                    onClick={() => toggleItem(index)}
                                    className="w-full flex items-center justify-between py-5 px-4 text-left group"
                                >
                                    <span className="text-white font-medium text-base pr-4 group-hover:text-[var(--color-accent-400)] transition-colors">
                                        {item.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                    >
                                        <ChevronDown className="w-5 h-5 text-white/40" />
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-4 pb-5 text-white/60 text-sm leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
