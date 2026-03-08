"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui";
import { fadeInUp } from "@/lib/animations";
export function HaulerDownload() {

    return (
        <section id="download" className="py-24 relative overflow-hidden bg-black border-t border-white/5">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-orange-500/10 pointer-events-none" />

            <Container className="relative z-10 w-full max-w-5xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="bg-[#0A0D14]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl overflow-hidden relative"
                >
                    {/* Abstract shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                Ready to Earn More? Download Now.
                            </h2>
                            <p className="text-white/70 text-lg mb-10 max-w-md mx-auto lg:mx-0">
                                Start accepting deliveries, finding optimized routes, and earning instantly with the CropFresh Hauler app.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <a
                                    href="#"
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors shadow-lg"
                                >
                                    <Image src="/images/playstore-icon.png" alt="Play Store" width={24} height={24} className="w-6 h-6 object-contain" />
                                    <div className="text-left leading-tight">
                                        <div className="text-[10px] text-black/60 uppercase tracking-widest">GET IT ON</div>
                                        <div className="text-lg -mt-1 font-bold">Google Play</div>
                                    </div>
                                </a>

                                <a
                                    href="#"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-all"
                                >
                                    <span>Download APK</span>
                                </a>
                            </div>
                        </div>

                        <div className="relative h-[400px] hidden lg:block">
                            {/* App mockups */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="absolute right-10 top-10 w-[240px] h-[480px] bg-[#111] rounded-[2rem] border-4 border-gray-800 shadow-2xl overflow-hidden z-10"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-black/80 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg">
                                        <span className="text-white text-3xl font-bold">CF</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 80, x: -30, opacity: 0 }}
                                whileInView={{ y: 30, x: -30, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="absolute right-40 top-20 w-[220px] h-[440px] bg-[#0a0f1c] rounded-[2rem] border-4 border-gray-800 shadow-2xl overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-black/80"></div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
