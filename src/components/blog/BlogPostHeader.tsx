import { BlogPostMeta, BlogCategory } from "@/types/blog";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

const categoryColors: Record<BlogCategory, { bg: string; text: string; border: string }> = {
    "farming-tips": { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
    "market-insights": { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
    "success-stories": { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
    "news": { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
};

export function BlogPostHeader({ post }: { post: BlogPostMeta }) {
    const colors = categoryColors[post.category] || categoryColors["news"];

    return (
        <header className="pt-32 pb-16 bg-slate-900 border-b border-white/10 relative overflow-hidden">
            {/* Abstract Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-slate-900 to-slate-950 pointer-events-none" />

            <Container className="max-w-4xl relative z-10 text-center">
                <div className="mb-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border} border backdrop-blur-md uppercase tracking-wider`}>
                        {post.category.replace("-", " ")}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 text-sm md:text-base">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-700">
                            {post.author.avatar && (
                                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                            )}
                        </div>
                        <span className="font-medium text-white">{post.author.name}</span>
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{post.readingTime}</span>
                </div>
            </Container>

            {/* Cover Image outside container for full-width feel on some layouts, but let's constrain it so it looks like a nice article banner */}
            <Container className="max-w-5xl relative z-10 mt-12">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-800 border border-white/10 shadow-2xl">
                    {post.coverImage ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-900/40 to-slate-900" />
                    )}
                </div>
            </Container>
        </header>
    );
}
