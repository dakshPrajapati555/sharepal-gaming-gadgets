import { useMemo, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import BenefitsSection from "../components/BenefitsSection.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import CategorySection from "../components/CategorySection.jsx";
import FAQSection from "../components/FAQSection.jsx";
import FilterDrawer from "../components/FilterDrawer.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import ReviewSection from "../components/ReviewSection.jsx";
import SeoSection from "../components/SeoSection.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import { useProductList, useProductMeta } from "../hooks/useProducts.js";
import { useWishlist } from "../hooks/useWishlist.jsx";

export default function HomePage() {
  const { drawerOpen, setDrawerOpen } = useOutletContext();
  const [params, setParams] = useSearchParams();
  const { ids } = useWishlist();
  const [localLimit] = useState(12);

  const filters = {
    search: params.get("search") || "",
    category: params.get("category") || "",
    tag: params.get("tag") || "",
    in_stock: params.get("in_stock") || "",
    min_rating: params.get("min_rating") || "",
    max_price: params.get("max_price") || "",
    sort: params.get("sort") || "relevance",
    page: params.get("page") || "1",
    wishlist: params.get("wishlist") === "1",
  };

  const query = useMemo(
    () => ({
      search: filters.search,
      category: filters.category,
      tag: filters.tag,
      in_stock: filters.in_stock,
      min_rating: filters.min_rating,
      max_price: filters.max_price,
      sort: filters.sort,
      page: filters.wishlist ? 1 : Number(filters.page),
      limit: filters.wishlist ? 48 : localLimit,
    }),
    [
      filters.search,
      filters.category,
      filters.tag,
      filters.in_stock,
      filters.min_rating,
      filters.max_price,
      filters.sort,
      filters.page,
      filters.wishlist,
      localLimit,
    ]
  );

  const { data, loading, error } = useProductList(query);
  const meta = useProductMeta();

  function patch(next) {
    const merged = new URLSearchParams(params);
    Object.entries(next).forEach(([key, value]) => {
      if (value) merged.set(key, value);
      else merged.delete(key);
    });
    if (!("page" in next)) merged.delete("page");
    setParams(merged);
  }

  const items = (data?.items || []).filter((item) => (filters.wishlist ? ids.includes(item.id) : true));
  const empty = !loading && !error && items.length === 0;

  return (
    <div className="page-container">
      <div className="catalog-two-col-layout">
        <CategorySection selected={filters.category} onSelect={(category) => patch({ category })} />

        <main className="content-shell">
          <HeroSection />

          <div className="listing-header" id="listing">
            <h2 className="listing-title">Gaming Gadgets On Rent</h2>
            <span className="listing-count">Total items: {data?.total ?? 0} items</span>
          </div>

        {loading ? <div className="state-box">Loading gaming gadgets catalog…</div> : null}
        {error ? <div className="state-box">{error}</div> : null}

        {empty ? (
          <div className="state-box">
            {filters.search
              ? `No products match "${filters.search}". Try clearing your search.`
              : "No products match these filters."}
          </div>
        ) : null}

        {!loading && !error && !empty ? <ProductGrid products={items} /> : null}

        {/* Pagination */}
        {data && data.total_pages > 1 ? (
          <div className="pagination">
            <button
              type="button"
              className="page-btn"
              disabled={Number(filters.page) <= 1}
              onClick={() => patch({ page: String(Number(filters.page) - 1) })}
            >
              Previous
            </button>
            <span className="page-info">
              Page {data.page} of {data.total_pages}
            </span>
            <button
              type="button"
              className="page-btn"
              disabled={Number(filters.page) >= data.total_pages}
              onClick={() => patch({ page: String(Number(filters.page) + 1) })}
            >
              Next
            </button>
          </div>
        ) : null}

        <FAQSection />
        <ReviewSection />
        <BenefitsSection />
        </main>
      </div>

      {/* SEO section — outside two-column layout, full-width, flows before footer */}
      <SeoSection />

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        meta={meta}
        onChange={patch}
      />
    </div>
  );
}
