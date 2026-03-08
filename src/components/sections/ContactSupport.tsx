"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Container } from "@/components/ui";
import { Smartphone, HelpCircle } from "lucide-react";
import Image from "next/image";

const appDownloads = [
    {
        name: "CropFresh Farmer App",
        description: "For farmers to list produce & track sales",
        href: "https://play.google.com/store/apps/details?id=com.cropfresh.farmer",
    },
    {
        name: "CropFresh Buyer App",
        description: "For buyers to source farm-fresh produce",
        href: "https://play.google.com/store/apps/details?id=com.cropfresh.buyer",
    },
    {
        name: "CropFresh Hauler App",
        description: "For delivery partners to manage logistics",
        href: "https://play.google.com/store/apps/details?id=com.cropfresh.hauler",
    },
];

export function ContactSupport() {
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
                        Support & Downloads
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="text-white/50 text-center mb-12 max-w-lg mx-auto"
                    >
                        Download our apps or visit support resources.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                        {appDownloads.map((app) => (
                            <motion.a
                                key={app.name}
                                href={app.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={staggerItem}
                                className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 block"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Smartphone className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-white font-semibold text-sm mb-1">
                                    {app.name}
                                </h3>
                                <p className="text-white/40 text-xs mb-4">{app.description}</p>
                                <Image
                                    src="/icons/google-play.svg"
                                    alt="Get it on Google Play"
                                    width={135}
                                    height={40}
                                    className="mx-auto opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Help Center Notice */}
                    <motion.div
                        variants={fadeInUp}
                        className="max-w-md mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 text-center"
                    >
                        <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <HelpCircle className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-white font-medium text-sm mb-1">Help Center</p>
                        <p className="text-white/40 text-xs">
                            Coming soon — A comprehensive knowledge base for all your questions.
                        </p>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
