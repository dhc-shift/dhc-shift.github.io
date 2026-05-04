import {
  getStringArrayValue,
  getStringValue,
  readContentCollection,
  readContentFile,
} from "@/lib/content";

export interface ActivityMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  tags?: string[];
  thumbnail?: string;
}

export function getAllActivities(): ActivityMeta[] {
  return readContentCollection("activities")
    .map(({ slug, data }) => {
      return {
        slug,
        title: getStringValue(data, "title"),
        date: getStringValue(data, "date"),
        category: getStringValue(data, "category"),
        summary: getStringValue(data, "summary"),
        tags: getStringArrayValue(data, "tags"),
        thumbnail: getStringValue(data, "thumbnail"),
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getActivityBySlug(slug: string): { meta: ActivityMeta; content: string } | null {
  let document;

  try {
    document = readContentFile(`activities/${slug}.mdx`);
  } catch {
    try {
      document = readContentFile(`activities/${slug}.md`);
    } catch {
      return null;
    }
  }

  const { data, content } = document;

  return {
    meta: {
      slug,
      title: getStringValue(data, "title"),
      date: getStringValue(data, "date"),
      category: getStringValue(data, "category"),
      summary: getStringValue(data, "summary"),
      tags: getStringArrayValue(data, "tags"),
      thumbnail: getStringValue(data, "thumbnail"),
    },
    content,
  };
}
