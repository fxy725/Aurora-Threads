import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

interface PostMeta {
  title: string;
  date: string;
  tags: string[];
  category?: string;
  summary?: string;
  slug: string;
}

function getPosts(): PostMeta[] {
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
        tags: data.tags || [],
        category: data.category || "",
        summary: data.summary || "",
        slug: file.replace(/\.md$/, ""),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function BlogList() {
  const posts = getPosts();
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">博客文章</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <div className="bg-white/90 rounded-xl shadow-lg hover:shadow-2xl transition p-6 cursor-pointer flex flex-col gap-3 border border-gray-100 hover:border-cyan-300">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                {post.category && <span className="px-2 py-0.5 bg-indigo-50 text-indigo-500 rounded ml-2">{post.category}</span>}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{post.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">{post.summary}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded text-xs">#{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
