import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

interface PostMeta {
  title: string;
  date: string;
  slug: string;
}

function getAllPosts(): PostMeta[] {
  const postsDir = path.join(process.cwd(), "src/content/posts");
  const files = fs.readdirSync(postsDir);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return {
        title: data.title || "无标题",
        date: data.date || "",
        slug: file.replace(/\.md$/, ""),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function groupByYear(posts: PostMeta[]) {
  return posts.reduce((acc, post) => {
    const year = post.date?.slice(0, 4) || "未知";
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, PostMeta[]>);
}

export default function ArchivePage() {
  const posts = getAllPosts();
  const grouped = groupByYear(posts);
  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">文章归档</h1>
      <div className="space-y-8">
        {years.map((year) => (
          <div key={year}>
            <h2 className="text-xl font-semibold mb-3 text-cyan-700">{year}</h2>
            <ul className="space-y-2">
              {grouped[year].map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline text-gray-800"
                  >
                    {post.title}
                  </Link>
                  <span className="text-xs text-gray-400 ml-2">{post.date}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
