import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Copy, Check, MessageSquare, Building, AlertCircle } from "lucide-react";
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
      ? `Please provide price quotation and delivery timeline for ${prefilledGrade.gradeCode} (${prefilledGrade.type}).`
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
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please complete all required fields (Name, Email, Requirement Details).");
      return;
    }

    const subject = `RFQ: ${form.polymerFamily} - ${form.company || form.name}`;
    const body = constructEmailBody();

    // Trigger user's mail client (Preserving existing logic)
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
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <MessageSquare size={14} aria-hidden="true" />
            <span>Commercial Inquiries</span>
          </div>
          <h2 className="section-title">Request for Quotation (RFQ)</h2>
          <p className="section-subtitle">
            Get custom pricing, lot CoAs, and dispatch schedules. Response within 4 business hours.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Commercial Contact Info */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <h3 className="contact-info-card__title">Sales & Procurement Desk</h3>
              <p className="contact-info-card__lead">
                Contact our trading team directly or submit the RFQ for factory pricing.
              </p>

              <dl className="contact-dl">
                <div className="contact-dl__item">
                  <dt>
                    <Mail size={16} className="contact-dl__icon" aria-hidden="true" />
                    <span>Commercial Sales Email</span>
                  </dt>
                  <dd>
                    <a href={`mailto:${COMPANY.email}`} className="contact-link">
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>

                <div className="contact-dl__item">
                  <dt>
                    <Phone size={16} className="contact-dl__icon" aria-hidden="true" />
                    <span>Direct Telephone Desk</span>
                  </dt>
                  <dd>
                    <a href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, "")}`} className="contact-link">
                      {COMPANY.phone}
                    </a>
                  </dd>
                </div>

                <div className="contact-dl__item">
                  <dt>
                    <Building size={16} className="contact-dl__icon" aria-hidden="true" />
                    <span>Technical Support Desk</span>
                  </dt>
                  <dd>
                    <a href={`mailto:${COMPANY.supportEmail}`} className="contact-link">
                      {COMPANY.supportEmail}
                    </a>
                  </dd>
                </div>

                <div className="contact-dl__item">
                  <dt>
                    <MapPin size={16} className="contact-dl__icon" aria-hidden="true" />
                    <span>Plant & Central Warehouse Address</span>
                  </dt>
                  <dd>{COMPANY.address}</dd>
                </div>

                <div className="contact-dl__item">
                  <dt>
                    <Clock size={16} className="contact-dl__icon" aria-hidden="true" />
                    <span>Working & Dispatch Schedule</span>
                  </dt>
                  <dd>{COMPANY.dispatchHours}</dd>
                </div>
              </dl>

              {/* Response SLA badge */}
              <div className="contact-sla-badge">
                <CheckCircle2 size={16} className="text-teal" aria-hidden="true" />
                <span>Standard commercial quote turnaround: <strong>Under 4 hours</strong></span>
              </div>
            </div>

            {/* Live RFQ Summary Box */}
            <div className="rfq-summary-card">
              <div className="rfq-summary-card__header">
                <h4>RFQ Summary Preview</h4>
                <button
                  type="button"
                  className="btn-copy"
                  onClick={handleCopySummary}
                  title="Copy quotation parameters to clipboard"
                >
                  {copied ? <Check size={14} className="text-teal" /> : <Copy size={14} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <div className="rfq-summary-card__content">
                <div className="rfq-summary-row">
                  <span>Selected Polymer:</span>
                  <strong>{form.polymerFamily}</strong>
                </div>
                <div className="rfq-summary-row">
                  <span>Target Grade:</span>
                  <strong>{form.gradeRequirement || "Open / Specification-based"}</strong>
                </div>
                <div className="rfq-summary-row">
                  <span>Order Volume:</span>
                  <strong>{form.volume}</strong>
                </div>
                <div className="rfq-summary-row">
                  <span>Destination:</span>
                  <strong>{form.deliveryLocation || "To be specified"}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Comprehensive RFQ Form */}
          <div className="contact-form-col">
            <form className="rfq-form" onSubmit={handleSubmit} noValidate>
              <div className="rfq-form__header">
                <h3>Submit Formal Quotation Request</h3>
                <p>Fill out the parameters below to open your configured email client ready to dispatch.</p>
              </div>

              {errorMsg && (
                <div className="form-alert form-alert--error" role="alert">
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Contact Information Row */}
              <div className="form-row form-row--2">
                <div className="form-group">
                  <label htmlFor="rfq-name" className="form-label">
                    Full Name <span className="text-red">*</span>
                  </label>
                  <input
                    id="rfq-name"
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Rajesh Kumar"
                    value={form.name}
                    onChange={handleChange("name")}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rfq-email" className="form-label">
                    Corporate Email <span className="text-red">*</span>
                  </label>
                  <input
                    id="rfq-email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="e.g. r.kumar@manufacturing.com"
                    value={form.email}
                    onChange={handleChange("email")}
                  />
                </div>
              </div>

              <div className="form-row form-row--2">
                <div className="form-group">
                  <label htmlFor="rfq-company" className="form-label">
                    Company / Plant Name
                  </label>
                  <input
                    id="rfq-company"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Apex Polymers Pvt Ltd"
                    value={form.company}
                    onChange={handleChange("company")}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rfq-phone" className="form-label">
                    Contact Phone / WhatsApp
                  </label>
                  <input
                    id="rfq-phone"
                    type="tel"
                    className="form-input"
                    placeholder="e.g. +91 98000 00000"
                    value={form.phone}
                    onChange={handleChange("phone")}
                  />
                </div>
              </div>

              {/* Technical Specifications Row */}
              <div className="form-row form-row--3">
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
                    <option value="PP">Polypropylene (PP)</option>
                    <option value="PE">Polyethylene (HDPE/LDPE/LLDPE)</option>
                    <option value="PVC">Polyvinyl Chloride (PVC)</option>
                    <option value="Custom Compounds">Specialty Compounds / Masterbatches</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rfq-grade" className="form-label">
                    Specific Grade / MFI
                  </label>
                  <input
                    id="rfq-grade"
                    type="text"
                    className="form-input"
                    placeholder="e.g. PP H030SG, HDPE B52A"
                    value={form.gradeRequirement}
                    onChange={handleChange("gradeRequirement")}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rfq-volume" className="form-label">
                    Estimated Volume
                  </label>
                  <select
                    id="rfq-volume"
                    className="form-select"
                    value={form.volume}
                    onChange={handleChange("volume")}
                  >
                    <option value="5-10 MT (Trial / Sample)">5 - 10 Metric Tons (Trial Lot)</option>
                    <option value="10-25 MT (1 FCL)">10 - 25 MT (1 FCL Container)</option>
                    <option value="25-50 MT">25 - 50 Metric Tons</option>
                    <option value="50-100 MT">50 - 100 Metric Tons</option>
                    <option value="100+ MT (Monthly Contract)">100+ MT (Monthly Rolling Supply)</option>
                  </select>
                </div>
              </div>

              <div className="form-row form-row--2">
                <div className="form-group">
                  <label htmlFor="rfq-process" className="form-label">
                    Conversion Method
                  </label>
                  <select
                    id="rfq-process"
                    className="form-select"
                    value={form.processingMethod}
                    onChange={handleChange("processingMethod")}
                  >
                    <option value="Injection Moulding">Injection Moulding</option>
                    <option value="Blown Film Extrusion">Blown Film Extrusion</option>
                    <option value="Pipe & Profile Extrusion">Pipe & Profile Extrusion</option>
                    <option value="Extrusion Blow Moulding">Extrusion Blow Moulding</option>
                    <option value="Raffia & Woven Sacks">Raffia & Woven Sacks</option>
                    <option value="Rotational Moulding">Rotational Moulding</option>
                    <option value="Compounding & Masterbatch">Compounding & Masterbatch</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rfq-location" className="form-label">
                    Delivery Destination / Port
                  </label>
                  <input
                    id="rfq-location"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Chennai, Gujarat, Nhava Sheva, Colombo..."
                    value={form.deliveryLocation}
                    onChange={handleChange("deliveryLocation")}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rfq-message" className="form-label">
                  Requirement Details & Processing Notes <span className="text-red">*</span>
                </label>
                <textarea
                  id="rfq-message"
                  required
                  rows={4}
                  className="form-textarea"
                  placeholder="Detail your application, required MFI tolerance, food-contact or UV stabilization needs, target dispatch date, or request physical resin sample..."
                  value={form.message}
                  onChange={handleChange("message")}
                />
              </div>

              <div className="rfq-form__actions">
                <button type="submit" className="btn btn--primary btn--md">
                  <Send size={16} aria-hidden="true" />
                  <span>Generate & Send Enquiry</span>
                </button>

                <button
                  type="button"
                  className="btn btn--secondary btn--md"
                  onClick={handleCopySummary}
                >
                  {copied ? <Check size={16} className="text-teal" /> : <Copy size={16} />}
                  <span>{copied ? "Copied to Clipboard!" : "Copy RFQ Text"}</span>
                </button>
              </div>

              {sent && (
                <div className="form-alert form-alert--success" role="status">
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>RFQ Generated Successfully!</strong>
                    <p>Your default email client has been opened with the complete quotation payload addressed to {COMPANY.email}. If your email app did not open automatically, click &ldquo;Copy RFQ Text&rdquo; and email us directly.</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
