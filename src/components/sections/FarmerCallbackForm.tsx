"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { trackSignupInteraction, trackEvent } from "@/lib/analytics";
import { getVillagesByDistrict } from "@/data/villages";
import { locales, localeNames, type Locale } from "@/i18n";
import { Phone, User, MapPin, Globe, CheckCircle, AlertCircle, Loader2, ShieldCheck, Clock, TrendingUp } from "lucide-react";

// Zod validation schema
const farmerLeadSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),
    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number starting with 6-9"),
    village: z.string().min(1, "Select your village/district"),
    language: z.enum(["en", "kn", "hi"] as const),
});

type FarmerLeadForm = z.infer<typeof farmerLeadSchema>;

// Localized messages
const messages = {
    en: {
        title: "Get a Call Back",
        subtitle: "Prefer to talk? An agent will call you within 24 hours.",
        name: "Your Name",
        namePlaceholder: "Enter your full name",
        phone: "Mobile Number",
        phonePlaceholder: "10-digit mobile number",
        village: "Village/District",
        villagePlaceholder: "Select your village",
        language: "Preferred Language",
        submit: "Request Call Back",
        success: "Thank you! An agent will contact you within 24 hours.",
        successSubtitle: "We've received your details and will call you soon.",
        errors: {
            nameRequired: "Name is required",
            nameMin: "Name must be at least 2 characters",
            phoneRequired: "Mobile number is required",
            phoneInvalid: "Enter a valid 10-digit mobile number",
            villageRequired: "Select your village/district",
        },
    },
    kn: {
        title: "ಕಾಲ್ ಬ್ಯಾಕ್ ಪಡೆಯಿರಿ",
        subtitle: "ಮಾತನಾಡಲು ಬಯಸುತ್ತೀರಾ? ಏಜೆಂಟ್ 24 ಗಂಟೆಗಳಲ್ಲಿ ನಿಮಗೆ ಕರೆ ಮಾಡುತ್ತಾರೆ.",
        name: "ನಿಮ್ಮ ಹೆಸರು",
        namePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
        phone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
        phonePlaceholder: "10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
        village: "ಗ್ರಾಮ/ಜಿಲ್ಲೆ",
        villagePlaceholder: "ನಿಮ್ಮ ಗ್ರಾಮವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        language: "ಆದ್ಯತೆಯ ಭಾಷೆ",
        submit: "ಕಾಲ್ ಬ್ಯಾಕ್ ವಿನಂತಿಸಿ",
        success: "ಧನ್ಯವಾದಗಳು! ಏಜೆಂಟ್ 24 ಗಂಟೆಗಳಲ್ಲಿ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.",
        successSubtitle: "ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಾವು ಸ್ವೀಕರಿಸಿದ್ದೇವೆ ಮತ್ತು ಶೀಘ್ರದಲ್ಲೇ ನಿಮಗೆ ಕರೆ ಮಾಡುತ್ತೇವೆ.",
        errors: {
            nameRequired: "ಹೆಸರು ಅಗತ್ಯವಿದೆ",
            nameMin: "ಹೆಸರು ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳಾಗಿರಬೇಕು",
            phoneRequired: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ",
            phoneInvalid: "ಮಾನ್ಯ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
            villageRequired: "ನಿಮ್ಮ ಗ್ರಾಮ/ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ",
        },
    },
    hi: {
        title: "कॉल बैक प्राप्त करें",
        subtitle: "बात करना पसंद करते हैं? एक एजेंट 24 घंटे के भीतर आपको कॉल करेगा।",
        name: "आपका नाम",
        namePlaceholder: "अपना पूरा नाम दर्ज करें",
        phone: "मोबाइल नंबर",
        phonePlaceholder: "10 अंकों का मोबाइल नंबर",
        village: "गांव/जिला",
        villagePlaceholder: "अपना गांव चुनें",
        language: "पसंदीदा भाषा",
        submit: "कॉल बैक का अनुरोध करें",
        success: "धन्यवाद! एक एजेंट 24 घंटे के भीतर आपसे संपर्क करेगा।",
        successSubtitle: "हमें आपका विवरण मिल गया है और जल्द ही आपको कॉल करेंगे।",
        errors: {
            nameRequired: "नाम आवश्यक है",
            nameMin: "नाम कम से कम 2 अक्षर का होना चाहिए",
            phoneRequired: "मोबाइल नंबर आवश्यक है",
            phoneInvalid: "एक मान्य 10 अंकों का मोबाइल नंबर दर्ज करें",
            villageRequired: "अपना गांव/जिला चुनें",
        },
    },
};

export function FarmerCallbackForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<Locale>("en");
    const [hasStartedForm, setHasStartedForm] = useState(false);

    const t = messages[selectedLanguage];
    const villagesByDistrict = getVillagesByDistrict();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isDirty },
    } = useForm<FarmerLeadForm>({
        resolver: zodResolver(farmerLeadSchema),
        defaultValues: {
            name: "",
            phone: "",
            village: "",
            language: "en",
        },
    });

    const watchedLanguage = watch("language");

    // Update UI language when form language changes
    useEffect(() => {
        if (watchedLanguage) {
            setSelectedLanguage(watchedLanguage);
        }
    }, [watchedLanguage]);

    // Track form start
    useEffect(() => {
        if (isDirty && !hasStartedForm) {
            setHasStartedForm(true);
            trackSignupInteraction("start", "farmer");
        }
    }, [isDirty, hasStartedForm]);

    // Track form abandonment on unmount
    useEffect(() => {
        return () => {
            if (hasStartedForm && !isSuccess) {
                trackSignupInteraction("abandon", "farmer");
            }
        };
    }, [hasStartedForm, isSuccess]);

    const onSubmit = async (data: FarmerLeadForm) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch("/api/leads/farmer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setIsSuccess(true);
                trackSignupInteraction("complete", "farmer");
                trackEvent("farmer_lead_submitted", {
                    village: data.village,
                    language: data.language,
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
            <section id="callback" className="py-24 relative overflow-hidden bg-black border-t border-white/5">
                {/* Ethereal Background glow */}
                <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[var(--color-teal)]/10 to-transparent blur-3xl pointer-events-none" />

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xl mx-auto text-center"
                    >
                        <div className="bg-[#0A0D14]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden">
                            {/* Inner ambient shine */}
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-50" />

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="relative w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-inner"
                            >
                                {/* Soft glow behind checkmark */}
                                <div className="absolute inset-0 bg-[var(--color-teal)]/20 rounded-full blur-xl animate-pulse" />
                                <CheckCircle className="w-12 h-12 text-[var(--color-teal)] relative z-10" strokeWidth={1.5} />
                            </motion.div>

                            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
                                {t.success}
                            </h3>
                            <p className="text-white/70 text-lg mb-10 font-light leading-relaxed">
                                {t.successSubtitle}
                            </p>

                            <div className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 rounded-full bg-[var(--color-teal)]/10 border border-[var(--color-teal)]/20 text-[var(--color-teal)]">
                                <Phone className="w-5 h-5 animate-pulse" />
                                <span className="font-medium tracking-wide">We&apos;ll call you within 24 hours</span>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </section>
        );
    }

    return (
        <section id="callback" className="py-24 relative overflow-hidden bg-black border-t border-white/5">
            {/* Deep Slate Aesthetic Background */}
            <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--color-teal)_0%,_transparent_70%)] opacity-[0.05] pointer-events-none blur-3xl" />
            <div className="absolute bottom-0 right-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-primary-500)_0%,_transparent_60%)] opacity-[0.05] pointer-events-none blur-3xl" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

            <Container className="relative z-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
                    {/* Left Column: Trust Signals & Value Prop */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-xl mx-auto lg:mx-0"
                    >
                        <motion.div variants={fadeInUp} className="mb-12">
                            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm mb-6 text-sm font-medium tracking-wide">
                                <span className="w-2 h-2 rounded-full bg-[var(--color-teal)] mr-2 animate-pulse" />
                                <span className="text-white/80 uppercase">Contact Us</span>
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                                Let&apos;s talk about <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-teal)] to-white/70">
                                    growing your income
                                </span>
                            </h2>
                            <p className="text-[var(--color-teal)]/80 text-lg font-kannada tracking-wide mb-4">
                                ನಿಮ್ಮ ಆದಾಯವನ್ನು ಹೆಚ್ಚಿಸುವ ಬಗ್ಗೆ ಮಾತನಾಡೋಣ
                            </p>
                            <p className="text-white/70 text-lg lg:text-xl font-light leading-relaxed">
                                Provide your details and our agricultural experts will call you to explain how CropFresh can help you sell faster and earn more.
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            {[
                                {
                                    icon: ShieldCheck,
                                    title: "100% Secure & Free",
                                    desc: "No hidden charges or registration fees",
                                    color: "text-[var(--color-teal)]"
                                },
                                {
                                    icon: Clock,
                                    title: "Quick Response",
                                    desc: "Get a call back within 24 hours",
                                    color: "text-amber-400"
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Expert Guidance",
                                    desc: "Learn about market prices and demand trends",
                                    color: "text-[var(--color-primary-400)]"
                                },
                            ].map((item, index) => (
                                <motion.div key={index} variants={fadeInUp} className="flex gap-6 group">
                                    <div className={`w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:bg-white/5 transition-colors duration-300 ${item.color}`}>
                                        <item.icon className="w-6 h-6" strokeWidth={1.5} />
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-white/60 leading-relaxed font-light">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Premium High-Blur Glassmorphic Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mx-auto lg:mx-0 w-full max-w-[550px]"
                    >
                        <div className="relative group/form">
                            {/* Subtle under-glow for depth */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-teal)]/10 to-transparent rounded-[2.5rem] blur-xl opacity-50 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="bg-[#0A0D14]/70 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative z-10 shadow-2xl overflow-hidden">
                                {/* Inner texture/shine */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                                <div className="relative z-20 mb-10">
                                    <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                                        {t.title}
                                    </h3>
                                    <p className="text-[var(--color-teal)]/90 text-sm tracking-wide font-kannada">
                                        {selectedLanguage === "kn" ? "ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ" : "Enter your details below"}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-20">
                                    {/* Name Field */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="flex items-center text-sm font-medium text-white/70 mb-2 pl-1"
                                        >
                                            <User className="w-4 h-4 mr-2 text-white/40" />
                                            {t.name} <span className="text-[var(--color-teal)] ml-1">*</span>
                                        </label>
                                        <input
                                            {...register("name")}
                                            type="text"
                                            id="name"
                                            placeholder={t.namePlaceholder}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-teal)]/50 focus:bg-white/5 transition-all shadow-inner"
                                            aria-invalid={errors.name ? "true" : "false"}
                                            aria-describedby={errors.name ? "name-error" : undefined}
                                        />
                                        {errors.name && (
                                            <p id="name-error" className="mt-2 text-sm text-red-400 flex items-center gap-1.5 pl-1">
                                                <AlertCircle className="w-3.5 h-3.5" />
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="flex items-center text-sm font-medium text-white/70 mb-2 pl-1"
                                        >
                                            <Phone className="w-4 h-4 mr-2 text-white/40" />
                                            {t.phone} <span className="text-[var(--color-teal)] ml-1">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 font-medium">
                                                +91
                                            </span>
                                            <input
                                                {...register("phone")}
                                                type="tel"
                                                id="phone"
                                                placeholder={t.phonePlaceholder}
                                                maxLength={10}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl pl-16 pr-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-teal)]/50 focus:bg-white/5 transition-all shadow-inner"
                                                aria-invalid={errors.phone ? "true" : "false"}
                                                aria-describedby={errors.phone ? "phone-error" : undefined}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p id="phone-error" className="mt-2 text-sm text-red-400 flex items-center gap-1.5 pl-1">
                                                <AlertCircle className="w-3.5 h-3.5" />
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Village & Language Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* Village Field */}
                                        <div>
                                            <label
                                                htmlFor="village"
                                                className="flex items-center text-sm font-medium text-white/70 mb-2 pl-1"
                                            >
                                                <MapPin className="w-4 h-4 mr-2 text-white/40" />
                                                {t.village} <span className="text-[var(--color-teal)] ml-1">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    {...register("village")}
                                                    id="village"
                                                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-5 pr-10 py-3.5 text-white placeholder-white/30 appearance-none cursor-pointer focus:outline-none focus:border-[var(--color-teal)]/50 focus:bg-white/5 transition-all shadow-inner"
                                                    aria-invalid={errors.village ? "true" : "false"}
                                                    aria-describedby={errors.village ? "village-error" : undefined}
                                                >
                                                    <option value="" className="bg-[#0A0D14] text-white/50">
                                                        {t.villagePlaceholder}
                                                    </option>
                                                    {Object.entries(villagesByDistrict).map(([district, districtVillages]) => (
                                                        <optgroup key={district} label={district} className="bg-[#111623] text-white/70">
                                                            {districtVillages.map((village) => (
                                                                <option
                                                                    key={village.id}
                                                                    value={village.id}
                                                                    className="bg-[#0A0D14] text-white"
                                                                >
                                                                    {selectedLanguage === "kn"
                                                                        ? village.nameKn
                                                                        : village.name}
                                                                </option>
                                                            ))}
                                                        </optgroup>
                                                    ))}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                            {errors.village && (
                                                <p id="village-error" className="mt-2 text-sm text-red-400 flex items-center gap-1.5 pl-1">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    {errors.village.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Language Field */}
                                        <div>
                                            <label
                                                htmlFor="language"
                                                className="flex items-center text-sm font-medium text-white/70 mb-2 pl-1"
                                            >
                                                <Globe className="w-4 h-4 mr-2 text-white/40" />
                                                {t.language}
                                            </label>
                                            <div className="relative">
                                                <select
                                                    {...register("language")}
                                                    id="language"
                                                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-5 pr-10 py-3.5 text-white placeholder-white/30 appearance-none cursor-pointer focus:outline-none focus:border-[var(--color-teal)]/50 focus:bg-white/5 transition-all shadow-inner"
                                                >
                                                    {locales.map((locale) => (
                                                        <option key={locale} value={locale} className="bg-[#0A0D14] text-white">
                                                            {localeNames[locale]}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {submitError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center md:items-start gap-3 shadow-inner"
                                        >
                                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm font-medium">{submitError}</span>
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full group relative overflow-hidden flex items-center justify-center gap-3 bg-[var(--color-teal)] hover:bg-[var(--color-teal)]/90 text-black font-bold text-lg rounded-xl py-4 transition-all duration-300 disabled:opacity-70 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] active:scale-[0.98]"
                                        >
                                            {/* Button Premium Shine */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:animate-shimmer" />

                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                                                    <span className="relative z-10 tracking-wide">Submitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Phone className="w-5 h-5 relative z-10" />
                                                    <span className="relative z-10 tracking-wide">{t.submit}</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Privacy note */}
                                    <p className="text-xs text-center text-white/40 mt-8 leading-relaxed font-light">
                                        By submitting, you agree to our{" "}
                                        <a href="/privacy" className="text-white/60 hover:text-[var(--color-teal)] underline underline-offset-2 transition-colors">
                                            Privacy Policy
                                        </a>
                                        . We&apos;ll only use your number to contact you about CropFresh.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
