import { useState, useMemo } from "react";
import { Search, Filter, Eye, Send, FileSpreadsheet, RotateCcw, ChevronDown } from "lucide-react";
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
    { value: "Film", label: "Blown / Extrusion Film" },
    { value: "Pipe", label: "Pipe & Profile Extrusion" },
    { value: "Blow", label: "Extrusion Blow Moulding" },
    { value: "Raffia", label: "Raffia & Woven Tape" },
  ];

  const filteredGrades = useMemo(() => {
    return TECHNICAL_SPEC_DATA.filter((item) => {
      // Family filter
      if (activeFamily !== "ALL" && item.family !== activeFamily) {
        return false;
      }

      // Process filter
      if (selectedProcess !== "ALL") {
        const procMatch = item.processing.toLowerCase().includes(selectedProcess.toLowerCase());
        if (!procMatch) return false;
      }

      // Search query filter
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

  return (
    <section id="specifications" className="section section--light specs-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <FileSpreadsheet size={14} aria-hidden="true" />
            <span>Interactive Database</span>
          </div>
          <h2 className="section-title">Technical Specifications & Resin Finder</h2>
          <p className="section-subtitle">
            Filter our standard portfolio by polymer family, melt flow rate, density, or conversion process.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="specs-controls">
          {/* Family Tabs */}
          <div className="specs-tabs" role="tablist" aria-label="Filter by polymer family">
            {[
              { id: "ALL", label: "All Polymers", count: TECHNICAL_SPEC_DATA.length },
              { id: "PP", label: "Polypropylene (PP)", count: 4 },
              { id: "PE", label: "Polyethylene (PE)", count: 4 },
              { id: "PVC", label: "Polyvinyl Chloride (PVC)", count: 3 },
            ].map((tab) => {
              const isActive = activeFamily === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`specs-tab ${isActive ? "specs-tab--active" : ""}`}
                  onClick={() => handleFamilyChange(tab.id)}
                >
                  <span>{tab.label}</span>
                  <span className="specs-tab__count">{tab.count}</span>
                </button>
              );
            })}
          </div>

          {/* Search and Secondary Filter Row */}
          <div className="specs-filter-row">
            <div className="specs-search">
              <Search className="specs-search__icon" size={16} aria-hidden="true" />
              <input
                type="text"
                className="specs-search__input"
                placeholder="Search grade code (e.g. H030, B52A, K67), pipe, film, injection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search polymer specifications"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="specs-search__clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="specs-select-wrapper">
              <Filter className="specs-select__icon" size={15} aria-hidden="true" />
              <select
                className="specs-select"
                value={selectedProcess}
                onChange={(e) => setSelectedProcess(e.target.value)}
                aria-label="Filter by conversion method"
              >
                {processOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="specs-select__chevron" size={14} aria-hidden="true" />
            </div>

            {(activeFamily !== "ALL" || searchQuery || selectedProcess !== "ALL") && (
              <button
                type="button"
                className="btn btn--ghost btn--sm specs-reset-btn"
                onClick={handleResetFilters}
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="specs-status-bar">
          <span className="specs-count">
            Showing <strong>{filteredGrades.length}</strong> of {TECHNICAL_SPEC_DATA.length} verified grades
          </span>
          <span className="specs-hint">
            Click &ldquo;View TDS&rdquo; for ASTM test standards or &ldquo;Quote&rdquo; to populate the RFQ form.
          </span>
        </div>

        {/* Table View */}
        {filteredGrades.length > 0 ? (
          <div className="table-responsive">
            <table className="specs-table" aria-label="Polymer Technical Specifications">
              <thead>
                <tr>
                  <th scope="col" className="th--grade">Grade Code</th>
                  <th scope="col" className="th--type">Resin Sub-Type</th>
                  <th scope="col" className="th--mfi">MFI / K-Value</th>
                  <th scope="col" className="th--density">Density</th>
                  <th scope="col" className="th--proc">Recommended Process</th>
                  <th scope="col" className="th--app">Primary Applications</th>
                  <th scope="col" className="th--action">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map((g) => (
                  <tr key={g.id} className="specs-tr">
                    <td className="td--grade">
                      <div className="grade-badge-group">
                        <span className={`family-badge family-badge--${g.family.toLowerCase()}`}>
                          {g.family}
                        </span>
                        <strong className="grade-code-text">{g.gradeCode}</strong>
                      </div>
                    </td>
                    <td className="td--type">{g.type}</td>
                    <td className="td--mfi">
                      <code className="tech-val">{g.mfi}</code>
                    </td>
                    <td className="td--density">
                      <code className="tech-val">{g.density}</code>
                    </td>
                    <td className="td--proc">{g.processing}</td>
                    <td className="td--app">
                      <span className="app-summary">{g.applications}</span>
                    </td>
                    <td className="td--action">
                      <div className="action-button-group">
                        <button
                          type="button"
                          className="btn-table btn-table--view"
                          onClick={() => handleOpenModal(g)}
                          title={`View TDS for ${g.gradeCode}`}
                          aria-label={`View full technical data sheet for ${g.gradeCode}`}
                        >
                          <Eye size={14} />
                          <span>TDS</span>
                        </button>
                        <button
                          type="button"
                          className="btn-table btn-table--quote"
                          onClick={() => {
                            if (onQuoteGrade) onQuoteGrade(g);
                            const contactEl = document.getElementById("contact");
                            if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
                          }}
                          title={`Request quote for ${g.gradeCode}`}
                          aria-label={`Request quote for ${g.gradeCode}`}
                        >
                          <Send size={13} />
                          <span>Quote</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="specs-empty-state">
            <div className="specs-empty-icon">
              <Search size={32} />
            </div>
            <h3 className="specs-empty-title">No matching polymer grades found</h3>
            <p className="specs-empty-desc">
              We couldn&apos;t find any grades matching &ldquo;{searchQuery}&rdquo; within the selected filters. Our compounding team can supply custom MFI / density resin modifications.
            </p>
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={handleResetFilters}
            >
              <RotateCcw size={15} />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Technical Data Sheet Modal */}
        <GradeDetailModal
          grade={modalGrade}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onQuoteGrade={onQuoteGrade}
        />
      </div>
    </section>
  );
}
