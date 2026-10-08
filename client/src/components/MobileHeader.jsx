import { Home, LayoutGrid, Search, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRentalDates } from "../hooks/useRentalDates.jsx";

// Reference: fixed bottom-0 left-0 right-0 z-20 border-t bg-gray-100 px-1.5 lg:hidden
// Buttons: flex flex-col items-center justify-center rounded-lg text-primary-900

export default function MobileHeader({ onSearchFocus, onOpenFilters }) {
  const navigate = useNavigate();
  const { setPickerOpen } = useRentalDates();

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <div className="mobile-nav-inner">
        <Link to="/" className="mobile-nav-btn">
          <Home size={20} />
          <span className="mobile-nav-label">Home</span>
        </Link>

        <button type="button" className="mobile-nav-btn" onClick={onOpenFilters}>
          <LayoutGrid size={20} />
          <span className="mobile-nav-label">Category</span>
        </button>

        <button type="button" className="mobile-nav-btn" onClick={onSearchFocus}>
          <Search size={20} />
          <span className="mobile-nav-label">Search</span>
        </button>

        <button
          type="button"
          className="mobile-nav-btn"
          onClick={() => { setPickerOpen(true); navigate("/"); }}
        >
          <ShoppingCart size={20} />
          <span className="mobile-nav-label">Cart</span>
        </button>
      </div>
    </nav>
  );
}
