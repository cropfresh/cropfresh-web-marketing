"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/ui";
import { Users, ShoppingBag, Package, TrendingUp } from "lucide-react";

// Animated counter hook
function useCounter(target: number, duration: number = 2000, isActive: boolean) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isActive) return;

        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target, duration, isActive]);

    return count;
}

const stats = [
    {
        icon: Users,
        value: 500,
        suffix: "+",
        label: "Farmers Onboarded",
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
    },
    {
        icon: ShoppingBag,
        value: 100,
        suffix: "+",
        label: "Buyers Served",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
    {
        icon: Package,
        value: 2000,
        suffix: "+",
        label: "Deliveries Completed",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
    },
    {
        icon: TrendingUp,
        value: 30,
        suffix: "%+",
        label: "More Farmer Earnings",
        color: "text-teal-400",
        bg: "bg-teal-500/10",
        border: "border-teal-500/20",
    },
];

function StatCard({ stat, isActive, index }: { stat: typeof stats[0]; isActive: boolean; index: number }) {
    const count = useCounter(stat.value, 2000, isActive);
    const Icon = stat.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative"
        >
            <div className={`relative bg-[#0A0D14]/60 backdrop-blur-xl border ${stat.border} rounded-2xl p-8 text-center shadow-lg hover:bg-white/[0.04] transition-all duration-500`}>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} strokeWidth={1.5} />
                </div>

                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 tracking-tight tabular-nums`}>
                    {count.toLocaleString()}{stat.suffix}
                </div>

                <p className="text-white/50 text-sm font-medium tracking-wide uppercase">
                    {stat.label}
                </p>
            </div>
        </motion.div>
    );
}

export function AboutImpact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 relative overflow-hidden bg-black border-t border-white/5">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-green-500/5 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section header */}
                    <motion.div variants={fadeInUp} className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-wider mb-6">
                            Our Impact
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                            Numbers That{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                                Matter
                            </span>
                        </h2>
                        <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                            Real impact, measured in lives improved and waste prevented.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {stats.map((stat, index) => (
                            <StatCard key={stat.label} stat={stat} isActive={isInView} index={index} />
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
