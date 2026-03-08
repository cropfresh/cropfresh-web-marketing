"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TrendingUp, Loader2, RefreshCw } from "lucide-react";

type CommodityKey = "tomato" | "onion" | "potato" | "carrot";
type GradeKey = "A" | "B" | "C";
type LevelKey = "Low" | "Medium" | "High";

interface PriceBreakdown {
    base_price: number;
    quality_premium: number;
    logistics: number;
    platform_fee: number;
    aisp: number;
    currency: string;
}

// Base prices per commodity per grade (used as mock fallback)
const BASE_PRICES: Record<CommodityKey, Record<GradeKey, number>> = {
    tomato:  { A: 28, B: 20, C: 13 },
    onion:   { A: 35, B: 25, C: 16 },
    potato:  { A: 22, B: 16, C: 10 },
    carrot:  { A: 40, B: 30, C: 18 },
};

const SUPPLY_DEMAND_FACTOR: Record<LevelKey, number> = {
    Low: 1.15,
    Medium: 1.0,
    High: 0.88,
};

function calculateMockPrice(
    commodity: CommodityKey,
    grade: GradeKey,
    supply: LevelKey,
    demand: LevelKey
): PriceBreakdown {
    const base = BASE_PRICES[commodity][grade];
    const supplyFactor = SUPPLY_DEMAND_FACTOR[supply];
    const demandFactor = 1 / SUPPLY_DEMAND_FACTOR[demand]; // inverse: high demand = higher price
    const qualityPremium = grade === "A" ? base * 0.12 : grade === "B" ? base * 0.05 : 0;
    const logistics = 2.5;
    const platform_fee = 1.5;
    const adjusted = Math.round((base * supplyFactor * demandFactor + qualityPremium) * 10) / 10;
    return {
        base_price: base,
        quality_premium: Math.round(qualityPremium * 10) / 10,
        logistics,
        platform_fee,
        aisp: Math.round((adjusted + logistics + platform_fee) * 10) / 10,
        currency: "₹",
    };
}

const LEVELS: LevelKey[] = ["Low", "Medium", "High"];
const GRADES: GradeKey[] = ["A", "B", "C"];
const COMMODITIES: { key: CommodityKey; emoji: string; label: string }[] = [
    { key: "tomato", emoji: "🍅", label: "Tomato" },
    { key: "onion",  emoji: "🧅", label: "Onion" },
    { key: "potato", emoji: "🥔", label: "Potato" },
    { key: "carrot", emoji: "🥕", label: "Carrot" },
];

export function PricingEngineDemo() {
    const [commodity, setCommodity] = useState<CommodityKey>("tomato");
    const [grade, setGrade] = useState<GradeKey>("A");
    const [supply, setSupply] = useState<LevelKey>("Medium");
    const [demand, setDemand] = useState<LevelKey>("Medium");
    const [breakdown, setBreakdown] = useState<PriceBreakdown | null>(null);
    const [loading, setLoading] = useState(false);
    const [usingMock, setUsingMock] = useState(false);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fetchPrice = useCallback(async (
        c: CommodityKey, g: GradeKey, s: LevelKey, d: LevelKey
    ) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/v1/pricing/aisp?commodity=${c}&grade=${g}&supply=${s}&demand=${d}`);
            if (!res.ok) throw new Error("api_error");
            const data: PriceBreakdown = await res.json();
            setBreakdown(data);
            setUsingMock(false);
        } catch {
            // Graceful fallback to client-side mock
            setBreakdown(calculateMockPrice(c, g, s, d));
            setUsingMock(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => fetchPrice(commodity, grade, supply, demand), 300);
        return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
    }, [commodity, grade, supply, demand, fetchPrice]);

    const lvlColor = (val: LevelKey) =>
        val === "High" ? "text-red-400" : val === "Medium" ? "text-amber-400" : "text-emerald-400";

    return (
        <section id="pricing-demo" className="relative py-24 md:py-32 bg-[#050709] overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <Container className="relative z-10">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                    <motion.div variants={fadeInUp} className="text-center mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
                            <TrendingUp className="w-3.5 h-3.5" />
                            AISP Pricing Engine
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
                            Fair Price,{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                                In Real-Time
                            </span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-xl mx-auto">
                            Tweak market conditions below and see the AI calculate a fair All-Inclusive Single Price instantly.
                        </p>
                        {usingMock && (
                            <p className="mt-3 text-xs text-amber-400/70 inline-flex items-center gap-1.5">
                                <RefreshCw className="w-3 h-3" /> Using local pricing model — backend API connecting soon
                            </p>
                        )}
                    </motion.div>

                    <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Controls */}
                            <div className="space-y-6 p-6 rounded-3xl bg-[#0A0D14] border border-white/10">
                                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Market Parameters</h3>

                                {/* Commodity */}
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Commodity</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {COMMODITIES.map(c => (
                                            <button
                                                key={c.key}
                                                onClick={() => setCommodity(c.key)}
                                                className={`py-2 px-3 rounded-xl text-sm font-semibold border transition-all ${
                                                    commodity === c.key
                                                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                                                        : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20"
                                                }`}
                                            >
                                                {c.emoji} {c.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quality Grade */}
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Quality Grade</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {GRADES.map(g => (
                                            <button
                                                key={g}
                                                onClick={() => setGrade(g)}
                                                className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                                                    grade === g
                                                        ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                                                        : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20"
                                                }`}
                                            >
                                                Grade {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Supply Level */}
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">
                                        Supply Level
                                    </label>
                                    <div className="flex rounded-xl overflow-hidden border border-white/10">
                                        {LEVELS.map(l => (
                                            <button
                                                key={l}
                                                onClick={() => setSupply(l)}
                                                className={`flex-1 py-2 text-xs font-bold transition-all ${
                                                    supply === l
                                                        ? "bg-white/15 text-white"
                                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                                }`}
                                            >
                                                {l}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Demand Level */}
                                <div>
                                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">
                                        Demand Level
                                    </label>
                                    <div className="flex rounded-xl overflow-hidden border border-white/10">
                                        {LEVELS.map(l => (
                                            <button
                                                key={l}
                                                onClick={() => setDemand(l)}
                                                className={`flex-1 py-2 text-xs font-bold transition-all ${
                                                    demand === l
                                                        ? "bg-white/15 text-white"
                                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                                }`}
                                            >
                                                {l}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Result */}
                            <div className="rounded-3xl bg-[#0A0D14] border border-white/10 p-6 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-white/40 text-xs uppercase tracking-wider mb-6">Predicted Fair Price</h3>

                                    {/* AISP Big Number */}
                                    <div className="relative flex items-center gap-3 mb-8">
                                        {loading ? (
                                            <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
                                        ) : (
                                            <>
                                                <motion.span
                                                    key={breakdown?.aisp}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400"
                                                >
                                                    {breakdown?.currency}{breakdown?.aisp}
                                                </motion.span>
                                                <span className="text-white/40 text-sm font-medium">/kg</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Breakdown */}
                                    {breakdown && !loading && (
                                        <div className="space-y-3">
                                            {[
                                                { label: "Base Price", val: breakdown.base_price, color: "text-white" },
                                                { label: "Quality Premium", val: breakdown.quality_premium, color: "text-violet-400" },
                                                { label: "Logistics", val: breakdown.logistics, color: "text-blue-400" },
                                                { label: "Platform Fee", val: breakdown.platform_fee, color: "text-white/40" },
                                            ].map(row => (
                                                <div key={row.label} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                                    <span className="text-white/50">{row.label}</span>
                                                    <span className={`font-semibold font-mono ${row.color}`}>
                                                        {breakdown.currency}{row.val}
                                                    </span>
                                                </div>
                                            ))}
                                            <div className="flex justify-between items-center text-sm pt-1">
                                                <span className="text-white font-bold">AISP (Total)</span>
                                                <span className="text-amber-400 font-black font-mono">{breakdown.currency}{breakdown.aisp}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex gap-2 flex-wrap">
                                    <span className={`text-xs px-2 py-1 rounded-lg border bg-white/5 border-white/10 font-mono ${lvlColor(supply)}`}>
                                        Supply: {supply}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-lg border bg-white/5 border-white/10 font-mono ${lvlColor(demand)}`}>
                                        Demand: {demand}
                                    </span>
                                    <span className="text-xs px-2 py-1 rounded-lg border bg-violet-500/10 border-violet-500/20 text-violet-400 font-mono">
                                        Grade: {grade}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
