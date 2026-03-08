"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { trackSignupInteraction, trackEvent } from "@/lib/analytics";
import { Loader2, CheckCircle2, User, Phone, MapPin, Truck, AlertCircle } from "lucide-react";

// Inline localized messages (matches FarmerCallbackForm pattern)
const messages = {
    en: {
        title: "Get a Call Back",
        subtitle: "Prefer to talk? Our team will contact you to get started.",
        name: "Your Name",
        namePlaceholder: "e.g. Raju Kumar",
        phone: "Mobile Number",
        phonePlaceholder: "10-digit mobile number",
        city: "City / Area",
        cityPlaceholder: "Select city",
        vehicleType: "Vehicle Type",
        vehiclePlaceholder: "Select vehicle",
        submit: "Request Call Back",
        success: "Thank you! Our team will contact you within 24 hours to get you started.",
        successSubtitle: "We've received your details and will call you soon.",
        errors: {
            nameMin: "Name must be at least 2 characters",
            phoneInvalid: "Enter a valid 10-digit mobile number",
            cityRequired: "Select your city/area",
            vehicleRequired: "Select your vehicle type",
        },
        vehicleOptions: {
            pickup_truck: "Pickup Truck",
            mini_truck: "Mini Truck (Tata Ace, etc.)",
            tempo: "Tempo / LCV",
            auto: "Auto (with produce rack)",
        },
        cities: {
            bangalore: "Bangalore",
            mysore: "Mysore",
            hubli: "Hubli",
            mangalore: "Mangalore",
            kolar: "Kolar",
            tumkur: "Tumkur",
            chikkaballapur: "Chikkaballapur",
            other: "Other",
        },
    },
    kn: {
        title: "ಕರೆ ಮರಳಿ ಪಡೆಯಿರಿ",
        subtitle: "ಮಾತನಾಡಲು ಬಯಸುತ್ತೀರಾ? ನಮ್ಮ ತಂಡ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
        name: "ನಿಮ್ಮ ಹೆಸರು",
        namePlaceholder: "ಉದಾ. ರಾಜು ಕುಮಾರ್",
        phone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
        phonePlaceholder: "10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
        city: "ನಗರ / ಪ್ರದೇಶ",
        cityPlaceholder: "ನಗರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        vehicleType: "ವಾಹನ ಪ್ರಕಾರ",
        vehiclePlaceholder: "ವಾಹನವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        submit: "ಕಾಲ್ ಬ್ಯಾಕ್ ವಿನಂತಿಸಿ",
        success: "ಧನ್ಯವಾದಗಳು! ನಮ್ಮ ತಂಡ 24 ಗಂಟೆಗಳಲ್ಲಿ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
        successSubtitle: "ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಾವು ಸ್ವೀಕರಿಸಿದ್ದೇವೆ ಮತ್ತು ಶೀಘ್ರದಲ್ಲೇ ನಿಮಗೆ ಕರೆ ಮಾಡುತ್ತೇವೆ.",
        errors: {
            nameMin: "ಹೆಸರು ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳಾಗಿರಬೇಕು",
            phoneInvalid: "ಮಾನ್ಯ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
            cityRequired: "ನಿಮ್ಮ ನಗರ/ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
            vehicleRequired: "ನಿಮ್ಮ ವಾಹನ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        },
        vehicleOptions: {
            pickup_truck: "ಪಿಕ್‌ಅಪ್ ಟ್ರಕ್",
            mini_truck: "ಮಿನಿ ಟ್ರಕ್ (ಟಾಟಾ ಏಸ್, ಇತ್ಯಾದಿ)",
            tempo: "ಟೆಂಪೋ / LCV",
            auto: "ಆಟೋ (ಉತ್ಪನ್ನ ರ್ಯಾಕ್ ಜೊತೆ)",
        },
        cities: {
            bangalore: "ಬೆಂಗಳೂರು",
            mysore: "ಮೈಸೂರು",
            hubli: "ಹುಬ್ಬಳ್ಳಿ",
            mangalore: "ಮಂಗಳೂರು",
            kolar: "ಕೋಲಾರ",
            tumkur: "ತುಮಕೂರು",
            chikkaballapur: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
            other: "ಇತರೆ",
        },
    },
    hi: {
        title: "कॉल बैक प्राप्त करें",
        subtitle: "बात करना पसंद करते हैं? हमारी टीम आपसे संपर्क करेगी.",
        name: "आपका नाम",
        namePlaceholder: "जैसे राजू कुमार",
        phone: "मोबाइल नंबर",
        phonePlaceholder: "10 अंकों का मोबाइल नंबर",
        city: "शहर / क्षेत्र",
        cityPlaceholder: "शहर चुनें",
        vehicleType: "वाहन का प्रकार",
        vehiclePlaceholder: "वाहन चुनें",
        submit: "कॉल बैक का अनुरोध करें",
        success: "धन्यवाद! हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी.",
        successSubtitle: "हमें आपका विवरण मिल गया है और जल्द ही आपको कॉल करेंगे.",
        errors: {
            nameMin: "नाम कम से कम 2 अक्षर का होना चाहिए",
            phoneInvalid: "एक मान्य 10 अंकों का मोबाइल नंबर दर्ज करें",
            cityRequired: "अपना शहर/क्षेत्र चुनें",
            vehicleRequired: "अपने वाहन का प्रकार चुनें",
        },
        vehicleOptions: {
            pickup_truck: "पिकअप ट्रक",
            mini_truck: "मिनी ट्रक (टाटा एस, आदि)",
            tempo: "टेम्पो / LCV",
            auto: "ऑटो (उत्पाद रैक के साथ)",
        },
        cities: {
            bangalore: "बैंगलोर",
            mysore: "मैसूर",
            hubli: "हुबली",
            mangalore: "मैंगलोर",
            kolar: "कोलार",
            tumkur: "तुमकुर",
            chikkaballapur: "चिक्कबल्लापुर",
            other: "अन्य",
        },
    },
};

type Lang = "en" | "kn" | "hi";

// Zod validation schema
const haulerLeadSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    city: z.string().min(1, "Select your city/area"),
    vehicleType: z.string().min(1, "Select your vehicle type"),
});

type HaulerLeadForm = z.infer<typeof haulerLeadSchema>;

export function HaulerCallbackForm() {
    const [currentLang, setCurrentLang] = useState<Lang>("en");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [hasStartedForm, setHasStartedForm] = useState(false);

    const t = messages[currentLang];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<HaulerLeadForm>({
        resolver: zodResolver(haulerLeadSchema),
        defaultValues: {
            name: "",
            phone: "",
            city: "",
            vehicleType: "",
        },
    });

    // Track form start
    useEffect(() => {
        if (isDirty && !hasStartedForm) {
            setHasStartedForm(true);
            trackSignupInteraction("start", "hauler");
        }
    }, [isDirty, hasStartedForm]);

    // Track form abandonment on unmount
    useEffect(() => {
        return () => {
            if (hasStartedForm && !isSuccess) {
                trackSignupInteraction("abandon", "hauler");
            }
        };
    }, [hasStartedForm, isSuccess]);

    const onSubmit = async (data: HaulerLeadForm) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch('/api/leads/hauler', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setIsSuccess(true);
                trackSignupInteraction("complete", "hauler");
                trackEvent("hauler_lead_submitted", {
                    city: data.city,
                    vehicleType: data.vehicleType,
                });
                reset();
            } else {
                throw new Error(result.message || 'Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
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
                <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-orange-500/10 to-transparent blur-3xl pointer-events-none" />

                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xl mx-auto text-center"
                    >
                        <div className="bg-[#0A0D14]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden">
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-50" />

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="relative w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-inner"
                            >
                                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                                <CheckCircle2 className="w-12 h-12 text-green-400 relative z-10" strokeWidth={1.5} />
                            </motion.div>

                            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
                                Request Sent!
                            </h3>
                            <p className="text-white/70 text-lg mb-10 font-light leading-relaxed">
                                {t.success}
                            </p>

                            <div className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
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
            {/* Background Aesthetic */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-orange-500/10 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

            <Container className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="text-center mb-12">
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
                            {t.title}
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-white/70 text-lg max-w-xl mx-auto font-light">
                            {t.subtitle}
                        </motion.p>

                        {/* Language Switcher */}
                        <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 mt-6">
                            {(["en", "kn", "hi"] as Lang[]).map((lang) => (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => setCurrentLang(lang)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                        currentLang === lang
                                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                                            : "bg-white/5 text-white/50 border border-white/10 hover:text-white/80"
                                    }`}
                                >
                                    {lang === "en" ? "English" : lang === "kn" ? "ಕನ್ನಡ" : "हिंदी"}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div variants={fadeInUp} className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl blur" />

                        <div className="relative bg-[#0A0D14]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-6"
                                >
                                    {/* Row 1: Name & Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-white/70 ml-1">
                                                <User className="w-4 h-4 mr-2 text-white/40" />
                                                {t.name} <span className="text-orange-400 ml-1">*</span>
                                            </label>
                                            <div className="relative group">
                                                <input
                                                    {...register("name")}
                                                    type="text"
                                                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3.5 pl-4 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all backdrop-blur-sm`}
                                                    placeholder={t.namePlaceholder}
                                                />
                                            </div>
                                            {errors.name && (
                                                <p className="text-xs text-red-400 mt-1 ml-1 flex items-center gap-1.5">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    {t.errors.nameMin}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-white/70 ml-1">
                                                <Phone className="w-4 h-4 mr-2 text-white/40" />
                                                {t.phone} <span className="text-orange-400 ml-1">*</span>
                                            </label>
                                            <div className="relative group">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-medium">+91</span>
                                                <input
                                                    {...register("phone")}
                                                    type="tel"
                                                    maxLength={10}
                                                    className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3.5 pl-14 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all backdrop-blur-sm`}
                                                    placeholder={t.phonePlaceholder}
                                                />
                                            </div>
                                            {errors.phone && (
                                                <p className="text-xs text-red-400 mt-1 ml-1 flex items-center gap-1.5">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    {t.errors.phoneInvalid}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Row 2: City & Vehicle */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-white/70 ml-1">
                                                <MapPin className="w-4 h-4 mr-2 text-white/40" />
                                                {t.city} <span className="text-orange-400 ml-1">*</span>
                                            </label>
                                            <div className="relative group">
                                                <select
                                                    {...register("city")}
                                                    className={`w-full bg-white/5 border ${errors.city ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3.5 pl-4 pr-10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all backdrop-blur-sm appearance-none cursor-pointer`}
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled className="bg-[#0A0D14] text-white/50">{t.cityPlaceholder}</option>
                                                    {Object.entries(t.cities).map(([key, name]) => (
                                                        <option key={key} value={key} className="bg-[#0A0D14] text-white">{name}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                            {errors.city && (
                                                <p className="text-xs text-red-400 mt-1 ml-1 flex items-center gap-1.5">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    {t.errors.cityRequired}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center text-sm font-medium text-white/70 ml-1">
                                                <Truck className="w-4 h-4 mr-2 text-white/40" />
                                                {t.vehicleType} <span className="text-orange-400 ml-1">*</span>
                                            </label>
                                            <div className="relative group">
                                                <select
                                                    {...register("vehicleType")}
                                                    className={`w-full bg-white/5 border ${errors.vehicleType ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3.5 pl-4 pr-10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all backdrop-blur-sm appearance-none cursor-pointer`}
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled className="bg-[#0A0D14] text-white/50">{t.vehiclePlaceholder}</option>
                                                    {Object.entries(t.vehicleOptions).map(([key, name]) => (
                                                        <option key={key} value={key} className="bg-[#0A0D14] text-white">{name}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                            {errors.vehicleType && (
                                                <p className="text-xs text-red-400 mt-1 ml-1 flex items-center gap-1.5">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    {t.errors.vehicleRequired}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {submitError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 shadow-inner"
                                        >
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            <span className="text-sm font-medium">{submitError}</span>
                                        </motion.div>
                                    )}

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full group relative overflow-hidden flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:pointer-events-none disabled:transform-none"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:animate-shimmer" />
                                            {isSubmitting ? (
                                                <Loader2 className="w-6 h-6 animate-spin relative z-10" />
                                            ) : (
                                                <>
                                                    <Phone className="w-5 h-5 relative z-10" />
                                                    <span className="relative z-10 tracking-wide">{t.submit}</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Privacy note */}
                                    <p className="text-xs text-center text-white/40 mt-4 leading-relaxed font-light">
                                        By submitting, you agree to our{" "}
                                        <a href="/privacy" className="text-white/60 hover:text-orange-400 underline underline-offset-2 transition-colors">
                                            Privacy Policy
                                        </a>
                                        . We&apos;ll only use your number to contact you about CropFresh.
                                    </p>
                                </motion.form>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
