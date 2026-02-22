"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  glowColor: string;
}

const stats: Stat[] = [
  {
    value: 500,
    suffix: "+",
    label: "Farmers Onboarded",
    description: "Across Karnataka & surrounding states",
    icon: "👨‍🌾",
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.3)",
  },
  {
    value: 100,
    suffix: "+",
    label: "Active Buyers",
    description: "Hotels, restaurants & retailers",
    icon: "🏪",
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.3)",
  },
  {
    value: 2000,
    suffix: "+",
    label: "Deliveries Completed",
    description: "With 99.2% on-time rate",
    icon: "🚚",
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.3)",
  },
  {
    value: 25,
    suffix: "L+",
    prefix: "₹",
    label: "Farmer Earnings",
    description: "Paid instantly via UPI",
    icon: "💰",
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.3)",
  },
];

function AnimatedCounter({
  stat,
  isInView
}: {
  stat: Stat;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2500;
    const steps = 80;
    const increment = stat.value / steps;
    let current = 0;

    // Easing function for smooth deceleration
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      current = Math.floor(stat.value * easedProgress);
      setCount(current);

      if (progress >= 1) {
        setCount(stat.value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <span className="tabular-nums">
      {stat.prefix || ""}{count.toLocaleString("en-IN")}{stat.suffix}
    </span>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export function ImpactStats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="impact"
      ref={ref}
      className="relative py-24 md:py-32 m-4 md:m-8 rounded-[3rem] overflow-hidden shadow-2xl bg-[var(--color-background-alt)] border border-[var(--glass-border)]"
    >
      {/* Decorative Overlays - Dark Glassmorphism Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary-500)]/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-accent-500)]/10 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-[var(--color-primary-500)]/30 text-[var(--color-primary-500)] text-xs font-bold uppercase tracking-wider mb-6 shadow-[var(--glow-primary)]">
              <span className="w-2 h-2 bg-[var(--color-primary-500)] rounded-full animate-pulse" />
              Our Impact
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--color-text-primary)] leading-tight mb-4 drop-shadow-md">
              Real Numbers,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-accent-400)]">Real Impact</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl mx-auto drop-shadow-sm">
              Every number represents a farmer earning more, a buyer getting quality produce,
              or a hauler finding work.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <div className="glass-card rounded-3xl h-full shadow-[var(--glow-primary)] group-hover:bg-[var(--color-primary-500)]/5 group-hover:border-[var(--color-primary-500)]/30 group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="text-center h-full flex flex-col py-8 px-6 relative z-10">
                    {/* Animated Glow Background */}
                    <div
                      className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 30%, ${stat.glowColor}, transparent 70%)`,
                      }}
                    />

                    {/* Icon with Pulse Effect */}
                    <motion.div
                      className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-5 relative glass border-[var(--color-accent-500)]/30 backdrop-blur-md shadow-inner"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Pulse Ring */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-[var(--color-primary-500)]/30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      />
                      {stat.icon}
                    </motion.div>

                    {/* Animated Number */}
                    <motion.p
                      className="text-4xl md:text-5xl font-display font-bold mb-2 relative z-10 text-[var(--color-text-primary)] drop-shadow-md"
                    >
                      <AnimatedCounter stat={stat} isInView={isInView} />
                    </motion.p>

                    {/* Label */}
                    <h4 className="font-display font-bold text-[var(--color-primary-400)] text-lg mb-2">
                      {stat.label}
                    </h4>

                    {/* Description */}
                    <p className="text-[var(--color-text-secondary)] text-sm mt-auto font-medium leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <p className="text-[var(--color-text-secondary)] font-medium mb-6 text-lg drop-shadow-sm">
              Join the movement that&apos;s transforming Indian agriculture
            </p>
            <motion.div
              className="inline-flex items-center gap-3 px-8 py-4 glass hover:bg-[var(--color-primary-500)]/10 border-[var(--color-primary-500)]/30 shadow-[var(--glow-primary)] rounded-full transition-colors cursor-default"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                className="w-3 h-3 bg-[var(--color-primary-500)] rounded-full shadow-[0_0_10px_var(--color-primary-500)]"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[var(--color-text-primary)] font-display font-bold tracking-wide">
                Growing every day
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
