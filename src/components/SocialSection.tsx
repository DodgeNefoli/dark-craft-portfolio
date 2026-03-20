import { Mail, Github, Linkedin, Twitter, MessageCircle, Shield, Terminal, Flag, FlaskConical } from "lucide-react";

const socials = [
  { label: "Email", href: "mailto:bhusalsushant12345@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/DodgeNefoli", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sushant-bhusal-07349b277/", icon: Linkedin },
  { label: "X", href: "https://x.com/DNefoli", icon: Twitter },
  { label: "Discord", href: "https://discord.com/users/763416556251250730", icon: MessageCircle },
  { label: "Hack The Box", href: "https://app.hackthebox.com/users/1939838", icon: Shield },
  { label: "TryHackMe", href: "https://tryhackme.com/p/DodgeNefoli", icon: Terminal },
  { label: "PentesterLab", href: "https://pentesterlab.com/profile/d69fb70ef3d60ff920def73539", icon: FlaskConical },
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
