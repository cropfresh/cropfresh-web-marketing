"use client";

import { Search } from "lucide-react";

interface BlogSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function BlogSearch({ value, onChange }: BlogSearchProps) {
    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-slate-800/50 text-slate-100 placeholder-slate-400 focus:outline-none focus:bg-slate-800 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm backdrop-blur-md transition-all duration-200"
                placeholder="Search articles..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
