"use client";

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, MapPin, Loader2, ShoppingCart, Leaf } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { listingsApi, ordersApi, type Listing } from '@/lib/services';

const GRADE_COLORS: Record<string, string> = {
  "A+": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "A": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  "B": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  "C": "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
  "Unverified": "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500",
};

export default function BuyersDashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [placingOrder, setPlacingOrder] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const fetchListings = (commodity?: string) => {
    setLoading(true);
    listingsApi.search({ commodity: commodity || undefined, limit: 20 })
      .then((res) => setListings(res.data.items))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings(searchQuery.trim() || undefined);
  };

  const placeOrder = async (listing: Listing) => {
    if (!user?.user_id) return;
    setPlacingOrder(listing.id);
    try {
      await ordersApi.create({
        listing_id: listing.id,
        buyer_id: user.user_id,
        quantity_kg: listing.quantity_kg,
      });
      setOrderSuccess(listing.id);
      setTimeout(() => setOrderSuccess(null), 3000);
      // Refresh listings to show updated status
      fetchListings();
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(null);
    }
  };

  return (
    <DashboardLayout role="buyer">
      <div className="space-y-6 max-w-7xl mx-auto pb-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Fresh Produce Market</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">
              AI-verified quality produce at competitive AISP rates — live from the network.
            </p>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search commodity (e.g., Tomato)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-shadow text-sm"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Search
            </button>
          </form>
        </div>

        {/* Location bar */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-fit text-sm text-neutral-600 dark:text-neutral-400">
          <MapPin className="w-4 h-4" />
          Delivering to: <span className="font-semibold text-neutral-900 dark:text-white ml-1">{user?.district || "Bengaluru"}</span>
        </div>

        {/* Produce Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
          </div>
        ) : listings.length === 0 ? (
          <div className="py-24 text-center text-neutral-500">
            <Leaf className="w-10 h-10 mx-auto mb-4 opacity-30" />
            <p className="font-medium">No listings found.</p>
            <p className="text-sm mt-1">Try a different search term or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#111111] rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                {/* Produce visual placeholder */}
                <div className="h-36 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-emerald-300 dark:text-emerald-700" />
                </div>

                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-neutral-900 dark:text-white text-base leading-tight">
                        {item.commodity}{item.variety ? ` (${item.variety})` : ""}
                      </h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${GRADE_COLORS[item.grade] || GRADE_COLORS["Unverified"]}`}>
                        {item.grade}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500">{item.quantity_kg} kg available</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">₹{item.asking_price_per_kg}</span>
                    <span className="text-sm text-neutral-400">/kg</span>
                  </div>

                  {item.suggested_price && item.suggested_price !== item.asking_price_per_kg && (
                    <p className="text-xs text-indigo-500 font-medium">AI suggested: ₹{item.suggested_price}/kg</p>
                  )}

                  <div className="flex items-center gap-2 text-xs text-neutral-400 mt-auto">
                    <span className={`px-2 py-0.5 rounded-full font-semibold ${item.adcl_tagged ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" : "bg-neutral-100 dark:bg-neutral-800"}`}>
                      {item.adcl_tagged ? "ADCL Tagged" : "Open Market"}
                    </span>
                    {item.expires_at && (
                      <span className="font-medium">Expires {new Date(item.expires_at).toLocaleDateString()}</span>
                    )}
                  </div>

                  <button
                    onClick={() => placeOrder(item)}
                    disabled={placingOrder === item.id || item.status !== "active" || orderSuccess === item.id}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all
                      ${orderSuccess === item.id
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 cursor-default"
                        : item.status === "active"
                        ? "bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed"}`}
                  >
                    {placingOrder === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : orderSuccess === item.id ? (
                      "✓ Order Placed!"
                    ) : item.status === "active" ? (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Place Order
                      </>
                    ) : (
                      `${item.status}`
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
