import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Layers } from "lucide-react";
import { COMPANY, NAV_LINKS } from "../data/polymerData";

export default function Navbar({ onQuoteClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link spy
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    if (href === "#contact" && onQuoteClick) {
      onQuoteClick();
    }
  };

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__row">
        {/* Brand Logo */}
        <a href="#top" className="brand" aria-label={`${COMPANY.name} home`}>
          <div className="brand__symbol" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
              <polygon
                points="20,4 34,12 34,28 20,36 6,28 6,12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
                fill="rgba(13, 148, 136, 0.12)"
              />
              <circle cx="20" cy="20" r="4.5" fill="#0d9488" />
              <line x1="20" y1="4" x2="20" y2="15.5" stroke="#0d9488" strokeWidth="2" />
              <line x1="34" y1="28" x2="24" y2="22" stroke="#0d9488" strokeWidth="2" />
              <line x1="6" y1="28" x2="16" y2="22" stroke="#0d9488" strokeWidth="2" />
            </svg>
          </div>
          <div className="brand__text">
            <span className="brand__name">{COMPANY.name}</span>
            <span className="brand__tag">ENGINEERED RESINS</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`desktop-nav__link ${isActive ? "desktop-nav__link--active" : ""}`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="navbar__actions">
          <a
            href="#contact"
            className="btn btn--primary btn--sm nav-quote-btn"
            onClick={() => handleNavClick("#contact")}
            title="Request Quote"
          >
            <span className="nav-quote-btn__text">Request Quote</span>
            <span className="nav-quote-btn__text-mobile">Quote</span>
            <ArrowRight size={14} aria-hidden="true" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "mobile-drawer--open" : ""}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-drawer__header">
          <div className="brand brand--drawer">
            <div className="brand__symbol" aria-hidden="true">
              <Layers size={20} />
            </div>
            <span className="brand__name">{COMPANY.name}</span>
          </div>
          <button
            type="button"
            className="mobile-drawer__close"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-drawer__nav" aria-label="Mobile Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-drawer__link"
              onClick={() => handleNavClick(link.href)}
            >
              <span>{link.label}</span>
              <ArrowRight size={16} className="mobile-drawer__arrow" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="mobile-drawer__footer">
          <a
            href="#contact"
            className="btn btn--primary btn--full"
            onClick={() => handleNavClick("#contact")}
          >
            <span>Request Custom Quote (RFQ)</span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <div className="mobile-drawer__contact">
            <p><strong>Direct Sales Desk:</strong></p>
            <p><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
            <p><a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a></p>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
