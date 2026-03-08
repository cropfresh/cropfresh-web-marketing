"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import { Truck, FileText, Clock, FileCheck } from "lucide-react";
export function HaulerRequirements() {

    const vehicles = [
        "Pickup Truck",
        "Mini Truck (Tata Ace, etc.)",
        "Tempo / LCV",
        "Auto (with produce rack)"
    ];

    const documents = [
        "Valid Driving License",
        "Vehicle Registration Certificate (RC)",
        "Aadhaar Card"
    ];

    return (
        <section className="py-24 bg-[#0A0D14] relative overflow-hidden">
            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-6">
                            What You Need
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-lg text-white/70">
                            Start earning with these simple requirements
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Requirement 1: Vehicles */}
                        <motion.div variants={staggerItem} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors">
                            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6">
                                <Truck className="w-7 h-7 text-orange-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Accepted Vehicles</h3>
                            <ul className="space-y-3">
                                {vehicles.map((v, i) => (
                                    <li key={i} className="flex items-start text-white/70">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 mr-3 flex-shrink-0" />
                                        <span>{v}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Requirement 2: Documents */}
                        <motion.div variants={staggerItem} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors">
                            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6">
                                <FileText className="w-7 h-7 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Documents Needed</h3>
                            <ul className="space-y-3">
                                {documents.map((d, i) => (
                                    <li key={i} className="flex items-center text-white/70">
                                        <FileCheck className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0" />
                                        <span>{d}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Requirement 3: Flexibility */}
                        <motion.div variants={staggerItem} className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-3xl p-8 backdrop-blur-md shadow-xl hover:border-orange-500/40 transition-colors flex flex-col items-center text-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 shadow-inner relative">
                                <Clock className="w-10 h-10 text-orange-400" />
                                <div className="absolute inset-0 rounded-full border border-orange-400/30 animate-ping" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">No minimum hours — drive when you want</h3>
                            <p className="text-white/60 text-sm">Be your own boss. Work strictly on your terms.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
