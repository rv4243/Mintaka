import { COMPANY } from "../data/polymerData";

export default function TopBar() {
  return (
    <aside className="topbar" aria-label="Quick contact and company information">
      <div className="container topbar__inner">
        <span className="topbar__item">{COMPANY.address}</span>
        <span className="topbar__sep" aria-hidden="true">/</span>
        <span className="topbar__item">{COMPANY.dispatchHours}</span>
        <span className="topbar__sep" aria-hidden="true">/</span>
        <a href={`mailto:${COMPANY.email}`} className="topbar__link">
          {COMPANY.email}
        </a>
        <span className="topbar__sep" aria-hidden="true">/</span>
        <a href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`} className="topbar__link">
          {COMPANY.phone}
        </a>
        <span className="topbar__sep" aria-hidden="true">/</span>
        <span className="topbar__accreditation">ISO 9001:2015 & 14001:2015 Registered</span>
      </div>
    </aside>
  );
}
