'use client';

import { motion } from 'framer-motion';
import { Utensils, Store, Leaf, Soup } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

const businessTypes = [
    {
        key: 'restaurant',
        title: 'Restaurants & Hotels',
        description: 'Consistent quality for your kitchen, every day.',
        icon: Utensils,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
        glow: 'group-hover:shadow-[0_0_25px_rgba(234,88,12,0.3)]',
    },
    {
        key: 'retail',
        title: 'Retail Grocery Chains',
        description: 'Bulk procurement with reliable supply.',
        icon: Store,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        glow: 'group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]',
    },
    {
        key: 'processing',
        title: 'Food Processing Units',
        description: 'Raw materials graded to your specification.',
        icon: Leaf,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        glow: 'group-hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]',
    },
    {
        key: 'catering',
        title: 'Catering Services',
        description: 'On-demand produce for events and contracts.',
        icon: Soup,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        glow: 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]',
    },
];

export function BuyerBusinessTypes() {
    return (
        <section className="py-24 bg-slate-900/50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

            <Container>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sm font-medium text-orange-400 mb-4 backdrop-blur-sm">
                            Tailored Solutions
                        </span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                            Built for Every Food Business
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {businessTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                                <motion.div
                                    key={type.key}
                                    variants={staggerItem}
                                    className={`relative z-10 group overflow-hidden rounded-3xl border border-white/5 bg-slate-800/20 backdrop-blur-xl p-8 transition-all duration-300 ${type.glow} hover:-translate-y-2`}
                                >
                                    {/* Hover highlight gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                    <div className={`w-16 h-16 rounded-2xl ${type.bg} flex items-center justify-center mb-6 border ${type.border} transition-transform duration-500 group-hover:rotate-12`}>
                                        <Icon className={`w-8 h-8 ${type.color}`} />
                                    </div>

                                    <h3 className="text-xl font-display font-bold text-white mb-3 tracking-wide">
                                        {type.title}
                                    </h3>

                                    <p className="text-slate-300 leading-relaxed font-light">
                                        {type.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
