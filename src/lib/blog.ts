import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BlogPost, BlogPostMeta, BlogCategory } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);
        const stats = readingTime(content);

        return {
            ...(data as Omit<BlogPostMeta, "readingTime">),
            slug,
            draft: data.draft ?? false,
            content,
            readingTime: stats.text,
        };
    } catch {
        return null; // File not found or parse error
    }
}

export function getAllPosts(): BlogPostMeta[] {
    try {
        if (!fs.existsSync(BLOG_DIR)) {
            return [];
        }
        const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
        const now = new Date();
        return files
            .map((filename) => {
                const slug = filename.replace(".mdx", "");
                const post = getPostBySlug(slug);
                if (!post) return null;
                const { content, ...meta } = post;
                return meta;
            })
            .filter((post): post is BlogPostMeta =>
                post !== null &&
                !post.draft &&                              // Exclude drafts
                new Date(post.date) <= now                  // Exclude future-dated (scheduled) posts
            )
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch {
        return [];
    }
}

export function getPostsByCategory(category: BlogCategory): BlogPostMeta[] {
    return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(slug: string, category: BlogCategory, limit = 3): BlogPostMeta[] {
    return getAllPosts()
        .filter((post) => post.slug !== slug && post.category === category)
        .slice(0, limit);
}

export function getFeaturedPost(): BlogPostMeta | undefined {
    const posts = getAllPosts();
    return posts.find((p) => p.featured) || posts[0];
}
