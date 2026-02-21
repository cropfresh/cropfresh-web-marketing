"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container, Button, Card } from "@/components/ui";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { trackSignupInteraction, trackEvent } from "@/lib/analytics";
import { villages, getVillagesByDistrict } from "@/data/villages";
import { locales, localeNames, type Locale } from "@/i18n";
import { Phone, User, MapPin, Globe, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

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
        setValue,
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

    // Success state
    if (isSuccess) {
        return (
            <section id="callback" className="py-20 md:py-28 bg-slate-900/50 relative overflow-hidden">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xl mx-auto text-center"
                    >
                        <Card variant="glass" className="p-8 md:p-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-white" />
                            </motion.div>

                            <h3 className="text-2xl font-display font-bold text-[var(--color-text-primary)] mb-4">
                                {t.success}
                            </h3>
                            <p className="text-[var(--color-text-secondary)] mb-6">
                                {t.successSubtitle}
                            </p>

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass text-[var(--color-primary-400)]">
                                <Phone className="w-4 h-4" />
                                <span>We&apos;ll call you within 24 hours</span>
                            </div>
                        </Card>
                    </motion.div>
                </Container>
            </section>
        );
    }

    return (
        <section id="callback" className="py-20 md:py-28 bg-slate-900/50 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent/10 to-transparent blur-3xl" />

            <Container>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Section Header */}
                    <motion.div variants={fadeInUp} className="text-center mb-12">
                        <span className="text-[var(--color-accent-400)] text-sm font-semibold uppercase tracking-wider mb-4 block">
                            Contact Us
                        </span>
                        <h2 className="heading-section text-[var(--color-text-primary)] mb-4">
                            {t.title}
                        </h2>
                        <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto">
                            {t.subtitle}
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.div variants={fadeInUp} className="max-w-xl mx-auto">
                        <Card variant="glass" className="p-6 md:p-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Name Field */}
                                <motion.div variants={staggerItem}>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                                    >
                                        <User className="w-4 h-4 inline-block mr-2" />
                                        {t.name} *
                                    </label>
                                    <input
                                        {...register("name")}
                                        type="text"
                                        id="name"
                                        placeholder={t.namePlaceholder}
                                        className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.name
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-glass-border focus:border-primary"
                                            }`}
                                        aria-invalid={errors.name ? "true" : "false"}
                                        aria-describedby={errors.name ? "name-error" : undefined}
                                    />
                                    {errors.name && (
                                        <p id="name-error" className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.name.message}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Phone Field */}
                                <motion.div variants={staggerItem}>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                                    >
                                        <Phone className="w-4 h-4 inline-block mr-2" />
                                        {t.phone} *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                                            +91
                                        </span>
                                        <input
                                            {...register("phone")}
                                            type="tel"
                                            id="phone"
                                            placeholder={t.phonePlaceholder}
                                            maxLength={10}
                                            className={`w-full pl-14 pr-4 py-3 bg-slate-800/50 border rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.phone
                                                    ? "border-red-500 focus:ring-red-500"
                                                    : "border-glass-border focus:border-primary"
                                                }`}
                                            aria-invalid={errors.phone ? "true" : "false"}
                                            aria-describedby={errors.phone ? "phone-error" : undefined}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p id="phone-error" className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Village Field */}
                                <motion.div variants={staggerItem}>
                                    <label
                                        htmlFor="village"
                                        className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                                    >
                                        <MapPin className="w-4 h-4 inline-block mr-2" />
                                        {t.village} *
                                    </label>
                                    <select
                                        {...register("village")}
                                        id="village"
                                        className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer ${errors.village
                                                ? "border-red-500 focus:ring-red-500"
                                                : "border-glass-border focus:border-primary"
                                            }`}
                                        aria-invalid={errors.village ? "true" : "false"}
                                        aria-describedby={errors.village ? "village-error" : undefined}
                                    >
                                        <option value="" className="bg-slate-800">
                                            {t.villagePlaceholder}
                                        </option>
                                        {Object.entries(villagesByDistrict).map(([district, districtVillages]) => (
                                            <optgroup key={district} label={district} className="bg-slate-800">
                                                {districtVillages.map((village) => (
                                                    <option
                                                        key={village.id}
                                                        value={village.id}
                                                        className="bg-slate-800"
                                                    >
                                                        {selectedLanguage === "kn"
                                                            ? village.nameKn
                                                            : village.name}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                    {errors.village && (
                                        <p id="village-error" className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.village.message}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Language Field */}
                                <motion.div variants={staggerItem}>
                                    <label
                                        htmlFor="language"
                                        className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                                    >
                                        <Globe className="w-4 h-4 inline-block mr-2" />
                                        {t.language}
                                    </label>
                                    <select
                                        {...register("language")}
                                        id="language"
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-glass-border rounded-xl text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer"
                                    >
                                        {locales.map((locale) => (
                                            <option key={locale} value={locale} className="bg-slate-800">
                                                {localeNames[locale]}
                                            </option>
                                        ))}
                                    </select>
                                </motion.div>

                                {/* Error Message */}
                                {submitError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2"
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <span>{submitError}</span>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <motion.div variants={staggerItem}>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Phone className="w-5 h-5" />
                                                <span>{t.submit}</span>
                                            </>
                                        )}
                                    </Button>
                                </motion.div>

                                {/* Privacy note */}
                                <p className="text-xs text-center text-[var(--color-text-muted)]">
                                    By submitting, you agree to our{" "}
                                    <a href="/privacy" className="text-[var(--color-primary-400)] hover:underline">
                                        Privacy Policy
                                    </a>
                                    . We&apos;ll only use your number to contact you about CropFresh.
                                </p>
                            </form>
                        </Card>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
