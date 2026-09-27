import { Mail, Github, Linkedin, FlaskConical } from "lucide-react";

const DiscordLogo = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.73 5.1a18.1 18.1 0 0 0-4.47-1.39l-.55 1.12a16.7 16.7 0 0 0-5.42 0l-.55-1.12A18.1 18.1 0 0 0 4.27 5.1C1.44 9.28.67 13.36 1.05 17.38a18.2 18.2 0 0 0 5.47 2.77l1.18-1.92a11.8 11.8 0 0 1-1.86-.9l.45-.35c3.59 1.66 7.48 1.66 11.02 0l.46.35a11.8 11.8 0 0 1-1.87.9l1.18 1.92a18.2 18.2 0 0 0 5.47-2.77c.45-4.66-.77-8.7-2.82-12.28ZM8.97 14.45c-1.08 0-1.96-.99-1.96-2.2s.86-2.2 1.96-2.2 1.98.99 1.96 2.2c0 1.21-.86 2.2-1.96 2.2Zm6.06 0c-1.08 0-1.96-.99-1.96-2.2s.86-2.2 1.96-2.2 1.98.99 1.96 2.2c0 1.21-.86 2.2-1.96 2.2Z" />
  </svg>
);

const HackTheBoxLogo = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m12 2.2 9 5.2v9.2l-9 5.2-9-5.2V7.4l9-5.2Z" stroke="currentColor" strokeWidth="2.2" />
    <path d="m3.4 7.7 8.6 5 8.6-5M12 12.7v8.1" stroke="currentColor" strokeWidth="2.2" />
  </svg>
);

const TryHackMeLogo = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 14.5a3.5 3.5 0 0 1 .8-6.9 5 5 0 0 1 9.5-.7 3.8 3.8 0 0 1 3.4 6.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M8 16.5h2m4 0h2m-6 2h2m4 0h2m-8 2h2m4 0h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const XLogo = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <text x="4" y="19" fontFamily="Arial, sans-serif" fontSize="21" fontWeight="700">X</text>
  </svg>
);

const socials = [
  { label: "Email", href: "mailto:bhusalsushant12345@gmail.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/DodgeNefoli", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sushant-bhusal-07349b277/", icon: Linkedin },
  { label: "X", href: "https://x.com/DNefoli", icon: XLogo },
  { label: "Discord", href: "https://discord.com/users/763416556251250730", icon: DiscordLogo },
  { label: "Hack The Box", href: "https://app.hackthebox.com/users/1939838", icon: HackTheBoxLogo },
  { label: "TryHackMe", href: "https://tryhackme.com/p/DodgeNefoli", icon: TryHackMeLogo },
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
