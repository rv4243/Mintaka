import { X, CheckCircle2, Send, Download, Layers, ShieldCheck, Factory } from "lucide-react";
import { COMPANY } from "../data/polymerData";

export default function GradeDetailModal({ grade, isOpen, onClose, onQuoteGrade }) {
  if (!isOpen || !grade) return null;

  const handleQuoteClick = () => {
    if (onQuoteGrade) {
      onQuoteGrade(grade);
    }
    onClose();
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadStub = () => {
    // Generate a clean text datasheet download
    const content = `=====================================================
MINTAKA POLYMERS - TECHNICAL DATA SHEET (TDS)
=====================================================
Company: ${COMPANY.name}
Dispatch Office: ${COMPANY.address}
Contact: ${COMPANY.email} | ${COMPANY.phone}
=====================================================
GRADE SPECIFICATION: ${grade.gradeCode}
Polymer Family: ${grade.familyLabel} (${grade.family})
Sub-Type: ${grade.type}
Melt Flow Index (MFI): ${grade.mfi}
Density / Bulk Density: ${grade.density}
Recommended Processing: ${grade.processing}
Tensile Yield Strength: ${grade.tensileYield}
Flexural Modulus: ${grade.flexuralModulus}
Target Applications: ${grade.applications}
Key Features: ${grade.features}
=====================================================
Quality Compliance: Lot-traceable Certificate of Analysis (CoA)
Accreditation: ISO 9001:2015, ISO 14001:2015, REACH & RoHS
=====================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `TDS_${grade.gradeCode.replace(/[^a-zA-Z0-9_-]/g, "_")}_MintakaPolymers.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-grade-title">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header__info">
            <div className="modal-header__tags">
              <span className="modal-badge modal-badge--family">{grade.family}</span>
              <span className="modal-badge">{grade.type}</span>
            </div>
            <h3 id="modal-grade-title" className="modal-title">
              {grade.gradeCode} Technical Data Sheet
            </h3>
            <span className="modal-subtitle">{grade.familyLabel} Industrial Resin</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close specification sheet"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-summary-box">
            <h4 className="modal-section-title">Polymer Overview</h4>
            <p className="modal-text">
              <strong>{grade.gradeCode}</strong> is an engineered <strong>{grade.type}</strong> grade formulated for <strong>{grade.processing}</strong>. Characterized by {grade.features.toLowerCase()}.
            </p>
          </div>

          <div className="modal-props-grid">
            <div className="prop-card">
              <span className="prop-card__label">Melt Flow Index (MFI)</span>
              <strong className="prop-card__value">{grade.mfi}</strong>
              <span className="prop-card__test">ASTM D1238</span>
            </div>

            <div className="prop-card">
              <span className="prop-card__label">Density / Bulk</span>
              <strong className="prop-card__value">{grade.density}</strong>
              <span className="prop-card__test">ASTM D792</span>
            </div>

            <div className="prop-card">
              <span className="prop-card__label">Tensile Yield Strength</span>
              <strong className="prop-card__value">{grade.tensileYield}</strong>
              <span className="prop-card__test">ASTM D638</span>
            </div>

            <div className="prop-card">
              <span className="prop-card__label">Flexural Modulus</span>
              <strong className="prop-card__value">{grade.flexuralModulus}</strong>
              <span className="prop-card__test">ASTM D790</span>
            </div>
          </div>

          <div className="modal-details-list">
            <div className="detail-row">
              <div className="detail-row__icon"><Factory size={16} /></div>
              <div>
                <strong>Recommended Processing Method:</strong>
                <p>{grade.processing}</p>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-row__icon"><Layers size={16} /></div>
              <div>
                <strong>Primary Target Applications:</strong>
                <p>{grade.applications}</p>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-row__icon"><ShieldCheck size={16} /></div>
              <div>
                <strong>Key Performance Highlights:</strong>
                <p>{grade.features}</p>
              </div>
            </div>
          </div>

          <div className="modal-dispatch-info">
            <div className="dispatch-badge">
              <CheckCircle2 size={16} className="text-teal" />
              <span>Full Certificate of Analysis (CoA) provided per dispatch lot</span>
            </div>
            <div className="dispatch-badge">
              <CheckCircle2 size={16} className="text-teal" />
              <span>Packaging: 25 kg multi-wall bags or 1,000 kg FIBC jumbo totes</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            onClick={handleDownloadStub}
          >
            <Download size={15} />
            <span>Download Spec File</span>
          </button>

          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={handleQuoteClick}
          >
            <Send size={15} />
            <span>Inquire for {grade.gradeCode}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
