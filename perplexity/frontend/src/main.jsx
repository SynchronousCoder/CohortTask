import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import ChatProvider from "./features/chat/chat.context.jsx";

createRoot(document.getElementById("root")).render(
  <ChatProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChatProvider>,
);
