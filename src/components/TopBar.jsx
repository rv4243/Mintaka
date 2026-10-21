import { Mail, Phone, MapPin, ShieldCheck, Clock } from "lucide-react";
import { COMPANY } from "../data/polymerData";

export default function TopBar() {
  return (
    <aside className="topbar" aria-label="Quick contact and company information">
      <div className="header-container topbar__inner">
        <div className="topbar__left">
          <span className="topbar__item">
            <MapPin className="topbar__icon" size={13} aria-hidden="true" />
            <span>Hosur, Tamil Nadu, India</span>
          </span>
          <span className="topbar__divider" aria-hidden="true">•</span>
          <span className="topbar__item">
            <Clock className="topbar__icon" size={13} aria-hidden="true" />
            <span>Dispatch: Mon–Sat 8:30 AM – 6:30 PM IST</span>
          </span>
        </div>

        <div className="topbar__right">
          <a href={`mailto:${COMPANY.email}`} className="topbar__link">
            <Mail className="topbar__icon" size={13} aria-hidden="true" />
            <span>{COMPANY.email}</span>
          </a>
          <span className="topbar__divider" aria-hidden="true">•</span>
          <a href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`} className="topbar__link">
            <Phone className="topbar__icon" size={13} aria-hidden="true" />
            <span>{COMPANY.phone}</span>
          </a>
          <span className="topbar__divider" aria-hidden="true">•</span>
          <span className="topbar__badge">
            <ShieldCheck size={13} aria-hidden="true" />
            <span>ISO 9001 & 14001 Certified</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
