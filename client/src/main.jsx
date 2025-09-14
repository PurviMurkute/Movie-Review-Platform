import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ContextProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ContextProvider>
);
