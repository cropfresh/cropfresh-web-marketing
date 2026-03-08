"use client";

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, ArrowUpRight, ArrowDownRight, MoreVertical, Leaf } from 'lucide-react';
import Link from 'next/link';

// Mock Data for the Listings Grid
const allListings = [
  { id: 1, produce: "Kolar Tomatoes", category: "Vegetables", qty: "250 kg", price: "₹22/kg", status: "Active", date: "Today, 09:30 AM", views: 45, matches: 3 },
  { id: 2, produce: "Red Onions", category: "Vegetables", qty: "100 kg", price: "₹35/kg", status: "Matched", date: "Yesterday, 14:15 PM", views: 120, matches: 1 },
  { id: 3, produce: "Green Chilies", category: "Spices", qty: "50 kg", price: "₹45/kg", status: "Sold", date: "Mar 4, 2026", views: 210, matches: 5 },
  { id: 4, produce: "Premium Potatoes", category: "Vegetables", qty: "500 kg", price: "₹18/kg", status: "Active", date: "Mar 3, 2026", views: 89, matches: 0 },
  { id: 5, produce: "Alphonso Mangoes", category: "Fruits", qty: "150 kg", price: "₹120/kg", status: "Active", date: "Mar 2, 2026", views: 340, matches: 12 },
  { id: 6, produce: "Organic Wheat", category: "Grains", qty: "1000 kg", price: "₹28/kg", status: "Matched", date: "Feb 28, 2026", views: 56, matches: 1 },
];

const filters = ["All", "Active", "Matched", "Sold"];

// Staggered Animation Logic
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function MyListingsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = allListings.filter(listing => {
    const matchesFilter = activeFilter === "All" || listing.status === activeFilter;
    const matchesSearch = listing.produce.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          listing.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout role="farmer">
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        
        {/* =========================================================
            HEADER & CONTROLS
            ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800/60">
          <div>
            <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white tracking-tight">My Inventory</h1>
            <p className="text-neutral-500 mt-1">Manage your active produce listings, matches, and sales history.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link 
              href="/farmers/new-listing"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00E676] hover:bg-[#00C853] text-black rounded-xl font-bold shadow-[0_4px_14px_0_rgba(0,230,118,0.25)] hover:shadow-[0_6px_20px_rgba(0,230,118,0.23)] transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Create Listing
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Segmented Control Filter */}
          <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-900/50 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 w-full sm:w-auto overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-5 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap z-10
                  ${activeFilter === filter 
                    ? "text-neutral-900 dark:text-white" 
                    : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  }
                `}
              >
                {activeFilter === filter && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200/50 dark:border-neutral-700/50 -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                {filter}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search produce or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-[#00E676]/20 focus:border-[#00E676] outline-none transition-all placeholder:text-neutral-400 dark:text-white shadow-sm text-sm"
            />
          </div>

        </div>

        {/* =========================================================
            PRODUCE GRID
            ========================================================= */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <motion.div 
                  layout
                  key={listing.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-[#111111] rounded-[20px] border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden flex flex-col"
                >
                  {/* Card Header / Image Area */}
                  <div className="h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border-b border-neutral-200/50 dark:border-neutral-800/50 relative flex items-center justify-center overflow-hidden">
                      {/* Abstract pattern or leaf icon placeholder */}
                      <Leaf className="w-12 h-12 text-neutral-300 dark:text-neutral-700" />
                      
                      {/* Status Badge overlay */}
                      <div className="absolute top-4 left-4">
                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md
                            ${listing.status === 'Active' ? 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50' :
                              listing.status === 'Matched' ? 'bg-amber-100/80 text-amber-700 dark:bg-amber-900/60 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50' :
                              'bg-neutral-100/80 text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50'}
                          `}>
                            {listing.status}
                          </span>
                      </div>
                      
                      {/* Options Menu */}
                      <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/50 hover:bg-white dark:bg-black/50 dark:hover:bg-black backdrop-blur-md flex items-center justify-center text-neutral-600 dark:text-neutral-400 transition-colors opacity-0 group-hover:opacity-100">
                          <MoreVertical className="w-4 h-4" />
                      </button>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-4">
                          <div>
                              <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">{listing.produce}</h3>
                              <p className="text-sm text-neutral-500 mt-0.5">{listing.category}</p>
                          </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-5">
                          <div>
                              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Quantity</p>
                              <p className="font-medium text-neutral-900 dark:text-white">{listing.qty}</p>
                          </div>
                          <div>
                              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Price</p>
                              <p className="font-bold text-[#00E676]">{listing.price}</p>
                          </div>
                      </div>

                      {/* Footer / Meta Data */}
                      <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
                          <span className="text-xs text-neutral-500">{listing.date}</span>
                          <div className="flex items-center gap-3 text-xs font-medium text-neutral-500">
                              <span title="Views">{listing.views} <span className="text-neutral-400">👀</span></span>
                              <span title="Matches">{listing.matches} <span className="text-neutral-400">🤝</span></span>
                          </div>
                      </div>
                  </div>
                </motion.div>
              ))
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-neutral-50 dark:bg-[#111111] rounded-[24px] border border-neutral-200 dark:border-neutral-800 border-dashed"
                >
                    <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-4">
                        <Filter className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white mb-2">No listings found</h3>
                    <p className="text-neutral-500 max-w-sm">
                        There are no produce listings matching your current filter and search criteria.
                    </p>
                    <button 
                        onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                        className="mt-6 px-4 py-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors border border-neutral-200 dark:border-neutral-800 rounded-xl"
                    >
                        Clear Filters
                    </button>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
