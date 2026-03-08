"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Play, Quote, MapPin } from "lucide-react";
export function HaulerTestimonial() {
    const [showVideo, setShowVideo] = useState(false);

    const handlePlayClick = () => {
        setShowVideo(true);
    };

    return (
        <section id="testimonial" className="py-20 md:py-28 relative overflow-hidden bg-black border-t border-white/5">
            {/* Dark Aesthetic Background glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-orange-500/10 to-transparent blur-3xl pointer-events-none" />

            <Container>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section Header */}
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-4 block">
                            Partner Success
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Hear From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Haulers</span>
                        </h2>
                        <p className="text-white/70 text-lg max-w-xl mx-auto">
                            Real stories from delivery partners who transformed their income
                        </p>
                    </motion.div>

                    {/* Video Testimonial Container */}
                    <motion.div variants={fadeInUp} className="max-w-5xl mx-auto">
                        <div className="bg-[#0A0D14]/80 backdrop-blur-xl border border-white/10 overflow-hidden rounded-3xl p-0 shadow-2xl hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-shadow duration-500">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                                {/* Video Section */}
                                <div className="lg:col-span-3 relative aspect-video lg:aspect-auto bg-black overflow-hidden group">
                                    {!showVideo ? (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                            onClick={handlePlayClick}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                                <div className="absolute inset-0 bg-orange-500/5 mix-blend-overlay" />
                                                <div className="text-8xl opacity-10 blur-[2px]">🚚</div>
                                            </div>

                                            {/* Play button */}
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-shadow"
                                            >
                                                <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                            </motion.div>

                                            <span className="absolute bottom-4 left-4 text-sm text-white/70">
                                                Click to play video testimonial
                                            </span>
                                        </div>
                                    ) : (
                                        <iframe
                                            src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0`}
                                            title="Hauler Testimonial Video"
                                            className="absolute inset-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            loading="lazy"
                                        />
                                    )}
                                </div>

                                {/* Quote Section */}
                                <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-[#111623] to-[#0A0D14] relative border-l border-white/5">
                                    <Quote className="w-12 h-12 text-orange-500/20 mb-6 absolute top-8 right-8" />

                                    <div className="relative z-10">
                                        <blockquote className="text-white text-xl font-medium leading-relaxed mb-8">
                                            &ldquo;I complete 3 routes a day and get paid instantly. No waiting!&rdquo;
                                        </blockquote>

                                        {/* Hauler Info */}
                                        <div className="flex items-center gap-5 mt-auto">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-3xl shadow-lg border border-white/10">
                                                👨🏽‍🤝‍👨🏻
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-lg tracking-tight">
                                                    Raju
                                                </p>
                                                <p className="text-sm font-medium text-orange-400 mb-1">
                                                    Delivery Partner
                                                </p>
                                                <div className="flex items-center gap-1.5 text-xs text-white/50">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span className="uppercase tracking-wider">Bangalore</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Earnings badge */}
                                        <div className="mt-6">
                                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white backdrop-blur-md">
                                                💰 ₹45,000/month average
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
