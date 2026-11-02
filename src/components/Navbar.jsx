import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { COMPANY, NAV_LINKS } from "../data/polymerData";
import mintakaLogo from "../assets/mintaka-logo.png";

export default function Navbar({ onQuoteClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      if (window.scrollY < 80) {
        setActiveSection("home");
        return;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection("contact");
        return;
      }

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 160;

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

  const handleNavClick = (e, href) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);

    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", "#home");
      }
      return;
    }

    const targetId = href.startsWith("#") ? href.substring(1) : href;
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const isMobile = window.innerWidth <= 900;
      const navOffset = isMobile ? 74 : 94;
      const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", href);
      }
    }

    if (href === "#contact" && onQuoteClick) {
      onQuoteClick();
    }
  };

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        {/* Official Brand Logo */}
        <a href="#home" className="brand" aria-label={`${COMPANY.name} home`}>
          <img
            src={mintakaLogo}
            alt={`${COMPANY.name} - Engineered Resins`}
            className="brand__logo-img"
            width="170"
            height="44"
          />
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
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Primary Action Button */}
        <div className="navbar__actions">
          <a
            href="#contact"
            className="btn btn--primary btn--nav"
            onClick={(e) => handleNavClick(e, "#contact")}
          >
            <span>Request Quote</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "mobile-drawer--open" : ""}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-drawer__backdrop" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-drawer__panel">
          <div className="mobile-drawer__top">
            <span className="mobile-drawer__brand-title">{COMPANY.name}</span>
            <button
              type="button"
              className="mobile-drawer__close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation"
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
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mobile-drawer__footer">
            <a
              href="#contact"
              className="btn btn--primary btn--full"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              Request Custom Quote (RFQ)
            </a>
            <div className="mobile-drawer__contact">
              <div>{COMPANY.phone}</div>
              <div>{COMPANY.email}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
