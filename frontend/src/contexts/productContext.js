import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response && err.response.message
            ? err.response.data.message
            : err.message
        );
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response && err.response.message
            ? err.response.data.message
            : err.message
        );
        setLoading(false);
      }
    };
    fetchProduct();
    // eslint-disable-next-line
  }, [productId]);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, product, setProductId }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
