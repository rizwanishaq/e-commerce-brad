import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import ProductContextProvider from "./contexts/productContext";
import CartContextProvider from "./contexts/cartContext";
import AuthContextProvider from "./contexts/authContext";

ReactDOM.render(
  <AuthContextProvider>
    <CartContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </CartContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
