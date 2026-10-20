import { FlaskConical, Boxes, SlidersHorizontal, ShieldCheck, MapPin, Award } from "lucide-react";
import { COMPANY } from "../data/polymerData";

export default function AboutSection() {
  const highlights = [
    {
      icon: FlaskConical,
      title: "In-House QA Testing Lab",
      desc: "Every polymer batch undergoes rigorous MFR/MFI, density, tensile modulus, and ash content verification before dispatch.",
    },
    {
      icon: Boxes,
      title: "Guaranteed Buffer Reserves",
      desc: "Strategically stocked warehouse depots eliminate resin shortages, safeguarding continuous plant production cycles.",
    },
    {
      icon: SlidersHorizontal,
      title: "Process & Mold Engineering",
      desc: "Our polymer chemists collaborate with converters on mold shrinkage, cycle optimization, and masterbatch compounding.",
    },
    {
      icon: ShieldCheck,
      title: "Comprehensive Compliance",
      desc: "Full conformance with BIS standards, REACH, RoHS, FDA food-contact criteria, and ISO quality management systems.",
    },
  ];

  return (
    <section id="about" className="section section--light about-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <Award size={14} aria-hidden="true" />
            <span>Company Background</span>
          </div>
          <h2 className="section-title">Reliable Polymer Supply for Industrial Converters</h2>
          <p className="section-subtitle">
            Three decades of material science excellence, supply security, and application engineering.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text-col">
            <h3 className="about-heading">
              Powering manufacturing lines with pure, lot-tested polymer resins since 1994.
            </h3>
            <p className="about-lead">
              Headquartered at the major manufacturing and industrial corridor of Hosur, Tamil Nadu, <strong>{COMPANY.name}</strong> operates as a trusted partner to injection molders, film extruders, blow molders, and compounding facilities throughout India and across 60+ export destinations.
            </p>
            <p className="about-body">
              We specialize in the strategic distribution, technical qualification, and customized bulk delivery of primary resin families—Polypropylene (PP), Polyethylene (HDPE, LDPE, LLDPE), and Polyvinyl Chloride (PVC). Whether your operations demand tight MFI tolerances for high-speed multi-cavity tooling or certified UV-stabilized grades for agricultural irrigation, our distribution network delivers dependable consistency.
            </p>
            <p className="about-body">
              Unlike generic resin traders, Mintaka pairs commodity volume with dedicated material scientists. We work side-by-side with your shop-floor production managers to fine-tune processing parameters, resolve warpage or weld-line anomalies, and achieve seamless sustainability transitions.
            </p>

            <div className="about-hq-badge">
              <MapPin className="about-hq-icon" size={20} aria-hidden="true" />
              <div>
                <strong>Central Logistics & Compounding Terminal</strong>
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
                &ldquo;Our production uptime depends on zero batch variance. Mintaka has consistently delivered within ±0.2 MFI tolerance across 4 years of continuous container dispatches.&rdquo;
              </p>
              <div className="about-quote-author">
                — Senior Procurement Director, Automated Packaging Manufacturer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
