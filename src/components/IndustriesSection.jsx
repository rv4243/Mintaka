import { PackageCheck, Building2, Car, Wheat, HeartPulse, Layers, ArrowUpRight, Factory } from "lucide-react";
import { INDUSTRIES_SERVED } from "../data/polymerData";

export default function IndustriesSection({ onSelectGrade }) {
  const iconMap = {
    PackageCheck,
    Building2,
    Car,
    Wheat,
    HeartPulse,
    Layers,
  };

  return (
    <section id="industries" className="section section--dark industries-section">
      <div className="container">
        <div className="section-head section-head--light">
          <div className="section-badge section-badge--light">
            <Factory size={14} aria-hidden="true" />
            <span>Market Applications</span>
          </div>
          <h2 className="section-title text-white">Target Industries</h2>
          <p className="section-subtitle text-slate-300">
            Certified polymer grades engineered for high-speed converting and demanding sector standards.
          </p>
        </div>

        <div className="industries-grid">
          {INDUSTRIES_SERVED.map((ind) => {
            const IconComponent = iconMap[ind.icon] || Factory;
            return (
              <article key={ind.id} className="industry-card">
                <div className="industry-card__top">
                  <div className="industry-card__icon-box" aria-hidden="true">
                    <IconComponent size={24} />
                  </div>
                  <span className="industry-card__stat-pill">{ind.keyStats}</span>
                </div>

                <h3 className="industry-card__title">{ind.name}</h3>
                <p className="industry-card__desc">{ind.description}</p>

                <div className="industry-card__footer">
                  <span className="industry-card__rec-label">Primary Grades:</span>
                  <div className="industry-card__tags">
                    {ind.gradesRecommended.map((gradeCode) => (
                      <button
                        key={gradeCode}
                        type="button"
                        className="industry-card__tag"
                        onClick={() => {
                          if (onSelectGrade) onSelectGrade(gradeCode);
                          const specsEl = document.getElementById("specifications");
                          if (specsEl) specsEl.scrollIntoView({ behavior: "smooth" });
                        }}
                        title={`View specification for ${gradeCode}`}
                      >
                        <span>{gradeCode}</span>
                        <ArrowUpRight size={11} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
