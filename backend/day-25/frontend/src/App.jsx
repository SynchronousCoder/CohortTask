import { Route, Routes } from "react-router-dom";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Protected from "./features/auth/components/Protected";
import Hero from "./features/hero/pages/Hero";
import Home from "./features/home/pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;