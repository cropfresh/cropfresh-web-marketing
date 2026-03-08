"use client";

import { useState } from "react";
import { Copy, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface ShareButtonsProps {
    slug: string;
    title: string;
}

export function ShareButtons({ slug, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    // Real URL would be window.location.origin
    // Hardcoded for demo
    const shareUrl = `https://cropfresh.in/blog/${slug}`;

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} \n\n${shareUrl}`)}`,
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    return (
        <Container className="max-w-4xl py-8 border-y border-white/10 my-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <h3 className="text-xl font-semibold text-white">Share this article</h3>

            <div className="flex items-center gap-3">
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 rounded-full text-slate-300 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-all duration-300 backdrop-blur-md"
                    aria-label="Share on X (Twitter)"
                >
                    <Twitter className="w-5 h-5" />
                </a>
                <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 rounded-full text-slate-300 hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all duration-300 backdrop-blur-md"
                    aria-label="Share on LinkedIn"
                >
                    <Linkedin className="w-5 h-5" />
                </a>
                <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 rounded-full text-slate-300 hover:bg-[#25D366]/20 hover:text-[#25D366] hover:border-[#25D366]/50 transition-all duration-300 backdrop-blur-md"
                    aria-label="Share on WhatsApp"
                >
                    <MessageCircle className="w-5 h-5" />
                </a>
                <button
                    onClick={copyLink}
                    className={`px-4 py-2 flex items-center gap-2 rounded-full border transition-all duration-300 backdrop-blur-md font-medium text-sm ${copied
                        ? "bg-green-500/20 border-green-500/50 text-green-400"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                        }`}
                >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy Link"}
                </button>
            </div>
        </Container>
    );
}
