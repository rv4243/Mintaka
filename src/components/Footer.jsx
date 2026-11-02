import { COMPANY, NAV_LINKS } from "../data/polymerData";
import mintakaLogoWhite from "../assets/mintaka-logo-white.png";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e, href) => {
    if (e && e.preventDefault) e.preventDefault();
    if (href === "#home" || href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetId = href.startsWith("#") ? href.substring(1) : href;
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const isMobile = window.innerWidth <= 900;
      const navOffset = isMobile ? 74 : 94;
      const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  };

  return (
    <footer className="footer" aria-label="Site Footer">
      <div className="container footer__layout">
        {/* Top Tier: Full-Width Brand Wordmark Close */}
        <div className="footer__hero">
          <div className="footer__brand">
            <img
              src={mintakaLogoWhite}
              alt={`${COMPANY.name} - Engineered Resins`}
              className="footer__logo-img"
              width="210"
              height="54"
            />
            <p className="footer__mission">
              Certified supplier and exporter of prime PP, PE, and PVC resins for precision converters worldwide.
            </p>
          </div>

          <div className="footer__dispatch-badge">
            <strong className="footer__dispatch-title">Distribution Terminal:</strong>
            <p className="footer__dispatch-text">{COMPANY.address}</p>
            <p className="footer__dispatch-hours">{COMPANY.dispatchHours}</p>
          </div>
        </div>

        {/* Middle Tier: Navigation & Direct Technical Access */}
        <div className="footer__nav-grid">
          <div className="footer__nav-col">
            <h4 className="footer__nav-heading">Navigation</h4>
            <ul className="footer__nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer__nav-link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__nav-col">
            <h4 className="footer__nav-heading">Polymer Portfolios</h4>
            <ul className="footer__nav-list">
              <li><a href="#products" onClick={(e) => handleNavClick(e, "#products")} className="footer__nav-link">PP Homopolymer (H030 / H110)</a></li>
              <li><a href="#products" onClick={(e) => handleNavClick(e, "#products")} className="footer__nav-link">PP Impact & Random Copolymer</a></li>
              <li><a href="#products" onClick={(e) => handleNavClick(e, "#products")} className="footer__nav-link">HDPE Blow & Pipe Resins (PE100)</a></li>
              <li><a href="#products" onClick={(e) => handleNavClick(e, "#products")} className="footer__nav-link">LDPE & LLDPE Film Grades</a></li>
              <li><a href="#products" onClick={(e) => handleNavClick(e, "#products")} className="footer__nav-link">Suspension PVC Resins (K67 / K57)</a></li>
              <li><a href="#sustainability" onClick={(e) => handleNavClick(e, "#sustainability")} className="footer__nav-link">Post-Consumer Recycled (PCR) Resins</a></li>
            </ul>
          </div>

          <div className="footer__nav-col footer__nav-col--contact">
            <h4 className="footer__nav-heading">Commercial Desk</h4>
            <p className="footer__contact-entry">
              <span>Direct: </span>
              <a href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`} className="footer__contact-link">
                {COMPANY.phone}
              </a>
            </p>
            <p className="footer__contact-entry">
              <span>Procurement: </span>
              <a href={`mailto:${COMPANY.email}`} className="footer__contact-link">
                {COMPANY.email}
              </a>
            </p>
            <p className="footer__contact-entry">
              <span>Technical QA: </span>
              <a href={`mailto:${COMPANY.supportEmail}`} className="footer__contact-link">
                {COMPANY.supportEmail}
              </a>
            </p>
            <div className="footer__cert-notice">
              ISO 9001:2015 & ISO 14001:2015 Registered Facility
            </div>
          </div>
        </div>

        {/* Bottom Tier: Legal, Quality Standard & Back to Top */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            © {CURRENT_YEAR} {COMPANY.name}. All technical data sheets reflect standard test parameters per ASTM and ISO test methodologies.
          </div>

          <div className="footer__bottom-links">
            <a href="#top" onClick={scrollToTop} className="footer__back-top">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
