"use client";

import { BlogPostMeta, BlogCategory } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowUpRight } from "lucide-react";

interface BlogPostCardProps {
    post: BlogPostMeta;
}

const categoryColors: Record<BlogCategory, { bg: string; text: string; border: string }> = {
    "farming-tips": { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
    "market-insights": { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
    "success-stories": { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
    "news": { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
};

export function BlogPostCard({ post }: BlogPostCardProps) {
    const colors = categoryColors[post.category] || categoryColors["news"];

    return (
        <Link href={`/blog/${post.slug}`} className="group h-full flex flex-col">
            <div className="relative bg-[#0A0D14]/60 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-green-500/20 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] h-full flex flex-col">
                {/* Image Container */}
                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-slate-800">
                    {post.coverImage ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
                    )}
                    {/* Subtle gradient on image bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A0D14] to-transparent pointer-events-none" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border} border backdrop-blur-xl uppercase tracking-wider shadow-lg`}>
                            {post.category.replace("-", " ")}
                        </span>
                    </div>

                    {/* Arrow icon on hover */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center">
                            <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2.5 text-sm text-slate-500 mb-3">
                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readingTime}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors duration-300 leading-snug">
                        {post.title}
                    </h3>

                    <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed font-light">
                        {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-700 ring-2 ring-white/10">
                                {post.author.avatar && (
                                    <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                                )}
                            </div>
                            <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                                {post.author.name}
                            </p>
                        </div>
                        <span className="text-xs text-green-400/70 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Read →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
