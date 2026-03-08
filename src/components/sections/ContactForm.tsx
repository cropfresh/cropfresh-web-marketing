"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { trackEvent } from "@/lib/analytics";
import {
    Loader2,
    CheckCircle2,
    User,
    Mail,
    Phone,
    MessageSquare,
    ListFilter,
} from "lucide-react";

const contactFormSchema = z.object({
    inquiryType: z.enum([
        "general",
        "farmer_support",
        "buyer_support",
        "partnership",
        "press_media",
        "careers",
    ]),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
        .optional()
        .or(z.literal("")),
    message: z.string().min(10, "Message must be at least 10 characters"),
    honeypot: z.string().max(0),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const inquiryTypeLabels: Record<string, string> = {
    general: "General Inquiry",
    farmer_support: "Farmer Support",
    buyer_support: "Buyer Support",
    partnership: "Partnership / Investment",
    press_media: "Press / Media",
    careers: "Careers",
};

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            inquiryType: "general",
            name: "",
            email: "",
            phone: "",
            message: "",
            honeypot: "",
        },
    });

    // Handle pre-selection via URL param
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get("type");
        if (type && type in inquiryTypeLabels) {
            setValue("inquiryType", type as ContactFormValues["inquiryType"]);
        }
    }, [setValue]);

    const onSubmit = async (data: ContactFormValues) => {
        // Honeypot check
        if (data.honeypot) {
            setIsSuccess(true);
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/leads/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    inquiryType: data.inquiryType,
                    name: data.name,
                    email: data.email,
                    phone: data.phone || undefined,
                    message: data.message,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong");
            }

            trackEvent("contact_form_submit", {
                inquiryType: data.inquiryType,
                source: "website",
            });

            setIsSuccess(true);
            reset();
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "An error occurred. Please try again."
            );
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setIsSuccess(false), 6000);
        }
    };

    const inputBase = (hasError: boolean) =>
        `w-full bg-slate-800/50 border ${hasError ? "border-red-500/50" : "border-white/10"
        } rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all backdrop-blur-sm`;

    return (
        <section id="contact-form" className="py-20 relative overflow-hidden bg-black border-t border-white/5">
            {/* Background */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-green-500/8 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] pointer-events-none" />

            <Container className="relative z-10 max-w-3xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="text-center mb-12">
                        <motion.h2
                            variants={fadeInUp}
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                        >
                            Send Us a Message
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-white/50 max-w-lg mx-auto"
                        >
                            Fill out the form below and we&apos;ll respond within 24 hours.
                        </motion.p>
                    </div>

                    <motion.div variants={fadeInUp} className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur" />

                        <div className="relative bg-[#0A0D14]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="py-16 text-center flex flex-col items-center justify-center"
                                    >
                                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-green-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            Thank You!
                                        </h3>
                                        <p className="text-white/70 text-lg">
                                            We&apos;ll respond within 24 hours.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-6"
                                    >
                                        {/* Honeypot — hidden from users */}
                                        <div className="hidden" aria-hidden="true">
                                            <input
                                                {...register("honeypot")}
                                                type="text"
                                                tabIndex={-1}
                                                autoComplete="off"
                                            />
                                        </div>

                                        {/* Inquiry Type */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/70 ml-1">
                                                Inquiry Type
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <ListFilter className="h-5 w-5 text-white/40 group-focus-within:text-green-400 transition-colors" />
                                                </div>
                                                <select
                                                    {...register("inquiryType")}
                                                    className={`${inputBase(!!errors.inquiryType)} appearance-none`}
                                                >
                                                    {Object.entries(inquiryTypeLabels).map(
                                                        ([value, label]) => (
                                                            <option
                                                                key={value}
                                                                value={value}
                                                                className="text-black"
                                                            >
                                                                {label}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            {errors.inquiryType && (
                                                <p className="text-xs text-red-400 mt-1 ml-1">
                                                    {errors.inquiryType.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Name & Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-white/70 ml-1">
                                                    Name *
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <User className="h-5 w-5 text-white/40 group-focus-within:text-green-400 transition-colors" />
                                                    </div>
                                                    <input
                                                        {...register("name")}
                                                        type="text"
                                                        className={inputBase(!!errors.name)}
                                                        placeholder="Your full name"
                                                    />
                                                </div>
                                                {errors.name && (
                                                    <p className="text-xs text-red-400 mt-1 ml-1">
                                                        {errors.name.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-white/70 ml-1">
                                                    Email *
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <Mail className="h-5 w-5 text-white/40 group-focus-within:text-green-400 transition-colors" />
                                                    </div>
                                                    <input
                                                        {...register("email")}
                                                        type="email"
                                                        className={inputBase(!!errors.email)}
                                                        placeholder="you@example.com"
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <p className="text-xs text-red-400 mt-1 ml-1">
                                                        {errors.email.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/70 ml-1">
                                                Phone (optional)
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Phone className="h-5 w-5 text-white/40 group-focus-within:text-green-400 transition-colors" />
                                                </div>
                                                <input
                                                    {...register("phone")}
                                                    type="tel"
                                                    className={inputBase(!!errors.phone)}
                                                    placeholder="10-digit mobile number"
                                                />
                                            </div>
                                            {errors.phone && (
                                                <p className="text-xs text-red-400 mt-1 ml-1">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/70 ml-1">
                                                Message *
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                                                    <MessageSquare className="h-5 w-5 text-white/40 group-focus-within:text-green-400 transition-colors" />
                                                </div>
                                                <textarea
                                                    {...register("message")}
                                                    rows={5}
                                                    className={`${inputBase(!!errors.message)} min-h-[120px] resize-none`}
                                                    placeholder="Tell us how we can help..."
                                                />
                                            </div>
                                            {errors.message && (
                                                <p className="text-xs text-red-400 mt-1 ml-1">
                                                    {errors.message.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Error Message */}
                                        {errorMessage && (
                                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                                {errorMessage}
                                            </div>
                                        )}

                                        {/* Submit */}
                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[var(--color-accent-500)] to-[#FF8C00] text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:pointer-events-none disabled:transform-none"
                                            >
                                                {isSubmitting ? (
                                                    <Loader2 className="w-6 h-6 animate-spin" />
                                                ) : (
                                                    "Send Message"
                                                )}
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
