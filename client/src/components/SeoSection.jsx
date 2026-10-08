import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FOOTER_DATA } from "../data/siteContent.js";

export default function SeoSection() {
  const [expanded, setExpanded] = useState(false);
  const seo = FOOTER_DATA.seoContent;

  return (
    <section className="seo-section">
      <div className="seo-section-inner">
        <h2 className="seo-main-title">{seo.title}</h2>
        <p className="seo-intro-text">{seo.intro}</p>

        {expanded && (
          <div className="seo-expanded-content">
            {/* Categories on Rent */}
            <h2 className="seo-sub-title">{seo.categoriesTitle}</h2>
            {seo.categories.map((cat, idx) => (
              <div key={idx} className="seo-cat-block">
                <h3 className="seo-cat-heading">
                  <a href={cat.href} target="_blank" rel="noreferrer">
                    {cat.title}
                  </a>
                </h3>
                <p className="seo-cat-text">{cat.text}</p>
              </div>
            ))}

            {/* Renting vs. Buying */}
            <h2 className="seo-sub-title">{seo.rentingVsBuyingTitle}</h2>
            <ul className="seo-bullet-list">
              {seo.rentingVsBuyingPoints.map((pt, idx) => (
                <li key={idx}>
                  <strong>{pt.label}: </strong>
                  <span>{pt.text}</span>
                </li>
              ))}
            </ul>

            {/* Why SharePal in Bangalore */}
            <h2 className="seo-sub-title">
              <a href={seo.whySharePalHref} target="_blank" rel="noreferrer">
                {seo.whySharePalTitle}
              </a>
            </h2>
            <p className="seo-subtitle-text">{seo.whySharePalSubtitle}</p>
            <ul className="seo-bullet-list">
              {seo.whySharePalPoints.map((pt, idx) => (
                <li key={idx}>
                  <strong>{pt.label}: </strong>
                  <span>{pt.text}</span>
                </li>
              ))}
            </ul>

            {/* Read Our Reviews */}
            <h2 className="seo-sub-title">{seo.reviewsTitle}</h2>
            <p className="seo-reviews-link-wrap">
              <a
                href={seo.reviewsHref}
                target="_blank"
                rel="noreferrer"
                className="seo-reviews-link"
              >
                <strong>{seo.reviewsLabel}</strong>
              </a>
            </p>
          </div>
        )}

        <button
          type="button"
          className="seo-toggle-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? "Read Less" : "Read More"}{" "}
          <ChevronDown
            size={14}
            style={{
              transform: expanded ? "rotate(180deg)" : "none",
              transition: "transform 0.2s ease",
            }}
          />
        </button>
      </div>
    </section>
  );
}
