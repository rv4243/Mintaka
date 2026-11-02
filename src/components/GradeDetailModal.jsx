import { useEffect } from "react";
import { X, Send, Download } from "lucide-react";
import { COMPANY } from "../data/polymerData";

export default function GradeDetailModal({ grade, isOpen, onClose, onQuoteGrade }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !grade) return null;

  const handleQuoteClick = () => {
    if (onQuoteGrade) {
      onQuoteGrade(grade);
    }
    onClose();
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      const isMobile = window.innerWidth <= 900;
      const navOffset = isMobile ? 74 : 94;
      const targetY = contactEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  };

  const handleDownloadStub = () => {
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
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-grade-title"
    >
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
              <strong className="prop-card__value tabular-num">{grade.mfi}</strong>
              <span className="prop-card__method">ASTM D1238 (230°C/2.16kg)</span>
            </div>
            <div className="prop-card">
              <span className="prop-card__label">Density / Specific Gravity</span>
              <strong className="prop-card__value tabular-num">{grade.density}</strong>
              <span className="prop-card__method">ASTM D792 / ISO 1183</span>
            </div>
            <div className="prop-card">
              <span className="prop-card__label">Tensile Strength @ Yield</span>
              <strong className="prop-card__value tabular-num">{grade.tensileYield}</strong>
              <span className="prop-card__method">ASTM D638 (50 mm/min)</span>
            </div>
            <div className="prop-card">
              <span className="prop-card__label">Flexural Modulus</span>
              <strong className="prop-card__value tabular-num">{grade.flexuralModulus}</strong>
              <span className="prop-card__method">ASTM D790 (1.3 mm/min)</span>
            </div>
          </div>

          <div className="modal-details-list">
            <div className="modal-detail-row">
              <strong className="modal-detail-key">Recommended Processing:</strong>
              <span className="modal-detail-val">{grade.processing}</span>
            </div>
            <div className="modal-detail-row">
              <strong className="modal-detail-key">Primary Applications:</strong>
              <span className="modal-detail-val">{grade.applications}</span>
            </div>
            <div className="modal-detail-row">
              <strong className="modal-detail-key">Additivation & Stabilization:</strong>
              <span className="modal-detail-val">{grade.features}</span>
            </div>
            <div className="modal-detail-row">
              <strong className="modal-detail-key">Quality Assurance:</strong>
              <span className="modal-detail-val">Certified Lot-specific Certificate of Analysis (CoA) with batch traceability</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn--secondary btn--md"
            onClick={handleDownloadStub}
          >
            <Download size={15} aria-hidden="true" />
            <span>Download Spec Sheet</span>
          </button>
          <button
            type="button"
            className="btn btn--primary btn--md"
            onClick={handleQuoteClick}
          >
            <Send size={15} aria-hidden="true" />
            <span>Request Quote for {grade.gradeCode}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
