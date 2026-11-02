import { useState, useMemo } from "react";
import { Search, RotateCcw, ChevronDown, FileText, Send } from "lucide-react";
import { TECHNICAL_SPEC_DATA } from "../data/polymerData";
import GradeDetailModal from "./GradeDetailModal";

export default function TechnicalSpecsTable({ selectedFamily = "ALL", onSelectFamily, onQuoteGrade }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProcess, setSelectedProcess] = useState("ALL");
  const [modalGrade, setModalGrade] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeFamily = selectedFamily || "ALL";

  const handleFamilyChange = (fam) => {
    if (onSelectFamily) {
      onSelectFamily(fam);
    }
  };

  const processOptions = [
    { value: "ALL", label: "All Processing Methods" },
    { value: "Injection", label: "Injection Moulding" },
    { value: "Film", label: "Blown & Cast Film" },
    { value: "Pipe", label: "Pipe & Profile Extrusion" },
    { value: "Blow", label: "Extrusion Blow Moulding" },
    { value: "Raffia", label: "Raffia & Woven Tape" },
  ];

  const filteredGrades = useMemo(() => {
    return TECHNICAL_SPEC_DATA.filter((item) => {
      if (activeFamily !== "ALL" && item.family !== activeFamily) {
        return false;
      }

      if (selectedProcess !== "ALL") {
        const procMatch = item.processing.toLowerCase().includes(selectedProcess.toLowerCase());
        if (!procMatch) return false;
      }

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesCode = item.gradeCode.toLowerCase().includes(query);
        const matchesType = item.type.toLowerCase().includes(query);
        const matchesApp = item.applications.toLowerCase().includes(query);
        const matchesProc = item.processing.toLowerCase().includes(query);
        const matchesFeatures = item.features.toLowerCase().includes(query);
        if (!matchesCode && !matchesType && !matchesApp && !matchesProc && !matchesFeatures) {
          return false;
        }
      }

      return true;
    });
  }, [activeFamily, selectedProcess, searchQuery]);

  const handleOpenModal = (grade) => {
    setModalGrade(grade);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedProcess("ALL");
    if (onSelectFamily) onSelectFamily("ALL");
  };

  const handleQuoteClick = (grade) => {
    if (onQuoteGrade) onQuoteGrade(grade);
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      const isMobile = window.innerWidth <= 900;
      const navOffset = isMobile ? 74 : 94;
      const targetY = contactEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="section section--light specs-section" aria-label="Products and Technical Specifications">
      <span id="materials" className="section-anchor" aria-hidden="true" />
      <span id="specifications" className="section-anchor" aria-hidden="true" />
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Products & Technical Specifications</h2>
          <p className="section-lead">
            Batch-tested virgin and compounding resins with certified melt flow, density, and mechanical specs.
          </p>
        </header>

        {/* Filter Controls Bar */}
        <div className="specs-controls">
          {/* Family Tabs */}
          <div className="specs-family-tabs" role="tablist" aria-label="Filter by polymer family">
            <button
              type="button"
              role="tab"
              aria-selected={activeFamily === "ALL"}
              className={`family-tab ${activeFamily === "ALL" ? "family-tab--active" : ""}`}
              onClick={() => handleFamilyChange("ALL")}
            >
              All Resins ({TECHNICAL_SPEC_DATA.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFamily === "PP"}
              className={`family-tab ${activeFamily === "PP" ? "family-tab--active" : ""}`}
              onClick={() => handleFamilyChange("PP")}
            >
              Polypropylene (PP)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFamily === "PE"}
              className={`family-tab ${activeFamily === "PE" ? "family-tab--active" : ""}`}
              onClick={() => handleFamilyChange("PE")}
            >
              Polyethylene (HDPE/LDPE/LLDPE)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFamily === "PVC"}
              className={`family-tab ${activeFamily === "PVC" ? "family-tab--active" : ""}`}
              onClick={() => handleFamilyChange("PVC")}
            >
              Suspension PVC
            </button>
          </div>

          {/* Search & Process Selector */}
          <div className="specs-filter-row">
            <div className="specs-search-box">
              <Search size={16} className="specs-search-icon" aria-hidden="true" />
              <input
                type="text"
                className="specs-search-input"
                placeholder="Search grade code (e.g. H030SG, B52A), MFI, or application..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search polymer specifications"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="specs-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="specs-select-wrapper">
              <select
                className="specs-select"
                value={selectedProcess}
                onChange={(e) => setSelectedProcess(e.target.value)}
                aria-label="Filter by processing method"
              >
                {processOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="specs-select-arrow" aria-hidden="true" />
            </div>

            {(searchQuery || selectedProcess !== "ALL" || activeFamily !== "ALL") && (
              <button
                type="button"
                className="specs-reset-btn"
                onClick={handleResetFilters}
                title="Reset all filters"
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="specs-status-bar">
          <span className="specs-count">
            Showing <strong>{filteredGrades.length}</strong> of {TECHNICAL_SPEC_DATA.length} technical resin grades
          </span>
          <span className="specs-hint">
            Click any grade code or TDS for ASTM test parameters and direct quote prefill.
          </span>
        </div>

        {/* Desktop Specifications Table */}
        <div className="specs-table-container">
          <table className="specs-table">
            <thead>
              <tr>
                <th scope="col" className="specs-th specs-th--code">Grade Code</th>
                <th scope="col" className="specs-th">Family / Sub-Type</th>
                <th scope="col" className="specs-th specs-th--num">MFI (g/10min)</th>
                <th scope="col" className="specs-th specs-th--num">Density</th>
                <th scope="col" className="specs-th">Processing Method</th>
                <th scope="col" className="specs-th">Target Applications</th>
                <th scope="col" className="specs-th specs-th--actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrades.length > 0 ? (
                filteredGrades.map((grade) => (
                  <tr key={grade.id} className="specs-row">
                    <td className="specs-td specs-td--code">
                      <button
                        type="button"
                        className="specs-code-btn"
                        onClick={() => handleOpenModal(grade)}
                        title={`View technical datasheet for ${grade.gradeCode}`}
                      >
                        <strong>{grade.gradeCode}</strong>
                      </button>
                    </td>
                    <td className="specs-td specs-td--type">
                      <span className="specs-family-badge">{grade.family}</span>
                      <span className="specs-type-label">{grade.type}</span>
                    </td>
                    <td className="specs-td specs-td--num">
                      <span className="tabular-num">{grade.mfi}</span>
                    </td>
                    <td className="specs-td specs-td--num">
                      <span className="tabular-num">{grade.density}</span>
                    </td>
                    <td className="specs-td specs-td--proc">{grade.processing}</td>
                    <td className="specs-td specs-td--apps">{grade.applications}</td>
                    <td className="specs-td specs-td--actions">
                      <div className="specs-action-group">
                        <button
                          type="button"
                          className="btn btn--secondary btn--xs"
                          onClick={() => handleOpenModal(grade)}
                          title="Open full technical datasheet"
                        >
                          <FileText size={13} aria-hidden="true" />
                          <span>TDS</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn--primary btn--xs"
                          onClick={() => handleQuoteClick(grade)}
                          title="Prefill RFQ with this grade"
                        >
                          <Send size={13} aria-hidden="true" />
                          <span>Quote</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="specs-empty">
                    <p>No polymer grades match your current filters.</p>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      onClick={handleResetFilters}
                    >
                      Reset All Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Specifications Cards */}
        <div className="specs-mobile-cards">
          {filteredGrades.length > 0 ? (
            filteredGrades.map((grade) => (
              <article key={grade.id} className="specs-mobile-card">
                <div className="specs-mobile-card__head">
                  <div>
                    <h3 className="specs-mobile-card__code">{grade.gradeCode}</h3>
                    <span className="specs-mobile-card__sub">{grade.family} · {grade.type}</span>
                  </div>
                  <span className="specs-family-badge">{grade.family}</span>
                </div>

                <div className="specs-mobile-card__grid">
                  <div className="specs-mobile-prop">
                    <span className="specs-mobile-prop__label">Melt Flow Index (MFI)</span>
                    <strong className="specs-mobile-prop__val tabular-num">{grade.mfi}</strong>
                  </div>
                  <div className="specs-mobile-prop">
                    <span className="specs-mobile-prop__label">Density</span>
                    <strong className="specs-mobile-prop__val tabular-num">{grade.density}</strong>
                  </div>
                  <div className="specs-mobile-prop">
                    <span className="specs-mobile-prop__label">Tensile Yield</span>
                    <strong className="specs-mobile-prop__val tabular-num">{grade.tensileYield}</strong>
                  </div>
                  <div className="specs-mobile-prop">
                    <span className="specs-mobile-prop__label">Flexural Modulus</span>
                    <strong className="specs-mobile-prop__val tabular-num">{grade.flexuralModulus}</strong>
                  </div>
                </div>

                <div className="specs-mobile-card__details">
                  <div className="specs-mobile-detail">
                    <strong>Processing:</strong> {grade.processing}
                  </div>
                  <div className="specs-mobile-detail">
                    <strong>Applications:</strong> {grade.applications}
                  </div>
                </div>

                <div className="specs-mobile-card__actions">
                  <button
                    type="button"
                    className="btn btn--secondary btn--sm btn--flex"
                    onClick={() => handleOpenModal(grade)}
                  >
                    <FileText size={14} aria-hidden="true" />
                    <span>View TDS Sheet</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn--primary btn--sm btn--flex"
                    onClick={() => handleQuoteClick(grade)}
                  >
                    <Send size={14} aria-hidden="true" />
                    <span>Request Quote</span>
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="specs-empty">
              <p>No polymer grades match your current filters.</p>
              <button
                type="button"
                className="btn btn--secondary btn--sm"
                onClick={handleResetFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Full Technical Data Sheet (TDS) Modal */}
      {isModalOpen && (
        <GradeDetailModal
          grade={modalGrade}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onQuoteGrade={onQuoteGrade}
        />
      )}
    </section>
  );
}
