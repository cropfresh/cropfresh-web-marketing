'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';

const messages = {
    en: {
        headline: 'Quality Produce, Guaranteed',
        subheadline: 'Source AI-graded, farm-fresh produce with full traceability and transparent pricing',
        cta: 'Request Demo',
        learnMore: 'Learn More',
        badge: 'B2B Wholesale Platform',
    },
    kn: {
        headline: 'ಗುಣಮಟ್ಟದ ಉತ್ಪನ್ನ, ಖಾತರಿ',
        subheadline: 'ಪೂರ್ಣ ಪತ್ತೆಹಚ್ಚುವಿಕೆ ಮತ್ತು ಪಾರದರ್ಶಕ ಬೆಲೆಯೊಂದಿಗೆ AI-ಗ್ರೇಡೆಡ್, ಫಾರ್ಮ್-ಫ್ರೆಶ್ ಉತ್ಪನ್ನಗಳನ್ನು ಪಡೆಯಿರಿ',
        cta: 'ಡೆಮೊ ವಿನಂತಿಸಿ',
        learnMore: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
        badge: 'B2B ಸಗಟು ವೇದಿಕೆ',
    },
    hi: {
        headline: 'गुणवत्ता उपज, गारंटीड',
        subheadline: 'पूर्ण ट्रेसेबिलिटी और पारदर्शी मूल्य निर्धारण के साथ AI-ग्रेडेड, फार्म-फ्रेश उपज प्राप्त करें',
        cta: 'डेमो का अनुरोध करें',
        learnMore: 'और जानें',
        badge: 'B2B थोक मंच',
    },
};

export function BuyerHero() {
    const t = messages.en;

    return (
        <section className="relative min-h-[100vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-900">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Fallback pattern if image is not ready */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-400 via-slate-900 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900 z-10" />
            </div>

            <Container className="relative z-20">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Content Column */}
                    <motion.div variants={fadeInLeft} className="max-w-2xl text-center lg:text-left">
                        <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/50 border border-white/10 mb-6 backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-green-400">{t.badge}</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mb-6">
                            {t.headline}
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
                            {t.subheadline}
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <a href="#request-demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 font-semibold text-white shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] transition-all transform hover:-translate-y-1 text-center">
                                {t.cta}
                            </a>
                            <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 font-semibold text-white transition-all text-center">
                                {t.learnMore}
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Image / Graphic Column */}
                    <motion.div variants={fadeInRight} className="relative hidden lg:block h-[600px] w-full">
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-orange-500/20 rounded-3xl blur-3xl" />
                        <div className="relative h-full w-full rounded-2xl border border-white/10 bg-slate-800/50 backdrop-blur-xl overflow-hidden shadow-2xl flex items-center justify-center p-8">
                            {/* Abstract Graphic Representation of B2B Dashboard */}
                            <div className="w-full space-y-4">
                                <div className="h-8 w-1/3 bg-white/10 rounded animate-pulse" />
                                <div className="flex space-x-4">
                                    <div className="h-24 w-1/2 bg-gradient-to-br from-green-500/30 to-green-600/10 rounded-xl border border-green-500/20" />
                                    <div className="h-24 w-1/2 bg-gradient-to-br from-orange-500/30 to-orange-600/10 rounded-xl border border-orange-500/20" />
                                </div>
                                <div className="h-48 w-full bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-xl border border-blue-500/20 flex flex-col justify-end p-4">
                                    <div className="w-full flex justify-between items-end space-x-2">
                                        {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                                            <div key={i} className="bg-green-500/50 rounded-t w-1/7 transition-all duration-1000" style={{ height: `${h}%` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
