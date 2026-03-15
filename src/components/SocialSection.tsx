const socials = [
  { label: "Email", href: "mailto:you@example.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "Discord", href: "#" },
  { label: "Hack The Box", href: "https://hackthebox.com" },
  { label: "TryHackMe", href: "https://tryhackme.com" },
  { label: "CTFtime", href: "https://ctftime.org" },
  { label: "PentesterLab", href: "https://pentesterlab.com" },
];

const SocialSection = () => {
  return (
    <section className="section-container">
      <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Platforms
      </p>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link inline-block pb-0.5 text-sm"
          >
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialSection;
