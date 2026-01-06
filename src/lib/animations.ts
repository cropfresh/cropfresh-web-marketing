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
