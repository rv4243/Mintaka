export default function SupplyChainSection() {
  const steps = [
    {
      stage: "Procure",
      subhead: "Refinery Allocation & Sourcing",
      body: "Prime virgin feedstocks secured through direct petrochemical allocations, pre-screened for purity.",
    },
    {
      stage: "Inbound Test",
      subhead: "Pre-Production Screening",
      body: "Incoming shipments quarantined and lab-tested for MFI, density, and moisture before release.",
    },
    {
      stage: "Manufacture",
      subhead: "Compounding & Extrusion",
      body: "High-torque twin-screw compounding with precise thermal control for uniform additive dispersion.",
    },
    {
      stage: "Quality Test",
      subhead: "ASTM CoA Lot Certification",
      body: "Post-extrusion ASTM validation ensuring ±0.2 MFI tolerance, recorded on a lot-specific CoA.",
    },
    {
      stage: "Dispatch",
      subhead: "Packaging & Logistics",
      body: "Hermetically sealed 25kg bags, 1-ton bulk FIBCs, or tankers dispatched in 24–48 hours.",
    },
  ];

  return (
    <section id="manufacturing-capabilities" className="section supply-section" aria-label="Manufacturing and Supply Chain">
      <span id="supply-chain" className="section-anchor" aria-hidden="true" />
      <div className="container">
        {/* Newspaper Broadsheet Header */}
        <header className="newspaper-header">
          <div className="newspaper-meta">
            <span className="newspaper-dateline">Central Dispatch Terminal</span>
            <span className="newspaper-meta-sep">|</span>
            <span className="newspaper-edition">Standard Operating Procedure</span>
            <span className="newspaper-meta-sep">|</span>
            <span className="newspaper-location">Hosur, Tamil Nadu, India</span>
          </div>

          <h2 className="section-title newspaper-headline">
            Manufacturing Infrastructure & Supply Reliability
          </h2>

          <p className="newspaper-subheadline">
            Our 5-stage quality pipeline from raw procurement to plant gate delivery.
          </p>
        </header>

        {/* 5-Column Newspaper Editorial Columns */}
        <div className="newspaper-grid">
          {steps.map((step) => (
            <article key={step.stage} className="newspaper-col">
              <div className="newspaper-col__kicker">{step.stage}</div>
              <h3 className="newspaper-col__title">{step.subhead}</h3>
              <p className="newspaper-col__body">{step.body}</p>
            </article>
          ))}
        </div>

        {/* Newspaper Editorial Footer Dispatch */}
        <footer className="newspaper-footer">
          <div className="newspaper-footer__note">
            <strong>Terminal Buffer Commitment:</strong> 180,000 MT buffer capacity and 50-ton silo reserves protect your plant from market shortages.
          </div>
        </footer>
      </div>
    </section>
  );
}
