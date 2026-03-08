"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { 
    Camera, ScanLine, BrainCircuit, Activity, Eye,
    ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck
} from "lucide-react";

/* ─── Animated Flow Line ─── */
function FlowLine() {
    return (
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 overflow-hidden rounded-full hidden lg:block opacity-30">
            <div className="absolute inset-0 bg-white/10" />
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent w-1/2"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}

/* ─── Pipeline Stage Card ─── */
function PipelineStage({ 
    stage, title, description, icon: Icon, delay, color, activeCode 
}: { 
    stage: string; title: string; description: string; icon: any; delay: number; color: string; activeCode: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className="relative z-10 flex-1 flex flex-col items-center bg-[#0A0D14] p-6 rounded-3xl border border-white/10 shadow-2xl overflow-hidden group hover:border-white/30 transition-all"
        >
            {/* Background Glow */}
            <div 
                className="absolute top-0 inset-x-0 h-24 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity" 
                style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }} 
            />

            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                <Icon className="w-8 h-8" style={{ color }} />
                <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center text-[10px] font-bold text-white">
                    {stage}
                </div>
            </div>

            <h3 className="text-xl font-display font-bold text-white mb-2 text-center">{title}</h3>
            <p className="text-white/50 text-sm text-center mb-6 leading-relaxed">
                {description}
            </p>

            {/* Fake Code/Output Box */}
            <div className="w-full bg-black/50 border border-white/5 rounded-xl p-3 mt-auto font-mono text-[10px] text-white/70 overflow-hidden relative">
                <div className="absolute top-0 left-0 bottom-0 w-1 scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500" style={{ background: color }} />
                <motion.pre
                    initial={{ opacity: 0.5 }}
                    whileInView={{ opacity: 1 }}
                    className="pl-2"
                >
                    <code className="whitespace-pre-wrap">{activeCode}</code>
                </motion.pre>
            </div>
        </motion.div>
    );
}

/* ─── Main Component ─── */
export function AIVisionPipeline() {
    return (
        <section id="vision-pipeline" className="relative py-24 md:py-32 bg-black overflow-hidden">
            <Container className="relative z-10">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                    
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-6">
                            <Eye className="w-3.5 h-3.5" />
                            Zero-Literacy Vision
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">
                            3-Stage <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400">Vision Pipeline</span>
                        </h2>
                        <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
                            Farmers upload a simple photo. Our ONNX-powered edge models analyze defects, assign quality grades, and create immutable Digital Twins in under 4 seconds.
                        </p>
                    </motion.div>

                    <div className="relative max-w-6xl mx-auto mt-12">
                        <FlowLine />
                        
                        <div className="flex flex-col lg:flex-row gap-6 relative z-10">
                            <PipelineStage 
                                stage="01"
                                title="YOLOv26 Detection"
                                description="High-speed convolutional detection sweeps for visual defects, bruising, and surface cracks."
                                icon={ScanLine}
                                color="#a855f7" // Purple
                                delay={0.1}
                                activeCode={`{\n  "status": "scan_complete",\n  "defects": ["surface_crack", "bruise"],\n  "boxes": [{ "x":10, "y":20, "conf":0.94 }]\n}`}
                            />

                            <div className="flex-none flex items-center justify-center lg:transform lg:-rotate-90">
                                <ArrowRight className="w-6 h-6 text-white/20 rotate-90 lg:rotate-0" />
                            </div>

                            <PipelineStage 
                                stage="02"
                                title="DINOv2 Classification"
                                description="Vision Transformer (ViT) evaluates holistic quality context, merging with defect counts to assign a final grade."
                                icon={BrainCircuit}
                                color="#10b981" // Emerald
                                delay={0.3}
                                activeCode={`{\n  "commodity": "Tomato",\n  "grade": "Grade A",\n  "confidence": 0.92,\n  "hitl_trigger": false\n}`}
                            />

                            <div className="flex-none flex items-center justify-center lg:transform lg:-rotate-90">
                                <ArrowRight className="w-6 h-6 text-white/20 rotate-90 lg:rotate-0" />
                            </div>

                            <PipelineStage 
                                stage="03"
                                title="ResNet50 Digital Twin"
                                description="Creates a cosine-similarity embedding to prevent substitution fraud between farm departure and buyer arrival."
                                icon={ShieldCheck}
                                color="#3b82f6" // Blue
                                delay={0.5}
                                activeCode={`{\n  "twin_id": "dt_8832a4",\n  "similarity": 0.998,\n  "fraud_flag": "PASS",\n  "hash": "e3b0c44298fc1c..."\n}`}
                            />
                        </div>
                    </div>

                    {/* HITL Notice */}
                    <motion.div variants={fadeInUp} className="mt-16 max-w-2xl mx-auto bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm mb-1">Human-In-The-Loop (HITL) Fallback</h4>
                            <p className="text-white/60 text-xs leading-relaxed">
                                If DINOv2 confidence falls below 0.70, or if a defect count triggers an override, the system automatically routes the photo to a human expert for manual "A+" verification.
                            </p>
                        </div>
                    </motion.div>

                </motion.div>
            </Container>
        </section>
    );
}
