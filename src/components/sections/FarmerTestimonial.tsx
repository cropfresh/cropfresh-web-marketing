"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Card } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Play, Quote, MapPin } from "lucide-react";

// Placeholder testimonial data - replace with real content when available
const testimonial = {
    videoId: "dQw4w9WgXcQ", // Placeholder - replace with actual farmer testimonial video
    farmerName: "Ramesh Kumar",
    farmerNameKn: "ರಮೇಶ್ ಕುಮಾರ್",
    location: "Kolar, Karnataka",
    locationKn: "ಕೋಲಾರ, ಕರ್ನಾಟಕ",
    quote: "CropFresh helped me get 30% more for my tomatoes. Payment came same day via UPI!",
    quoteKn: "CropFresh ನನ್ನ ಟೊಮೆಟೊಗಳಿಗೆ 30% ಹೆಚ್ಚು ಪಡೆಯಲು ಸಹಾಯ ಮಾಡಿತು. ಅದೇ ದಿನ UPI ಮೂಲಕ ಪಾವತಿ ಬಂದಿತು!",
    cropType: "Tomatoes",
    cropTypeKn: "ಟೊಮೆಟೊ",
};

export function FarmerTestimonial() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    const handlePlayClick = () => {
        setShowVideo(true);
        setIsVideoLoaded(true);
    };

    return (
        <section id="testimonial" className="py-20 md:py-28 relative overflow-hidden bg-[#070A0F] border-t border-white/5">
            {/* Dark green background glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[var(--color-primary-500)]/8 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-gradient-radial from-[var(--color-teal)]/5 to-transparent blur-3xl pointer-events-none" />

            <Container>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section Header */}
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <span className="text-[var(--color-primary-400)] text-sm font-semibold uppercase tracking-wider mb-4 block">
                            Success Stories
                        </span>
                        <h2 className="heading-section text-[var(--color-text-primary)] mb-4">
                            Hear From{" "}
                            <span className="text-gradient-accent">Our Farmers</span>
                        </h2>
                        <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto">
                            Real stories from farmers who transformed their income
                        </p>
                        <p className="text-[var(--color-primary-400)] text-base mt-2">
                            ತಮ್ಮ ಆದಾಯವನ್ನು ಬದಲಾಯಿಸಿದ ರೈತರ ನೈಜ ಕಥೆಗಳು
                        </p>
                    </motion.div>

                    {/* Video Testimonial Container */}
                    <motion.div variants={fadeInUp} className="max-w-5xl mx-auto">
                        <div className="glass-premium overflow-hidden rounded-3xl p-0 shadow-2xl hover:shadow-[var(--color-primary-500)]/10 transition-shadow duration-500">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                                {/* Video Section */}
                                <div className="lg:col-span-3 relative aspect-video lg:aspect-auto bg-[#0a0f1c] overflow-hidden group">
                                    {!showVideo ? (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                            onClick={handlePlayClick}
                                        >
                                            {/* Beautiful dark thumbnail */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                                <div className="absolute inset-0 bg-[var(--color-primary-500)]/5 mix-blend-overlay" />
                                                <div className="text-8xl opacity-10 blur-[2px]">🌾</div>
                                            </div>

                                            {/* Play button */}
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow"
                                            >
                                                <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                            </motion.div>

                                            {/* Play text */}
                                            <span className="absolute bottom-4 left-4 text-sm text-white/70">
                                                Click to play video testimonial
                                            </span>
                                        </div>
                                    ) : (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&rel=0`}
                                            title="Farmer Testimonial Video"
                                            className="absolute inset-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            loading="lazy"
                                        />
                                    )}
                                </div>

                                {/* Quote Section */}
                                <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-[#131823] to-[#0f172a] relative border-l border-white/5">
                                    {/* Quote Icon */}
                                    <Quote className="w-12 h-12 text-[var(--color-primary-500)]/20 mb-6 absolute top-8 right-8" />

                                    <div className="relative z-10">
                                        {/* Quote */}
                                        <blockquote className="text-white text-xl font-medium leading-relaxed mb-4">
                                            &ldquo;{testimonial.quote}&rdquo;
                                        </blockquote>
                                        <p className="text-[var(--color-primary-400)]/90 text-sm italic mb-8 font-light">
                                            &ldquo;{testimonial.quoteKn}&rdquo;
                                        </p>

                                        {/* Farmer Info */}
                                        <div className="flex items-center gap-5 mt-auto">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[#0f766e] flex items-center justify-center text-3xl shadow-lg border border-white/10">
                                                👨‍🌾
                                            </div>
                                            <div>
                                                <p className="font-display font-semibold text-white text-lg tracking-tight">
                                                    {testimonial.farmerName}
                                                </p>
                                                <p className="text-sm font-medium text-[var(--color-primary-400)] mb-1">
                                                    {testimonial.farmerNameKn}
                                                </p>
                                                <div className="flex items-center gap-1.5 text-xs text-white/50">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span className="uppercase tracking-wider">{testimonial.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Crop badge */}
                                        <div className="mt-6">
                                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[var(--color-text-secondary)] backdrop-blur-md">
                                                🍅 {testimonial.cropType} <span className="text-white/20 mx-1">|</span> {testimonial.cropTypeKn}
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
