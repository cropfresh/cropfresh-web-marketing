"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ArrowRight, ArrowDown, Cpu, Mic, BrainCircuit, Camera, TrendingUp, QrCode } from "lucide-react";

interface Node {
    id: string;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    color: string;
    tooltip: string;
    row: number;
    col: number;
}

const NODES: Node[] = [
    {
        id: "voice",
        label: "Voice Input",
        sublabel: "WebRTC / Mic",
        icon: Mic,
        color: "#3b82f6",
        tooltip: "Farmer speaks in Kannada, Hindi, Telugu, Tamil or English. Audio is streamed via WebRTC using the Pipecat framework.",
        row: 0,
        col: 0,
    },
    {
        id: "stt",
        label: "IndicWhisper STT",
        sublabel: "~600ms",
        icon: Cpu,
        color: "#8b5cf6",
        tooltip: "A fine-tuned Whisper model for 22 Indian languages transcribes speech to text with dialect awareness.",
        row: 0,
        col: 1,
    },
    {
        id: "intent",
        label: "Intent Extraction",
        sublabel: "VoiceAgent",
        icon: BrainCircuit,
        color: "#ec4899",
        tooltip: "Classifies 14+ agricultural intents (create_listing, check_price, query_status) and extracts entities like commodity, quantity, village.",
        row: 0,
        col: 2,
    },
    {
        id: "photo",
        label: "Photo Input",
        sublabel: "JPEG / WebP",
        icon: Camera,
        color: "#f59e0b",
        tooltip: "Farmer uploads one or more photos of the produce batch from any Android device.",
        row: 1,
        col: 0,
    },
    {
        id: "vision",
        label: "YOLOv26 + DINOv2",
        sublabel: "Grade A/B/C",
        icon: BrainCircuit,
        color: "#10b981",
        tooltip: "YOLOv26 detects defects; DINOv2 (ViT) assigns quality grade. ONNX Runtime enables edge execution. HITL fallback at <70% confidence.",
        row: 1,
        col: 1,
    },
    {
        id: "pricing",
        label: "AISP Engine",
        sublabel: "Dynamic Pricing",
        icon: TrendingUp,
        color: "#f97316",
        tooltip: "All-Inclusive Single Price calculation using supply/demand curves, grade, logistics cost, and platform fee in real-time.",
        row: 1,
        col: 2,
    },
    {
        id: "listing",
        label: "Listing Created",
        sublabel: "+ QR Code",
        icon: QrCode,
        color: "#06b6d4",
        tooltip: "A verified produce listing is created with a Digital Twin QR code. Haulers and buyers are notified automatically.",
        row: 0,
        col: 3,
    },
];

export function AIArchDiagram() {
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    return (
        <section id="ai-architecture" className="relative py-24 md:py-32 bg-black overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <Container className="relative z-10">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                    <motion.div variants={fadeInUp} className="text-center mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-6">
                            <Cpu className="w-3.5 h-3.5" />
                            AI Architecture
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
                            How the AI{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                                Actually Works
                            </span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-xl mx-auto">
                            Click any node to learn what&apos;s happening under the hood.
                        </p>
                    </motion.div>

                    {/* Diagram */}
                    <motion.div variants={fadeInUp} className="max-w-5xl mx-auto">
                        {/* Row 1: Voice Pipeline */}
                        <div className="mb-4">
                            <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mb-3 pl-2">
                                Voice Pipeline
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                {[NODES[0], NODES[1], NODES[2]].map((node, idx) => {
                                    const Icon = node.icon;
                                    return (
                                        <div key={node.id} className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => setActiveTooltip(activeTooltip === node.id ? null : node.id)}
                                                className={`relative w-full sm:w-44 p-4 rounded-2xl border transition-all cursor-pointer ${
                                                    activeTooltip === node.id
                                                        ? "border-white/40 bg-white/10"
                                                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                                                }`}
                                            >
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${node.color}20`, border: `1px solid ${node.color}30` }}>
                                                    <Icon className="w-5 h-5" style={{ color: node.color }} />
                                                </div>
                                                <p className="text-white text-sm font-bold leading-none mb-1">{node.label}</p>
                                                <p className="text-white/40 text-[10px]">{node.sublabel}</p>
                                                {/* Tooltip */}
                                                {activeTooltip === node.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="absolute -bottom-2 translate-y-full left-0 right-0 z-20 mt-2 p-3 rounded-xl bg-[#0A0D14] border border-white/20 text-left shadow-2xl"
                                                    >
                                                        <p className="text-white/80 text-xs leading-relaxed">{node.tooltip}</p>
                                                    </motion.div>
                                                )}
                                            </motion.button>
                                            {idx < 2 && (
                                                <div className="rotate-90 sm:rotate-0 text-white/20">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                {/* Arrow to Listing */}
                                <div className="hidden sm:flex items-center text-white/20">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                                {/* Listing node spans both rows */}
                                <div className="hidden sm:block row-span-2 self-center">
                                    {(() => {
                                        const node = NODES[6];
                                        const Icon = node.icon;
                                        return (
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => setActiveTooltip(activeTooltip === node.id ? null : node.id)}
                                                className={`relative w-44 p-4 rounded-2xl border transition-all cursor-pointer ${
                                                    activeTooltip === node.id
                                                        ? "border-white/40 bg-white/10"
                                                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                                                }`}
                                            >
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${node.color}20`, border: `1px solid ${node.color}30` }}>
                                                    <Icon className="w-5 h-5" style={{ color: node.color }} />
                                                </div>
                                                <p className="text-white text-sm font-bold leading-none mb-1">{node.label}</p>
                                                <p className="text-white/40 text-[10px]">{node.sublabel}</p>
                                                {activeTooltip === node.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="absolute -bottom-2 translate-y-full left-0 right-0 z-20 mt-2 p-3 rounded-xl bg-[#0A0D14] border border-white/20 text-left shadow-2xl"
                                                    >
                                                        <p className="text-white/80 text-xs leading-relaxed">{node.tooltip}</p>
                                                    </motion.div>
                                                )}
                                            </motion.button>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>

                        {/* Vertical connector */}
                        <div className="flex items-center gap-2 mb-4 pl-6 sm:pl-2">
                            <ArrowDown className="w-4 h-4 text-white/20" />
                        </div>

                        {/* Row 2: Vision Pipeline */}
                        <div>
                            <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mb-3 pl-2">
                                Vision Pipeline
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                {[NODES[3], NODES[4], NODES[5]].map((node, idx) => {
                                    const Icon = node.icon;
                                    return (
                                        <div key={node.id} className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => setActiveTooltip(activeTooltip === node.id ? null : node.id)}
                                                className={`relative w-full sm:w-44 p-4 rounded-2xl border transition-all cursor-pointer ${
                                                    activeTooltip === node.id
                                                        ? "border-white/40 bg-white/10"
                                                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                                                }`}
                                            >
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${node.color}20`, border: `1px solid ${node.color}30` }}>
                                                    <Icon className="w-5 h-5" style={{ color: node.color }} />
                                                </div>
                                                <p className="text-white text-sm font-bold leading-none mb-1">{node.label}</p>
                                                <p className="text-white/40 text-[10px]">{node.sublabel}</p>
                                                {activeTooltip === node.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="absolute -bottom-2 translate-y-full left-0 right-0 z-20 mt-2 p-3 rounded-xl bg-[#0A0D14] border border-white/20 text-left shadow-2xl"
                                                    >
                                                        <p className="text-white/80 text-xs leading-relaxed">{node.tooltip}</p>
                                                    </motion.div>
                                                )}
                                            </motion.button>
                                            {idx < 2 && (
                                                <div className="rotate-90 sm:rotate-0 text-white/20">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Mobile Listing node */}
                        <div className="sm:hidden mt-4">
                            {(() => {
                                const node = NODES[6];
                                const Icon = node.icon;
                                return (
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        onClick={() => setActiveTooltip(activeTooltip === node.id ? null : node.id)}
                                        className={`relative w-full p-4 rounded-2xl border transition-all ${
                                            activeTooltip === node.id ? "border-white/40 bg-white/10" : "border-white/10 bg-white/5"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${node.color}20`, border: `1px solid ${node.color}30` }}>
                                                <Icon className="w-5 h-5" style={{ color: node.color }} />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-white text-sm font-bold leading-none mb-1">{node.label}</p>
                                                <p className="text-white/40 text-[10px]">{node.sublabel}</p>
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            })()}
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
