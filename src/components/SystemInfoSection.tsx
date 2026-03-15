import { useEffect, useState } from "react";

interface GeoInfo {
  city: string;
  region: string;
  loc: string;
  org: string;
  timezone: string;
}

const SystemInfoSection = () => {
  const [info, setInfo] = useState<GeoInfo | null>(null);

  useEffect(() => {
    fetch("https://ipinfo.io/json?token=demo")
      .then((r) => r.json())
      .then((data) => {
        setInfo({
          city: data.city || "Unknown",
          region: data.region || "Unknown",
          loc: data.loc || "Unknown",
          org: data.org || "Unknown",
          timezone: data.timezone || "Unknown",
        });
      })
      .catch(() => {
        setInfo({
          city: "—",
          region: "—",
          loc: "—",
          org: "—",
          timezone: "—",
        });
      });
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
        Your Information
      </p>

      {info ? (
        <div className="animate-fade-up space-y-3 rounded-lg border border-border bg-card p-5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                {row.label}
              </span>
              <span className="text-sm text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="animate-pulse font-mono text-xs text-muted-foreground">
          Loading…
        </div>
      )}
    </section>
  );
};

export default SystemInfoSection;
