import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          {index < items.length - 1 ? " / " : null}
        </span>
      ))}
    </nav>
  );
}
