import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { FavoritesProvider } from "./hooks/useFavorites";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
