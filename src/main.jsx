import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import { registerSW } from "virtual:pwa-register";

// registro del serviceworker
registerSW({ immediate: true });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </StrictMode>,
);
