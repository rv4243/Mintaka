import { Award, ShieldCheck, CheckCircle2, Download } from "lucide-react";
import { CERTIFICATIONS_LIST, COMPANY } from "../data/polymerData";

export default function CertificationsSection() {
  const handleDownloadCertPack = () => {
    const manifest = `=====================================================
MINTAKA POLYMERS - ACCREDITATION & COMPLIANCE SUMMARY
=====================================================
Issued by Mintaka Polymers Compliance & Regulatory Cell
Plant & HQ: ${COMPANY.address}
Corporate Verification: ${COMPANY.email}
=====================================================
CURRENT ACTIVE ACCREDITATIONS:

1. ISO 9001:2015 - Quality Management Systems (QMS)
   Scope: Synthesis qualification, warehousing, and global distribution of PP, PE & PVC.
   Accreditation Body: Bureau Veritas Certification

2. ISO 14001:2015 - Environmental Management Systems (EMS)
   Scope: Zero pellet loss stewardship, industrial emission control, recycling.
   Accreditation Body: TÜV SÜD South Asia

3. ISO 45001:2018 - Occupational Health and Safety Management
   Scope: Warehouse terminal handling, pneumatic bulk transit safety.
   Accreditation Body: BSI Group Compliance

4. ISO 22000:2018 - Food Safety Management Systems
   Scope: Virgin food-contact approved polyolefins for packaging and medical devices.
   Accreditation Body: DNV GL Business Assurance

5. ISO 50001:2018 - Energy Management Systems
   Scope: Energy conservation across compounding and storage facilities.
   Accreditation Body: SGS International

6. REACH & RoHS Regulation Conformance
   Declaration: Resins do not contain SVHC substances exceeding 0.1% w/w.
   Compliant with EU Directive 2011/65/EU and Regulation (EC) No 1907/2006.
=====================================================`;

    const blob = new Blob([manifest], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "MintakaPolymers_Compliance_Certificates_Manifest.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="certifications" className="section section--light certs-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <Award size={14} aria-hidden="true" />
            <span>Accreditations & Compliance</span>
          </div>
          <h2 className="section-title">Quality & Compliance Standards</h2>
          <p className="section-subtitle">
            Facilities, testing labs, and distribution hubs certified by premier global registrar bodies.
          </p>
        </div>

        <div className="certs-grid">
          {CERTIFICATIONS_LIST.map((cert) => (
            <article key={cert.code} className="cert-card">
              <div className="cert-card__top">
                <div className="cert-card__icon-box" aria-hidden="true">
                  <ShieldCheck size={20} />
                </div>
                <span className="cert-card__status">{cert.status}</span>
              </div>

              <div className="cert-card__code">{cert.code}</div>
              <h3 className="cert-card__title">{cert.name}</h3>
              <p className="cert-card__desc">{cert.description}</p>

              <div className="cert-card__footer">
                <span className="cert-card__issuer-label">Audit Registrar:</span>
                <span className="cert-card__issuer-name">{cert.issuer}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Certificate Pack Download Strip */}
        <div className="certs-download-bar">
          <div className="certs-download-info">
            <CheckCircle2 size={20} className="text-teal" />
            <div>
              <strong>Vendor Qualification Pack</strong>
              <p>Download complete compliance documents, audit questionnaires, and ISO certificates.</p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={handleDownloadCertPack}
          >
            <Download size={15} />
            <span>Download Compliance Pack</span>
          </button>
        </div>
      </div>
    </section>
  );
}
