import { Heart } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist.jsx";

export default function WishlistButton({ productId, name }) {
  const { has, toggle } = useWishlist();
  const active = has(productId);
  return (
    <button
      type="button"
      className={`wish-btn${active ? " active" : ""}`}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(productId);
      }}
    >
      <Heart size={18} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
