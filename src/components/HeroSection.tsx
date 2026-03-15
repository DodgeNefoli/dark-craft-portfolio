const latestNotes = [
  { title: "XSS in Modern Frameworks", href: "#" },
  { title: "DNS Rebinding Attack", href: "#" },
  { title: "JWT Misconfiguration", href: "#" },
  { title: "OAuth Token Leaks", href: "#" },
];

const HeroSection = () => {
  return (
    <section className="hero-gradient relative flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="animate-fade-up text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          Your Name
        </h1>
        <p className="animate-fade-up animate-fade-up-delay-1 mt-4 text-lg text-muted-foreground">
          Security Researcher · Penetration Tester · CTF Player
        </p>

        <div className="animate-fade-up animate-fade-up-delay-2 mt-12 flex flex-wrap items-center justify-center gap-3">
          {latestNotes.map((note) => (
            <a
              key={note.title}
              href={note.href}
              className="rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-secondary-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
            >
              {note.title}
            </a>
          ))}
        </div>

        <p className="animate-fade-up animate-fade-up-delay-3 mt-10 hidden text-sm italic text-muted-foreground light-only">
          "Sometimes you must bring things into the light to understand how they break in the dark."
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
