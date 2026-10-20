import { Check, ArrowRight, Table, Send } from "lucide-react";
import { PRODUCT_FAMILIES } from "../data/polymerData";

export default function ProductsSection({ onSelectFamily, onQuoteFamily }) {
  const handleViewSpecs = (familyCode) => {
    if (onSelectFamily) {
      onSelectFamily(familyCode);
    }
    const tableEl = document.getElementById("specifications");
    if (tableEl) {
      tableEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuoteClick = (familyCode) => {
    if (onQuoteFamily) {
      onQuoteFamily(familyCode);
    }
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="section products-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <span>Portfolio</span>
          </div>
          <h2 className="section-title">Core Polymer Resins & Families</h2>
          <p className="section-subtitle">
            Engineered raw material grades with exact melt flow rates, density profiles, and structural performance.
          </p>
        </div>

        <div className="products-grid">
          {PRODUCT_FAMILIES.map((fam) => (
            <article key={fam.code} className="product-card">
              <div className="product-card__header">
                <div className="product-card__top">
                  <span className="product-card__code">{fam.code}</span>
                  <span className="product-card__badge">{fam.badge}</span>
                </div>
                <h3 className="product-card__name">{fam.name}</h3>
                <span className="product-card__count">{fam.gradesCount}</span>
              </div>

              <div className="product-card__body">
                <p className="product-card__lead">{fam.lead}</p>

                <div className="product-card__subcats">
                  <div className="product-card__subcats-label">Sub-Classifications:</div>
                  <div className="product-card__tags">
                    {fam.subcategories.map((sub) => (
                      <span key={sub} className="product-card__tag">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="product-card__features">
                  <div className="product-card__features-label">Key Polymer Characteristics:</div>
                  <ul className="product-card__feature-list">
                    {fam.keyAttributes.map((attr) => (
                      <li key={attr} className="product-card__feature-item">
                        <Check size={15} className="product-card__check-icon" aria-hidden="true" />
                        <span>{attr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="product-card__applications">
                  <strong>Common Applications:</strong> {fam.primaryUses}
                </div>
              </div>

              <div className="product-card__footer">
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={() => handleViewSpecs(fam.code)}
                >
                  <Table size={15} aria-hidden="true" />
                  <span>View Grade Specs</span>
                </button>

                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  onClick={() => handleQuoteClick(fam.code)}
                >
                  <Send size={14} aria-hidden="true" />
                  <span>Get Quote</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Global resin catalog callout */}
        <div className="catalog-banner">
          <div className="catalog-banner__content">
            <h4 className="catalog-banner__title">Looking for customized masterbatches or specialty compounds?</h4>
            <p className="catalog-banner__text">
              We supply UV-stabilized, flame-retardant (UL94 V-0), slip-modified, and mineral-filled (talc/calcium carbonate) custom polymer compounds formulated to your exact injection/extrusion cycle specifications.
            </p>
          </div>
          <a href="#contact" className="btn btn--secondary btn--sm catalog-banner__btn">
            <span>Inquire Custom Compounding</span>
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
