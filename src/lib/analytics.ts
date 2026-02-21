"use client";

/**
 * Google Analytics 4 utility functions
 * Uses @next/third-parties or custom implementation
 */

// GA4 Measurement ID from environment
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Check if analytics should be enabled
export const isAnalyticsEnabled = (): boolean => {
    return (
        typeof window !== "undefined" &&
        !!GA_MEASUREMENT_ID &&
        process.env.NODE_ENV === "production"
    );
};

// Type for event parameters
type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Track a custom event in GA4
 */
export const trackEvent = (
    eventName: string,
    eventParams?: EventParams
): void => {
    if (!isAnalyticsEnabled()) {
        // Log in development for debugging
        if (process.env.NODE_ENV === "development") {
            console.log("[Analytics]", eventName, eventParams);
        }
        return;
    }

    // Send to GA4
    window.gtag?.("event", eventName, eventParams);
};

/**
 * Track page view
 */
export const trackPageView = (url: string): void => {
    trackEvent("page_view", {
        page_path: url,
        page_title: document.title,
    });
};

/**
 * Track CTA clicks
 */
export const trackCTAClick = (
    ctaName: string,
    location: string,
    destination?: string
): void => {
    trackEvent("cta_click", {
        cta_name: ctaName,
        cta_location: location,
        cta_destination: destination,
    });
};

/**
 * Track user type selection (Farmer, Buyer, Hauler)
 */
export const trackUserTypeSelection = (userType: string): void => {
    trackEvent("user_type_selected", {
        user_type: userType,
    });
};

/**
 * Track signup form interactions
 */
export const trackSignupInteraction = (
    action: "start" | "complete" | "abandon",
    userType: string
): void => {
    trackEvent("signup_interaction", {
        action,
        user_type: userType,
    });
};

/**
 * Track language change
 */
export const trackLanguageChange = (
    newLanguage: string,
    previousLanguage?: string
): void => {
    trackEvent("language_change", {
        new_language: newLanguage,
        previous_language: previousLanguage,
    });
};

/**
 * Track scroll depth milestones
 */
export const trackScrollDepth = (percentage: number): void => {
    trackEvent("scroll_depth", {
        depth_percentage: percentage,
    });
};

// Extend Window interface for gtag
declare global {
    interface Window {
        gtag?: (
            command: "event" | "config" | "set",
            targetIdOrEventName: string,
            params?: EventParams
        ) => void;
        dataLayer?: unknown[];
    }
}
