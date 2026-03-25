import { useState } from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { PostProvider } from "./features/post/post.context.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <PostProvider>
          <AppRoutes />
        </PostProvider>
      </AuthProvider>
    </>
  );
}

export default App;
