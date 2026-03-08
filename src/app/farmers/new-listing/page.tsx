"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon, Sparkles, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { useShowcase } from '@/contexts/ShowcaseContext';
import { useAuth } from '@/contexts/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function NewListingPage() {
  const router = useRouter();
  const { addListing } = useShowcase();
  const { user } = useAuth();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Form State
  const [commodity, setCommodity] = useState('Tomatoes');
  const [quantity, setQuantity] = useState('500');
  const [expectedPrice, setExpectedPrice] = useState('30');
  const [grade, setGrade] = useState('grade_a');
  
  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    // Simulate AI thinking time
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(2);
    }, 2000);
  };

  const handleMatch = () => {
    setStep(3);
  };

  const handlePublish = () => {
    addListing({
      farmer_id: user?.user_id || "farm-001",
      commodity,
      quantity_kg: Number(quantity),
      asking_price_per_kg: Number(expectedPrice),
      suggested_price: 30, // Mock AI suggested avg
      grade,
      hitl_required: false,
      adcl_tagged: false,
    });
    router.push('/farmers');
  };

  return (
    <DashboardLayout role="farmer">
      <motion.div 
        className="max-w-3xl mx-auto pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white tracking-tight mb-2">Create New Listing</h1>
                <p className="text-neutral-500">Enter your crop details to get AI pricing insights.</p>
              </div>

              <form onSubmit={handleAnalyze} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-neutral-900 dark:text-white">Determine Crop Type</label>
                    <input 
                      type="text" 
                      value={commodity}
                      onChange={(e) => setCommodity(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-neutral-900 dark:text-white">Quantity (kg)</label>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-neutral-900 dark:text-white">Your Expected Price (₹/kg)</label>
                    <input 
                      type="number" 
                      value={expectedPrice}
                      onChange={(e) => setExpectedPrice(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-neutral-900 dark:text-white">Expected Quality</label>
                    <select 
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] outline-none"
                    >
                      <option value="grade_a">Grade A (Premium)</option>
                      <option value="grade_b">Grade B (Standard)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="submit"
                    disabled={isAnalyzing}
                    className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 dark:border-black/20 border-t-white dark:border-t-black rounded-full animate-spin" />
                        Analyzing with Amazon Bedrock...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#00E676]" />
                        Get AI Price Analysis
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-[#00E676]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-[#00E676]" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">AI Price Analysis Complete</h2>
                <p className="text-neutral-500 mt-2">Powered by Amazon Bedrock</p>
              </div>

              <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60">
                <h3 className="text-lg font-bold mb-4">Market Conditions for {commodity}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl">
                    <p className="text-sm text-neutral-500">Suggested Band</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white">₹28 - ₹32<span className="text-sm font-normal text-neutral-500">/kg</span></p>
                  </div>
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl">
                    <p className="text-sm text-neutral-500">Your Price</p>
                    <p className="text-2xl font-bold text-[#00E676]">₹{expectedPrice}<span className="text-sm font-normal text-neutral-500">/kg</span></p>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                  Your price of ₹{expectedPrice} is well within the acceptable market band based on real-time Mandi data and historical trends for {grade === 'grade_a' ? 'Premium' : 'Standard'} quality.
                </p>
              </div>

              <div className="flex gap-4 justify-end">
                <button onClick={() => setStep(1)} className="px-6 py-3 font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors">Edit Details</button>
                <button 
                  onClick={handleMatch}
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:opacity-90 flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Find Buyers
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
               <div className="text-center py-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Top Matched Buyers</h2>
                <p className="text-neutral-500 mt-2">Ranked by distance, reliability, and price match.</p>
              </div>

              <div className="space-y-4">
                {/* Simulated matches */}
                <div className="p-4 border border-[#00E676] bg-[#00E676]/5 rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="font-bold flex items-center gap-2">Priya Sharma <span className="text-[10px] bg-[#00E676] text-black px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Top Match</span></h3>
                    <p className="text-sm text-neutral-500">Retail Chain • 12km away • 98% Reliability Rating</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹30/kg</p>
                    <p className="text-xs text-[#00E676] font-medium">Exact Match</p>
                  </div>
                </div>

                <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-between opacity-70">
                  <div>
                    <h3 className="font-bold">FreshMart Logistics</h3>
                    <p className="text-sm text-neutral-500">Wholesaler • 45km away • 92% Reliability Rating</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹28/kg</p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-xl text-sm text-neutral-600 dark:text-neutral-400">
                Publishing this listing will immediately notify these matched buyers.
              </div>

              <div className="flex gap-4 justify-end">
                <button onClick={() => setStep(2)} className="px-6 py-3 font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors">Back</button>
                <button 
                  onClick={handlePublish}
                  className="px-8 py-3 bg-[#00E676] text-black font-bold rounded-xl hover:bg-[#00c853] transition-colors shadow-lg shadow-[#00E676]/20"
                >
                  Publish & Notify Buyers
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardLayout>
  );
}
