import fs from "fs";
import path from "path";

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

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
  if (!raw.startsWith("---")) return { data: {}, content: raw };

  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: raw };

  const frontmatter = raw.slice(3, end).trim();
  const content = raw.slice(end + 4).replace(/^\r?\n/, "");
  const data: Record<string, string | string[]> = {};

  for (const line of frontmatter.split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!key) continue;

    data[key] = parseFrontmatterValue(value);
  }

  return { data, content };
}

function parseFrontmatterValue(value: string): string | string[] {
  const unquote = (item: string) => item.trim().replace(/^["']|["']$/g, "");

  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map(unquote)
      .filter(Boolean);
  }

  return unquote(value);
}

function getString(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

function getTags(value: string | string[] | undefined): string[] {
  return Array.isArray(value) ? value : [];
}

export function getAllActivities(): ActivityMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = parseFrontmatter(raw);
      return {
        slug: filename.replace(/\.(mdx|md)$/, ""),
        title: getString(data.title),
        date: getString(data.date),
        category: getString(data.category) || "행사",
        summary: getString(data.summary),
        tags: getTags(data.tags),
        thumbnail: getString(data.thumbnail),
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
  const { data, content } = parseFrontmatter(raw);

  return {
    meta: {
      slug,
      title: getString(data.title),
      date: getString(data.date),
      category: getString(data.category) || "행사",
      summary: getString(data.summary),
      tags: getTags(data.tags),
      thumbnail: getString(data.thumbnail),
    },
    content,
  };
}
