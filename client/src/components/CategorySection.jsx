import React from "react";

export default function CategorySection({
  activeCategory,
  selected,
  onSelectCategory,
  onSelect,
}) {
  const active = selected || activeCategory || "";
  const handleSelect = onSelect || onSelectCategory;

  const subcategories = [
    {
      id: "all",
      label: "All",
      category: "",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      ),
    },
    {
      id: "gta-vi",
      label: "GTA VI",
      category: "Game Bundle",
      image: "https://images.sharepal.in/category-icons/gta-vi.webp",
    },
    {
      id: "ps5-console",
      label: "PS5 Console",
      category: "PS5 Console",
      image: "https://images.sharepal.in/sub-category-card/ps5-console-on-rent-sharepal.webp",
    },
    {
      id: "xbox-console",
      label: "Xbox Console",
      category: "Xbox Console",
      image: "https://images.sharepal.in/sub-category-card/xbox-console-on-rent-sharepal.webp",
    },
    {
      id: "vr",
      label: "VR",
      category: "VR",
      image: "https://images.sharepal.in/sub-category-card/vr-on-rent-sharepal.webp",
    },
    {
      id: "racing-wheel",
      label: "Racing Wheel",
      category: "Racing Wheel",
      image: "https://images.sharepal.in/categories/gaming-consoles/gaming-accessories/logitech-G29-driving-force-racing-wheel/logitech-g29-racing-wheel-on-rent-sharepal-1.webp",
    },
    {
      id: "big-screen",
      label: "Big Screen Gaming",
      category: "Accessory",
      image: "https://images.sharepal.in/categories/gaming-consoles/big-screen-gaming/products/ps5-with-2-controllers-with-projector-on-rent+.webp",
    },
  ];

  return (
    <aside className="subcategory-rail-container" aria-label="Subcategories">
      <div className="subcategory-rail-list">
        {subcategories.map((cat) => {
          const isActive = active === cat.category;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelect?.(isActive && cat.category !== "" ? "" : cat.category)}
              className={`subcat-item-btn ${isActive ? "active" : ""}`}
              aria-pressed={isActive}
            >
              <div className={`subcat-icon-box ${isActive ? "active" : ""}`}>
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="subcat-img-asset"
                    loading="eager"
                  />
                ) : (
                  <div className="subcat-svg-icon">{cat.icon}</div>
                )}
              </div>
              <div className="subcat-label-wrap">
                <span className={`subcat-label-text ${isActive ? "active" : ""}`}>
                  {cat.label}
                </span>
                {isActive && <div className="subcat-active-bar" />}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

