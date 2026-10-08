import { X } from "lucide-react";
import FilterSidebar from "./FilterSidebar.jsx";

export default function FilterDrawer({ open, onClose, filters, meta, onChange }) {
  if (!open) return null;
  return (
    <div className="drawer" role="dialog" aria-label="Filters">
      <div className="drawer-panel">
        <div className="price-row">
          <h2>Filters</h2>
          <button type="button" className="outline-btn" onClick={onClose} aria-label="Close filters">
            <X size={18} />
          </button>
        </div>
        <FilterSidebar filters={filters} meta={meta} onChange={onChange} />
      </div>
    </div>
  );
}
