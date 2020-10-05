import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addCartItem = async (id, qty) => {
    const { data } = await axios.get(`/api/products/${id}`);
    const existItem = cartItems.find((item) => item._id === id);
    if (existItem) {
      existItem.qty = qty;
      setCartItems(
        cartItems.map((item) => (item._id === id ? existItem : item))
      );
    } else {
      const newItem = data;
      newItem.qty = qty;
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeCartItem = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addCartItem, removeCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
