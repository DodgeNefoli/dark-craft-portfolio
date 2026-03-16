export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: "note" | "writeup";
  description: string;
  icon: string;
  coverImage: string;
  content: string;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      meta[key] = val;
    }
  });

  return { meta, content: match[2].trim() };
}

// Use import.meta.glob to load all markdown files at build time
const noteFiles = import.meta.glob("/src/content/notes/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const writeupFiles = import.meta.glob("/src/content/writeups/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

function fileToPost(path: string, raw: string): Post {
  const { meta, content } = parseFrontmatter(raw);
  const slug = path.split("/").pop()!.replace(".md", "");
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    readTime: meta.readTime || "",
    category: (meta.category as "note" | "writeup") || "note",
    description: meta.description || "",
    icon: meta.icon || "📄",
    coverImage: meta.coverImage || "",
    content,
  };
}

function loadPosts(files: Record<string, string>): Post[] {
  return Object.entries(files)
    .map(([path, raw]) => fileToPost(path, raw))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const notes: Post[] = loadPosts(noteFiles);
export const writeups: Post[] = loadPosts(writeupFiles);
export const allPosts: Post[] = [...notes, ...writeups].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function getPost(category: string, slug: string): Post | undefined {
  const posts = category === "notes" ? notes : writeups;
  return posts.find((p) => p.slug === slug);
}
