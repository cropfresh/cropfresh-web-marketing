'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, TrendingDown, Shield } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const breakdownItems = [
    { key: 'basePrice', label: 'Base Price', percentage: '70%', color: 'from-blue-500/80 to-blue-400/80' },
    { key: 'qualityPremium', label: 'Quality Premium', percentage: '15%', color: 'from-green-500/80 to-green-400/80' },
    { key: 'logistics', label: 'Logistics', percentage: '15%', color: 'from-orange-500/80 to-orange-400/80' },
];

export function BuyerPricing() {
    return (
        <section className="py-24 bg-slate-900/80 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

            <Container className="relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 mb-6 backdrop-blur-md">
                            <Shield className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium text-slate-300">No Hidden Costs</span>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                            Transparent Pricing You Can Trust
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-lg text-slate-400">
                            No hidden costs. Every rupee accounted for.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* AISP Breakdown Visual */}
                        <motion.div variants={fadeInUp} className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl relative">
                            <h3 className="text-xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">
                                All-Inclusive Single Price (AISP) Breakdown
                            </h3>

                            <div className="space-y-6">
                                {breakdownItems.map((item) => (
                                    <div key={item.key} className="relative">
                                        <div className="flex justify-between text-sm font-medium text-slate-300 mb-2">
                                            <span>{item.label}</span>
                                            <span>{item.percentage}</span>
                                        </div>
                                        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden">
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

                                <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center px-4 py-3 bg-green-500/10 rounded-xl border-green-500/20">
                                    <span className="font-bold text-white">Your AISP</span>
                                    <span className="font-bold text-green-400">100%</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Comparison Chart */}
                        <motion.div variants={fadeInUp} className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 border border-slate-700/30 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl">
                            <h3 className="text-xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">
                                Traditional Supply Chain vs CropFresh
                            </h3>

                            <div className="space-y-8">
                                {/* Traditional Bar */}
                                <div>
                                    <div className="flex justify-between text-sm text-slate-400 mb-2 font-medium">
                                        <span>Traditional</span>
                                        <span className="text-red-400">Includes 30% Markup</span>
                                    </div>
                                    <div className="flex h-10 w-full rounded-lg overflow-hidden border border-white/5 opacity-80 grayscale">
                                        <div className="w-[45%] bg-slate-600 flex items-center justify-center text-xs text-white/70">Farm</div>
                                        <div className="w-[15%] bg-red-900/60 flex items-center justify-center text-xs text-white/70 border-l border-white/10 border-dashed">Agent</div>
                                        <div className="w-[20%] bg-red-800/60 flex items-center justify-center text-xs text-white/70 border-l border-white/10 border-dashed">Mandi</div>
                                        <div className="w-[20%] bg-red-700/60 flex items-center justify-center text-xs text-white/70 border-l border-white/10 border-dashed">Wholesale</div>
                                    </div>
                                </div>

                                {/* CropFresh Bar */}
                                <div>
                                    <div className="flex justify-between text-sm font-bold text-white mb-2">
                                        <span className="flex items-center text-green-400"><CheckCircle2 className="w-4 h-4 mr-1" /> CropFresh</span>
                                        <span className="flex items-center text-green-400"><TrendingDown className="w-4 h-4 mr-1" /> Saves up to 20%</span>
                                    </div>
                                    <div className="flex h-12 w-[80%] rounded-lg overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.2)] border border-green-500/30">
                                        <div className="w-[70%] bg-blue-600/80 flex items-center justify-center text-xs font-medium text-white shadow-inner">Farm Delivery</div>
                                        <div className="w-[15%] bg-green-500/90 flex items-center justify-center text-xs font-medium text-white border-l border-white/20">Quality</div>
                                        <div className="w-[15%] bg-orange-500/90 flex items-center justify-center text-xs font-medium text-white border-l border-white/20">Logistics</div>
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
