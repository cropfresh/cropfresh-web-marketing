import { Variants } from "framer-motion";

/**
 * CropFresh Framer Motion Animation Variants
 * Reusable animation patterns for scroll-triggered effects
 */

// Fade in from bottom
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

// Fade in from left
export const fadeInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -30,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

// Fade in from right
export const fadeInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 30,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

// Scale in (for cards, images)
export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

// Stagger container for lists
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Stagger item for list children
export const staggerItem: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

// Hero text reveal animation
export const heroReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1], // Custom easing
        },
    },
};

// Counter/number animation
export const counterReveal: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.5,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
        },
    },
};

// Glow pulse for CTAs
export const glowPulse: Variants = {
    initial: {
        boxShadow: "0 0 20px rgba(0, 230, 118, 0.3)",
    },
    animate: {
        boxShadow: [
            "0 0 20px rgba(0, 230, 118, 0.3)",
            "0 0 40px rgba(0, 230, 118, 0.5)",
            "0 0 20px rgba(0, 230, 118, 0.3)",
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

// Viewport settings for whileInView
export const viewportSettings = {
    once: true,
    margin: "-100px",
};

// Page transition
export const pageTransition: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
        },
    },
};

// Organic Float Drift for trust pills & decorative elements
export const floatDrift: Variants = {
    initial: (custom: { x: number; y: number }) => ({
        x: custom.x,
        y: custom.y,
        opacity: 0,
        scale: 0.8,
    }),
    animate: (custom: { x: number; y: number; delay?: number }) => ({
        x: [custom.x, custom.x + 15, custom.x - 10, custom.x],
        y: [custom.y, custom.y - 20, custom.y + 10, custom.y],
        opacity: 1,
        scale: 1,
        transition: {
            opacity: { duration: 0.8, delay: custom.delay || 0 },
            scale: { duration: 0.6, delay: custom.delay || 0 },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: custom.delay || 0 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: custom.delay || 0 },
        },
    }),
};

// Hero stagger orchestrator
export const heroStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

// Hero child item animation
export const heroChildFade: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

