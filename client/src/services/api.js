const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

async function request(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    const error = new Error(`Request failed: ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export function fetchProducts(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return request(`/api/products${suffix}`);
}

export function fetchProduct(id) {
  return request(`/api/products/${id}`);
}

export function fetchProductMeta() {
  return request("/api/products/meta");
}
