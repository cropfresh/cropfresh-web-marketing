"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
    Quote, Star, MapPin, Leaf, ShoppingCart, Truck,
    ChevronLeft, ChevronRight
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─── */
interface Testimonial {
    id: string;
    name: string;
    role: string;
    location: string;
    quote: string;
    stat: string;
    statLabel: string;
    image: string;
    userType: "farmer" | "buyer" | "hauler";
}

interface TypeConfig {
    label: string;
    icon: LucideIcon;
    accentHex: string;
    accentLight: string;
}

/* ─── Config ─── */
const typeConfig: Record<string, TypeConfig> = {
    farmer: { label: "Farmer", icon: Leaf, accentHex: "#16a34a", accentLight: "#f0fdf4" },
    buyer: { label: "Buyer", icon: ShoppingCart, accentHex: "#ea580c", accentLight: "#fff7ed" },
    hauler: { label: "Hauler", icon: Truck, accentHex: "#7c3aed", accentLight: "#f5f3ff" },
};

/* ─── Data ─── */
const testimonials: Testimonial[] = [
    {
        id: "ramanna",
        name: "Ramanna",
        role: "Tomato Farmer",
        location: "Kolar, Karnataka",
        quote: "Earlier I would get ₹15/kg, now I get ₹25/kg. Payment comes same day! My income has increased by 66% since joining CropFresh.",
        stat: "66%",
        statLabel: "Income Increase",
        image: "/testimonials/ramanna.png",
        userType: "farmer",
    },
    {
        id: "priya",
        name: "Priya",
        role: "Procurement Manager",
        location: "Hotel Nandini, Bangalore",
        quote: "Quality is consistently excellent. The Digital Twin feature gives me complete confidence — I know exactly where my vegetables come from.",
        stat: "100%",
        statLabel: "Traceability",
        image: "/testimonials/priya.png",
        userType: "buyer",
    },
    {
        id: "raju",
        name: "Raju",
        role: "Delivery Partner",
        location: "Bangalore Rural",
        quote: "I complete 3 optimized routes a day and get paid instantly. No more waiting weeks for payment. My earnings have doubled!",
        stat: "2x",
        statLabel: "Earnings",
        image: "/testimonials/raju.png",
        userType: "hauler",
    },
];

/* ─── Main Component ─── */
export function TestimonialsCarousel() {
    const [current, setCurrent] = useState(0);
    const [isAuto, setIsAuto] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState(1);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent(p => (p + 1) % testimonials.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent(p => (p - 1 + testimonials.length) % testimonials.length);
    }, []);

    useEffect(() => {
        if (!isAuto || isPaused) return;
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [isAuto, isPaused, next]);

    const t = testimonials[current];
    const config = typeConfig[t.userType];
    const TypeIcon = config.icon;

    const slide = {
        enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
        exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.25 } }),
    };

    return (
        <section
            id="testimonials"
            className="relative py-24 md:py-32 bg-white overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Top divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {/* ── Header ── */}
                    <motion.div variants={fadeInUp} className="text-center mb-5">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-6">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            Real Stories
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-900 leading-tight mb-4"
                    >
                        What Our{" "}
                        <span className="text-amber-600">Users Say</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-center text-neutral-500 text-base sm:text-lg max-w-xl mx-auto mb-14"
                    >
                        Hear from the farmers, buyers, and haulers already benefiting from CropFresh.
                    </motion.p>

                    {/* ── Carousel Card ── */}
                    <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
                        <div className="relative rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
                            <div className="relative py-10 px-6 md:px-12">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={t.id}
                                        custom={direction}
                                        variants={slide}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                                    >
                                        {/* Avatar */}
                                        <div className="relative shrink-0">
                                            <div
                                                className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden shadow-lg"
                                                style={{ border: `3px solid ${config.accentHex}` }}
                                            >
                                                <Image
                                                    src={t.image}
                                                    alt={t.name}
                                                    width={176}
                                                    height={176}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>

                                            {/* Type badge */}
                                            <div
                                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                                                style={{ background: config.accentHex }}
                                            >
                                                <TypeIcon className="w-3 h-3" />
                                                {config.label}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 text-center md:text-left">
                                            {/* Quote */}
                                            <blockquote className="relative mb-6">
                                                <Quote
                                                    className="absolute -top-3 -left-2 w-8 h-8 opacity-10"
                                                    style={{ color: config.accentHex }}
                                                />
                                                <p className="text-xl md:text-2xl text-neutral-800 font-display leading-relaxed">
                                                    &ldquo;{t.quote}&rdquo;
                                                </p>
                                            </blockquote>

                                            {/* Stars */}
                                            <div className="flex gap-0.5 mb-4 justify-center md:justify-start">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>

                                            {/* Author + Stat */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <div>
                                                    <p className="font-display font-bold text-lg text-neutral-900">
                                                        {t.name}
                                                    </p>
                                                    <p className="flex items-center gap-1 text-neutral-400 text-sm justify-center md:justify-start">
                                                        <MapPin className="w-3 h-3" />
                                                        {t.role} · {t.location}
                                                    </p>
                                                </div>

                                                {/* Stat */}
                                                <div
                                                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl"
                                                    style={{ background: config.accentLight, border: `1px solid ${config.accentHex}20` }}
                                                >
                                                    <span
                                                        className="text-2xl font-display font-black leading-none"
                                                        style={{ color: config.accentHex }}
                                                    >
                                                        {t.stat}
                                                    </span>
                                                    <span className="text-neutral-500 text-sm">{t.statLabel}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Nav Arrows */}
                                <button
                                    onClick={() => { prev(); setIsAuto(false); }}
                                    className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors"
                                    aria-label="Previous testimonial"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => { next(); setIsAuto(false); }}
                                    className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors"
                                    aria-label="Next testimonial"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Bottom progress bar */}
                            <div className="border-t border-neutral-100 px-6 py-3 flex items-center justify-center gap-3">
                                {testimonials.map((item, i) => {
                                    const c = typeConfig[item.userType];
                                    const active = i === current;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => { setCurrent(i); setIsAuto(false); }}
                                            className="relative h-1.5 rounded-full overflow-hidden transition-all duration-400"
                                            style={{
                                                width: active ? 56 : 16,
                                                background: active ? c.accentHex : "#e5e5e5",
                                            }}
                                            aria-label={`Go to ${item.name}'s testimonial`}
                                        >
                                            {active && isAuto && !isPaused && (
                                                <motion.div
                                                    className="absolute inset-0 bg-white/30"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 6, ease: "linear" }}
                                                    key={`prog-${current}`}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
