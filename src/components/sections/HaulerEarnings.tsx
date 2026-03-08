"use client";

import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, IndianRupee } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/lib/animations';
export function HaulerEarnings() {

    const breakdownItems = [
        { key: 'baseRate', label: 'Base Rate', percentage: '60%', color: 'from-orange-500/80 to-orange-400/80' },
        { key: 'distanceBonus', label: 'Distance Bonus', percentage: '25%', color: 'from-amber-500/80 to-amber-400/80' },
        { key: 'multiStopBonus', label: 'Multi-Stop Bonus', percentage: '15%', color: 'from-yellow-500/80 to-yellow-400/80' },
    ];

    return (
        <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                            <IndianRupee className="w-4 h-4 text-orange-400" />
                            <span className="text-sm font-medium text-orange-300">Total Hauler Earnings</span>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Your Earning Potential
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-lg text-white/70">
                            CropFresh haulers earn 25–40% more than traditional delivery jobs
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Earnings Breakdown Visual */}
                        <motion.div variants={fadeInUp} className="bg-[#0A0D14]/80 border border-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl relative">
                            <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4 flex items-center justify-between">
                                <span>₹1,500 – ₹3,000/day</span>
                                <span className="text-orange-400 text-sm font-normal px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">Average</span>
                            </h3>

                            <div className="space-y-6">
                                {breakdownItems.map((item) => (
                                    <div key={item.key} className="relative">
                                        <div className="flex justify-between text-sm font-medium text-white/70 mb-2">
                                            <span>{item.label}</span>
                                            <span className="text-white/50">{item.percentage}</span>
                                        </div>
                                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: item.percentage }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                                            />
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center px-4 py-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                    <span className="font-bold text-white">Total Hauler Earnings</span>
                                    <span className="font-bold text-orange-400">100%</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Comparison Chart */}
                        <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#0A0D14]/80 to-[#111623]/80 border border-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">
                                Traditional Delivery vs CropFresh
                            </h3>

                            <div className="space-y-8">
                                {/* Traditional Bar */}
                                <div>
                                    <div className="flex justify-between text-sm text-white/50 mb-2 font-medium">
                                        <span>Traditional</span>
                                        <span className="text-red-400 text-xs">High idle time, empty returns</span>
                                    </div>
                                    <div className="flex h-10 w-full rounded-lg overflow-hidden border border-white/5 opacity-60 grayscale">
                                        <div className="w-[40%] bg-white/10 flex items-center justify-center text-xs text-white/50">Delivery 1</div>
                                        <div className="w-[20%] bg-red-900/40 flex items-center justify-center text-xs text-white/50 border-l border-white/10 border-dashed">Empty Return</div>
                                        <div className="w-[40%] bg-white/10 flex items-center justify-center text-xs text-white/50 border-l border-white/10 border-dashed">Delivery 2</div>
                                    </div>
                                </div>

                                {/* CropFresh Bar */}
                                <div>
                                    <div className="flex justify-between text-sm font-bold text-white mb-2">
                                        <span className="flex items-center text-orange-400"><CheckCircle2 className="w-4 h-4 mr-1" /> CropFresh</span>
                                        <span className="flex items-center text-orange-400 text-xs"><TrendingUp className="w-4 h-4 mr-1" /> Optimized Multi-stop</span>
                                    </div>
                                    <div className="flex h-12 w-full rounded-lg overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.15)] border border-orange-500/30">
                                        <div className="w-[33%] bg-orange-600/80 flex items-center justify-center text-xs font-medium text-white shadow-inner">Farm A to Buyer</div>
                                        <div className="w-[33%] bg-amber-500/90 flex items-center justify-center text-xs font-medium text-white border-l border-white/20">Farm B to Buyer</div>
                                        <div className="w-[34%] bg-yellow-500/90 flex items-center justify-center text-xs font-medium text-black border-l border-white/20">Farm C to Buyer</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
