"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { 
    Mic, Radio, Languages, Workflow, 
    Volume2, Cpu, Smartphone
} from "lucide-react";

const voiceSteps = [
    {
        id: "input",
        title: "Voice Upload via WebRTC",
        desc: "Farmer speaks into generic Android mic in their native dialect.",
        icon: Smartphone,
        latency: "~50ms",
        color: "#3b82f6"
    },
    {
        id: "vad",
        title: "Silero VAD",
        desc: "Voice Activity Detection drops background tractor noise.",
        icon: Radio,
        latency: "~200ms",
        color: "#8b5cf6"
    },
    {
        id: "stt",
        title: "Multi-Provider STT",
        desc: "faster-whisper → IndicWhisper → Groq fallback cascade.",
        icon: Languages,
        latency: "~600ms",
        color: "#ec4899"
    },
    {
        id: "intent",
        title: "VoiceAgent Router",
        desc: "Classifies 14+ intents and extracts entities (crop, price).",
        icon: Workflow,
        latency: "~80ms",
        color: "#f59e0b"
    },
    {
        id: "llm",
        title: "LLM Processing",
        desc: "Agent specific reasoning or tool usage (e.g. AgronomyAgent).",
        icon: Cpu,
        latency: "~300ms",
        color: "#10b981"
    },
    {
        id: "tts",
        title: "Streaming Edge-TTS",
        desc: "Synthesizes native Kannada audio streamed back to phone.",
        icon: Volume2,
        latency: "< 500ms",
        color: "#14b8a6"
    }
];

export function AIVoiceFlow() {
    return (
        <section className="relative py-24 md:py-32 bg-[#0A0D14] overflow-hidden">
            <Container className="relative z-10">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side: Copy */}
                        <div className="order-2 lg:order-1">
                            <motion.div variants={fadeInUp} className="mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                                    <Mic className="w-3.5 h-3.5" />
                                    Zero-Literacy UI
                                </span>
                            </motion.div>
                            
                            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
                                Real-Time Kannada <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Voice Pipeline</span>
                            </motion.h2>

                            <motion.p variants={fadeInUp} className="text-white/60 text-lg leading-relaxed mb-8">
                                Farmers don't type. They speak. Our custom Pipecat integration handles full-duplex conversational audio with barge-in support, mapping rural dialects to complex multi-agent workflows.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6 mb-10">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="text-3xl font-bold text-white mb-1">{"<2s"}</div>
                                    <div className="text-xs text-white/50 uppercase">Time to First Byte</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="text-3xl font-bold text-white mb-1">14+</div>
                                    <div className="text-xs text-white/50 uppercase">Agri Intents Mapped</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side: Vertical Flow Diagram */}
                        <div className="order-1 lg:order-2 relative">
                            {/* Vertical Line */}
                            <div className="absolute top-8 bottom-8 left-8 w-0.5 bg-gradient-to-b from-blue-500 via-pink-500 to-teal-500 opacity-20" />
                            
                            <div className="flex flex-col gap-4">
                                {voiceSteps.map((step, index) => {
                                    const Icon = step.icon;
                                    return (
                                        <motion.div 
                                            key={step.id}
                                            variants={fadeInUp}
                                            className="relative flex items-center gap-6 p-4 rounded-2xl bg-black border border-white/5 hover:border-white/20 transition-colors group"
                                        >
                                            <div 
                                                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-lg" 
                                                style={{ background: step.color }}
                                            >
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                            
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="text-white font-bold">{step.title}</h4>
                                                    <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded font-mono">{step.latency}</span>
                                                </div>
                                                <p className="text-white/50 text-xs leading-relaxed group-hover:text-white/70 transition-colors">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </motion.div>
            </Container>
        </section>
    );
}
