import { createContext, useState, useEffect } from "react";
import apiClient from "../api/axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "INR";
  const delivery_fee = 60;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get("/products");
        console.log(data);
        setProducts(data?.products || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const value = {
    currency,
    delivery_fee,
    products,
    loading,
    error,
  };

  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
