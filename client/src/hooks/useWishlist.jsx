import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "sharepal-wishlist";
const WishlistContext = createContext(null);

function readWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(readWishlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      has: (id) => ids.includes(Number(id)),
      toggle: (id) => {
        const numericId = Number(id);
        setIds((current) =>
          current.includes(numericId)
            ? current.filter((item) => item !== numericId)
            : [...current, numericId]
        );
      },
    }),
    [ids]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
