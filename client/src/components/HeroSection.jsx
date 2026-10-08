import SharePalLogo from "./SharePalLogo.jsx";

function XboxLogo({ width = 18, height = 18 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.87 3.424c.715 0 1.953.585 2.756 1.488-1.503 1.258-3.957 3.65-5.918 6.069-1.96-2.419-4.415-4.811-5.918-6.069.803-.903 2.041-1.488 2.756-1.488.75 0 1.637.33 2.454.896.817-.566 1.704-.896 2.454-.896zm-11.722 3.96c1.371.97 4.186 3.738 6.223 6.376-1.2 1.887-2.952 3.582-4.246 4.297-1.24-.766-2.196-2.035-2.616-3.535-.2-1.026-.145-2.09.117-3.093.12-.46.302-.916.517-1.35.32-.63.76-1.196 1.29-1.695zm15.704.001c.53.499.97 1.065 1.29 1.695.215.434.397.89.517 1.35.262 1.003.317 2.067.117 3.093-.42 1.5-1.376 2.769-2.616 3.535-1.294-.715-3.046-2.41-4.241-4.297 2.037-2.638 4.852-5.406 6.223-6.376z" />
    </svg>
  );
}

function PlayStationLogo({ width = 20, height = 16 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 50 40" fill="currentColor" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M16.47 5.09c-2.32 0-4.21.68-5.67 2.04C9.34 8.49 8.6 10.38 8.6 12.8v16.14l4.89-1.81V12.8c0-1.12.31-1.99.93-2.6.62-.62 1.48-.93 2.58-.93 1.09 0 1.95.31 2.58.93.63.61.94 1.48.94 2.6v3.13h4.89V12.8c0-2.42-.74-4.31-2.2-5.67-1.47-1.36-3.36-2.04-5.74-2.04zM3.5 28.53l13.06-4.83 15.6 5.76-13.06 4.83L3.5 28.53zm31.78-7.55l-9.84-3.63v4.44l4.95 1.83-4.95 1.83v4.44l9.84-3.63c1.55-.57 2.32-1.48 2.32-2.73s-.77-2.15-2.32-2.55z" />
    </svg>
  );
}

function MetaLogo({ width = 20, height = 16 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M16.82 5c-1.74 0-3.41.81-4.82 2.36C10.59 5.81 8.92 5 7.18 5 3.22 5 0 8.58 0 13c0 3.32 1.8 5.92 4.41 5.92 1.76 0 3.42-.85 4.83-2.43 1.41 1.58 3.07 2.43 4.83 2.43 2.61 0 4.41-2.6 4.41-5.92C18.48 8.58 15.26 5 16.82 5zm-9.64 12.18c-1.77 0-3.1-2.04-3.1-4.18 0-2.88 2.05-6.26 4.67-6.26 1.46 0 2.82.78 3.86 2.06-1.92 2.76-3.9 6.38-5.43 8.38zm9.64 0c-1.53-2-3.51-5.62-5.43-8.38 1.04-1.28 2.4-2.06 3.86-2.06 2.62 0 4.67 3.38 4.67 6.26 0 2.14-1.33 4.18-3.1 4.18z" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <div className="hero-banner-container">
      {/* Left Artwork Image (Desktop only) */}
      <div className="hero-artwork-left">
        <img
          src="https://images.sharepal.in/super-categories/gaming-left.webp"
          alt="SharePal Gaming Consoles Left Artwork"
          className="hero-artwork-img"
          loading="eager"
        />
      </div>

      {/* Right Artwork Image (Mobile & Desktop) */}
      <div className="hero-artwork-right">
        <img
          src="https://images.sharepal.in/super-categories/gaming-right.webp"
          alt="SharePal Gaming Consoles Right Artwork"
          className="hero-artwork-img"
          loading="eager"
        />
      </div>

      {/* Hero Content Shell */}
      <div className="hero-content-shell">
        <h1 className="hero-heading">Gaming Consoles</h1>

        <h2 className="hero-subheading">
          Rent the latest gaming gadgets from{" "}
          <span className="hero-logo-inline">
            <SharePalLogo width={64} height={18} />
          </span>{" "}
          PS5, Xbox, Oculus VR, Racing Wheel on rent.
        </h2>

        <div className="hero-brands-row">
          <div className="hero-brand-badge">
            <XboxLogo width={16} height={16} />
            <span>XBOX</span>
          </div>
          <span className="hero-brand-divider" />
          <div className="hero-brand-badge">
            <PlayStationLogo width={18} height={14} />
            <span>PS5</span>
          </div>
          <span className="hero-brand-divider" />
          <div className="hero-brand-badge">
            <MetaLogo width={18} height={14} />
            <span>Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
}


