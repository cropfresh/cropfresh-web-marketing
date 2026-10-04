"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
    Smartphone, Mic, ShoppingCart, Truck,
    Camera, IndianRupee, BarChart3, Star,
    QrCode, Shield, CalendarCheck, Leaf,
    Route, Wallet, Map, Check,
    ArrowRight
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
    status: string;
}

/* ─── Data ─── */
const apps: Record<string, AppProduct> = {
    farmer: {
        name: "CropFresh Farmer",
        tagline: "Explore the proposed farmer app experience",
        target: "For Farmers",
        accentHex: "#16a34a",
        accentLight: "#f0fdf4",
        icon: Leaf,
        screens: [
            { label: "Assisted Listing", icon: Mic, description: "Concept for reviewing crop information captured through assisted entry" },
            { label: "Price Information", icon: BarChart3, description: "Illustrative pricing view, not a live market feed" },
            { label: "Payout Details", icon: IndianRupee, description: "Concept for showing settlement conditions and payout information" },
            { label: "Order Overview", icon: ShoppingCart, description: "Sample order stages for the proposed farmer workflow" },
        ],
        features: [
            { icon: Mic, text: "Assisted-entry concept" },
            { icon: Camera, text: "Produce photos" },
            { icon: IndianRupee, text: "Payout-information concept" },
            { icon: BarChart3, text: "Illustrative price views" },
            { icon: Star, text: "Buyer-information concept" },
            { icon: Shield, text: "Terms reviewed before selling" },
        ],
        status: "UI concept — not a released app",
    },
    buyer: {
        name: "CropFresh Buyer",
        tagline: "Explore the proposed produce-sourcing experience",
        target: "For Restaurants & Hotels",
        accentHex: "#ea580c",
        accentLight: "#fff7ed",
        icon: ShoppingCart,
        screens: [
            { label: "Sample Listings", icon: ShoppingCart, description: "Illustrative produce information, not available stock" },
            { label: "Batch Record", icon: QrCode, description: "Concept for reviewing origin and journey information" },
            { label: "Quality Details", icon: Shield, description: "Sample grade presentation; actual inspection criteria need confirmation" },
            { label: "Order Planning", icon: CalendarCheck, description: "Planned sourcing view, not an active recurring-order service" },
        ],
        features: [
            { icon: Shield, text: "Sample grade information" },
            { icon: QrCode, text: "Batch-record concept" },
            { icon: CalendarCheck, text: "Order-planning concept" },
            { icon: Star, text: "Supplier-information concept" },
            { icon: Leaf, text: "Crop and origin details" },
            { icon: IndianRupee, text: "Illustrative price breakdown" },
        ],
        status: "UI concept — not a released app",
    },
    hauler: {
        name: "CropFresh Hauler",
        tagline: "Explore the proposed delivery-partner experience",
        target: "For Delivery Partners",
        accentHex: "#7c3aed",
        accentLight: "#f5f3ff",
        icon: Truck,
        screens: [
            { label: "Load Overview", icon: Smartphone, description: "Concept for reviewing load information and vehicle requirements" },
            { label: "Route Details", icon: Route, description: "Illustrative pickup and delivery view, not live routing" },
            { label: "Delivery Receipt", icon: QrCode, description: "Proposed delivery-confirmation step; payment terms are separate" },
            { label: "Payout Overview", icon: Wallet, description: "Concept for reviewing trip costs, deductions, and payout details" },
        ],
        features: [
            { icon: Route, text: "Route-coordination concept" },
            { icon: Map, text: "Pickup and destination details" },
            { icon: IndianRupee, text: "Payment terms subject to confirmation" },
            { icon: Wallet, text: "Payout-overview concept" },
            { icon: Star, text: "Vehicle and load fit" },
            { icon: Smartphone, text: "Load-information concept" },
        ],
        status: "UI concept — not a released app",
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
                        aria-pressed={active}
                        className={`flex items-center gap-2 min-h-11 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white border
                            ${active
                                ? "text-white border-transparent"
                                : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white"
                            }`}
                        style={{
                            background: active ? accentHex : undefined,
                            boxShadow: active ? `0 4px 15px ${accentHex}40` : undefined,
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
        <section id="products" className="relative py-24 md:py-32 bg-[#0A0D14] overflow-hidden">
            {/* ─── Layer 1: Animated Mesh Background ─── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full mix-blend-screen opacity-10 filter blur-[100px]"
                    style={{ background: `radial-gradient(circle, ${app.accentHex} 0%, transparent 70%)` }}
                />
            </div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] z-0" />

            {/* Top divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {/* ── Header ── */}
                    <motion.div variants={fadeInUp} className="text-center mb-5">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
                            <Smartphone className="w-3.5 h-3.5" />
                            App concepts
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="text-center text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4"
                    >
                        Three roles,{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: `linear-gradient(135deg, ${app.accentHex} 0%, ${app.accentLight} 100%)` }}
                        >
                            One product vision
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className="text-center text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-14"
                    >
                        These illustrative screens show proposed app experiences.
                        App availability will be announced after release confirmation.
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
                                    aria-pressed={active}
                                    onClick={() => handleAppChange(key)}
                                    className={`
                                        relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold
                                        transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white border
                                        ${active
                                            ? "text-white shadow-lg"
                                            : "bg-white/5 backdrop-blur-sm text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                                        }
                                    `}
                                    style={{
                                        background: active ? a.accentHex : undefined,
                                        borderColor: active ? a.accentHex : undefined,
                                        boxShadow: active ? `0 8px 20px -4px ${a.accentHex}60` : undefined,
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
                                            <h3 className="font-display font-bold text-white text-xl sm:text-2xl">
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

                                    <p className="text-white/70 text-sm sm:text-base mb-6">
                                        {app.tagline}
                                    </p>

                                    <p className="mb-8 rounded-xl bg-white/5 border border-white/10 p-4 text-sm font-semibold text-orange-300">
                                        {app.status}
                                    </p>

                                    {/* Screen selector */}
                                    <div className="mb-6">
                                        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
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
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 text-sm text-white/80"
                                                >
                                                    <span
                                                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                                        style={{ background: `${app.accentHex}30` }}
                                                    >
                                                        <Check className="w-3 h-3" style={{ color: app.accentHex }} />
                                                    </span>
                                                    <span className="text-xs sm:text-sm">{f.text}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <p className="text-sm text-white/70 mb-4">Store links are pending release confirmation.</p>
                                    <Link
                                        href="/#choose-role"
                                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:brightness-110"
                                        style={{
                                            background: `linear-gradient(135deg, ${app.accentHex} 0%, ${app.accentLight} 200%)`,
                                            boxShadow: `0 8px 25px ${app.accentHex}40`,
                                        }}
                                    >
                                        Explore the available previews
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </Container>
        </section>
    );
}
