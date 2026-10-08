import { ChevronDown, ChevronUp, Facebook, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { FOOTER_DATA } from "../data/siteContent.js";

function ScrollToTopButton() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      type="button"
      className="footer-go-up"
      onClick={handleScrollTop}
      aria-label="Go to top"
    >
      <ChevronUp size={14} />
      Go up
    </button>
  );
}

function FooterAccordionItem({ title, links }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="footer-accordion-item">
      <button
        type="button"
        className="footer-accordion-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown
          size={16}
          className="footer-accordion-chevron"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        />
      </button>
      {open && (
        <ul className="footer-links footer-accordion-links">
          {links.map((link, j) => (
            <li key={j}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* ── Mobile: accordion per category ── Desktop: multi-column grid ── */}
        {/* Mobile accordion */}
        <div className="footer-top-accordion">
          {FOOTER_DATA.topColumns.map((cat, i) => (
            <FooterAccordionItem key={i} title={cat.title} links={cat.links} />
          ))}
        </div>

        {/* Desktop grid — 9 columns */}
        <div className="footer-top-grid">
          {FOOTER_DATA.topColumns.map((cat, i) => (
            <div key={i}>
              <h4 className="footer-col-title">{cat.title}</h4>
              <ul className="footer-links">
                {cat.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SharePal footer logo */}
        <div className="footer-logo-row">
          {/* SharePal SVG logo (blue, exact from original footer) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="115" height="36" fill="none" viewBox="0 0 115 36" className="footer-sharepal-logo">
            <path fill="#1B4BFF" fillRule="evenodd" d="M2.222 23.92h7.83c.234 1.543 2.089 2.656 4.413 2.656 2.401 0 3.905-.957 3.905-2.363 0-1.034-.528-1.64-3.183-2.46l-2.948-.898c-4.706-1.425-7.205-3.964-7.205-7.81 0-5.74 4.96-9.49 11.793-9.49 7.263 0 11.696 3.32 11.735 8.904h-7.556c-.06-1.679-1.64-2.792-3.984-2.792-2.167 0-3.573.976-3.573 2.304 0 1.133.781 1.913 3.046 2.577l3.085.899c5.057 1.464 7.244 3.573 7.244 7.634 0 5.936-5.077 9.626-12.516 9.626-7.595 0-12.066-3.222-12.086-8.786m24.105 8.299L32.32 4.044h7.693l-2.128 9.88h.156c1.601-2.343 4.022-3.69 7.01-3.69 3.944 0 6.56 2.4 6.56 5.974 0 .8-.098 1.699-.293 2.636l-2.811 13.375h-7.674l2.558-12.184a7 7 0 0 0 .137-1.328c0-1.484-1.23-2.577-2.93-2.577-1.854 0-3.455 1.406-3.885 3.436L34.04 32.22zm38.869 0h7.732l4.588-21.556H69.96l-.742 3.475h-.371c-.683-2.304-3.105-3.787-6.21-3.787-6.189 0-10.777 5.974-10.777 14 0 5.056 2.753 8.18 7.185 8.18 2.714 0 4.862-1.113 6.444-3.358h.351zM67.5 20.113c0 3.476-2.148 6.541-4.608 6.541-1.816 0-3.027-1.445-3.027-3.632 0-3.65 2.07-6.6 4.647-6.6 1.816 0 2.988 1.446 2.988 3.691m6.84 12.106 4.627-21.556h7.557l-.625 3.124h.156c.976-2.011 2.89-3.437 5.213-3.437 1.23 0 2.11.176 2.968.567l-1.464 6.697c-.996-.469-1.933-.8-3.241-.8-2.558 0-4.413 1.425-5.057 4.392L82.092 32.22zm18.218-9.333c0 6.209 4.022 9.86 10.192 9.86 4.108 0 7.746-2.546 9.714-6.553-8.519.517-12.637-3.14-12.637-3.14s7.07 1.274 13.872-.546a16 16 0 0 0 .247-1.714c.635-6.983-3.386-10.677-9.165-10.677-7.342 0-12.223 5.39-12.223 12.77m7.654-3.983h7.302c.039-.098.059-.41.059-.625 0-1.64-1.289-2.812-3.144-2.812-2.011 0-3.71 1.386-4.217 3.437" clipRule="evenodd" />
          </svg>
          {/* Pal logo mark — lime green */}
          <svg xmlns="http://www.w3.org/2000/svg" width="51" height="27" viewBox="0 0 51 27" fill="#9EFF00">
            <path fill="inherit" fillRule="evenodd" d="M4.786 3.106h8.14c5.075 0 7.917 2.679 7.917 6.682 0 5.477-3.84 8.93-10 8.93H7.791l-1.25 5.863H.247l1.07-5.06c6.5-1.309 10.317-6.29 10.317-6.29l2.168 1.84 1.601-8.78-8.404 3.004 2.04 1.731s-2.377 3.315-7.047 5.296zm31.4 21.475h-5.892l.49-2.322h-.267c-1.206 1.712-2.843 2.56-4.911 2.56-3.378 0-5.477-2.381-5.477-6.236 0-6.116 3.498-10.67 8.215-10.67 2.366 0 4.212 1.131 4.733 2.887h.282l.566-2.649h5.76zm-7.648-4.242c1.875 0 3.512-2.336 3.512-4.985 0-1.711-.893-2.813-2.277-2.813-1.965 0-3.542 2.248-3.542 5.03 0 1.667.923 2.768 2.307 2.768M42.825 3.106l-4.569 21.475h5.893l4.57-21.475z" clipRule="evenodd" />
          </svg>
        </div>

        {/* 5-col main footer links */}
        <div className="footer-main-grid">
          {FOOTER_DATA.mainColumns.map((col, i) => (
            <div key={i}>
              <h4 className="footer-col-title">{col.title}</h4>
              <ul className="footer-links">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} target={link.href?.startsWith("http") ? "_blank" : undefined} rel={link.href?.startsWith("http") ? "noreferrer" : undefined}>
                      {link.label}
                      {link.badge && <span className="footer-link-badge">{link.badge}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026. SWNAC E-Kiraya Services Pvt Ltd
          </div>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/Sharepal.in" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://www.instagram.com/sharepal.in/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://www.linkedin.com/company/sharepal/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
          <ScrollToTopButton />
        </div>
        <div className="footer-made-with">Made with ♥️ for India</div>
      </div>
    </footer>
  );
}
