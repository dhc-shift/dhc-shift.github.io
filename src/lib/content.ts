import fs from "fs";
import path from "path";

export type FrontmatterValue = string | string[] | number | boolean;
export type FrontmatterData = Record<string, FrontmatterValue>;

export interface ContentDocument {
  slug: string;
  data: FrontmatterData;
  content: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "src/content");

export function parseFrontmatter(raw: string): { data: FrontmatterData; content: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);

  if (!match) {
    return { data: {}, content: raw };
  }

  return {
    data: parseFrontmatterBlock(match[1]),
    content: raw.slice(match[0].length),
  };
}

export function readContentFile(relativePath: string): ContentDocument {
  const filePath = path.join(CONTENT_ROOT, relativePath);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);

  return {
    slug: path.basename(relativePath).replace(/\.(mdx|md)$/, ""),
    data,
    content,
  };
}

export function readContentCollection(relativeDir: string): ContentDocument[] {
  const dirPath = path.join(CONTENT_ROOT, relativeDir);

  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath)
    .filter((filename) => filename.endsWith(".mdx") || filename.endsWith(".md"))
    .map((filename) => readContentFile(path.join(relativeDir, filename)))
    .sort((a, b) => {
      const orderA = getNumberValue(a.data, "order", Number.MAX_SAFE_INTEGER);
      const orderB = getNumberValue(b.data, "order", Number.MAX_SAFE_INTEGER);

      if (orderA !== orderB) return orderA - orderB;
      return a.slug.localeCompare(b.slug);
    });
}

export function getStringValue(data: FrontmatterData, key: string, fallback = ""): string {
  const value = data[key];
  return typeof value === "string" ? value : fallback;
}

export function getStringArrayValue(data: FrontmatterData, key: string): string[] {
  const value = data[key];
  return Array.isArray(value) ? value : [];
}

export function getNumberValue(data: FrontmatterData, key: string, fallback = 0): number {
  const value = data[key];
  return typeof value === "number" ? value : fallback;
}

export function getBooleanValue(data: FrontmatterData, key: string, fallback = false): boolean {
  const value = data[key];
  return typeof value === "boolean" ? value : fallback;
}

function parseFrontmatterBlock(block: string): FrontmatterData {
  const trimmed = block.trim();
  if (!trimmed) return {};

  if (trimmed.startsWith("{")) {
    return JSON.parse(trimmed) as FrontmatterData;
  }

  const data: FrontmatterData = {};

  for (const line of block.split(/\r?\n/)) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith("#")) continue;

    const separator = trimmedLine.indexOf(":");
    if (separator === -1) continue;

    const key = trimmedLine.slice(0, separator).trim();
    const value = trimmedLine.slice(separator + 1).trim();

    if (!key) continue;
    data[key] = parseFrontmatterValue(value);
  }

  return data;
}

function parseFrontmatterValue(value: string): FrontmatterValue {
  if (!value) return "";

  if (value === "true") return true;
  if (value === "false") return false;

  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    try {
      return JSON.parse(value) as string[];
    } catch {
      return value
        .slice(1, -1)
        .split(",")
        .map((item) => stripQuotes(item.trim()))
        .filter(Boolean);
    }
  }

  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value) as string;
    } catch {
      return stripQuotes(value);
    }
  }

  return stripQuotes(value);
}

function stripQuotes(value: string): string {
  return value.replace(/^["']|["']$/g, "");
}
