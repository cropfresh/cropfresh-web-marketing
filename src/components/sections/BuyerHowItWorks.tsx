'use client';

import { motion } from 'framer-motion';
import { Search, ShoppingCart, MapPin, BadgeCheck } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

const steps = [
    {
        key: 'step1',
        title: 'Browse Inventory',
        description: 'Explore quality-graded produce from verified farmers',
        icon: Search,
        iconBg: 'bg-green-500/20',
        iconColor: 'text-green-400',
    },
    {
        key: 'step2',
        title: 'Place Order',
        description: 'Set delivery preferences and quantity',
        icon: ShoppingCart,
        iconBg: 'bg-green-500/20',
        iconColor: 'text-green-400',
    },
    {
        key: 'step3',
        title: 'Track Delivery',
        description: 'Real-time hauler tracking to your door',
        icon: MapPin,
        iconBg: 'bg-green-500/20',
        iconColor: 'text-green-400',
    },
    {
        key: 'step4',
        title: 'Receive & Pay',
        description: 'Verify quality, pay transparently via AISP',
        icon: BadgeCheck,
        iconBg: 'bg-green-500/20',
        iconColor: 'text-green-400',
    },
];

export function BuyerHowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-slate-900 relative">
            <Container>
                <div className="text-center mb-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                            How CropFresh Works for Buyers
                        </h2>
                        <div className="h-1 w-24 bg-green-500 mx-auto rounded-full" />
                    </motion.div>
                </div>

                <motion.div
                    className="relative max-w-5xl mx-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Horizontal connector line for lg screens */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-800 z-0">
                        <div className="h-full bg-gradient-to-r from-green-500/10 via-green-500/50 to-green-500/10" />
                    </div>

                    {/* Vertical connector line for mobile/md screens */}
                    <div className="absolute lg:hidden left-8 top-12 bottom-12 w-0.5 bg-slate-800 z-0">
                        <div className="h-full bg-gradient-to-b from-transparent via-green-500/30 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.key}
                                    variants={staggerItem}
                                    className="flex flex-row lg:flex-col items-center lg:items-start text-left lg:text-center group pr-4 md:pr-0"
                                >
                                    <div className="relative shrink-0 lg:mx-auto mb-0 lg:mb-8 mr-6 lg:mr-0">
                                        <div className={`w-16 h-16 rounded-2xl ${step.iconBg} flex items-center justify-center border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300 backdrop-blur-sm z-10 relative bg-slate-900`}>
                                            <Icon className={`w-8 h-8 ${step.iconColor}`} />
                                        </div>
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 border shadow-lg border-white/10 flex items-center justify-center text-xs font-bold text-white z-20">
                                            {index + 1}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                                            {step.description}
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
