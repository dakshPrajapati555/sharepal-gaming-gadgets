import { ChevronDown, MapPin, Search, ShoppingCart, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useRentalDates } from "../hooks/useRentalDates.jsx";
import { useWishlist } from "../hooks/useWishlist.jsx";
import { formatDate } from "../utils/format.js";
import SharePalLogo from "./SharePalLogo.jsx";

const DOMAIN_CATS = [
  { id: "photography", label: "Photography", path: "/photography" },
  { id: "gaming", label: "Gaming", path: "/" },
  { id: "outdoor", label: "Outdoor", path: "/outdoor" },
  { id: "entertainment", label: "Entertainment", path: "/entertainment" },
];

// SVG icons matching sharepal.in HTML
function CalendarIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19 3H18V1H16V3H8V1H6V3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H12.2547C11.8334 20.396 11.5049 19.7224 11.2899 19H5V8H19V10.0709C19.7061 10.1719 20.3783 10.3783 21 10.6736V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM14.4645 13.4645C12.5118 15.4171 12.5118 18.5829 14.4645 20.5355C16.4171 22.4882 19.5829 22.4882 21.5355 20.5355C23.4882 18.5829 23.4882 15.4171 21.5355 13.4645C19.5829 11.5118 16.4171 11.5118 14.4645 13.4645ZM17.5 17.5V20H18.5V17.5H21V16.5H18.5V14H17.5V16.5H15V17.5H17.5Z" fill="currentColor"/>
    </svg>
  );
}

function MapPinIcon({ className = "w-5" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5ZM12 2C13.8565 2 15.637 2.7375 16.9497 4.05025C18.2625 5.36301 19 7.14348 19 9C19 14.25 12 22 12 22C12 22 5 14.25 5 9C5 7.14348 5.7375 5.36301 7.05025 4.05025C8.36301 2.7375 10.1435 2 12 2ZM12 4C10.6739 4 9.40215 4.52678 8.46447 5.46447C7.52678 6.40215 7 7.67392 7 9C7 10 7 12 12 18.71C17 12 17 10 17 9C17 7.67392 16.4732 6.40215 15.5355 5.46447C14.5979 4.52678 13.3261 4 12 4Z" fill="currentColor"/>
    </svg>
  );
}

function HeaderSearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor"/>
    </svg>
  );
}

function HeaderCartIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 18C17.5304 18 18.0391 18.2107 18.4142 18.5858C18.7893 18.9609 19 19.4696 19 20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22C16.4696 22 15.9609 21.7893 15.5858 21.4142C15.2107 21.0391 15 20.5304 15 20C15 18.89 15.89 18 17 18ZM1 2H4.27L5.21 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63L7.17 14.75C7.17 14.8163 7.19634 14.8799 7.24322 14.9268C7.29011 14.9737 7.3537 15 7.42 15H19V17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2ZM7 18C7.53043 18 8.03914 18.2107 8.41421 18.5858C8.78929 18.9609 9 19.4696 9 20C9 20.5304 8.78929 21.0391 8.41421 21.4142C8.03914 21.7893 7.53043 22 7 22C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20C5 18.89 5.89 18 7 18ZM16 11L18.78 6H6.14L8.5 11H16Z" fill="currentColor"/>
    </svg>
  );
}

function ProfileUserIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.8283 14.6211C10.3055 14.6212 10.763 14.8096 11.1004 15.1449L12 16.0389L12.8996 15.1449C13.237 14.8096 13.6945 14.6212 14.1717 14.6211H17.7918C18.3936 14.6212 18.9781 14.8211 19.4524 15.1891C19.9267 15.5571 20.2637 16.072 20.4097 16.6521L20.9693 18.8744C21.0002 18.9891 21.0079 19.1087 20.9918 19.2263C20.9758 19.3439 20.9363 19.4571 20.8757 19.5594C20.8152 19.6617 20.7347 19.751 20.639 19.822C20.5434 19.8931 20.4344 19.9445 20.3186 19.9733C20.2027 20.0021 20.0822 20.0077 19.9641 19.9897C19.8461 19.9717 19.7328 19.9306 19.6309 19.8686C19.529 19.8067 19.4406 19.7252 19.3707 19.629C19.3008 19.5327 19.251 19.4236 19.224 19.308L18.6653 17.0866C18.6168 16.8931 18.5045 16.7213 18.3464 16.5985C18.1883 16.4757 17.9934 16.409 17.7927 16.409H14.1717L13.2721 17.3029C12.9347 17.6381 12.4771 17.8264 12 17.8264C11.5229 17.8264 11.0653 17.6381 10.7279 17.3029L9.8283 16.409H6.20821C6.00753 16.409 5.81264 16.4757 5.65452 16.5985C5.4964 16.7213 5.38413 16.8931 5.33557 17.0866L4.776 19.308C4.74903 19.4236 4.69915 19.5327 4.62928 19.629C4.55942 19.7252 4.47096 19.8067 4.36907 19.8686C4.26719 19.9306 4.15391 19.9717 4.03585 19.9897C3.91779 20.0077 3.79731 20.0021 3.68143 19.9733C3.56556 19.9445 3.45662 19.8931 3.36096 19.822C3.2653 19.751 3.18484 19.6617 3.12426 19.5594C3.06369 19.4571 3.02423 19.3439 3.00817 19.2263C2.99211 19.1087 2.99978 18.9891 3.03073 18.8744L3.5894 16.6521C3.73543 16.072 4.07238 15.5571 4.54671 15.1891C5.02104 14.8211 5.60553 14.6212 6.20731 14.6211H9.8283ZM12 3C12.7053 3 13.4943 3.16985 14.1411 3.34953C15.6372 3.76342 16.4981 5.15437 16.4981 6.57304V10.1541C16.4981 11.5737 15.6372 12.9638 14.1411 13.3776C13.4943 13.5564 12.7053 13.7272 12 13.7272C11.2947 13.7272 10.5057 13.5573 9.85889 13.3776C8.36281 12.9638 7.50187 11.5737 7.50187 10.1541V6.57304C7.50187 5.15437 8.36281 3.76342 9.85889 3.34953C10.5057 3.17074 11.2947 3 12 3ZM12 4.78786C11.5421 4.78786 10.9411 4.90586 10.342 5.07213C9.74104 5.2384 9.30112 5.82929 9.30112 6.57304V10.1541C9.30112 10.8979 9.74104 11.4888 10.342 11.6559C10.9411 11.8213 11.5421 11.9393 12 11.9393C12.4579 11.9393 13.0589 11.8213 13.658 11.655C14.259 11.4888 14.6989 10.8979 14.6989 10.1541V6.57304C14.6989 5.82929 14.259 5.2384 13.658 5.07124C13.0589 4.90675 12.4588 4.78786 12 4.78786Z" fill="currentColor"/>
    </svg>
  );
}

export default function Header({ onSearch, search }) {
  const { deliveryDate, pickupDate, ready, setPickerOpen } = useRentalDates();
  const { count } = useWishlist();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [showSearch, setShowSearch] = useState(false);
  const activeDomain = "gaming";

  const dateLabel =
    ready && deliveryDate && pickupDate
      ? `${formatDate(deliveryDate)} – ${formatDate(pickupDate)}`
      : null;

  return (
    <>
      <header className="site-header" role="banner">
        {/* DESKTOP HEADER */}
        <div className="header-desktop-container">
          {/* Hanging Blue Logo Tab */}
          <a href="/" className="logo-hanging-link" aria-label="SharePal Home">
            <div className="logo-hanging-tab">
              <SharePalLogo width={137} height={27} />
            </div>
          </a>

          {/* Location + Date Selector Pill Group */}
          <div className="header-pill-group">
            {/* Location selector button */}
            <button type="button" className="pill-city-btn" aria-label="Change city">
              <MapPinIcon className="w-5" />
              <span>Bangalore</span>
              <ChevronDown size={14} className="city-chevron" />
            </button>

            {/* Date range display */}
            <div
              className="pill-date-display"
              onClick={() => setPickerOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setPickerOpen(true)}
              aria-label="Select rental dates"
            >
              {dateLabel ? (
                <div className="date-selected-text">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{dateLabel}</span>
                </div>
              ) : (
                <div className="date-placeholder-group">
                  <div className="delivery-date">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Delivery Date</span>
                  </div>
                  <span className="date-divider-line" />
                  <div className="pickup-date">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Pickup Date</span>
                  </div>
                </div>
              )}
            </div>

            {/* Select button */}
            <button
              type="button"
              className="pill-select-btn"
              onClick={() => setPickerOpen(true)}
            >
              <CalendarIcon className="h-4 w-4" />
              <p className="select-btn-text">Select</p>
            </button>
          </div>

          {/* Right Header Controls */}
          <div className="header-right-controls">
            {showSearch ? (
              <div className="header-search-input-box">
                <HeaderSearchIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="search"
                  value={search || ""}
                  onChange={(e) => onSearch?.(e.target.value)}
                  placeholder="Search gadgets..."
                  autoFocus
                  onBlur={() => {
                    if (!search) setShowSearch(false);
                  }}
                  className="header-search-input"
                />
              </div>
            ) : (
              <button
                type="button"
                className="header-icon-circle-btn"
                aria-label="Search"
                onClick={() => setShowSearch(true)}
              >
                <HeaderSearchIcon className="h-5 w-5" />
              </button>
            )}

            <button
              type="button"
              className="header-icon-circle-btn"
              aria-label="Wishlist / Cart"
              onClick={() => navigate("/?wishlist=1")}
            >
              <HeaderCartIcon className="h-5 w-5" />
              {count > 0 && <span className="header-cart-badge">{count}</span>}
            </button>

            <div className="header-profile-group">
              <button type="button" className="profile-icon-circle" aria-label="Login">
                <ProfileUserIcon className="w-5 h-5" />
              </button>
              <span className="profile-login-label">Hi, Login</span>
            </div>
          </div>
        </div>

        {/* MOBILE HEADER */}
        <div className="header-mobile-container">
          <div className="header-mobile-top-row">
            <a href="/" aria-label="SharePal Home" className="logo-hanging-link-mobile">
              <div className="logo-hanging-tab-mobile">
                <SharePalLogo width={100} height={18} />
              </div>
            </a>
            <div className="header-mobile-top-right">
              <button type="button" className="mobile-city-pill" aria-label="City">
                <MapPinIcon className="w-4" />
                <span>Bangalore</span>
                <ChevronDown size={12} />
              </button>
              <button type="button" className="header-icon-circle-btn-sm" aria-label="Login">
                <ProfileUserIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile date bar with "Select Rental Dates" text */}
          <div
            className="mobile-date-bar-pill"
            onClick={() => setPickerOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setPickerOpen(true)}
            aria-label="Select rental dates"
          >
            <div className="mobile-date-text-container">
              <CalendarIcon className="h-4 w-4" />
              <span className="mobile-date-string">{dateLabel || "Select Rental Dates"}</span>
            </div>
            <button
              type="button"
              className="mobile-date-select-btn"
              onClick={(e) => {
                e.stopPropagation();
                setPickerOpen(true);
              }}
            >
              <CalendarIcon className="h-3 w-3" />
              Select
            </button>
          </div>
        </div>
      </header>

      {/* DOMAIN CATEGORY NAVIGATION BAR (Sticky below header) */}
      <div className="domain-cat-nav-sticky">
        <div className="domain-cat-nav-inner">
          {DOMAIN_CATS.map((cat) => {
            const isActive = cat.id === activeDomain;
            return (
              <Link
                key={cat.id}
                to={cat.path}
                className={`domain-cat-item${isActive ? " active" : ""}`}
              >
                <span>{cat.label}</span>
                {isActive && <div className="domain-cat-active-indicator" />}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
