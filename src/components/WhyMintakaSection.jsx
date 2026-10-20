import { Award, Layers, CheckCircle2, Factory, Truck, Microscope, Check } from "lucide-react";
import { VALUE_PILLARS } from "../data/polymerData";

export default function WhyMintakaSection() {
  const iconMap = {
    Award,
    Layers,
    CheckCircle2,
    Factory,
    Truck,
    Microscope,
  };

  return (
    <section id="why-mintaka" className="section why-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <Check size={14} aria-hidden="true" />
            <span>Competitive Advantage</span>
          </div>
          <h2 className="section-title">Why Leading Converters Choose Mintaka</h2>
          <p className="section-subtitle">
            Beyond resin supply: we provide technical consistency, continuous allocation, and logistics certainty.
          </p>
        </div>

        <div className="why-grid">
          {VALUE_PILLARS.map((pillar) => {
            const IconComp = iconMap[pillar.icon] || CheckCircle2;
            return (
              <div key={pillar.title} className="why-card">
                <div className="why-card__top">
                  <div className="why-card__icon-box" aria-hidden="true">
                    <IconComp size={22} />
                  </div>
                  <span className="why-card__metric">{pillar.metric}</span>
                </div>
                <h3 className="why-card__title">{pillar.title}</h3>
                <p className="why-card__desc">{pillar.lead}</p>
              </div>
            );
          })}
        </div>

        {/* Quality commitment strip */}
        <div className="why-assurance-bar">
          <div className="why-assurance-item">
            <strong>Zero Off-Spec Compromise</strong>
            <span>Continuous testing against ASTM & ISO mechanical standards.</span>
          </div>
          <div className="why-assurance-divider" aria-hidden="true" />
          <div className="why-assurance-item">
            <strong>Buffer Inventory SLA</strong>
            <span>Dedicated customer-reserved inventory for registered manufacturing partners.</span>
          </div>
          <div className="why-assurance-divider" aria-hidden="true" />
          <div className="why-assurance-item">
            <strong>Shop-Floor Assistance</strong>
            <span>On-site processing engineers available for tooling trials and cycle optimization.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
