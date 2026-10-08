import { useEffect, useState } from "react";
import { fetchProduct, fetchProductMeta, fetchProducts } from "../services/api.js";

export function useProductList(params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetchProducts(params)
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => {
        if (active) setError("Could not load products. Check that the API is running.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [JSON.stringify(params)]);

  return { data, loading, error };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    setNotFound(false);
    fetchProduct(id)
      .then((result) => {
        if (active) setProduct(result);
      })
      .catch((err) => {
        if (!active) return;
        if (err.status === 404) setNotFound(true);
        else setError("Could not load this product.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return { product, loading, error, notFound };
}

export function useProductMeta() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    fetchProductMeta()
      .then(setMeta)
      .catch(() => setMeta(null));
  }, []);

  return meta;
}
