"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { 
    Layers, Cpu, Database, Activity, Code2, Cloud, Brain, Sparkles, Server, ScanLine, Eye
} from "lucide-react";

const techStack = [
    {
        category: "Frontend Layer",
        icon: Layers,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        items: [
            { name: "Next.js 14", desc: "App Router & SSR" },
            { name: "React 18", desc: "Concurrent Mode" },
            { name: "Tailwind CSS", desc: "Utility First Styling" },
            { name: "Framer Motion", desc: "Complex Sequences" }
        ]
    },
    {
        category: "AI & Voice Intelligence",
        icon: Brain,
        color: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
        items: [
            { name: "LangGraph", desc: "Multi-Agent Orchestration" },
            { name: "Pipecat", desc: "Real-time Voice/WebRTC" },
            { name: "IndicWhisper", desc: "Regional STT" },
            { name: "Edge-TTS", desc: "Low-latency Voice Synth" }
        ]
    },
    {
        category: "Computer Vision",
        icon: Eye,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        items: [
            { name: "YOLOv26", desc: "Edge Defect Detection" },
            { name: "DINOv2 (ViT)", desc: "Holistic Quality Grading" },
            { name: "ResNet50", desc: "Fraud Twin Embeddings" },
            { name: "ONNX Runtime", desc: "In-browser Execution" }
        ]
    },
    {
        category: "Backend & Data",
        icon: Server,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        items: [
            { name: "FastAPI", desc: "Async Python API" },
            { name: "Supabase / RDS", desc: "PostgreSQL Database" },
            { name: "Pinecone", desc: "Vector Search / RAG" },
            { name: "Redis", desc: "Caching & Pub/Sub" }
        ]
    }
];

export function AITechStack() {
    return (
        <section className="relative py-24 md:py-32 bg-black overflow-hidden border-t border-white/5">
            <Container className="relative z-10">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                    
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
                            <Code2 className="w-3.5 h-3.5" />
                            The Machine Room
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">
                            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Next-Gen Open Source</span>
                        </h2>
                        <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
                            We don't rely on brittle wrappers. The CropFresh platform is built on enterprise-grade, battle-tested open source frameworks deployed at the edge.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {techStack.map((stack, idx) => {
                            const Icon = stack.icon;
                            return (
                                <motion.div 
                                    key={idx}
                                    variants={fadeInUp}
                                    className="p-6 rounded-3xl bg-[#0A0D14] border border-white/10 hover:border-white/20 transition-all group"
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 \${stack.bg} \${stack.border}`}>
                                        <Icon className={`w-6 h-6 \${stack.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{stack.category}</h3>
                                    
                                    <div className="flex flex-col gap-3">
                                        {stack.items.map((item, i) => (
                                            <div key={i} className="flex flex-col">
                                                <span className="text-white text-sm font-semibold">{item.name}</span>
                                                <span className="text-white/40 text-[11px] uppercase tracking-wider">{item.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                </motion.div>
            </Container>
        </section>
    );
}
