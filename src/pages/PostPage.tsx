import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPost } from "@/lib/content";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";

const PostPage = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const post = category && slug ? getPost(category, slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <AnimatedBackground />
        <Navbar />
        <div className="section-container pt-32 text-center">
          <p className="text-muted-foreground">Post not found.</p>
          <Link to="/" className="mt-4 inline-block text-sm text-foreground underline">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Navbar />
      <article className="section-container pt-32">
        <Link
          to="/"
          className="mb-8 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          ← back
        </Link>

        <header className="mb-10">
          <span className="text-3xl">{post.icon}</span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-3 flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span className="rounded border border-border bg-secondary px-2 py-0.5">
              {post.category}
            </span>
          </div>
          {post.description && (
            <p className="mt-4 text-base text-muted-foreground">{post.description}</p>
          )}
        </header>

        <div className="prose-custom">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default PostPage;
