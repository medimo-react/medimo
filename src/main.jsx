import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "./providers/ModalProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </BrowserRouter>
    </Theme>
  </StrictMode>,
);
