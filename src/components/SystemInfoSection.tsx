import { useEffect, useState } from "react";

interface GeoInfo {
  city: string;
  region: string;
  loc: string;
  org: string;
  timezone: string;
}

const loadingLines = [
  "Collecting system information…",
  "Detecting location…",
  "Analyzing network…",
  "Displaying results…",
];

const SystemInfoSection = () => {
  const [phase, setPhase] = useState(0); // 0-3 loading lines, 4 = done
  const [info, setInfo] = useState<GeoInfo | null>(null);

  useEffect(() => {
    // Animate loading lines
    const timers: ReturnType<typeof setTimeout>[] = [];
    loadingLines.forEach((_, i) => {
      timers.push(setTimeout(() => setPhase(i + 1), (i + 1) * 600));
    });

    // Fetch geo info
    fetch("https://ipinfo.io/json?token=demo")
      .then((r) => r.json())
      .then((data) => {
        timers.push(
          setTimeout(() => {
            setInfo({
              city: data.city || "Unknown",
              region: data.region || "Unknown",
              loc: data.loc || "Unknown",
              org: data.org || "Unknown",
              timezone: data.timezone || "Unknown",
            });
            setPhase(5);
          }, loadingLines.length * 600 + 400)
        );
      })
      .catch(() => {
        timers.push(
          setTimeout(() => {
            setInfo({
              city: "—",
              region: "—",
              loc: "—",
              org: "—",
              timezone: "—",
            });
            setPhase(5);
          }, loadingLines.length * 600 + 400)
        );
      });

    return () => timers.forEach(clearTimeout);
  }, []);

  const rows = info
    ? [
        { label: "City", value: info.city },
        { label: "Region", value: info.region },
        { label: "Coordinates", value: info.loc },
        { label: "Network", value: info.org },
        { label: "Timezone", value: info.timezone },
      ]
    : [];

  return (
    <section className="section-container">
      <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        System Information
      </p>

      {/* Loading lines */}
      <div className="space-y-1 font-mono text-xs text-muted-foreground">
        {loadingLines.map((line, i) => (
          <p
            key={i}
            className="transition-opacity duration-300"
            style={{ opacity: phase > i ? 1 : 0 }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Results */}
      {phase >= 5 && info && (
        <div className="mt-8 animate-fade-up space-y-3 rounded-lg border border-border bg-card p-5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                {row.label}
              </span>
              <span className="text-sm text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SystemInfoSection;
