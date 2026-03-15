const skills = [
  { name: "Web Security", description: "Application security testing and vulnerability analysis" },
  { name: "Penetration Testing", description: "Network and infrastructure assessment" },
  { name: "Bug Bounty", description: "Responsible disclosure and reward programs" },
  { name: "CTF", description: "Capture The Flag competitions and challenges" },
  { name: "OSINT", description: "Open-source intelligence gathering and analysis" },
  { name: "Reverse Engineering", description: "Binary analysis and malware research" },
];

const SkillsSection = () => {
  return (
    <section className="section-container">
      <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Skills
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            className="skill-card animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <h3 className="text-sm font-medium text-foreground">{skill.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
