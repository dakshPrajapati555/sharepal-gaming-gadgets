import { Gamepad2, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRentalDates } from "../hooks/useRentalDates.jsx";
import { useWishlist } from "../hooks/useWishlist.jsx";
import { formatRupees } from "../utils/format.js";

export default function ProductCard({ product }) {
  const { ready, deliveryDate, pickupDate } = useRentalDates();
  const { ids, toggle } = useWishlist();
  const [imgError, setImgError] = useState(false);
  const isWishlisted = ids.includes(product.id);

  const perDayRent = Number(product.per_day_rent || 0);
  const imageUrl = product.image_url || product.image || "";

  const isVoteToLaunch = product.tag === "Vote to Launch";

  const tagClass =
    product.tag === "Trending"
      ? "trending"
      : product.tag === "New"
      ? "new"
      : product.tag === "Vote to Launch"
      ? "vote"
      : "";

  // Calculate total rent if dates selected
  let days = 0;
  if (ready && deliveryDate && pickupDate) {
    const diff = pickupDate.getTime() - deliveryDate.getTime();
    days = Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
  }

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        {product.tag && (
          <span className={`product-badge ${tagClass}`}>{product.tag}</span>
        )}

        {/* Wishlist heart — top right */}
        <button
          type="button"
          className={`wishlist-heart-btn${isWishlisted ? " active" : ""}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => { e.preventDefault(); toggle(product.id); }}
        >
          <Heart size={16} fill={isWishlisted ? "#EF4444" : "none"} color={isWishlisted ? "#EF4444" : "#9CA3AF"} />
        </button>

        <Link
          to={`/product/${product.id}`}
          style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
          tabIndex={-1}
        >
          {!imgError && imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#9CA3AF" }}>
              <Gamepad2 size={48} style={{ color: "#4C187C", opacity: 0.5 }} />
            </div>
          )}
        </Link>

        {product.out_of_stock && <span className="oos-pill">Out of Stock</span>}
      </div>

      <div className="product-body">
        {isVoteToLaunch ? (
          <div className="vote-launch-box">
            <div className="vote-notice">
              <span className="vote-sparkle">✦</span>
              <span>We launch if 1k people join the waitlist. Get notified first!</span>
            </div>
            <div className="vote-progress-bar">
              <div className="vote-progress-fill" style={{ width: "15%" }} />
              <span className="vote-progress-text">15/1000 Joined</span>
            </div>
            <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
              <h3 className="product-name">{product.name}</h3>
            </Link>
            <Link to={`/product/${product.id}`} className="vote-waitlist-btn">
              Join Waitlist
            </Link>
          </div>
        ) : (
          <>
            <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
              <h3 className="product-name">{product.name}</h3>
            </Link>

            {product.rating ? (
              <div className="product-rating-row">
                <span className="product-rating-star">★</span>
                <span className="product-rating-score">{product.rating}</span>
                {product.booked_count ? (
                  <span className="product-booked-count">({product.booked_count}+ booked)</span>
                ) : null}
              </div>
            ) : null}

            <div className="product-price-row">
              {days > 0 ? (
                <>
                  <span className="product-price-amount">{formatRupees(perDayRent * days)}</span>
                  <span className="product-price-unit">for {days} day{days > 1 ? "s" : ""}</span>
                </>
              ) : (
                <span className="product-select-dates-hint">Select dates to view price</span>
              )}
            </div>

            {days > 0 && (
              <div className="product-per-day">
                <span className="product-per-day-amount">{formatRupees(perDayRent)}</span>
                <span className="product-price-unit"> /day</span>
              </div>
            )}

            <Link
              to={`/product/${product.id}`}
              className={`rent-btn${product.out_of_stock ? " disabled" : ""}`}
              aria-label={`Rent ${product.name}`}
              onClick={(e) => product.out_of_stock && e.preventDefault()}
            >
              {product.out_of_stock ? "Out of Stock" : "Rent Now"}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
