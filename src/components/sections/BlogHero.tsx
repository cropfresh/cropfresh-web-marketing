"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Container } from "@/components/ui/Container";
import { BlogPostMeta, BlogCategory } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

interface BlogHeroProps {
    post: BlogPostMeta;
}

const categoryColors: Record<BlogCategory, { bg: string; text: string; border: string }> = {
    "farming-tips": { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
    "market-insights": { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
    "success-stories": { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
    "news": { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
};

export function BlogHero({ post }: BlogHeroProps) {
    const colors = categoryColors[post.category] || categoryColors["news"];

    return (
        <section className="relative w-full overflow-hidden pt-10 pb-20">
            {/* Ambient background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-green-500/8 to-transparent blur-3xl pointer-events-none" />

            <Container className="max-w-7xl z-10 w-full relative">
                <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative h-[500px] sm:h-[550px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-slate-800">
                            {post.coverImage ? (
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-green-900/40 to-slate-900" />
                            )}
                        </div>

                        {/* Overlay gradient — deeper bottom for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        {/* Featured badge top-left */}
                        <div className="absolute top-6 left-6 z-10">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-sm font-medium text-white shadow-lg"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Featured Article
                            </motion.div>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 flex flex-col justify-end">
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="max-w-3xl"
                            >
                                <motion.div variants={fadeInUp} className="mb-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border} border backdrop-blur-md uppercase tracking-wider`}>
                                        {post.category.replace("-", " ")}
                                    </span>
                                </motion.div>

                                <motion.div variants={fadeInUp}>
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight group-hover:text-green-400 transition-colors duration-300 drop-shadow-lg">
                                        {post.title}
                                    </h1>
                                </motion.div>

                                <motion.p variants={fadeInUp} className="text-white/70 text-base md:text-lg mb-6 line-clamp-2 max-w-2xl font-light leading-relaxed">
                                    {post.excerpt}
                                </motion.p>

                                <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 text-slate-300 text-sm md:text-base">
                                    <div className="flex items-center gap-3 border border-white/10 bg-white/5 rounded-full px-4 py-2 backdrop-blur-md">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-700 ring-2 ring-white/20">
                                            {post.author.avatar && (
                                                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                                            )}
                                        </div>
                                        <p className="font-medium text-white">{post.author.name}</p>
                                    </div>
                                    <span className="hidden md:inline text-slate-600">•</span>
                                    <span className="text-white/60">{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                                    <span className="text-slate-600">•</span>
                                    <span className="flex items-center gap-1.5 text-white/60">
                                        <Clock className="w-4 h-4" />
                                        {post.readingTime}
                                    </span>
                                    <span className="hidden md:inline-flex items-center gap-1.5 text-green-400 font-medium group-hover:gap-3 transition-all duration-300 ml-auto">
                                        Read Article <ArrowRight className="w-4 h-4" />
                                    </span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </Link>
            </Container>
        </section>
    );
}
