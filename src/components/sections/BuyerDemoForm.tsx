'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { trackCTAClick, trackEvent } from "@/lib/analytics";
import {
    Phone,
    User,
    Mail,
    Building2,
    Briefcase,
    BarChart3,
    CheckCircle,
    AlertCircle,
    Loader2
} from "lucide-react";

const buyerLeadSchema = z.object({
    businessName: z.string().min(2, "Business name must be at least 2 characters"),
    contactPerson: z.string().min(2, "Contact person must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    businessType: z.enum(["restaurant", "retail", "food_processing", "catering", "other"]),
    monthlyVolume: z.enum(["under_50k", "50k_2l", "2l_5l", "5l_10l", "over_10l"]),
});

type BuyerLeadForm = z.infer<typeof buyerLeadSchema>;

const messages = {
    title: "Request a Demo",
    subtitle: "See CropFresh in action. Our team will schedule a personalized demo.",
    businessName: "Business Name",
    contactPerson: "Contact Person",
    email: "Email Address",
    phone: "Phone Number",
    businessType: "Business Type",
    monthlyVolume: "Monthly Procurement Volume",
    submit: "Request Demo",
    createAccount: "Create Business Account",
    success: "Thank you! Our team will schedule a demo within 48 hours.",
    successSubtitle: "We have received your request and will contact you shortly to schedule your personalized demo.",
    volumeOptions: {
        under_50k: "Under ₹50,000",
        "50k_2l": "₹50,000 - ₹2,00,000",
        "2l_5l": "₹2,00,000 - ₹5,00,000",
        "5l_10l": "₹5,00,000 - ₹10,00,000",
        over_10l: "Over ₹10,00,000",
    },
    businessTypeOptions: {
        restaurant: "Restaurant / Hotel",
        retail: "Retail Grocery Chain",
        food_processing: "Food Processing Unit",
        catering: "Catering Service",
        other: "Other",
    },
};

export function BuyerDemoForm() {
    const t = messages;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [hasStartedForm, setHasStartedForm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<BuyerLeadForm>({
        resolver: zodResolver(buyerLeadSchema),
        defaultValues: {
            businessName: "",
            contactPerson: "",
            email: "",
            phone: "",
            businessType: undefined,
            monthlyVolume: undefined,
        },
    });

    // Track form start
    useEffect(() => {
        if (isDirty && !hasStartedForm) {
            setHasStartedForm(true);
            trackEvent("buyer_demo_form_start", {});
        }
    }, [isDirty, hasStartedForm]);

    const onSubmit = async (data: BuyerLeadForm) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch("/api/leads/buyer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setIsSuccess(true);
                trackEvent("buyer_demo_form_submitted", {
                    businessType: data.businessType,
                    monthlyVolume: data.monthlyVolume
                });
            } else {
                throw new Error(result.message || "Failed to submit form");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitError(
                error instanceof Error ? error.message : "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <section id="request-demo" className="py-24 relative overflow-hidden bg-slate-900 border-t border-white/5">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
                <Container className="relative z-10 max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-800/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-2xl"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle className="w-10 h-10 text-green-400" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-4">
                            {t.success}
                        </h3>
                        <p className="text-slate-400 mb-8">
                            {t.successSubtitle}
                        </p>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                trackCTAClick("buyer_create_account", "success_state");
                            }}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition-all shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)]"
                        >
                            {t.createAccount}
                        </a>
                    </motion.div>
                </Container>
            </section>
        );
    }

    return (
        <section id="request-demo" className="py-24 relative overflow-hidden bg-slate-900 border-t border-white/5">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

            <Container className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-slate-800/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl"
                >
                    {/* Left Info Panel */}
                    <div className="lg:col-span-2 bg-slate-800/60 p-10 border-r border-white/5 flex flex-col justify-center">
                        <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white mb-4">
                            {t.title}
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-slate-400 mb-8">
                            {t.subtitle}
                        </motion.p>

                        <motion.div variants={fadeInUp} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold text-white">Custom Pricing</p>
                                    <p className="text-slate-400">Tailored to your volume</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                    <CheckCircle className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold text-white">API Integration</p>
                                    <p className="text-slate-400">Connect to your ERP</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="lg:col-span-3 p-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Business Name */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-slate-300 mb-2 pl-1">
                                        <Building2 className="w-4 h-4 mr-2 text-slate-500" />
                                        {t.businessName} <span className="text-green-500 ml-1">*</span>
                                    </label>
                                    <input
                                        {...register("businessName")}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 focus:bg-slate-800/80 transition-all"
                                        placeholder="e.g. Fresh Foods Ltd."
                                    />
                                    {errors.businessName && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1.5 pl-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> {errors.businessName.message}
                                        </p>
                                    )}
                                </div>

                                {/* Contact Person */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-slate-300 mb-2 pl-1">
                                        <User className="w-4 h-4 mr-2 text-slate-500" />
                                        {t.contactPerson} <span className="text-green-500 ml-1">*</span>
                                    </label>
                                    <input
                                        {...register("contactPerson")}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 focus:bg-slate-800/80 transition-all"
                                        placeholder="Full Name"
                                    />
                                    {errors.contactPerson && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1.5 pl-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> {errors.contactPerson.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-slate-300 mb-2 pl-1">
                                        <Mail className="w-4 h-4 mr-2 text-slate-500" />
                                        {t.email} <span className="text-green-500 ml-1">*</span>
                                    </label>
                                    <input
                                        {...register("email")}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 focus:bg-slate-800/80 transition-all"
                                        placeholder="you@company.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1.5 pl-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-slate-300 mb-2 pl-1">
                                        <Phone className="w-4 h-4 mr-2 text-slate-500" />
                                        {t.phone} <span className="text-green-500 ml-1">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">+91</span>
                                        <input
                                            {...register("phone")}
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 focus:bg-slate-800/80 transition-all"
                                            placeholder="10-digit number"
                                            maxLength={10}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1.5 pl-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                {/* Business Type */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-slate-300 mb-2 pl-1">
                                        <Briefcase className="w-4 h-4 mr-2 text-slate-500" />
                                        {t.businessType} <span className="text-green-500 ml-1">*</span>
                                    </label>
                                    <select
                                        {...register("businessType")}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 focus:bg-slate-800/80 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-slate-900 text-slate-500">Select Type</option>
                                        <option value="restaurant" className="bg-slate-900">{t.businessTypeOptions.restaurant}</option>
                                        <option value="retail" className="bg-slate-900">{t.businessTypeOptions.retail}</option>
                                        <option value="food_processing" className="bg-slate-900">{t.businessTypeOptions.food_processing}</option>
                                        <option value="catering" className="bg-slate-900">{t.businessTypeOptions.catering}</option>
                                        <option value="other" className="bg-slate-900">{t.businessTypeOptions.other}</option>
                                    </select>
                                    {errors.businessType && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1.5 pl-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> {errors.businessType.message}
                                        </p>
                                    )}
                                </div>

                                {/* Monthly Volume */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-slate-300 mb-2 pl-1">
                                        <BarChart3 className="w-4 h-4 mr-2 text-slate-500" />
                                        {t.monthlyVolume} <span className="text-green-500 ml-1">*</span>
                                    </label>
                                    <select
                                        {...register("monthlyVolume")}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50 focus:bg-slate-800/80 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled className="bg-slate-900 text-slate-500">Select Volume</option>
                                        <option value="under_50k" className="bg-slate-900">{t.volumeOptions.under_50k}</option>
                                        <option value="50k_2l" className="bg-slate-900">{t.volumeOptions["50k_2l"]}</option>
                                        <option value="2l_5l" className="bg-slate-900">{t.volumeOptions["2l_5l"]}</option>
                                        <option value="5l_10l" className="bg-slate-900">{t.volumeOptions["5l_10l"]}</option>
                                        <option value="over_10l" className="bg-slate-900">{t.volumeOptions.over_10l}</option>
                                    </select>
                                    {errors.monthlyVolume && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1.5 pl-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> {errors.monthlyVolume.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {submitError && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">{submitError}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full group flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold text-lg rounded-xl py-4 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <span>{t.submit}</span>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
