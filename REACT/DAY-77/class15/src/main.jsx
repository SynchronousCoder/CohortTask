import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ProductDataContext from "./Context/ProductDataContext.jsx";

createRoot(document.getElementById("root")).render(
  <ProductDataContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductDataContext>,
);