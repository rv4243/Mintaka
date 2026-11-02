import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES_SERVED } from "../data/polymerData";

import packagingImg from "../assets/products/thinwall-food-container.png";
import infrastructureImg from "../assets/products/pipe-fitting-tee.png";
import agricultureImg from "../assets/products/sprinkler-irrigation.png";

const industryConfig = {
  packaging: {
    src: packagingImg,
    alt: "Clarified thin-wall food container with snap lid molded from PP RC2005",
    bgTop: "radial-gradient(ellipse at 50% 30%, #ffffff 0%, #0d2238 90%)",
    bgCard: "#0d2238",
  },
  infrastructure: {
    src: infrastructureImg,
    alt: "High-pressure compression pipe T-joint molded from HDPE / PVC",
    bgTop: "radial-gradient(ellipse at 50% 30%, #ffffff 0%, #0e1e2d 90%)",
    bgCard: "#0e1e2d",
  },
  agriculture: {
    src: agricultureImg,
    alt: "Impact irrigation sprinkler nozzle molded from UV-stabilized polyolefin",
    bgTop: "radial-gradient(ellipse at 50% 30%, #ffffff 0%, #0d2723 90%)",
    bgCard: "#0d2723",
  },
};

export default function IndustriesSection({ onSelectGrade }) {
  const activeIndustries = INDUSTRIES_SERVED.filter((ind) =>
    ["packaging", "infrastructure", "agriculture"].includes(ind.id)
  );

  const handleScrollToSpecs = (gradeHint) => {
    if (onSelectGrade && gradeHint) onSelectGrade(gradeHint);
    const specsEl = document.getElementById("products") || document.getElementById("materials");
    if (specsEl) {
      const isMobile = window.innerWidth <= 900;
      const navOffset = isMobile ? 74 : 94;
      const targetY = specsEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  };

  return (
    <section id="industries" className="section section--dark industries-section" aria-label="Industries and Applications">
      <div className="container">
        <header className="section-header section-header--light">
          <h2 className="section-title text-white">Target Industries & Conversion Sectors</h2>
          <p className="section-lead section-lead--light">
            Resin grades tuned for fast cycle times, high impact strength, and regulatory compliance.
          </p>
        </header>

        {/* Floating Atmospheric 3-Card Grid */}
        <div className="luxury-cards-grid">
          {activeIndustries.map((ind) => {
            const cfg = industryConfig[ind.id] || industryConfig.packaging;

            return (
              <article
                key={ind.id}
                className="luxury-card"
                style={{
                  "--card-bg": cfg.bgCard,
                  background: cfg.bgCard,
                }}
              >
                {/* Upper Atmospheric Photo Showcase */}
                <div className="luxury-card__top" style={{ background: cfg.bgTop }}>
                  <img
                    src={cfg.src}
                    alt={cfg.alt}
                    className="luxury-card__img"
                    loading="lazy"
                    width="360"
                    height="230"
                  />
                  <div className="luxury-card__fade" />
                </div>

                {/* 3-Dot Pagination Indicator */}
                <div className="luxury-card__dots" aria-hidden="true">
                  <span className="luxury-dot active" />
                  <span className="luxury-dot" />
                  <span className="luxury-dot" />
                </div>

                {/* Card Content & Action Area */}
                <div className="luxury-card__content">
                  <div className="luxury-card__header">
                    <h3 className="luxury-card__title">{ind.name}</h3>
                    <span className="luxury-card__badge">{ind.keyStats}</span>
                  </div>

                  <p className="luxury-card__desc">{ind.description}</p>

                  {/* Translucent Resin Grade Chips */}
                  <div className="luxury-card__tags">
                    {ind.gradesRecommended.map((gradeCode) => (
                      <button
                        key={gradeCode}
                        type="button"
                        className="luxury-tag"
                        onClick={() => handleScrollToSpecs(gradeCode)}
                        title={`Filter specifications for ${gradeCode}`}
                      >
                        <span>{gradeCode}</span>
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </button>
                    ))}
                  </div>

                  {/* Full-Width White Pill Button */}
                  <button
                    type="button"
                    className="luxury-btn"
                    onClick={() => handleScrollToSpecs(ind.gradesRecommended[0])}
                  >
                    Explore Specifications
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
