import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItemsFromStorage = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    setCartItems(cartItemsFromStorage);
  }, []);

  const addItems = async (id, qty) => {
    const { data } = await axios.get(`/api/products/${id}`);
    setCartItems([...cartItems, data]);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <CartContext.Provider value={{ cartItems, addItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
