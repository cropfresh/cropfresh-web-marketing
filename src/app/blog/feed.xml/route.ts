import { getAllPosts } from "@/lib/blog";

export async function GET() {
    const posts = getAllPosts().slice(0, 20);
    const siteUrl = "https://cropfresh.in";

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CropFresh Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Agricultural insights, farming tips, and success stories from CropFresh</description>
    <language>en</language>
    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      <guid>${siteUrl}/blog/${post.slug}</guid>
    </item>`).join("")}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
    });
}
