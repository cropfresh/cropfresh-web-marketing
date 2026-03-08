import { getAllPosts, getFeaturedPost } from "@/lib/blog";
import { BlogHero } from "@/components/sections/BlogHero";
import { BlogGrid } from "@/components/sections/BlogGrid";

export default function BlogListingPage() {
    const posts = getAllPosts();
    const featuredPost = getFeaturedPost() || posts[0];

    // Exclude featured post from the grid if we want to show it only in hero
    const remainingPosts = featuredPost
        ? posts.filter(p => p.slug !== featuredPost.slug)
        : posts;

    return (
        <main className="pt-20">
            {featuredPost && <BlogHero post={featuredPost} />}
            <BlogGrid initialPosts={remainingPosts} />
        </main>
    );
}
