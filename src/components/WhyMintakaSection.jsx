import { VALUE_PILLARS } from "../data/polymerData";

export default function WhyMintakaSection() {
  return (
    <section id="why-mintaka" className="section section--light why-section" aria-label="Competitive Advantages">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Operational Standards & Technical Advantages</h2>
          <p className="section-lead">
            Strict batch consistency, guaranteed buffer allocations, and direct engineering support.
          </p>
        </header>

        {/* 3-Column Proof Showcase */}
        <div className="why-pillars-grid">
          {VALUE_PILLARS.map((pillar) => (
            <article key={pillar.title} className="why-pillar">
              <div className="why-pillar__metric-block">
                <span className="why-pillar__metric">{pillar.metric}</span>
              </div>
              <h3 className="why-pillar__title">{pillar.title}</h3>
              <p className="why-pillar__lead">{pillar.lead}</p>
            </article>
          ))}
        </div>

        {/* Technical Assurance Banner */}
        <div className="why-assurance-banner">
          <div className="why-assurance-item">
            <strong>Zero Off-Spec:</strong>
            <span>Pre-screened to ASTM standards before release.</span>
          </div>
          <div className="why-assurance-item">
            <strong>Contracted Buffer:</strong>
            <span>Dedicated Hosur, Tamil Nadu, India stock shields against line halts.</span>
          </div>
          <div className="why-assurance-item">
            <strong>Chemist SLA:</strong>
            <span>On-call support for mold shrinkage and tool trials.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
