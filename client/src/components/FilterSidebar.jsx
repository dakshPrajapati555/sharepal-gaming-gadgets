export default function FilterSidebar({ filters, meta, onChange }) {
  const tags = meta?.tags || ["Trending", "New", "Vote to Launch"];

  // Build price breakpoints from real catalog data when available.
  // If meta hasn't loaded yet, fall back to the static values used previously.
  const maxPrice = meta?.max_price ? Number(meta.max_price) : 440;
  const priceSteps = meta?.min_price != null
    ? [
        Math.round(maxPrice * 0.35 / 5) * 5,  // ~35 %
        Math.round(maxPrice * 0.60 / 5) * 5,  // ~60 %
        Math.round(maxPrice * 0.85 / 5) * 5,  // ~85 %
      ].filter((v, i, a) => a.indexOf(v) === i) // deduplicate
    : [200, 300, 400];

  return (
    <div className="filter-sidebar" role="group" aria-label="Filters">
      <button
        type="button"
        className={`chip${filters.in_stock ? " active" : ""}`}
        onClick={() => onChange({ in_stock: filters.in_stock ? "" : "true" })}
      >
        In stock
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`chip${filters.tag === tag ? " active" : ""}`}
          onClick={() => onChange({ tag: filters.tag === tag ? "" : tag })}
        >
          {tag}
        </button>
      ))}
      <label>
        Min rating
        <select
          className="filter-select"
          value={filters.min_rating}
          onChange={(event) => onChange({ min_rating: event.target.value })}
        >
          <option value="">Any</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </select>
      </label>
      <label>
        Max ₹/day
        <select
          className="filter-select"
          value={filters.max_price}
          onChange={(event) => onChange({ max_price: event.target.value })}
        >
          <option value="">Any</option>
          {priceSteps.map((step) => (
            <option key={step} value={String(step)}>
              {step}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
