import { Link } from "react-router-dom";
import { allPosts } from "@/lib/content";
import RecentPosts from "./RecentPosts";

const HeroSection = () => {
  const latestNotes = allPosts.slice(0, 4);

  return (
    <section className="hero-gradient relative flex min-h-screen items-center justify-center px-6">
      <div className="hero-name-glow absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="hero-glow-orb" />
      </div>
      <div className="relative z-10 text-center w-full flex flex-col items-center">
        <h1 className="animate-fade-up text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          Dodge Nefoli
        </h1>
        <p className="animate-fade-up animate-fade-up-delay-1 mt-4 text-lg text-muted-foreground">
          Security Researcher · Penetration Tester · CTF Player · Developer
        </p>

        <div className="animate-fade-up animate-fade-up-delay-2 mt-12 flex flex-wrap items-center justify-center gap-3">
          {latestNotes.map((post) => (
            <Link
              key={post.slug}
              to={`/${post.category === "note" ? "notes" : "writeups"}/${post.slug}`}
              className="rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-secondary-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
            >
              {post.title}
            </Link>
          ))}
        </div>

        <div className="animate-fade-up animate-fade-up-delay-3 mt-10 light-only">
          <div className="quote-container relative inline-block max-w-2xl rounded-2xl border border-border/50 bg-muted/40 px-8 py-6 backdrop-blur-sm">
            <div className="quote-glow absolute inset-0 -m-2 rounded-2xl" aria-hidden="true" />
            <p className="relative text-lg sm:text-xl italic text-muted-foreground font-light tracking-wide leading-relaxed">
              "Sometimes you must bring things into the light to understand how they break in the dark."
            </p>
          </div>
        </div>

        <RecentPosts />
      </div>
    </section>
  );
};

export default HeroSection;
