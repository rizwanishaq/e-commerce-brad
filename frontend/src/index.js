import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";
import "./index.css";
import ProductContextProvider from "./contexts/productContext";
import App from "./App";
import CartContextProvider from "./contexts/cartContext";

ReactDOM.render(
  <CartContextProvider>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </CartContextProvider>,
  document.getElementById("root")
);
