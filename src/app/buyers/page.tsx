"use client";

import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Leaf, ShoppingCart, Loader2, Star, ShieldCheck } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useShowcase } from '@/contexts/ShowcaseContext';
import { type Listing } from '@/lib/services';
import { motion, AnimatePresence } from 'framer-motion';

const GRADE_COLORS: Record<string, string> = {
  "grade_a": "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  "grade_b": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  "grade_c": "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  "Unverified": "bg-neutral-100 text-neutral-500 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-500 dark:border-neutral-700",
};

export default function BuyersDashboard() {
  const { user } = useAuth();
  const { state: showcaseState, createOrder } = useShowcase();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [placingOrder, setPlacingOrder] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // In a real app this would be debounce + API. Here we just filter state.
  const activeListings = showcaseState.listings.filter(l => l.status === "active");
  const filteredListings = searchQuery 
    ? activeListings.filter(l => l.commodity.toLowerCase().includes(searchQuery.toLowerCase()))
    : activeListings;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate AI search latency
    setTimeout(() => {
      setIsSearching(false);
    }, 800);
  };

  const placeOrder = (listing: Listing) => {
    if (!user?.user_id) return;
    setPlacingOrder(listing.id);
    
    setTimeout(() => {
      createOrder(
        listing.id,
        user.user_id,
        listing.quantity_kg,
        listing.asking_price_per_kg,
        user.name
      );
      setPlacingOrder(null);
      setOrderSuccess(listing.id);
      setTimeout(() => setOrderSuccess(null), 3000);
    }, 1200);
  };

  return (
    <DashboardLayout role="buyer">
      <div className="space-y-6 max-w-7xl mx-auto pb-12">

        {/* Header & Search Area */}
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-[24px] p-8 sm:p-10 border border-neutral-800 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
           
           <div className="relative z-10 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4">
              Find exactly what you need. <span className="text-blue-500">Verified.</span>
            </h1>
            <p className="text-neutral-400 text-lg mb-8">
              Search the CropFresh network for high-quality produce. Our AI ranks sellers by distance, reliability, and price match.
            </p>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder='Try "Tomatoes within 50km radius"...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-base backdrop-blur-sm shadow-xl"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-900/20"
              >
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <SlidersHorizontal className="w-5 h-5" />}
                Search Network
              </button>
            </form>
            
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Suggested:</span>
              {["Kolar Tomatoes", "Export Grade Onions", "Organic Potatoes"].map(tag => (
                <button key={tag} onClick={() => setSearchQuery(tag)} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300 hover:bg-white/10 transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Location & Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-fit text-sm text-neutral-600 dark:text-neutral-400 shadow-sm">
                <MapPin className="w-4 h-4 text-rose-500" />
                Delivery to: <span className="font-bold text-neutral-900 dark:text-white ml-1">{user?.district || "Your Location"}</span>
                <span className="ml-2 text-blue-500 hover:underline cursor-pointer">Change</span>
            </div>
            
            {searchQuery && !isSearching && (
                <p className="text-sm font-semibold text-neutral-500">
                    Showing {filteredListings.length} results for "<span className="text-neutral-900 dark:text-white">{searchQuery}</span>"
                </p>
            )}
        </div>

        {/* Produce Grid */}
        <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-neutral-500 font-medium">AI is ranking the best matches...</p>
          </motion.div>
        ) : filteredListings.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center text-neutral-500 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
            <Leaf className="w-12 h-12 mx-auto mb-4 opacity-30 text-neutral-400" />
            <p className="font-bold text-lg text-neutral-900 dark:text-white">No exact matches found right now.</p>
            <p className="text-sm mt-2 max-w-sm mx-auto">Try broadening your search terms or check back later. Farmers add new inventory daily.</p>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#111111] rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group relative"
              >
                {/* Ranking Badge - Demo purpose */}
                {idx === 0 && (
                    <div className="absolute top-4 left-4 z-10 bg-[#00E676] text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-black" /> Top Match
                    </div>
                )}

                {/* Produce visual placeholder */}
                <div className="h-44 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.commodity} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <Leaf className="w-12 h-12 text-neutral-300 dark:text-neutral-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-0" />
                  <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold text-neutral-900 dark:text-white shadow-sm z-10">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified Farm
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 gap-4 z-10 bg-white dark:bg-[#111111]">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-display font-bold text-neutral-900 dark:text-white text-lg leading-tight group-hover:text-blue-500 transition-colors">
                        {item.commodity}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 uppercase tracking-widest ${GRADE_COLORS[item.grade] || GRADE_COLORS["Unverified"]}`}>
                        {item.grade.replace('grade_', 'Grade ')}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 font-medium">{item.quantity_kg} kg available • Listed by Farmer {item.farmer_id.split('-')[1]}</p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800/50">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-xs text-neutral-500 font-medium mb-0.5">Asking Price</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹{item.asking_price_per_kg}</span>
                                <span className="text-sm font-medium text-neutral-400">/kg</span>
                            </div>
                        </div>
                        {item.suggested_price && (
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Market Avg</p>
                                <p className="text-sm font-bold text-neutral-600 dark:text-neutral-300">₹{item.suggested_price}/kg</p>
                            </div>
                        )}
                    </div>
                  </div>

                  <button
                    onClick={() => placeOrder(item)}
                    disabled={placingOrder === item.id || orderSuccess === item.id}
                    className={`w-full mt-auto py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm
                      ${orderSuccess === item.id
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800"
                        : "bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/10 hover:-translate-y-0.5"}`}
                  >
                    {placingOrder === item.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending Offer...
                      </>
                    ) : orderSuccess === item.id ? (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Offer Sent to Farmer!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Make Offer
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
