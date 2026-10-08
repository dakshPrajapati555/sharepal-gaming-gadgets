export default function SortDropdown({ value, onChange }) {
  return (
    <label>
      <span className="visually-hidden" style={{ position: "absolute", left: -9999 }}>
        Sort products
      </span>
      <select className="sort-select" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="popular">Most booked</option>
        <option value="price_asc">Price: low to high</option>
        <option value="price_desc">Price: high to low</option>
        <option value="rating">Rating</option>
      </select>
    </label>
  );
}
