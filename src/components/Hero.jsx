import { ArrowRight, FileSpreadsheet, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { COMPANY, KEY_METRICS } from "../data/polymerData";

export default function Hero({ onSelectFamily, onOpenRFQ }) {
  const quickPills = [
    { label: "Polypropylene (PP)", family: "PP" },
    { label: "High-Density Polyethylene (HDPE)", family: "PE" },
    { label: "Linear Low-Density (LLDPE)", family: "PE" },
    { label: "Suspension PVC (K67 / K57 / K70)", family: "PVC" },
  ];

  return (
    <section className="hero" id="top" aria-label="Introduction and Overview">
      {/* Subtle background mesh pattern */}
      <div className="hero__pattern" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__container">
        <div className="hero__badge-wrapper">
          <div className="hero__badge">
            <span className="hero__badge-pulse" aria-hidden="true" />
            <ShieldCheck size={14} className="hero__badge-icon" aria-hidden="true" />
            <span>ISO 9001:2015 & 14001:2015 Certified Supply Partner</span>
          </div>
        </div>

        <h1 className="hero__title">
          High-Performance Polymers <br className="hero__br-desktop" />
          <span className="hero__title-highlight">Engineered for Global Manufacturing.</span>
        </h1>

        <p className="hero__lead">
          {COMPANY.name} supplies premium virgin and compounding-ready Polypropylene (PP),
          Polyethylene (HDPE, LDPE, LLDPE), and Suspension PVC to converters worldwide.
          Backed by 30+ years of technical polymer expertise, lot-traceable Certificates of
          Analysis (CoA), and uninterrupted industrial allocation.
        </p>

        {/* Action CTAs */}
        <div className="hero__actions">
          <a
            href="#contact"
            className="btn btn--primary btn--lg"
            onClick={(e) => {
              if (onOpenRFQ) {
                e.preventDefault();
                onOpenRFQ();
              }
            }}
          >
            <span>Request Custom Quote (RFQ)</span>
            <ArrowRight size={18} aria-hidden="true" />
          </a>

          <a href="#specifications" className="btn btn--secondary btn--lg">
            <FileSpreadsheet size={18} aria-hidden="true" />
            <span>Explore Technical Specs</span>
          </a>
        </div>

        {/* Quick Filter Resins Bar */}
        <div className="hero__quick-bar">
          <span className="hero__quick-label">
            <Sparkles size={14} aria-hidden="true" />
            <span>Popular Resin Grades:</span>
          </span>
          <div className="hero__quick-pills">
            {quickPills.map((pill) => (
              <button
                key={pill.label}
                type="button"
                className="hero__quick-pill"
                onClick={() => {
                  if (onSelectFamily) onSelectFamily(pill.family);
                  const el = document.getElementById("specifications");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>{pill.label}</span>
                <ChevronRight size={13} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Strip */}
        <div className="hero__stats-card">
          <div className="hero__stats-grid">
            {KEY_METRICS.map((stat, idx) => (
              <div key={stat.label} className="hero__stat-col">
                <div className="hero__stat-val">{stat.value}</div>
                <div className="hero__stat-label">{stat.label}</div>
                <div className="hero__stat-detail">{stat.detail}</div>
                {idx < KEY_METRICS.length - 1 && <div className="hero__stat-divider" aria-hidden="true" />}
              </div>
            ))}
          </div>

          <div className="hero__stats-footnote">
            <span className="hero__footnote-item">
              <CheckCircle2 size={14} className="hero__check-icon" aria-hidden="true" />
              <span>Full CoA Lot Traceability</span>
            </span>
            <span className="hero__footnote-item">
              <CheckCircle2 size={14} className="hero__check-icon" aria-hidden="true" />
              <span>Pneumatic Bulk & Palletized 25kg Options</span>
            </span>
            <span className="hero__footnote-item">
              <CheckCircle2 size={14} className="hero__check-icon" aria-hidden="true" />
              <span>Direct Multi-Modal Rail & Road Dispatch</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
