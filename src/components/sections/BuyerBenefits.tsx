'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Truck, Percent, LineChart } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

const benefits = [
    {
        key: 'qualityGraded',
        title: 'Quality-Graded Produce',
        description: 'Every batch is AI-graded (A/B/C) and verified by field agents.',
        icon: CheckCircle,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
    },
    {
        key: 'digitalTwin',
        title: 'Digital Twin Traceability',
        description: 'Full farm-to-fork journey recorded with tamper-proof Digital Twins.',
        icon: ShieldCheck,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
    },
    {
        key: 'fastDelivery',
        title: 'Same-Day Delivery',
        description: 'Optimized logistics with real-time tracking.',
        icon: Truck,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
    },
    {
        key: 'transparentPricing',
        title: 'Transparent AISP Pricing',
        description: 'All-Inclusive Single Price with full cost breakdown.',
        icon: Percent,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
    },
    {
        key: 'analytics',
        title: 'Procurement Analytics',
        description: 'Track spending, quality trends, and supplier performance.',
        icon: LineChart,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
    },
];

export function BuyerBenefits() {
    return (
        <section className="py-24 bg-slate-900 border-t border-white/5 relative z-10">
            <Container>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-7xl mx-auto"
                >
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                            Why Businesses Choose CropFresh
                        </h2>
                        <div className="h-1 w-20 bg-green-500 mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div key={benefit.key} variants={staggerItem} className="h-full">
                                    <div className={`h-full relative overflow-hidden rounded-2xl border ${benefit.border} bg-slate-800/40 backdrop-blur-md p-6 hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group`}>
                                        <div className={`w-14 h-14 rounded-xl ${benefit.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className={`w-7 h-7 ${benefit.color}`} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-3">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
