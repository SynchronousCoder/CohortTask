import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import RecipeContext from "./context/RecipeContext.jsx";

createRoot(document.getElementById("root")).render(
  <RecipeContext>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </RecipeContext>
);
