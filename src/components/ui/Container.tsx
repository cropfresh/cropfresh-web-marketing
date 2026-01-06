import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    as?: "div" | "section" | "article" | "main" | "header" | "footer";
}

/**
 * Responsive container component with max-width and padding
 */
export function Container({
    children,
    className = "",
    as: Component = "div",
}: ContainerProps) {
    return (
        <Component
            className={`container-main w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 ${className}`}
        >
            {children}
        </Component>
    );
}
