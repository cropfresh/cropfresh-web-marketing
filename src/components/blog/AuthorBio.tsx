"use client";

import { Author } from "@/types/blog";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

interface AuthorBioProps {
    author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
    return (
        <Container className="max-w-4xl pb-24">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-start gap-8 relative overflow-hidden group hover:border-green-500/30 transition-colors duration-500">

                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />

                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 border-2 border-slate-700 bg-slate-800 shadow-xl">
                    {author.avatar && (
                        <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                    )}
                </div>

                <div className="text-center sm:text-left flex-grow">
                    <p className="text-green-400 font-semibold text-sm tracking-wide uppercase mb-2">WRITTEN BY</p>
                    <h3 className="text-2xl font-bold text-white mb-2">{author.name}</h3>
                    <p className="text-slate-400 font-medium mb-4">{author.title}</p>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                        {author.bio}
                    </p>
                </div>
            </div>
        </Container>
    );
}
