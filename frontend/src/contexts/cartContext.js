import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { userInfo } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const [shippingAddress, setShippingAddress] = useState(
    localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {}
  );

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const [orderLoading, setOrderLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
  }, [shippingAddress]);

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

  const saveShippingAddress = (data) => {
    setShippingAddress(data);
  };

  const placeOrder = async (order) => {
    setOrderLoading(true);
    try {
      const { data } = await axios.post("/api/orders/", order, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      console.log(data);
      setOrderLoading(false);
      setSuccess(true);
      return data.data;
    } catch (err) {
      setOrderError(
        err.response && err.response.message
          ? err.response.data.message
          : err.message
      );
      setOrderLoading(false);
      setSuccess(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        removeCartItem,
        shippingAddress,
        saveShippingAddress,
        paymentMethod,
        setPaymentMethod,
        placeOrder,
        orderError,
        orderLoading,
        success,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
