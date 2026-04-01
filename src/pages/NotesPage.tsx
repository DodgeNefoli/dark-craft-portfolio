import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { notes } from "@/lib/content";

const NotesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-20">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Notes</h1>
        <p className="mt-2 text-sm text-muted-foreground font-mono">Quick technical notes & references</p>
        <div className="mt-10 space-y-4">
          {notes.map((post) => (
            <Link
              key={post.slug}
              to={`/notes/${post.slug}`}
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
          {notes.length === 0 && (
            <p className="text-sm text-muted-foreground">Dropping Notes Soon!</p>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="text-sm font-mono text-muted-foreground transition hover:text-foreground hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotesPage;
