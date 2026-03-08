import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { mdxComponents } from "@/components/blog/mdx-components";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

// Pre-generate all post pages at build time
export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const related = getRelatedPosts(slug, post.category);

    // Schema.org Article JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: `https://cropfresh.in${post.coverImage}`,
        datePublished: post.date,
        author: {
            "@type": "Person",
            name: post.author.name,
        },
        publisher: {
            "@type": "Organization",
            name: "CropFresh",
            logo: {
                "@type": "ImageObject",
                url: "https://cropfresh.in/logo.png",
            },
        },
    };

    return (
        <article className="pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogPostHeader post={post} />
            <BlogPostContent>
                <MDXRemote source={post.content} components={mdxComponents} />
            </BlogPostContent>
            <div className="flex justify-center w-full">
                <ShareButtons slug={slug} title={post.title} />
            </div>
            <AuthorBio author={post.author} />
            <RelatedPosts posts={related} />
        </article>
    );
}
