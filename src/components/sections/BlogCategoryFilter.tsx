"use client";

import { BlogCategory } from "@/types/blog";

interface BlogCategoryFilterProps {
    categories: (BlogCategory | "all")[];
    selectedCategory: BlogCategory | "all";
    onSelectCategory: (category: BlogCategory | "all") => void;
}

export function BlogCategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
}: BlogCategoryFilterProps) {
    return (
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap gap-2 hide-scrollbar">
            {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${isSelected
                                ? "bg-green-500/20 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                            } backdrop-blur-md`}
                    >
                        {category === "all" ? "All Posts" : category.replace("-", " ")}
                    </button>
                );
            })}
        </div>
    );
}
