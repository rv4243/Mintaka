import { ArrowUp, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { COMPANY, NAV_LINKS } from "../data/polymerData";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer" aria-label="Site Footer">
      <div className="container footer__container">
        <div className="footer__grid">
          {/* Column 1: Company Profile */}
          <div className="footer__col footer__col--brand">
            <div className="brand brand--footer">
              <div className="brand__symbol" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
                  <polygon
                    points="20,4 34,12 34,28 20,36 6,28 6,12"
                    stroke="#14b8a6"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    fill="rgba(20, 184, 166, 0.15)"
                  />
                  <circle cx="20" cy="20" r="4.5" fill="#14b8a6" />
                </svg>
              </div>
              <div className="brand__text">
                <span className="brand__name brand__name--light">{COMPANY.name}</span>
                <span className="brand__tag brand__tag--light">ADVANCED POLYMERS</span>
              </div>
            </div>

            <p className="footer__bio">
              A premier international supplier of certified Polypropylene (PP), Polyethylene (PE),
              and Suspension PVC resins for precision industrial converters worldwide.
            </p>

            <div className="footer__trust-badge">
              <ShieldCheck size={16} className="text-teal" aria-hidden="true" />
              <span>ISO 9001:2015 & ISO 14001:2015 Registered</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer__col">
            <h4 className="footer__heading">Quick Navigation</h4>
            <ul className="footer__links">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Polymer Families */}
          <div className="footer__col">
            <h4 className="footer__heading">Polymer Portfolio</h4>
            <ul className="footer__links">
              <li><a href="#specifications" className="footer__link">PP Homopolymer (H030 / H110)</a></li>
              <li><a href="#specifications" className="footer__link">PP Impact & Random Copolymer</a></li>
              <li><a href="#specifications" className="footer__link">HDPE Blow & Pipe (PE100)</a></li>
              <li><a href="#specifications" className="footer__link">LDPE & LLDPE Film Grades</a></li>
              <li><a href="#specifications" className="footer__link">PVC Suspension K-67 / K-57 / K-70</a></li>
              <li><a href="#contact" className="footer__link">Custom Masterbatch & Compounds</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Dispatch */}
          <div className="footer__col footer__col--contact">
            <h4 className="footer__heading">Commercial Desk</h4>
            <ul className="footer__contact-list">
              <li>
                <MapPin size={16} className="footer__icon" aria-hidden="true" />
                <span>{COMPANY.address}</span>
              </li>
              <li>
                <Mail size={16} className="footer__icon" aria-hidden="true" />
                <a href={`mailto:${COMPANY.email}`} className="footer__link">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <Phone size={16} className="footer__icon" aria-hidden="true" />
                <a href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`} className="footer__link">
                  {COMPANY.phone}
                </a>
              </li>
            </ul>

            <div className="footer__hours">
              <strong>Order Dispatch Hours:</strong>
              <p>{COMPANY.dispatchHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <span>© {CURRENT_YEAR} {COMPANY.name}. All rights reserved.</span>
            <span className="footer__bottom-sep" aria-hidden="true">•</span>
            <span>Commercial B2B Polymer Portal</span>
          </div>

          <a href="#top" className="footer__back-top" onClick={scrollToTop}>
            <span>Back to top</span>
            <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
