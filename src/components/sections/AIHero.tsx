"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Mic, Sparkles, ChevronDown } from "lucide-react";

export function AIHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050709]">
      {/* Animated background mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full opacity-10 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #00E676 0%, transparent 60%)",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-10 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #7C3AED 0%, transparent 60%)",
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
      </div>

      {/* Top gradient divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent z-10" />

      <Container className="relative z-10 pt-24 pb-16 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              Live AI — Real Backend, No Sign-up
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            Experience{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              CropFresh AI
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-white/60 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Talk to our AI in{" "}
            <span className="text-white font-semibold">
              Kannada, Hindi, Telugu, Tamil, or English
            </span>{" "}
            — just like a farmer would
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#live-voice"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-base rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all duration-300"
            >
              <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
              🎤 Talk to CropFresh AI
            </a>
            <a
              href="#ai-architecture"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold text-base rounded-2xl transition-all"
            >
              View Architecture
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={fadeInUp}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mt-16"
          >
            <ChevronDown className="w-6 h-6 text-white/20" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
