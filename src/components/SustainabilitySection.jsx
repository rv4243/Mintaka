import { ArrowRight } from "lucide-react";
import { SUSTAINABILITY_PILLARS } from "../data/polymerData";

export default function SustainabilitySection() {
  return (
    <section id="sustainability" className="section section--dark sustainability-section" aria-label="Sustainability and Circular Economy">
      <div className="container">
        <div className="sustainability-layout">
          {/* Left Column: Strategy & Action */}
          <div className="sustainability-intro">
            <h2 className="section-title text-white">Circular Polymer Solutions & PCR Resins</h2>
            <p className="sustainability-lead">
              Certified PCR polyolefins and bio-compounds engineered to meet ESG targets without sacrificing cycle times or part strength.
            </p>

            <div className="sustainability-action">
              <a href="#contact" className="btn btn--primary btn--md">
                <span>Inquire About PCR & Bio-Resins</span>
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: 4-Pillar ESG Technical Matrix */}
          <div className="sustainability-matrix">
            {SUSTAINABILITY_PILLARS.map((item) => (
              <div key={item.title} className="sust-entry">
                <div className="sust-entry__stat-group">
                  <span className="sust-entry__stat">{item.stat}</span>
                  <span className="sust-entry__stat-label">{item.statLabel}</span>
                </div>
                <h3 className="sust-entry__title">{item.title}</h3>
                <p className="sust-entry__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
