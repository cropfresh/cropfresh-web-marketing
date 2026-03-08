"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Container } from "@/components/ui";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const contactDetails = [
    {
        icon: MapPin,
        label: "Office Address",
        value: "CropFresh Technologies Pvt. Ltd.",
        subValue: "Bangalore, Karnataka, India",
    },
    {
        icon: Mail,
        label: "Support Email",
        value: "support@cropfresh.in",
        href: "mailto:support@cropfresh.in",
    },
    {
        icon: Phone,
        label: "Phone Number",
        value: "+91-8001-234567",
        href: "tel:+918001234567",
    },
    {
        icon: Clock,
        label: "Business Hours",
        value: "Mon – Fri, 9:00 AM – 6:00 PM IST",
    },
];

export function ContactInfo() {
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
                        Contact Information
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-white/50 text-center mb-12 max-w-lg mx-auto"
                    >
                        Reach out through any of these channels and we&apos;ll get back to you within 24 hours.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactDetails.map((detail) => {
                            const Icon = detail.icon;
                            const content = (
                                <motion.div
                                    key={detail.label}
                                    variants={staggerItem}
                                    className="group relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[var(--color-accent-500)]/20 to-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-[var(--color-accent-500)]" />
                                    </div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                                        {detail.label}
                                    </p>
                                    <p className="text-white font-medium text-sm">{detail.value}</p>
                                    {detail.subValue && (
                                        <p className="text-white/50 text-sm mt-1">{detail.subValue}</p>
                                    )}
                                </motion.div>
                            );

                            if (detail.href) {
                                return (
                                    <a key={detail.label} href={detail.href} className="block">
                                        {content}
                                    </a>
                                );
                            }
                            return content;
                        })}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
