import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ActivityMeta {
  slug: string;
  title: string;
  date: string;
  category: "스터디" | "세미나" | "프로젝트" | "행사";
  summary: string;
  tags?: string[];
  thumbnail?: string;
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/activities");

export function getAllActivities(): ActivityMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return {
        slug: filename.replace(/\.(mdx|md)$/, ""),
        title: data.title ?? "",
        date: data.date ?? "",
        category: data.category ?? "행사",
        summary: data.summary ?? "",
        tags: data.tags ?? [],
        thumbnail: data.thumbnail,
      } as ActivityMeta;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getActivityBySlug(slug: string): { meta: ActivityMeta; content: string } | null {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      category: data.category ?? "행사",
      summary: data.summary ?? "",
      tags: data.tags ?? [],
      thumbnail: data.thumbnail,
    },
    content,
  };
}
