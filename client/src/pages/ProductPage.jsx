import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BenefitsSection from "../components/BenefitsSection.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import CategorySection from "../components/CategorySection.jsx";
import CTAButton from "../components/CTAButton.jsx";
import FAQSection from "../components/FAQSection.jsx";
import ProductImage from "../components/ProductImage.jsx";
import ProductPrice from "../components/ProductPrice.jsx";
import Rating from "../components/Rating.jsx";
import WishlistButton from "../components/WishlistButton.jsx";
import { useProduct } from "../hooks/useProducts.js";
import { useRentalDates } from "../hooks/useRentalDates.jsx";
import { formatRupees } from "../utils/format.js";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error, notFound } = useProduct(id);
  const { ready, days, setPickerOpen } = useRentalDates();

  useEffect(() => {
    if (product) {
      document.title = `Rent ${product.name} in Bangalore | SharePal`;
    }
    return () => {
      document.title = "Rent gaming gadgets in Bangalore | Zero Deposit | SharePal";
    };
  }, [product]);

  return (
    <div className="catalog-two-col-layout">
      <CategorySection
        selected={product?.category || ""}
        onSelect={(category) =>
          navigate(category ? `/?category=${encodeURIComponent(category)}` : "/")
        }
      />
      <main className="content-shell">
        {loading ? <div className="state-box">Loading product…</div> : null}
        {error ? <div className="state-box">{error}</div> : null}
        {notFound ? (
          <div className="state-box">
            This product is not in the supplied catalog. Check the listing and try another item.
          </div>
        ) : null}
        {product ? (
          <>
            <Breadcrumbs
              items={[
                { label: "Bangalore", to: "/" },
                { label: "Gaming gadgets on rent", to: "/" },
                { label: product.name },
              ]}
            />
            <article className="product-detail">
              <div style={{ position: "relative" }}>
                <ProductImage
                  src={product.image_url}
                  alt={product.name}
                  tag={product.tag}
                  outOfStock={product.out_of_stock}
                />
                <WishlistButton productId={product.id} name={product.name} />
              </div>
              <div className="detail-copy">
                <p className="muted">{product.category} · Bangalore</p>
                <h1>{product.name}</h1>
                <Rating value={product.rating} bookedCount={product.booked_count} />
                <div className="estimate">
                  <ProductPrice perDayRent={product.per_day_rent} />
                  <p>
                    Daily rent from the supplied catalog: {formatRupees(product.per_day_rent)}. Select
                    delivery and pickup dates to see a simple tenure estimate
                    {ready ? ` (${days} day${days > 1 ? "s" : ""}).` : "."}
                  </p>
                </div>
                <div className="toolbar">
                  <CTAButton onClick={() => setPickerOpen(true)}>
                    {ready ? "Change rental dates" : "Select rental dates"}
                  </CTAButton>
                  <CTAButton
                    disabled={product.out_of_stock}
                    onClick={() => {
                      if (!ready) setPickerOpen(true);
                    }}
                  >
                    {product.out_of_stock ? "Currently unavailable" : "Add to rental"}
                  </CTAButton>
                </div>
                <p>
                  This listing uses only fields from the SharePal product-list JSON: name, image, rating,
                  booked count, tag, per-day rent, and stock. Category is derived from the product name
                  for filtering.
                </p>
              </div>
            </article>
            <FAQSection />
            <BenefitsSection />
          </>
        ) : null}
      </main>
    </div>
  );
}
