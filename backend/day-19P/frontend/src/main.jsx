import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "remixicon/fonts/remixicon.css";
import "./global.scss";
import { AuthProvider } from "./Features/auth/auth.context.jsx";
import PostProvider from "./Features/post/post.context.jsx";
import FollowProvider from "./Features/follow/follow.context.jsx";

createRoot(document.getElementById("root")).render(
  <FollowProvider>
    <PostProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </PostProvider>
  </FollowProvider>
);
