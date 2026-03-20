const AboutSection = () => {
  return (
    <section className="section-container">
      <div className="animate-fade-up">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          About
        </p>
        <div className="max-w-2xl space-y-4 text-base leading-relaxed text-secondary-foreground">
          <p>
            I'm Sushant Bhusal security researcher focused on web application security, penetration testing,
            and vulnerability research. I spend most of my time breaking things to understand
            how they work — and how they fail.
          </p>
          <p>
            My interests span offensive security, reverse engineering, and open-source
            intelligence. When I'm not hunting bugs, I write about security concepts
            and share notes from CTF competitions.
          </p>
          <p>
            I believe in learning in public, building useful tools, and contributing to
            the security community through research and knowledge sharing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
