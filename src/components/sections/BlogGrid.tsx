"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Container } from "@/components/ui/Container";
import { BlogPostMeta, BlogCategory } from "@/types/blog";
import { BlogPostCard } from "./BlogPostCard";
import { BlogSearch } from "./BlogSearch";
import { BlogCategoryFilter } from "./BlogCategoryFilter";
import { BookOpen } from "lucide-react";

interface BlogGridProps {
    initialPosts: BlogPostMeta[];
}

const POSTS_PER_PAGE = 9;

export function BlogGrid({ initialPosts }: BlogGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all");
    const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);

    const filteredPosts = useMemo(() => {
        return initialPosts.filter((post) => {
            const matchesSearch =
                searchQuery === "" ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                selectedCategory === "all" || post.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [initialPosts, searchQuery, selectedCategory]);

    const currentPosts = filteredPosts.slice(0, visiblePosts);
    const hasMorePosts = visiblePosts < filteredPosts.length;

    const loadMore = () => {
        setVisiblePosts((prev) => prev + POSTS_PER_PAGE);
    };

    const uniqueCategories: (BlogCategory | "all")[] = ["all", "farming-tips", "market-insights", "success-stories", "news"];

    return (
        <section className="py-20 bg-slate-900/50 min-h-[60vh] border-t border-white/5">
            <Container>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-green-400" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                            All Articles
                        </h2>
                    </div>
                    <p className="text-white/50 text-base max-w-xl font-light">
                        Insights on agricultural technology, farming best practices, and success stories.
                    </p>
                </motion.div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                    <BlogCategoryFilter
                        categories={uniqueCategories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={(cat) => {
                            setSelectedCategory(cat);
                            setVisiblePosts(POSTS_PER_PAGE);
                        }}
                    />
                    <div className="w-full md:w-auto flex-shrink-0">
                        <BlogSearch value={searchQuery} onChange={(v) => {
                            setSearchQuery(v);
                            setVisiblePosts(POSTS_PER_PAGE);
                        }} />
                    </div>
                </div>

                {/* Results count */}
                <div className="mb-8">
                    <p className="text-sm text-white/40">
                        Showing {currentPosts.length} of {filteredPosts.length} articles
                    </p>
                </div>

                {/* Results */}
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-white/30" />
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-300 mb-2">No posts found</h3>
                        <p className="text-slate-500 mb-6">We couldn&apos;t find any articles matching your criteria.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                            className="px-6 py-2.5 bg-green-500/20 text-green-400 border border-green-500/30 font-medium rounded-full hover:bg-green-500/30 transition-colors"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {currentPosts.map((post) => (
                                    <motion.div
                                        key={post.slug}
                                        variants={fadeInUp}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <BlogPostCard post={post} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {hasMorePosts && (
                            <div className="mt-16 text-center">
                                <button
                                    onClick={loadMore}
                                    className="group px-8 py-3.5 bg-white/5 text-slate-300 font-medium rounded-full border border-white/10 hover:bg-white/10 hover:text-white hover:border-green-500/30 transition-all duration-300 backdrop-blur-md inline-flex items-center gap-2"
                                >
                                    Load More Articles
                                    <span className="text-xs text-white/40 group-hover:text-green-400 transition-colors">
                                        ({filteredPosts.length - visiblePosts} remaining)
                                    </span>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </section>
    );
}
