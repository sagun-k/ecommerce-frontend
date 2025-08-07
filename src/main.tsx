import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.scss";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { App } from "./App";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
        <ToastContainer position="bottom-left" />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
