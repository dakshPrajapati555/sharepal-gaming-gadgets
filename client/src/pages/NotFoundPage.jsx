import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="layout-shell">
      <div />
      <div className="state-box">
        <h1>Page not found</h1>
        <p>That route is not part of this assignment app.</p>
        <Link className="primary-btn" to="/" style={{ display: "inline-block", marginTop: 12 }}>
          Back to gaming gadgets
        </Link>
      </div>
    </div>
  );
}
