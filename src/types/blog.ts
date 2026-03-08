export type BlogCategory = "farming-tips" | "market-insights" | "success-stories" | "news";

export interface Author {
  name: string;
  avatar: string;
  title: string;
  bio: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  draft: boolean;
  author: Author;
  category: BlogCategory;
  excerpt: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
