import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FAQS } from "../data/siteContent.js";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-container" id="faq">
      <h2 className="faq-title">Frequently Asked Questions (FAQs)</h2>
      <div className="faq-list">
        {FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div className={`faq-row ${isOpen ? "open" : ""}`} key={item.question}>
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span className="faq-question-text">{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`faq-chevron ${isOpen ? "rotate" : ""}`}
                />
              </button>
              {isOpen && <div className="faq-answer-body">{item.answer}</div>}
            </div>
          );
        })}
      </div>
      <div className="faq-action-row">
        <button type="button" className="faq-more-btn">
          View more FAQ's
        </button>
      </div>
    </section>
  );
}
