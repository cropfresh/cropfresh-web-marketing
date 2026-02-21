"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
    Smartphone, Mic, ShoppingCart, Truck,
    Camera, IndianRupee, BarChart3, Star,
    QrCode, Shield, CalendarCheck, Leaf,
    Route, Wallet, Map, Check,
    ArrowRight, ChevronRight
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─── */
interface AppScreen {
    label: string;
    icon: LucideIcon;
    description: string;
}

interface AppProduct {
    name: string;
    tagline: string;
    target: string;
    accentHex: string;
    accentLight: string;
    icon: LucideIcon;
    screens: AppScreen[];
    features: { icon: LucideIcon; text: string }[];
    stats: { value: string; label: string }[];
}

/* ─── Data ─── */
const apps: Record<string, AppProduct> = {
    farmer: {
        name: "CropFresh Farmer",
        tagline: "List, sell, get paid — all from your field",
        target: "For Farmers",
        accentHex: "#16a34a",
        accentLight: "#f0fdf4",
        icon: Leaf,
        screens: [
            { label: "Voice Listing", icon: Mic, description: "Speak in Kannada to list your produce — AI handles the rest" },
            { label: "Market Prices", icon: BarChart3, description: "Real-time price data from 100+ markets at your fingertips" },
            { label: "Instant Payment", icon: IndianRupee, description: "T+0 UPI payment directly to your bank — no delays" },
            { label: "Order Tracking", icon: ShoppingCart, description: "Track every order from pickup to delivery in real-time" },
        ],
        features: [
            { icon: Mic, text: "Voice listing in Kannada & Hindi" },
            { icon: Camera, text: "Photo-based quality estimation" },
            { icon: IndianRupee, text: "Same-day UPI payment" },
            { icon: BarChart3, text: "Live market price updates" },
            { icon: Star, text: "Buyer ratings & reviews" },
            { icon: Shield, text: "Fair price guarantee" },
        ],
        stats: [
            { value: "30s", label: "to list" },
            { value: "40%", label: "higher price" },
            { value: "T+0", label: "payment" },
        ],
    },
    buyer: {
        name: "CropFresh Buyer",
        tagline: "Premium produce, verified quality, zero hassle",
        target: "For Restaurants & Hotels",
        accentHex: "#ea580c",
        accentLight: "#fff7ed",
        icon: ShoppingCart,
        screens: [
            { label: "Browse & Order", icon: ShoppingCart, description: "Explore graded produce with transparent pricing & photos" },
            { label: "QR Traceability", icon: QrCode, description: "Scan QR to see the complete farm-to-fork journey" },
            { label: "Quality Grades", icon: Shield, description: "Every batch graded A/B/C with photo verification" },
            { label: "Subscriptions", icon: CalendarCheck, description: "Set up recurring orders for consistent supply" },
        ],
        features: [
            { icon: Shield, text: "5-point quality grading" },
            { icon: QrCode, text: "Farm-to-fork traceability" },
            { icon: CalendarCheck, text: "Recurring order scheduling" },
            { icon: Star, text: "Verified supplier network" },
            { icon: Leaf, text: "Organic certification support" },
            { icon: IndianRupee, text: "Transparent All-Inclusive pricing" },
        ],
        stats: [
            { value: "5-pt", label: "quality grade" },
            { value: "100%", label: "traceable" },
            { value: "99%", label: "delivery" },
        ],
    },
    hauler: {
        name: "CropFresh Hauler",
        tagline: "More loads, better routes, instant pay",
        target: "For Delivery Partners",
        accentHex: "#7c3aed",
        accentLight: "#f5f3ff",
        icon: Truck,
        screens: [
            { label: "Load Matching", icon: Smartphone, description: "Get matched to loads heading your direction automatically" },
            { label: "Smart Routes", icon: Route, description: "AI-optimized multi-stop routes that save fuel & time" },
            { label: "QR Delivery", icon: QrCode, description: "Scan QR on delivery — payment triggers instantly" },
            { label: "Earnings", icon: Wallet, description: "Track daily earnings, trip history, and payouts" },
        ],
        features: [
            { icon: Route, text: "AI-optimized multi-stop routes" },
            { icon: Map, text: "Real-time GPS navigation" },
            { icon: IndianRupee, text: "Instant pay on QR confirmation" },
            { icon: Wallet, text: "Transparent earnings dashboard" },
            { icon: Star, text: "Rating-based load priority" },
            { icon: Smartphone, text: "Auto load notifications" },
        ],
        stats: [
            { value: "30%", label: "fuel saved" },
            { value: "3x", label: "more loads" },
            { value: "T+0", label: "instant pay" },
        ],
    },
};

const appKeys = ["farmer", "buyer", "hauler"] as const;

/* ─── Phone Mockup Component ─── */
function PhoneMockup({ app, activeScreen }: { app: AppProduct; activeScreen: number }) {
    const screen = app.screens[activeScreen];
    const ScreenIcon = screen.icon;

    return (
        <div className="relative mx-auto" style={{ maxWidth: 280 }}>
            {/* Phone frame */}
            <div
                className="relative rounded-[2.5rem] p-2 shadow-2xl"
                style={{
                    background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
                    boxShadow: `0 25px 60px rgba(0,0,0,0.3), 0 0 40px ${app.accentHex}10`,
                }}
            >
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />

                {/* Screen */}
                <div
                    className="relative rounded-[2rem] overflow-hidden"
                    style={{ aspectRatio: "9/19.5", background: app.accentLight }}
                >
                    {/* Status bar */}
                    <div className="relative z-10 flex items-center justify-between px-6 pt-8 pb-2">
                        <span className="text-[10px] font-semibold text-neutral-500">9:41</span>
                        <div className="flex gap-1">
                            <div className="w-3.5 h-2 rounded-sm bg-neutral-400" />
                            <div className="w-1 h-2 rounded-sm bg-neutral-300" />
                        </div>
                    </div>

                    {/* App header */}
                    <div className="relative z-10 px-5 pt-2 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                            <div
                                className="w-6 h-6 rounded-lg flex items-center justify-center"
                                style={{ background: app.accentHex }}
                            >
                                <app.icon className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-xs font-bold text-neutral-800">
                                {app.name}
                            </span>
                        </div>
                    </div>

                    {/* Screen content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeScreen}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10 px-5 flex-1"
                        >
                            {/* Screen card */}
                            <div
                                className="rounded-2xl p-5 mb-3"
                                style={{
                                    background: "white",
                                    boxShadow: `0 4px 20px ${app.accentHex}10`,
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                                    style={{ background: `${app.accentHex}12` }}
                                >
                                    <ScreenIcon
                                        className="w-6 h-6"
                                        style={{ color: app.accentHex }}
                                    />
                                </div>
                                <h4 className="font-bold text-neutral-900 text-sm mb-1">
                                    {screen.label}
                                </h4>
                                <p className="text-neutral-500 text-[11px] leading-relaxed">
                                    {screen.description}
                                </p>
                            </div>

                            {/* Mini feature list */}
                            <div className="space-y-2">
                                {app.features.slice(0, 3).map((f, i) => {
                                    const FIcon = f.icon;
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5"
                                            style={{ boxShadow: `0 1px 4px ${app.accentHex}08` }}
                                        >
                                            <FIcon className="w-3.5 h-3.5" style={{ color: app.accentHex }} />
                                            <span className="text-[11px] text-neutral-600">{f.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Bottom nav bar */}
                    <div className="absolute bottom-0 inset-x-0 z-10 px-4 pb-3 pt-2 bg-white/90 backdrop-blur-sm border-t border-neutral-100">
                        <div className="flex justify-around">
                            {app.screens.map((scr, i) => {
                                const NavIcon = scr.icon;
                                const active = i === activeScreen;
                                return (
                                    <div key={i} className="flex flex-col items-center gap-0.5">
                                        <NavIcon
                                            className="w-4 h-4"
                                            style={{ color: active ? app.accentHex : "#a3a3a3" }}
                                            strokeWidth={active ? 2.5 : 1.5}
                                        />
                                        <span
                                            className="text-[8px] font-medium"
                                            style={{ color: active ? app.accentHex : "#a3a3a3" }}
                                        >
                                            {scr.label.split(" ")[0]}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Decorative blurred circle */}
                    <div
                        className="absolute top-1/4 -right-8 w-32 h-32 rounded-full blur-3xl opacity-20"
                        style={{ background: app.accentHex }}
                    />
                </div>
            </div>

            {/* Phone shadow */}
            <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-full blur-xl opacity-20"
                style={{ background: app.accentHex }}
            />
        </div>
    );
}

/* ─── Screen Selector Tabs ─── */
function ScreenTabs({
    screens,
    activeScreen,
    setActiveScreen,
    accentHex,
}: {
    screens: AppScreen[];
    activeScreen: number;
    setActiveScreen: (i: number) => void;
    accentHex: string;
}) {
    return (
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {screens.map((screen, i) => {
                const Icon = screen.icon;
                const active = i === activeScreen;
                return (
                    <button
                        key={i}
                        onClick={() => setActiveScreen(i)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 outline-none
                            ${active
                                ? "text-white shadow-md"
                                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700"
                            }`}
                        style={{
                            background: active ? accentHex : undefined,
                            boxShadow: active ? `0 4px 12px ${accentHex}30` : undefined,
                        }}
                    >
                        <Icon className="w-3.5 h-3.5" />
                        {screen.label}
                    </button>
                );
            })}
        </div>
    );
}

/* ─── Main Component ─── */
export function ProductsSection() {
    const [activeApp, setActiveApp] = useState<"farmer" | "buyer" | "hauler">("farmer");
    const [activeScreen, setActiveScreen] = useState(0);
    const [direction, setDirection] = useState(0);
    const app = apps[activeApp];

    const handleAppChange = (key: typeof appKeys[number]) => {
        const curr = appKeys.indexOf(activeApp);
        const next = appKeys.indexOf(key);
        setDirection(next > curr ? 1 : -1);
        setActiveApp(key);
        setActiveScreen(0);
    };

    // Auto-cycle screens
    // useEffect removed for simplicity — user can click to switch

    const slide = {
        enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
        exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0, transition: { duration: 0.2 } }),
    };

    return (
        <section id="products" className="relative py-24 md:py-32 bg-white">
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
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold uppercase tracking-wider mb-6">
                            <Smartphone className="w-3.5 h-3.5" />
                            Our Apps
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-neutral-900 leading-tight mb-4"
                    >
                        Three Apps,{" "}
                        <span className="text-violet-600">One Ecosystem</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-center text-neutral-500 text-base sm:text-lg max-w-xl mx-auto mb-14"
                    >
                        Purpose-built mobile apps for every stakeholder in the
                        farm-to-table journey.
                    </motion.p>

                    {/* ── App Selector ── */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex justify-center gap-2 sm:gap-3 mb-16 flex-wrap"
                    >
                        {appKeys.map((key) => {
                            const a = apps[key];
                            const AppIcon = a.icon;
                            const active = activeApp === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleAppChange(key)}
                                    className={`
                                        relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold
                                        transition-all duration-250 outline-none
                                        ${active
                                            ? "text-white shadow-md"
                                            : "bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-900"
                                        }
                                    `}
                                    style={{
                                        background: active ? a.accentHex : undefined,
                                        boxShadow: active ? `0 4px 14px ${a.accentHex}40` : undefined,
                                    }}
                                >
                                    <span className="flex items-center gap-2">
                                        <AppIcon className="w-4 h-4" />
                                        {a.name.replace("CropFresh ", "")}
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* ── App Showcase (Split: Phone + Details) ── */}
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={activeApp}
                            custom={direction}
                            variants={slide}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
                                {/* Phone Mockup */}
                                <div className="flex justify-center lg:justify-end order-1 lg:order-1">
                                    <PhoneMockup app={app} activeScreen={activeScreen} />
                                </div>

                                {/* App Details */}
                                <div className="order-2 lg:order-2">
                                    {/* App title */}
                                    <div className="flex items-center gap-3 mb-2">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{ background: `${app.accentHex}12` }}
                                        >
                                            <app.icon className="w-5 h-5" style={{ color: app.accentHex }} />
                                        </div>
                                        <div>
                                            <h3 className="font-display font-bold text-neutral-900 text-xl sm:text-2xl">
                                                {app.name}
                                            </h3>
                                            <span
                                                className="text-xs font-semibold"
                                                style={{ color: app.accentHex }}
                                            >
                                                {app.target}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-neutral-500 text-sm sm:text-base mb-6">
                                        {app.tagline}
                                    </p>

                                    {/* Stats row */}
                                    <div className="flex gap-4 mb-8">
                                        {app.stats.map((stat, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-100"
                                            >
                                                <span
                                                    className="text-lg font-display font-black leading-none"
                                                    style={{ color: app.accentHex }}
                                                >
                                                    {stat.value}
                                                </span>
                                                <span className="text-neutral-400 text-xs">
                                                    {stat.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Screen selector */}
                                    <div className="mb-6">
                                        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                                            Explore Screens
                                        </p>
                                        <ScreenTabs
                                            screens={app.screens}
                                            activeScreen={activeScreen}
                                            setActiveScreen={setActiveScreen}
                                            accentHex={app.accentHex}
                                        />
                                    </div>

                                    {/* Feature grid */}
                                    <div className="grid grid-cols-2 gap-2.5 mb-8">
                                        {app.features.map((f, i) => {
                                            const FIcon = f.icon;
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 text-sm text-neutral-600"
                                                >
                                                    <span
                                                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                                        style={{ background: `${app.accentHex}12` }}
                                                    >
                                                        <Check className="w-3 h-3" style={{ color: app.accentHex }} />
                                                    </span>
                                                    <span className="text-xs sm:text-sm">{f.text}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Download CTA */}
                                    <a
                                        href="#"
                                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
                                        style={{
                                            background: app.accentHex,
                                            boxShadow: `0 4px 14px ${app.accentHex}30`,
                                        }}
                                    >
                                        Download on Google Play
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </Container>
        </section>
    );
}
