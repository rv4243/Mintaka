import { useState } from "react";
import { Send, Copy, Check, AlertCircle } from "lucide-react";
import { COMPANY } from "../data/polymerData";

export default function ContactRFQSection({ prefilledGrade, prefilledFamily }) {
  const [form, setForm] = useState(() => ({
    name: "",
    email: "",
    phone: "",
    company: "",
    polymerFamily: prefilledGrade?.family || prefilledFamily || "PP",
    gradeRequirement: prefilledGrade?.gradeCode || "",
    volume: "10-25 MT (1 FCL)",
    deliveryLocation: "",
    processingMethod: prefilledGrade?.processing || "Injection Moulding",
    message: prefilledGrade
      ? `Please provide price quotation, available packaging, and delivery schedule for ${prefilledGrade.gradeCode} (${prefilledGrade.type}).`
      : "",
  }));

  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (sent) setSent(false);
    if (errorMsg) setErrorMsg("");
  };

  const constructEmailBody = () => {
    return `=== REQUEST FOR QUOTATION (RFQ) ===
Name: ${form.name}
Company / Plant: ${form.company || "Not Specified"}
Email: ${form.email}
Phone: ${form.phone || "Not Specified"}
Delivery Plant Location: ${form.deliveryLocation || "Not Specified"}

--- TECHNICAL REQUIREMENTS ---
Polymer Family: ${form.polymerFamily}
Grade / Specification: ${form.gradeRequirement || "Standard Commercial Grade"}
Estimated Order Volume: ${form.volume}
Target Processing Method: ${form.processingMethod}

--- SPECIFIC NOTES / MFI TOLERANCE ---
${form.message || "Please share quotation, lot CoA, and availability."}

=======================================
Submitted via Mintaka Polymers Procurement Portal`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setErrorMsg("Please complete all required fields (Name and Official Email).");
      return;
    }

    const subject = `RFQ: ${form.polymerFamily} - ${form.company || form.name}`;
    const body = constructEmailBody();

    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const handleCopySummary = () => {
    const summary = constructEmailBody();
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="section contact-section" aria-label="Commercial Inquiries and RFQ">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Commercial Quotation Desk (RFQ)</h2>
          <p className="section-lead">
            Request price indication, packaging options, and dispatch schedules from Hosur, Tamil Nadu, India.
          </p>
        </header>

        <div className="contact-layout">
          {/* Left Column: Direct Commercial Office Information */}
          <aside className="contact-desk">
            <h3 className="contact-subhead">Commercial Sales Desk</h3>
            <p className="contact-desk__intro">
              Direct access to our commercial and logistics managers. Written quotes include lot CoA data and freight schedules.
            </p>

            <div className="contact-desk__entries">
              <div className="contact-desk__entry">
                <span className="contact-desk__label">Email Inquiries:</span>
                <a href={`mailto:${COMPANY.email}`} className="contact-desk__val contact-desk__val--link">
                  {COMPANY.email}
                </a>
              </div>

              <div className="contact-desk__entry">
                <span className="contact-desk__label">Direct Telephone / WhatsApp:</span>
                <a href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`} className="contact-desk__val contact-desk__val--link">
                  {COMPANY.phone}
                </a>
              </div>

              <div className="contact-desk__entry">
                <span className="contact-desk__label">Terminal & Compounding Hub:</span>
                <span className="contact-desk__val">
                  {COMPANY.address}
                </span>
              </div>

              <div className="contact-desk__entry">
                <span className="contact-desk__label">Order Dispatch Hours:</span>
                <span className="contact-desk__val">
                  {COMPANY.dispatchHours}
                </span>
              </div>
            </div>

            <div className="contact-desk__sla-box">
              <strong>Turnaround SLA:</strong> Quotes provided within 4 business hours for complete specifications.
            </div>
          </aside>

          {/* Right Column: High-Utility Procurement Form */}
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="rfq-form">
              {errorMsg && (
                <div className="rfq-alert rfq-alert--error" role="alert">
                  <AlertCircle size={16} aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {sent && (
                <div className="rfq-alert rfq-alert--success" role="alert">
                  <span>Your email client has been opened with your prefilled RFQ. You can also copy the summary below.</span>
                </div>
              )}

              <div className="rfq-form__row">
                <div className="form-group">
                  <label htmlFor="rfq-name" className="form-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="rfq-name"
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Suresh Kumar"
                    value={form.name}
                    onChange={handleChange("name")}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rfq-email" className="form-label">
                    Work Email <span className="req">*</span>
                  </label>
                  <input
                    id="rfq-email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="e.g. procurement@moldingplant.com"
                    value={form.email}
                    onChange={handleChange("email")}
                  />
                </div>
              </div>

              <div className="rfq-form__row">
                <div className="form-group">
                  <label htmlFor="rfq-phone" className="form-label">
                    Contact Phone / Mobile
                  </label>
                  <input
                    id="rfq-phone"
                    type="tel"
                    className="form-input"
                    placeholder="e.g. +91 98765 43210"
                    value={form.phone}
                    onChange={handleChange("phone")}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rfq-company" className="form-label">
                    Company / Conversion Plant
                  </label>
                  <input
                    id="rfq-company"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Apex Polymer Technologies"
                    value={form.company}
                    onChange={handleChange("company")}
                  />
                </div>
              </div>

              <div className="rfq-form__row">
                <div className="form-group">
                  <label htmlFor="rfq-family" className="form-label">
                    Polymer Family
                  </label>
                  <select
                    id="rfq-family"
                    className="form-select"
                    value={form.polymerFamily}
                    onChange={handleChange("polymerFamily")}
                  >
                    <option value="PP">Polypropylene (PP Resins)</option>
                    <option value="PE">Polyethylene (HDPE / LDPE / LLDPE)</option>
                    <option value="PVC">Suspension PVC (K57 / K67 / K70)</option>
                    <option value="PCR">Post-Consumer Recycled (PCR Compounds)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rfq-grade" className="form-label">
                    Target Grade / MFI Specification
                  </label>
                  <input
                    id="rfq-grade"
                    type="text"
                    className="form-input"
                    placeholder="e.g. PP H030SG, HDPE B52A, PVC K67"
                    value={form.gradeRequirement}
                    onChange={handleChange("gradeRequirement")}
                  />
                </div>
              </div>

              <div className="rfq-form__row">
                <div className="form-group">
                  <label htmlFor="rfq-volume" className="form-label">
                    Estimated Order Volume
                  </label>
                  <select
                    id="rfq-volume"
                    className="form-select"
                    value={form.volume}
                    onChange={handleChange("volume")}
                  >
                    <option value="5-10 MT (Trial Lot)">5–10 MT (Trial / Sample Lot)</option>
                    <option value="10-25 MT (1 FCL)">10–25 MT (1 Full Container Load)</option>
                    <option value="25-50 MT">25–50 MT (Multi-Axle Truckload)</option>
                    <option value="50-100 MT">50–100 MT (Monthly Contract Allocation)</option>
                    <option value="100+ MT (Annual Tender)">100+ MT (Annual Rolling Supply Tender)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rfq-location" className="form-label">
                    Plant Delivery Location / Port
                  </label>
                  <input
                    id="rfq-location"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Pune, Chennai, Colombo, Dubai"
                    value={form.deliveryLocation}
                    onChange={handleChange("deliveryLocation")}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rfq-message" className="form-label">
                  Processing Method & Technical Requirements
                </label>
                <textarea
                  id="rfq-message"
                  rows={3}
                  className="form-textarea"
                  placeholder="Specify tool shrinkage requirements, MFI tolerances, mold cycle times, or required certifications (e.g. FDA food contact)."
                  value={form.message}
                  onChange={handleChange("message")}
                />
              </div>

              <div className="rfq-actions">
                <button type="submit" className="btn btn--primary btn--md">
                  <Send size={15} aria-hidden="true" />
                  <span>Transmit RFQ via Email</span>
                </button>

                <button
                  type="button"
                  className="btn btn--secondary btn--md"
                  onClick={handleCopySummary}
                >
                  {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  <span>{copied ? "Copied to Clipboard" : "Copy RFQ Summary"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
