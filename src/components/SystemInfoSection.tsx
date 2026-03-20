import { useEffect, useState } from "react";

interface GeoInfo {
  city: string;
  region: string;
  loc: string;
  org: string;
  timezone: string;
  ip: string;
  country_code: string;
}

const SystemInfoSection = () => {
  const [info, setInfo] = useState<GeoInfo | null>(null);

  useEffect(() => {
    // Using ipapi.co - free, no token required, accurate
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        setInfo({
          city: data.city || "Unknown",
          region: data.region || "Unknown",
          loc: `${data.latitude},${data.longitude}` || "Unknown",
          org: data.org || "Unknown",
          timezone: data.timezone || "Unknown",
          ip: data.ip || "Unknown",
          country_code: data.country_code || "Unknown",
        });
      })
      .catch(() => {
        setInfo({
          city: "—",
          region: "—",
          loc: "—",
          org: "—",
          timezone: "—",
          ip: "—",
          country_code: "—",
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
      <p className="mb-8 font-mono text-xs uppercase tracking-widest text-foreground opacity-90">
        Your Information
      </p>

      {info ? (
        <div className="animate-fade-up space-y-3 rounded-lg border border-border bg-card p-3 md:p-5 hover:border-foreground/30 hover:shadow-lg hover:shadow-foreground/10 transition-all duration-300 cursor-pointer">
          {/* Data Stream Message */}
          <div key="data-stream" className="flex flex-col md:flex-row md:items-baseline md:justify-between group mb-2 pb-3 border-b border-border/50 gap-2 md:gap-0">
            <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
              [DATA_STREAM]
            </span>
            <span className="text-sm text-blue-400 transition-colors font-semibold">
              Incoming packet from: {info.city}, {info.country_code} // {info.ip}
            </span>
          </div>

          {/* Info Rows */}
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col md:flex-row md:items-baseline md:justify-between group gap-2 md:gap-0">
              <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
                {row.label}
              </span>
              <span className="text-sm text-foreground group-hover:text-blue-400 transition-colors">
                {row.value}
              </span>
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
