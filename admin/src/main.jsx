import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminContextProvider from "./context/AdminContext.jsx";
import CoachContextProvider from "./context/CoachContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <CoachContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </CoachContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
