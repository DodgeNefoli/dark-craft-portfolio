import { Mail, Github, Linkedin, Twitter, MessageCircle, Shield, Terminal, Flag, FlaskConical } from "lucide-react";

const socials = [
  { label: "Email", href: "mailto:you@example.com", icon: Mail },
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "X", href: "https://x.com", icon: Twitter },
  { label: "Discord", href: "#", icon: MessageCircle },
  { label: "Hack The Box", href: "https://hackthebox.com", icon: Shield },
  { label: "TryHackMe", href: "https://tryhackme.com", icon: Terminal },
  { label: "CTFtime", href: "https://ctftime.org", icon: Flag },
  { label: "PentesterLab", href: "https://pentesterlab.com", icon: FlaskConical },
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
            className="social-link inline-flex items-center gap-2 pb-0.5 text-sm"
          >
            <s.icon size={14} />
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialSection;
