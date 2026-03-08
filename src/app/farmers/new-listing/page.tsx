"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon, Upload, CheckCircle2 } from 'lucide-react';

// Staggered Animation Logic
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function NewListingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/farmers');
    }, 1500);
  };

  return (
    <DashboardLayout role="farmer">
      <motion.div 
        className="max-w-3xl mx-auto pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Header Action Bar */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 dark:border-black/20 border-t-white dark:border-t-black rounded-full animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Listing"
              )}
            </button>
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div variants={itemVariants}>
            <div>
              <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white tracking-tight mb-2">Create New Listing</h1>
              <p className="text-neutral-500 mb-8">Add details about your produce to match with buyers.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Media Upload */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-neutral-900 dark:text-white">Listing Photos</label>
                <div className="w-full h-48 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:border-[var(--color-primary-500)] transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-[var(--color-primary-500)]/10 transition-colors">
                    <ImageIcon className="w-6 h-6 text-neutral-400 group-hover:text-[var(--color-primary-600)]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      <span className="text-[var(--color-primary-600)] dark:text-[var(--color-primary-500)]">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                </div>
              </div>

              {/* Basic Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="produceName" className="block text-sm font-semibold text-neutral-900 dark:text-white">Produce Name</label>
                  <input 
                    type="text" 
                    id="produceName" 
                    placeholder="e.g. Kolar Tomatoes"
                    className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] outline-none transition-all placeholder:text-neutral-400 dark:text-white shadow-sm"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-semibold text-neutral-900 dark:text-white">Category</label>
                  <select 
                    id="category" 
                    className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] outline-none transition-all text-neutral-900 dark:text-white shadow-sm appearance-none"
                    required
                  >
                    <option value="" disabled selected className="text-neutral-400">Select a category</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains & Pulses</option>
                    <option value="spices">Spices</option>
                  </select>
                </div>
              </div>

              {/* Pricing & Quantity Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="quantity" className="block text-sm font-semibold text-neutral-900 dark:text-white">Total Quantity</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      id="quantity" 
                      placeholder="e.g. 500"
                      className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] outline-none transition-all placeholder:text-neutral-400 dark:text-white shadow-sm pr-24"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-neutral-400 sm:text-sm font-medium">kg</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-semibold text-neutral-900 dark:text-white">Price per Unit (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <span className="text-neutral-400 sm:text-sm font-medium">₹</span>
                    </div>
                    <input 
                      type="number" 
                      id="price" 
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] outline-none transition-all placeholder:text-neutral-400 dark:text-white shadow-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Advanced / Fulfillment Details */}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
                <h3 className="text-lg font-display font-semibold text-neutral-900 dark:text-white">Quality & Fulfillment</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="qualityDate" className="block text-sm font-semibold text-neutral-900 dark:text-white">Ready for Dispatch (Date)</label>
                    <input 
                      type="date" 
                      id="qualityDate" 
                      className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] outline-none transition-all dark:text-white shadow-sm dark:[color-scheme:dark]"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="grade" className="block text-sm font-semibold text-neutral-900 dark:text-white">Expected Quality Grade</label>
                     <select 
                      id="grade" 
                      className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] outline-none transition-all text-neutral-900 dark:text-white shadow-sm appearance-none"
                      required
                    >
                      <option value="grade_a">Grade A (Premium)</option>
                      <option value="grade_b">Grade B (Standard)</option>
                      <option value="grade_c">Grade C (Processing)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-semibold text-neutral-900 dark:text-white">Additional Notes</label>
                    <textarea 
                      id="description" 
                      rows={4}
                      placeholder="Any specifics about the crop variety, farm location, or packaging..."
                      className="w-full px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] outline-none transition-all placeholder:text-neutral-400 dark:text-white shadow-sm resize-none"
                    />
                  </div>
              </div>

              {/* Trust Badge / Footer Info */}
              <div className="bg-[#00E676]/5 dark:bg-[#00E676]/10 border border-[#00E676]/20 rounded-xl p-4 flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#00E676] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Protected Payment Guarantee</h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Once a buyer is matched, your funds are secured in escrow until handover is complete. <a href="#" className="text-[#00E676] hover:underline">Learn more</a></p>
                  </div>
              </div>

            </form>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
