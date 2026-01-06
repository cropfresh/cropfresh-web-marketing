import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: "glass" | "solid" | "outline";
    hover?: boolean;
}

/**
 * CropFresh Card Component
 * Glassmorphic (frosted glass) effect per UX spec
 */
export function Card({
    children,
    className = "",
    variant = "glass",
    hover = false,
}: CardProps) {
    const baseStyles = "rounded-2xl p-6 transition-all duration-300";

    const variants = {
        glass:
            "bg-glass backdrop-blur-xl border border-glass-border",
        solid:
            "bg-[#1E293B] border border-glass-border",
        outline:
            "bg-transparent border-2 border-glass-border",
    };

    const hoverStyles = hover
        ? "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
        : "";

    return (
        <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
}
