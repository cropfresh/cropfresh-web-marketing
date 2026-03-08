"use client";

import { BlogPostMeta } from "@/types/blog";
import { BlogPostCard } from "@/components/sections/BlogPostCard";
import { Container } from "@/components/ui/Container";

interface RelatedPostsProps {
    posts: BlogPostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-24 bg-slate-900/80 border-t border-white/5 relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
            <Container className="max-w-7xl">
                <h2 className="text-3xl font-bold text-white mb-12 text-center md:text-left">
                    Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <BlogPostCard key={post.slug} post={post} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
