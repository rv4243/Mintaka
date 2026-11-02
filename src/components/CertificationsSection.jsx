import { CERTIFICATIONS_LIST } from "../data/polymerData";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section section--light certs-section" aria-label="Quality and Regulatory Compliance">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Quality Accreditations & Regulatory Compliance</h2>
          <p className="section-lead">
            Certified quality and environmental management systems backed by independent audit registrars.
          </p>
        </header>

        <div className="certs-register">
          <div className="certs-register__header">
            <span className="certs-col certs-col--code">Standard Code</span>
            <span className="certs-col certs-col--name">Accreditation & Framework</span>
            <span className="certs-col certs-col--desc">Regulatory Scope & Verification</span>
            <span className="certs-col certs-col--issuer">Auditing Registrar</span>
            <span className="certs-col certs-col--status">Status</span>
          </div>

          <div className="certs-register__rows">
            {CERTIFICATIONS_LIST.map((cert) => (
              <div key={cert.code} className="certs-row">
                <div className="certs-col certs-col--code">
                  <span className="certs-code-badge">{cert.code}</span>
                </div>
                <div className="certs-col certs-col--name">
                  <strong className="certs-name">{cert.name}</strong>
                </div>
                <div className="certs-col certs-col--desc">
                  <p className="certs-description">{cert.description}</p>
                </div>
                <div className="certs-col certs-col--issuer">
                  <span className="certs-issuer">{cert.issuer}</span>
                </div>
                <div className="certs-col certs-col--status">
                  <span className="certs-status-badge">{cert.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
