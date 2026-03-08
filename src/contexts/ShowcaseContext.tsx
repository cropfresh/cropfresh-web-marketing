"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Listing, Order } from "@/lib/services"; // Re-using existing types

export interface ShowcaseState {
  listings: Listing[];
  orders: Order[];
}

interface ShowcaseContextType {
  state: ShowcaseState;
  addListing: (listing: Omit<Listing, "id" | "status" | "created_at">) => Listing;
  updateListingStatus: (listingId: string, status: string) => void;
  createOrder: (listingId: string, buyerId: string, quantityKg: number, pricePerKg: number, buyerName: string) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
}

const ShowcaseContext = createContext<ShowcaseContextType | undefined>(undefined);

const getImageUrlForCommodity = (commodity: string) => {
  const norm = commodity.toLowerCase();
  if (norm.includes("tomato")) return "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800";
  if (norm.includes("onion")) return "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=800";
  if (norm.includes("potato")) return "https://images.unsplash.com/photo-1518977673343-a4a0f4ef5b1e?auto=format&fit=crop&q=80&w=800";
  if (norm.includes("chili") || norm.includes("chilli")) return "https://images.unsplash.com/photo-1555507036-ab1f40221da0?auto=format&fit=crop&q=80&w=800";
  if (norm.includes("wheat") || norm.includes("grain")) return "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800";
  return "https://images.unsplash.com/photo-1595856453916-29a518063065?auto=format&fit=crop&q=80&w=800"; // Generic veggies
};

// Initial generic mock data (can be empty, but we'll add some realistic looking historical data)
const initialListings: Listing[] = [
  {
    id: "lst-001",
    farmer_id: "farm-002",
    commodity: "Onions",
    variety: "Red Rose",
    quantity_kg: 1000,
    asking_price_per_kg: 30,
    suggested_price: 31,
    grade: "grade_a",
    hitl_required: false,
    status: "active",
    adcl_tagged: false,
    image_url: getImageUrlForCommodity("Onions"),
    created_at: new Date().toISOString(),
  }
];

const initialOrders: Order[] = [];

export function ShowcaseProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ShowcaseState>({
    listings: initialListings,
    orders: initialOrders,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("cropfresh_showcase_state");
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse showcase state", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cropfresh_showcase_state", JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const addListing = (listingData: Omit<Listing, "id" | "status" | "created_at">) => {
    const newListing: Listing = {
      ...listingData,
      id: `lst-${Math.random().toString(36).substr(2, 9)}`,
      status: "active",
      image_url: getImageUrlForCommodity(listingData.commodity),
      created_at: new Date().toISOString(),
    };
    setState(prev => ({
      ...prev,
      listings: [newListing, ...prev.listings]
    }));
    return newListing;
  };

  const updateListingStatus = (listingId: string, status: string) => {
    setState(prev => ({
      ...prev,
      listings: prev.listings.map(l => l.id === listingId ? { ...l, status } : l)
    }));
  };

  const createOrder = (listingId: string, buyerId: string, quantityKg: number, pricePerKg: number, buyerName: string) => {
    const listing = state.listings.find(l => l.id === listingId);
    
    if (!listing) return;

    const newOrder: Order = {
      id: `ord-${Math.random().toString(36).substr(2, 9)}`,
      listing_id: listingId,
      farmer_id: listing.farmer_id,
      buyer_id: buyerId,
      buyer_name: buyerName, // Added for UI convenience
      commodity: listing.commodity,
      quantity_kg: quantityKg,
      order_status: "pending_acceptance",
      escrow_status: "pending",
      aisp: { // Mock AISP
        farmer_payout: pricePerKg * quantityKg * 0.95,
        logistics_cost: pricePerKg * quantityKg * 0.03,
        platform_margin: pricePerKg * quantityKg * 0.02,
        risk_buffer: 0,
        aisp_total: pricePerKg * quantityKg,
        aisp_per_kg: pricePerKg
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      // Let's NOT mark the listing as matched immediately until the farmer accepts
    }));
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setState(prev => {
      const order = prev.orders.find(o => o.id === orderId);
      if (!order) return prev;

      // If accepted, mark the associated listing as matched
      let newListings = prev.listings;
      if (status === "accepted") {
         newListings = prev.listings.map(l => l.id === order.listing_id ? { ...l, status: "matched" } : l);
      }

      return {
        ...prev,
        listings: newListings,
        orders: prev.orders.map(o => o.id === orderId ? { ...o, order_status: status, updated_at: new Date().toISOString() } : o)
      };
    });
  };

  if (!isLoaded) return null;

  return (
    <ShowcaseContext.Provider value={{ state, addListing, updateListingStatus, createOrder, updateOrderStatus }}>
      {children}
    </ShowcaseContext.Provider>
  );
}

export function useShowcase() {
  const ctx = useContext(ShowcaseContext);
  if (!ctx) throw new Error("useShowcase must be used within a ShowcaseProvider");
  return ctx;
}
