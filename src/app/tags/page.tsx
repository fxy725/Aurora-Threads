import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

function getAllTags() {
  const postsDir = path.join(process.cwd(), "src/content/posts");
  const files = fs.readdirSync(postsDir);
  const tagMap: Record<string, number> = {};
  files.forEach((file) => {
    if (!file.endsWith(".md")) return;
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data } = matter(raw);
    const tags: string[] = data.tags || [];
    tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  });
  return Object.entries(tagMap).sort((a, b) => b[1] - a[1]);
}

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">全部标签</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {tags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="px-3 py-1 rounded bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-100 text-base"
          >
            #{tag} <span className="text-xs text-gray-500 ml-1">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
