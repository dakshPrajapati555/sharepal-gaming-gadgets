export default function SearchBar({ value, onChange }) {
  return (
    <label className="sr-only-wrap" style={{ flex: 1, display: "flex" }}>
      <span className="visually-hidden" style={{ position: "absolute", left: -9999 }}>
        Search products
      </span>
      <input
        type="search"
        placeholder="Search PS5, games, racing wheel..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search products"
      />
    </label>
  );
}
