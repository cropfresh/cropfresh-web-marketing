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
        <section id="testimonial" className="py-20 md:py-28 bg-slate-900/50 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-accent/10 to-transparent blur-3xl" />

            <Container>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section Header */}
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <span className="text-[var(--color-accent-400)] text-sm font-semibold uppercase tracking-wider mb-4 block">
                            Success Stories
                        </span>
                        <h2 className="heading-section text-[var(--color-text-primary)] mb-4">
                            Hear From{" "}
                            <span className="text-gradient-accent">Our Farmers</span>
                        </h2>
                        <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto">
                            Real stories from farmers who transformed their income
                        </p>
                        <p className="text-[var(--color-accent-400)] text-base mt-2">
                            ತಮ್ಮ ಆದಾಯವನ್ನು ಬದಲಾಯಿಸಿದ ರೈತರ ನೈಜ ಕಥೆಗಳು
                        </p>
                    </motion.div>

                    {/* Video Testimonial Card */}
                    <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
                        <Card variant="glass" className="p-0 overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                                {/* Video Section */}
                                <div className="lg:col-span-3 relative aspect-video lg:aspect-auto bg-slate-800">
                                    {!showVideo ? (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                                            onClick={handlePlayClick}
                                        >
                                            {/* Placeholder thumbnail */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                                <div className="text-6xl opacity-30">🌾</div>
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
                                <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                                    {/* Quote Icon */}
                                    <Quote className="w-10 h-10 text-[var(--color-accent-400)]/30 mb-4" />

                                    {/* Quote */}
                                    <blockquote className="text-[var(--color-text-primary)] text-lg font-medium leading-relaxed mb-4">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </blockquote>
                                    <p className="text-[var(--color-text-muted)] text-sm italic mb-6">
                                        &ldquo;{testimonial.quoteKn}&rdquo;
                                    </p>

                                    {/* Farmer Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center text-2xl">
                                            👨‍🌾
                                        </div>
                                        <div>
                                            <p className="font-display font-semibold text-[var(--color-text-primary)]">
                                                {testimonial.farmerName}
                                            </p>
                                            <p className="text-sm text-[var(--color-primary-400)]">
                                                {testimonial.farmerNameKn}
                                            </p>
                                            <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] mt-1">
                                                <MapPin className="w-3 h-3" />
                                                <span>{testimonial.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Crop badge */}
                                    <div className="mt-4">
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glass text-sm text-[var(--color-text-secondary)]">
                                            🍅 {testimonial.cropType} • {testimonial.cropTypeKn}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
