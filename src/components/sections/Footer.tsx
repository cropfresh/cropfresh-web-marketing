import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui";
import { ArrowRight, Heart } from "lucide-react";

/* ─── Data ─── */
const navigation = {
    product: [
        { name: "Farmer demo", href: "/farmers" },
        { name: "Buyer demo", href: "/buyers" },
        { name: "Delivery partners", href: "/haulers" },
        { name: "App concepts", href: "/#products" },
    ],
    company: [
        { name: "About Us", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ],
    explore: [
        { name: "Choose your role", href: "/#choose-role" },
        { name: "Intended workflow", href: "/#how-it-works" },
        { name: "Technology direction", href: "/#technology" },
        { name: "Before participating", href: "/#participation" },
    ],
};

/* ─── Footer Component ─── */
export function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[var(--color-background-alt)] border-t border-[var(--glass-border)] pt-4">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary-500)]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent-500)]/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Top accent — 10% accent orange stripe */}
            <div
                className="h-1 bg-gradient-to-r from-[var(--color-primary-500)] via-[var(--color-accent-500)] to-[var(--color-primary-500)]"
            />

            {/* ── Product preview Banner ── */}
            <div className="relative z-10 pt-10 pb-6 border-b border-[var(--glass-border)]/50">
                <Container>
                    <div className="p-8 md:p-10 rounded-3xl glass-card relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Subtle Card Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-500)]/5 to-[var(--color-accent-500)]/5 pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="font-display font-bold text-xl mb-1 text-[var(--color-text-inverse)]">
                                Explore what CropFresh is building
                            </h3>
                            <p className="text-sm text-[var(--color-text-muted)]">
                                Choose a role to understand the product direction and sample workflows.
                            </p>
                        </div>

                        <div className="w-full md:w-auto relative z-10">
                            <Link href="/#choose-role" className="inline-flex items-center justify-center gap-2 min-h-11 rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold text-black hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300">
                                Choose your role
                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>

            {/* ── Main Footer Grid ── */}
            <Container className="py-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-20 w-full text-center lg:text-left">
                    {/* Brand Column */}
                    <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start">
                        <Link href="/" className="inline-flex items-center justify-center lg:justify-start gap-3 mb-8 transition-transform hover:scale-105 duration-300">
                            <Image
                                src="/logo/cropfresh-logo.png"
                                alt="CropFresh"
                                width={180}
                                height={46}
                                className="h-10 w-auto drop-shadow-lg object-contain"
                            />
                        </Link>

                        <p className="text-sm leading-relaxed mb-10 max-w-sm text-[var(--color-text-secondary)]">
                            Building clearer connections between farms, food businesses,
                            and delivery partners. Explore the product direction through
                            clearly labeled previews.
                        </p>

                        <p className="text-xs leading-relaxed text-white/70 max-w-sm">
                            Previews use sample information. Service availability and
                            commercial terms require separate confirmation.
                        </p>
                    </div>

                    {/* Links Columns Container */}
                    <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 lg:pt-3">
                        {/* Product */}
                        <div className="flex flex-col items-center lg:items-start w-full">
                            <h4 className="font-semibold text-sm uppercase tracking-wider mb-8 text-[var(--color-primary-400)]">
                                Product
                            </h4>
                            <ul className="space-y-4">
                                {navigation.product.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-primary-400)] relative group inline-flex"
                                        >
                                            <span>{item.name}</span>
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary-500)] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col items-center lg:items-start w-full">
                            <h4 className="font-semibold text-sm uppercase tracking-wider mb-8 text-[var(--color-primary-400)]">
                                Company
                            </h4>
                            <ul className="space-y-4">
                                {navigation.company.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-accent-400)] relative group inline-flex"
                                        >
                                            <span>{item.name}</span>
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-accent-500)] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Explore */}
                        <div className="flex flex-col items-center lg:items-start w-full">
                            <h4 className="font-semibold text-sm uppercase tracking-wider mb-8 text-[var(--color-primary-400)]">
                                Explore
                            </h4>
                            <ul className="space-y-4">
                                {navigation.explore.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-primary-400)] relative group inline-flex"
                                        >
                                            <span>{item.name}</span>
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary-500)] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>

            {/* ── Bottom Bar ── */}
            <div className="relative z-10 border-t border-[var(--glass-border)] bg-[var(--color-background)]/30 backdrop-blur-md">
                <Container>
                    <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-[var(--color-text-muted)] tracking-wide">
                            © {new Date().getFullYear()} CropFresh. All rights reserved.
                        </p>

                        <p className="text-xs flex items-center gap-2 text-[var(--color-text-muted)] font-medium">
                            Made with
                            <Heart className="w-4 h-4 fill-[var(--color-primary-500)] text-[var(--color-primary-500)] animate-pulse" />
                            for Indian Farmers
                        </p>
                    </div>
                </Container>
            </div>
        </footer >
    );
}
