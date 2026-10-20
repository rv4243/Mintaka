import { Leaf, Recycle, Wind, Droplets, ArrowRight } from "lucide-react";
import { SUSTAINABILITY_PILLARS } from "../data/polymerData";

export default function SustainabilitySection() {
  const iconList = [Recycle, Leaf, Wind, Droplets];

  return (
    <section id="sustainability" className="section section--teal sustainability-section">
      <div className="container">
        <div className="sustainability-layout">
          <div className="sustainability-intro">
            <div className="section-badge section-badge--teal">
              <Leaf size={14} aria-hidden="true" />
              <span>ESG & Responsible Manufacturing</span>
            </div>
            <h2 className="section-title text-white">
              Circular Polymer Solutions for a Low-Carbon Economy
            </h2>
            <p className="sustainability-lead">
              The future of plastics demands proactive responsibility. Mintaka integrates verified post-consumer recycled (PCR) compounds, closed-loop packaging stewardship, and mono-material transition support without compromising tensile strength or processing efficiency.
            </p>

            <div className="sustainability-bullet-box">
              <h4 className="sustainability-box-title">Our Environmental Commitments:</h4>
              <ul className="sustainability-box-list">
                <li>Zero-pellet loss enforcement across all warehouse staging hubs (Operation Clean Sweep®).</li>
                <li>ISO 14001 certified environmental mitigation and 100% industrial wastewater recycling.</li>
                <li>Collaborative technical testing for multi-layer to mono-PE/PP recyclable pouch conversion.</li>
              </ul>
            </div>

            <a href="#contact" className="btn btn--primary btn--md sustainability-cta">
              <span>Inquire About PCR Resins</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="sustainability-grid">
            {SUSTAINABILITY_PILLARS.map((item, idx) => {
              const IconComp = iconList[idx % iconList.length];
              return (
                <div key={item.title} className="sust-card">
                  <div className="sust-card__top">
                    <div className="sust-card__icon" aria-hidden="true">
                      <IconComp size={20} />
                    </div>
                    <div className="sust-card__stat-group">
                      <span className="sust-card__stat">{item.stat}</span>
                      <span className="sust-card__stat-label">{item.statLabel}</span>
                    </div>
                  </div>
                  <h3 className="sust-card__title">{item.title}</h3>
                  <p className="sust-card__desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
