import { FlaskConical, Warehouse, Wrench, FileCheck2 } from "lucide-react";
import { COMPANY } from "../data/polymerData";

export default function AboutSection() {
  const highlights = [
    {
      icon: FlaskConical,
      title: "In-House QA Facility",
      desc: "Batch MFI, density, tensile strength, and moisture verified before dispatch.",
    },
    {
      icon: Warehouse,
      title: "Guaranteed Buffer Stock",
      desc: "Dedicated warehouse reserves protecting your plant from line stops.",
    },
    {
      icon: Wrench,
      title: "Mold & R&D Support",
      desc: "Polymer chemists assisting with tool shrinkage and cycle optimization.",
    },
    {
      icon: FileCheck2,
      title: "Compliance Records",
      desc: "Full lot traceability with BIS, REACH, RoHS, and FDA food-contact standards.",
    },
  ];

  return (
    <section id="about" className="section about-section" aria-label="About the Company">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">About Mintaka Polymers</h2>
          <p className="section-lead">
            Supplying certified PP, PE, and PVC resins to precision converters across India and {COMPANY.exportDestinations} since {COMPANY.establishedYear}.
          </p>
        </header>

        <div className="about-layout">
          {/* Left Column: Industrial Story & Facilities Card */}
          <div className="about-narrative-card">
            <div className="about-narrative-card__content">
              <span className="about-kicker">Est. {COMPANY.establishedYear} // Hosur, Tamil Nadu, India</span>
              <h3 className="about-subhead">Thirty Years of Polymer Reliability</h3>
              <p className="about-paragraph">
                Operating from our primary distribution hub in Hosur, Tamil Nadu, India, we manage factory-direct allocations for blow molders, pipe extruders, and compounding facilities.
              </p>
              <p className="about-paragraph">
                Every lot is guaranteed to ±0.2 MFI tolerance, documented with lot-specific Certificates of Analysis, and dispatched through dedicated rail and road freight corridors.
              </p>
            </div>

            <div className="about-stats-grid">
              <div className="about-stat-item">
                <span className="about-stat-val tabular-num">{COMPANY.establishedYear}</span>
                <span className="about-stat-lbl">Established Year</span>
              </div>
              <div className="about-stat-item">
                <span className="about-stat-val tabular-num">{COMPANY.annualThroughput}</span>
                <span className="about-stat-lbl">Annual Throughput</span>
              </div>
              <div className="about-stat-item">
                <span className="about-stat-val tabular-num">{COMPANY.exportDestinations}</span>
                <span className="about-stat-lbl">Export Markets</span>
              </div>
            </div>
          </div>

          {/* Right Column: Converter Standards 2x2 Grid */}
          <div className="about-standards-panel">
            <div className="about-standards-head">
              <h3 className="about-standards-title">Converter Partnership Standards</h3>
              <p className="about-standards-caption">
                Strict operational controls designed to protect your manufacturing line.
              </p>
            </div>

            <div className="about-standards-grid">
              {highlights.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.title} className="about-card">
                    <div className="about-card__icon-wrap">
                      <IconComponent size={20} aria-hidden="true" />
                    </div>
                    <h4 className="about-card__title">{item.title}</h4>
                    <p className="about-card__desc">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
