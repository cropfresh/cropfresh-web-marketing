"use client";

import React, { useState, useEffect } from 'react';
import {
  Sprout, DollarSign, TrendingUp, Clock, Plus, Mic,
  ArrowUpRight, ArrowDownRight, Search, Filter, Leaf, Loader2
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { listingsApi, voiceApi, type Listing } from '@/lib/services';

// Static market insights — can be replaced later with /api/v1/data/prices
const marketInsights = [
  { crop: "Kolar Tomatoes", currentWeekPrice: "₹24/kg", percentageChange: "+8.5%", trend: "up" },
  { crop: "Red Onions", currentWeekPrice: "₹32/kg", percentageChange: "-2.1%", trend: "down" },
  { crop: "Potatoes (Agra)", currentWeekPrice: "₹18/kg", percentageChange: "+1.2%", trend: "up" },
  { crop: "Green Chilies", currentWeekPrice: "₹48/kg", percentageChange: "+12.0%", trend: "up" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function FarmersDashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [voiceStatus, setVoiceStatus] = useState<string>("");

  useEffect(() => {
    if (!user?.user_id) return;
    setLoadingListings(true);
    listingsApi.getByFarmer(user.user_id, "active")
      .then((res) => setListings(res.data))
      .catch(() => setListings([]))
      .finally(() => setLoadingListings(false));
  }, [user?.user_id]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        setVoiceStatus("Processing with AI...");
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        try {
          const res = await voiceApi.process(audioBlob, user!.user_id, undefined, "auto");
          const { transcription, intent, entities } = res.data;
          setVoiceStatus(`"${transcription}" — Intent: ${intent}`);
          if (intent?.toLowerCase().includes("list") || entities?.commodity) {
            const params = new URLSearchParams();
            if (entities?.commodity) params.set("commodity", entities.commodity);
            if (entities?.quantity) params.set("quantity_kg", entities.quantity);
            window.location.href = `/farmers/new-listing?${params.toString()}`;
          }
        } catch {
          setVoiceStatus("Could not process audio. Please try again.");
        }
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setVoiceStatus("Listening...");
    } catch {
      setVoiceStatus("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setMediaRecorder(null);
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  const kpiData = [
    { title: "Active Listings", value: loadingListings ? "…" : String(listings.length), trend: "live data", isPositive: true, icon: Sprout, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Earnings", value: "₹45,200", trend: "+12.5%", isPositive: true, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Pending Orders", value: "2", trend: "Action required", isPositive: false, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Quality Score", value: "92/100", trend: "Grade A Premium", isPositive: true, icon: TrendingUp, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  ];

  return (
    <DashboardLayout role="farmer">
      <motion.div
        className="max-w-7xl mx-auto space-y-8 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-2 border-b border-neutral-200 dark:border-neutral-800/60">
          <div>
            <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white tracking-tight">
              Welcome back, {user?.phone || "Farmer"}
            </h1>
            <p className="text-neutral-500 mt-1">Here's a detailed overview of your farm's performance today.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 font-semibold shadow-sm transition-all active:scale-[0.98]">
              <Search className="w-4 h-4" />
              History
            </button>
            <Link
              href="/farmers/new-listing"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00E676] hover:bg-[#00C853] text-black rounded-xl font-bold shadow-[0_4px_14px_0_rgba(0,230,118,0.25)] hover:shadow-[0_6px_20px_rgba(0,230,118,0.23)] transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              New Listing
            </Link>
          </div>
        </motion.div>

        {/* HERO WIDGET: AI VOICE LISTING */}
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-black dark:from-neutral-900 dark:to-[#050505] rounded-[24px] p-8 sm:p-10 shadow-xl border border-neutral-800/50">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E676]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 lg:gap-12">
              {/* Mic Button */}
              <div className="relative group shrink-0">
                <AnimatePresence>
                  {isRecording && (
                    <motion.div
                      key="pulse-rings"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-0"
                    >
                      <div className="absolute inset-0 rounded-full border-2 border-[#00E676]/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                      <div className="absolute inset-[-15px] rounded-full border border-[#00E676]/30 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_100ms]" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={toggleRecording}
                  className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl
                    ${isRecording
                      ? "bg-[#00E676] shadow-[0_0_40px_rgba(0,230,118,0.5)] scale-105"
                      : "bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20"
                    }`}
                >
                  <Mic className={`w-10 h-10 transition-colors ${isRecording ? "text-black" : "text-[#00E676]"}`} />
                </button>
              </div>

              {/* Voice AI Status */}
              <div className="text-center sm:text-left flex-1">
                <AnimatePresence mode="wait">
                  {isRecording ? (
                    <motion.div
                      key="recording-state"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="flex items-center justify-center sm:justify-start gap-4 mb-2">
                        <div className="flex gap-1 items-center h-6">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 bg-[#00E676] rounded-full"
                              animate={{ height: ["4px", "24px", "4px"] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                            />
                          ))}
                        </div>
                        <h2 className="text-2xl font-display font-bold text-white tracking-tight">Listening...</h2>
                      </div>
                      <p className="text-neutral-400 text-base">{voiceStatus}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle-state"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-tight mb-2">
                        Create a listing in seconds.
                      </h2>
                      <p className="text-neutral-400 text-lg max-w-xl">
                        Tap the microphone and speak. Our AI extracts the crop, quantity, and price automatically.
                      </p>
                      {voiceStatus && <p className="text-neutral-300 text-sm mt-3 italic">{voiceStatus}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI CARDS */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {kpiData.map((kpi, idx) => (
            <div key={idx} className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${kpi.bg}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${kpi.isPositive ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"}`}>
                  {kpi.trend}
                </span>
              </div>
              <h3 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-1 tracking-tight">{kpi.value}</h3>
              <p className="text-sm font-medium text-neutral-500">{kpi.title}</p>
            </div>
          ))}
        </motion.div>

        {/* MAIN CONTENT: Listings + Market Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Active Listings Table */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white">Active Inventory</h3>
              <Link href="/farmers/listings" className="text-sm font-semibold text-[#00E676] hover:text-[#00C853] transition-colors flex items-center gap-1">
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white dark:bg-[#111111] rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/20">
                <Filter className="w-4 h-4 text-neutral-400" />
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Latest Active Listings</span>
              </div>
              {loadingListings ? (
                <div className="p-12 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
                </div>
              ) : listings.length === 0 ? (
                <div className="p-12 text-center text-neutral-500 text-sm">
                  <Leaf className="w-8 h-8 mx-auto mb-3 opacity-30" />
                  No active listings yet. <Link href="/farmers/new-listing" className="text-[#00E676] font-semibold">Create your first listing.</Link>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                  {listings.slice(0, 5).map((item) => (
                    <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors">
                      <div className="flex items-start sm:items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center shrink-0 border border-neutral-200/50 dark:border-neutral-700/50">
                          <Leaf className="w-5 h-5 text-neutral-400" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                            {item.commodity}{item.variety ? ` (${item.variety})` : ""}
                          </h4>
                          <div className="flex items-center gap-3 mt-1 text-sm text-neutral-500">
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.quantity_kg} kg</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                            <span className="font-medium text-emerald-600 dark:text-emerald-400">₹{item.asking_price_per_kg}/kg</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-500">Grade {item.grade}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                          ${item.status === 'active' ? 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50'
                            : item.status === 'matched' ? 'bg-amber-100/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'
                            : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'}`}
                        >
                          {item.status}
                        </span>
                        <button className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                          Manage
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Market Insights */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white px-1">Market Insights</h3>
            <div className="bg-white dark:bg-[#111111] rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm p-6">
              <p className="text-sm text-neutral-500 mb-6 font-medium">Regional price trends for items you frequently list.</p>
              <div className="space-y-5">
                {marketInsights.map((insight, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-[#00E676] transition-colors">{insight.crop}</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">Avg: {insight.currentWeekPrice}</p>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-bold ${insight.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {insight.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {insight.percentageChange}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-2.5 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-semibold rounded-xl transition-colors">
                View Detailed Report
              </button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </DashboardLayout>
  );
}
