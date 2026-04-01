import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPost } from "@/lib/content";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import DocLayout from "@/components/DocLayout";
import TableOfContents from "@/components/TableOfContents";
import WriteupsSidebar from "@/components/WriteupsSidebar";

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
      <div className="relative z-10 pt-32">
        <DocLayout
          title={`${post.icon} ${post.title}`}
          description={post.description}
          sidebar={<WriteupsSidebar />}
          toc={<TableOfContents contentSelector=".doc-content" />}
        >
          <Link
            to={`/${category}`}
            className="mb-8 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            ← back
          </Link>

          <div className="mb-8 flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span className="rounded border border-border bg-secondary px-2 py-0.5">
              {post.category}
            </span>
          </div>

          <div className="prose-custom">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </DocLayout>
      </div>
    </div>
  );
}

export default PostPage;
