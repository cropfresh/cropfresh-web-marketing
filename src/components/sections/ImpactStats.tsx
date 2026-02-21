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
    color: "var(--color-primary-500)",
    glowColor: "rgba(0, 230, 118, 0.3)",
  },
  {
    value: 100,
    suffix: "+",
    label: "Active Buyers",
    description: "Hotels, restaurants & retailers",
    icon: "🏪",
    color: "var(--color-accent-500)",
    glowColor: "rgba(247, 147, 30, 0.3)",
  },
  {
    value: 2000,
    suffix: "+",
    label: "Deliveries Completed",
    description: "With 99.2% on-time rate",
    icon: "🚚",
    color: "var(--color-teal)",
    glowColor: "rgba(0, 217, 255, 0.3)",
  },
  {
    value: 25,
    suffix: "L+",
    prefix: "₹",
    label: "Farmer Earnings",
    description: "Paid instantly via UPI",
    icon: "💰",
    color: "var(--color-success)",
    glowColor: "rgba(16, 185, 129, 0.3)",
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
      className="section section-gradient relative overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div className="glow-orb glow-orb-primary w-[500px] h-[500px] top-0 left-1/4 opacity-10" />
      <div className="glow-orb glow-orb-accent w-[400px] h-[400px] bottom-0 right-1/4 opacity-10" />
      <div className="glow-orb glow-orb-teal w-[300px] h-[300px] top-1/2 -right-32 opacity-10" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="section-header">
            <span className="section-eyebrow">
              <span className="w-2 h-2 bg-[var(--color-success)] rounded-full animate-pulse" />
              Our Impact
            </span>
            <h2 className="heading-section mb-4">
              Real Numbers,{" "}
              <span className="text-gradient-accent text-glow-accent">Real Impact</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-large">
              Every number represents a farmer earning more, a buyer getting quality produce,
              or a hauler finding work.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
                <div className="glass-premium h-full">
                  <div className="glass-premium-inner text-center h-full flex flex-col py-8 px-6">
                    {/* Animated Glow Background */}
                    <div
                      className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 30%, ${stat.glowColor}, transparent 70%)`,
                      }}
                    />

                    {/* Icon with Pulse Effect */}
                    <motion.div
                      className="w-18 h-18 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-5 relative"
                      style={{
                        background: `linear-gradient(135deg, ${stat.glowColor}, transparent)`,
                        border: `1px solid ${stat.color}30`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Pulse Ring */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{ border: `2px solid ${stat.color}` }}
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
                      className="text-4xl md:text-5xl font-display font-bold mb-2 relative z-10"
                      style={{
                        color: stat.color,
                        textShadow: `0 0 40px ${stat.glowColor}`,
                      }}
                    >
                      <AnimatedCounter stat={stat} isInView={isInView} />
                    </motion.p>

                    {/* Label */}
                    <h4 className="font-display font-semibold text-[var(--color-text-primary)] text-lg mb-2">
                      {stat.label}
                    </h4>

                    {/* Description */}
                    <p className="text-[var(--color-text-muted)] text-sm mt-auto">
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
            <p className="text-[var(--color-text-secondary)] mb-4 text-lg">
              Join the movement that&apos;s transforming Indian agriculture
            </p>
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 glass-accent rounded-full"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                className="w-3 h-3 bg-[var(--color-success)] rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[var(--color-primary-400)] font-display font-semibold">
                Growing every day
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
