import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { FAQ_LIST } from "../data/polymerData";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="section faq-section" aria-label="Frequently Asked Questions">
      <div className="container-sm">
        <div className="section-head">
          <div className="section-badge">
            <HelpCircle size={14} aria-hidden="true" />
            <span>Procurement FAQ</span>
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Essential information regarding minimum orders, packaging configurations, and technical support.
          </p>
        </div>

        <div className="faq-accordion">
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question__text">{faq.question}</span>
                  <span className="faq-question__icon" aria-hidden="true">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
