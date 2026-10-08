import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { RentalProvider } from "./hooks/useRentalDates.jsx";
import { WishlistProvider } from "./hooks/useWishlist.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WishlistProvider>
        <RentalProvider>
          <App />
        </RentalProvider>
      </WishlistProvider>
    </BrowserRouter>
  </React.StrictMode>
);
