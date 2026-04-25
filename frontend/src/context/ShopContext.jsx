import { createContext, useState, useEffect } from "react";
import apiClient from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "INR";
  const delivery_fee = 60;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [cartItems, setCartItems] = useState({});

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await apiClient.get("/cart");
      const cart = response.data;
      if (cart && cart.items) {
        const cartData = {};
        cart.items.forEach((item) => {
          if (!cartData[item.product._id]) {
            cartData[item.product._id] = {};
          }
          cartData[item.product._id][item.size] = item.quantity;
        });
        setCartItems(cartData);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    try {
      const response = await apiClient.post("/cart/add", {
        productId: itemId,
        size,
        quantity: 1,
      });

      if (response.data && response.data.items) {
        const cartData = {};
        response.data.items.forEach((item) => {
          if (!cartData[item.product._id]) {
            cartData[item.product._id] = {};
          }
          cartData[item.product._id][item.size] = item.quantity;
        });
        setCartItems(cartData);
        toast.success("Added to cart");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    try {
      if (quantity === 0) {
        const response = await apiClient.delete("/cart/remove", {
          data: { productId: itemId, size },
        });

        if (response.data && response.data.items) {
          const cartData = {};
          response.data.items.forEach((item) => {
            if (!cartData[item.product._id]) {
              cartData[item.product._id] = {};
            }
            cartData[item.product._id][item.size] = item.quantity;
          });
          setCartItems(cartData);
          toast.success("Removed from cart");
        }
      } else {
        const response = await apiClient.put("/cart/update", {
          productId: itemId,
          size,
          quantity,
        });

        if (response.data && response.data.items) {
          const cartData = {};
          response.data.items.forEach((item) => {
            if (!cartData[item.product._id]) {
              cartData[item.product._id] = {};
            }
            cartData[item.product._id][item.size] = item.quantity;
          });
          setCartItems(cartData);
          toast.success("Cart updated");
        }
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast.error(error.response?.data?.message || "Failed to update cart");
    }
  };

  const getCartTotal = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (product) {
        for (const size in cartItems[productId]) {
          totalAmount += product.price * cartItems[productId][size];
        }
      }
    }
    return totalAmount;
  };

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
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    fetchCart,
    getCartTotal,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
