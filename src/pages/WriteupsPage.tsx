import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { writeups } from "@/lib/content";

const WriteupsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-20">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Writeups</h1>
        <p className="mt-2 text-sm text-muted-foreground font-mono">In-depth security research & CTF writeups</p>
        <div className="mt-10 space-y-4">
          {writeups.map((post) => (
            <Link
              key={post.slug}
              to={`/writeups/${post.slug}`}
              className="group flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:border-ring"
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{post.icon}</span>
              <div className="min-w-0">
                <p className="font-medium text-foreground group-hover:text-accent-foreground">{post.title}</p>
                {post.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                )}
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                  {post.date} · {post.readTime}
                </p>
              </div>
            </Link>
          ))}
          {writeups.length === 0 && (
            <p className="text-sm text-muted-foreground">Dropping Writeups Soon!</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default WriteupsPage;
