import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/ProductContext";
import FilterContextProvider from "./context/filterContext.jsx";
import CartContextProvider from "./context/cartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <FilterContextProvider>
        <CartContextProvider>
        <App />
        </CartContextProvider>
      </FilterContextProvider>
    </AppProvider>
  </React.StrictMode>
);
