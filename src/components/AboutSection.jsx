import { FlaskConical, Boxes, SlidersHorizontal, ShieldCheck, MapPin, Award, CheckCircle2 } from "lucide-react";
import { COMPANY } from "../data/polymerData";

export default function AboutSection() {
  const highlights = [
    {
      icon: FlaskConical,
      title: "In-House QA Lab",
      desc: "Batch MFI, density, tensile strength, and ash content verified before dispatch.",
    },
    {
      icon: Boxes,
      title: "Guaranteed Buffer Stock",
      desc: "Dedicated warehouse reserves protecting your plant from line-down events.",
    },
    {
      icon: SlidersHorizontal,
      title: "Mold & Process Support",
      desc: "Polymer chemists assisting with mold shrinkage, cycle times, and compounding.",
    },
    {
      icon: ShieldCheck,
      title: "Full Regulatory Compliance",
      desc: "BIS, REACH, RoHS, FDA food-contact, and ISO certified quality systems.",
    },
  ];

  const quickPillStats = [
    { label: "Est. 1994" },
    { label: "180k+ MT/Yr Volume" },
    { label: "60+ Export Markets" },
    { label: "ISO 9001 Certified" },
  ];

  return (
    <section id="about" className="section section--light about-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <Award size={14} aria-hidden="true" />
            <span>Company Overview</span>
          </div>
          <h2 className="section-title">Reliable Polymer Supply for Industrial Converters</h2>
          <p className="section-subtitle">
            Three decades of material science expertise, supply security, and engineering support.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text-col">
            <h3 className="about-heading">
              Industrial Polymer Distribution Built for Speed & Precision
            </h3>
            <p className="about-lead">
              Direct factory allocations of <strong>PP, PE & PVC</strong> resins for molders, extruders, and compounding plants across India and worldwide.
            </p>

            <div className="about-points">
              <div className="about-point">
                <CheckCircle2 size={18} className="about-point-icon" aria-hidden="true" />
                <div>
                  <strong>Hosur Manufacturing Hub:</strong> SIPCOT Phase II warehouse terminal with rapid multi-modal dispatch across southern industrial corridors.
                </div>
              </div>

              <div className="about-point">
                <CheckCircle2 size={18} className="about-point-icon" aria-hidden="true" />
                <div>
                  <strong>Batch-to-Batch Consistency:</strong> Guaranteed ±0.2 MFI tolerance on all dispatches, verified by lot-specific Certificate of Analysis (CoA).
                </div>
              </div>

              <div className="about-point">
                <CheckCircle2 size={18} className="about-point-icon" aria-hidden="true" />
                <div>
                  <strong>Buffer Allocation SLA:</strong> Rolling contracts and reserved stock that protect your facility against petrochemical price spikes.
                </div>
              </div>

              <div className="about-point">
                <CheckCircle2 size={18} className="about-point-icon" aria-hidden="true" />
                <div>
                  <strong>Application R&D Assistance:</strong> In-house technical support for mold shrinkage, cycle optimization, and recyclable mono-PE/PP transitions.
                </div>
              </div>
            </div>

            <div className="about-stats-row">
              {quickPillStats.map((st) => (
                <span key={st.label} className="about-stat-pill">
                  {st.label}
                </span>
              ))}
            </div>

            <div className="about-hq-badge">
              <MapPin className="about-hq-icon" size={20} aria-hidden="true" />
              <div>
                <strong>Central Logistics Hub & Plant</strong>
                <span>{COMPANY.address}</span>
              </div>
            </div>
          </div>

          <div className="about-highlights-col">
            <div className="highlights-grid">
              {highlights.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.title} className="highlight-card">
                    <div className="highlight-icon-box" aria-hidden="true">
                      <IconComponent size={22} />
                    </div>
                    <h4 className="highlight-title">{item.title}</h4>
                    <p className="highlight-desc">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="about-quote-box">
              <p className="about-quote-text">
                &ldquo;Mintaka has consistently delivered within ±0.2 MFI tolerance across 4 years of continuous container dispatches. Zero batch surprises.&rdquo;
              </p>
              <div className="about-quote-author">
                — Procurement Director, Automated Packaging Manufacturer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
