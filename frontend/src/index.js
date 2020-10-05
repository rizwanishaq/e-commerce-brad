import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap.min.css";
import "./index.css";
import ProductContextProvider from "./contexts/productContext";
import App from "./App";

ReactDOM.render(
  <ProductContextProvider>
    <App />
  </ProductContextProvider>,
  document.getElementById("root")
);
