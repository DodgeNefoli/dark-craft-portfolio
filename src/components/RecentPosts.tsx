import { Link } from "react-router-dom";
import { allPosts } from "@/lib/content";

const RecentPosts = () => {
  const recent = allPosts.slice(0, 4);

  return (
    <div className="animate-fade-up animate-fade-up-delay-3 mt-14 w-full max-w-2xl mx-auto">
      <h2 className="mb-4 font-mono text-xs text-muted-foreground uppercase tracking-widest">
        Recent Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {recent.map((post) => (
          <Link
            key={post.slug}
            to={`/${post.category === "note" ? "notes" : "writeups"}/${post.slug}`}
            className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-ring"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="min-w-0">
              <p className="font-medium text-sm text-foreground group-hover:text-accent-foreground truncate">
                {post.title}
              </p>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                {post.date} · {post.readTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/notes"
          className="rounded-md border border-border bg-secondary px-5 py-2 font-mono text-xs text-secondary-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
        >
          Read my notes
        </Link>
        <Link
          to="/writeups"
          className="rounded-md border border-border bg-secondary px-5 py-2 font-mono text-xs text-secondary-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
        >
          Read my writeups
        </Link>
      </div>
    </div>
  );
};

export default RecentPosts;
