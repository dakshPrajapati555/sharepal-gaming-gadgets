export default function ProductImage({ src, alt, tag, outOfStock }) {
  const badgeClass =
    tag === "New" ? "badge new" : tag === "Vote to Launch" ? "badge vote" : "badge";
  return (
    <div className="product-image">
      {tag ? <span className={badgeClass}>{tag}</span> : null}
      <img src={src} alt={alt} loading="lazy" />
      {outOfStock ? <span className="stock-pill">Out of stock</span> : null}
    </div>
  );
}
