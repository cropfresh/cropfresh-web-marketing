"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Container } from "@/components/ui";
import { TrendingUp, Users, Sprout, Globe } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const investmentHighlights = [
    {
        icon: TrendingUp,
        stat: "₹50K Cr+",
        label: "Addressable Market",
    },
    {
        icon: Users,
        stat: "10,000+",
        label: "Farmers Onboarded",
    },
    {
        icon: Sprout,
        stat: "95%",
        label: "AI Grading Accuracy",
    },
    {
        icon: Globe,
        stat: "3",
        label: "States Covered",
    },
];

export function ContactPartner() {
    const scrollToForm = (type: string) => {
        trackCTAClick("contact_partner_cta", "contact_page", "#contact-form");

        // Set URL param and scroll
        const url = new URL(window.location.href);
        url.searchParams.set("type", type);
        window.history.replaceState({}, "", url.toString());

        const formEl = document.getElementById("contact-form");
        if (formEl) {
            formEl.scrollIntoView({ behavior: "smooth" });
        }

        // Trigger a re-render of the form's inquiry type
        window.dispatchEvent(new Event("popstate"));

        // Delay to set after scroll
        setTimeout(() => {
            const selectEl = document.querySelector(
                '#contact-form select[name="inquiryType"]'
            ) as HTMLSelectElement | null;
            if (selectEl) {
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                    window.HTMLSelectElement.prototype,
                    "value"
                )?.set;
                nativeInputValueSetter?.call(selectEl, "partnership");
                selectEl.dispatchEvent(new Event("change", { bubbles: true }));
            }
        }, 800);
    };

    return (
        <section className="py-20 relative overflow-hidden bg-black border-t border-white/5">
            {/* Background */}
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-amber-500/6 to-transparent blur-3xl pointer-events-none" />

            <Container className="relative z-10">
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
                        Partner With Us
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-white/50 text-center mb-12 max-w-2xl mx-auto"
                    >
                        Join CropFresh in revolutionizing India&apos;s agricultural supply chain.
                        We&apos;re looking for strategic partners and investors who share our vision
                        of empowering farmers with technology.
                    </motion.p>

                    {/* Investment Highlights */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {investmentHighlights.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.label}
                                    variants={staggerItem}
                                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/[0.08] transition-all duration-300"
                                >
                                    <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                                        {item.stat}
                                    </p>
                                    <p className="text-xs text-white/40 uppercase tracking-wider">
                                        {item.label}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => scrollToForm("partnership")}
                            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base text-white bg-gradient-to-r from-[var(--color-accent-500)] to-[#FF8C00] hover:from-[#FF7A00] hover:to-[#FF6D00] shadow-[0_2px_12px_rgba(255,140,0,0.35)] hover:shadow-[0_4px_20px_rgba(255,140,0,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Become a Partner
                        </button>
                        <button
                            onClick={() => scrollToForm("partnership")}
                            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base text-white border border-white/20 hover:bg-white/5 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Invest in CropFresh
                        </button>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
