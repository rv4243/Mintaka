import { ArrowRight, ChevronRight } from "lucide-react";
import { KEY_METRICS } from "../data/polymerData";

import pipeThumb from "../assets/products/pipe-fitting-tee.png";
import sprinklerThumb from "../assets/products/sprinkler-irrigation.png";
import tubThumb from "../assets/products/thinwall-food-container.png";

export default function Hero({ onSelectFamily, onOpenRFQ }) {
  const quickPills = [
    { label: "Polypropylene (PP)", family: "PP" },
    { label: "High-Density Polyethylene (HDPE)", family: "PE" },
    { label: "Linear Low-Density (LLDPE)", family: "PE" },
    { label: "Suspension PVC (K-67 / K-57)", family: "PVC" },
  ];

  const productThumbs = [
    { img: tubThumb, alt: "Clarified food containers and thin-wall packaging", label: "Packaging" },
    { img: pipeThumb, alt: "T-joint pipe fittings in HDPE/PVC", label: "Piping" },
    { img: sprinklerThumb, alt: "Impact sprinkler nozzles in polyolefin", label: "Irrigation" },
  ];

  const handleScrollTo = (e, targetId) => {
    if (e && e.preventDefault) e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const isMobile = window.innerWidth <= 900;
      const navOffset = isMobile ? 74 : 94;
      const targetY = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="home" aria-label="Introduction and Overview">
      <div className="container hero__layout">
        {/* Left Editorial Column: Headline, Narrative & Conversion Triggers */}
        <div className="hero__editorial">
          <h1 className="hero__title">
            Prime Polymer Resins <br className="hero__br-mobile" />
            for Zero Downtime
          </h1>

          <p className="hero__statement">
            Prime PP, PE & PVC resins with guaranteed batch consistency, lot-specific CoAs, and fast dispatch from Hosur, Tamil Nadu, India.
          </p>

          <div className="hero__actions">
            <a
              href="#contact"
              className="btn btn--primary btn--lg"
              onClick={(e) => {
                if (onOpenRFQ) {
                  e.preventDefault();
                  onOpenRFQ();
                } else {
                  handleScrollTo(e, "contact");
                }
              }}
            >
              <span>Request Custom Quote (RFQ)</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>

            <a
              href="#products"
              className="btn btn--secondary btn--lg"
              onClick={(e) => handleScrollTo(e, "products")}
            >
              <span>View Technical Specifications</span>
            </a>
          </div>

          {/* Converted Component Thumbnails Preview */}
          <div className="hero__parts-preview">
            <span className="hero__parts-label">Molded from Mintaka prime resins:</span>
            <div className="hero__parts-strip">
              {productThumbs.map((pt) => (
                <div key={pt.label} className="hero__part-item" title={pt.alt}>
                  <img
                    src={pt.img}
                    alt={pt.alt}
                    className="hero__part-img"
                    width="44"
                    height="36"
                  />
                  <span className="hero__part-name">{pt.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Category Jump */}
          <div className="hero__quick-jump">
            <span className="hero__quick-caption">Resin portfolios:</span>
            <div className="hero__quick-tags">
              {quickPills.map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  className="hero__quick-tag"
                  onClick={(e) => {
                    if (onSelectFamily) onSelectFamily(pill.family);
                    handleScrollTo(e, "products");
                  }}
                >
                  <span>{pill.label}</span>
                  <ChevronRight size={13} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Structural Column: Technical Guarantees & Volume SLA */}
        <aside className="hero__sla-panel" aria-label="Converter Operational Guarantees">
          <div className="sla-panel__header">
            <span className="sla-panel__heading">Converter Operational SLA</span>
            <span className="sla-panel__badge">Hosur, Tamil Nadu, India</span>
          </div>

          <div className="sla-panel__metrics">
            {KEY_METRICS.map((metric) => (
              <div key={metric.label} className="sla-metric">
                <span className="sla-metric__value">{metric.value}</span>
                <strong className="sla-metric__label">{metric.label}</strong>
                <p className="sla-metric__detail">{metric.detail}</p>
              </div>
            ))}
          </div>

          <div className="sla-panel__footer">
            <div className="sla-panel__cert-item">
              <strong>Quality:</strong> ±0.2 MFI tolerance on all lots with ASTM test records.
            </div>
            <div className="sla-panel__cert-item">
              <strong>Logistics:</strong> 24–48h road and rail dispatch from Hosur, Tamil Nadu, India.
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
