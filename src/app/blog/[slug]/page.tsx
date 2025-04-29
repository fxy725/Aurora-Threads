import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";


async function getPost(slug: string) {
  const postPath = path.join(process.cwd(), "src/content/posts", `${slug}.md`);
  if (!fs.existsSync(postPath)) return null;
  const raw = fs.readFileSync(postPath, "utf-8");
  const { data, content } = matter(raw);
  // Markdown to HTML
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkPrism)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);
  return {
    meta: {
      title: data.title || "无标题",
      date: data.date || "",
      tags: data.tags || [],
      category: data.category || "",
      summary: data.summary || "",
    },
    html: String(file),
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "未找到文章" };
  return { title: post.meta.title };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {

  const post = await getPost(params.slug);
  if (!post) return notFound();
  const { meta, html } = post;
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Link href="/blog" className="text-cyan-600 hover:underline text-sm mb-6 inline-block">← 返回列表</Link>
      <h1 className="text-3xl font-bold mb-2">{meta.title}</h1>
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <span>{new Date(meta.date).toLocaleDateString()}</span>
        {meta.category && <span className="px-2 py-0.5 bg-indigo-50 text-indigo-500 rounded ml-2">{meta.category}</span>}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {meta.tags.map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded text-xs">#{tag}</span>
        ))}
      </div>
      <article className="prose prose-zinc max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
