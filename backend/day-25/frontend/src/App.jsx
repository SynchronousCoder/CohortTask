import { Route, Routes } from "react-router-dom";
import FaceExpression from "./features/Expression/components/FaceExpression";
import Home from "./features/home/pages/Home";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Protected from "./features/auth/components/Protected";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/home"
          element={
            <Protected>
              <FaceExpression />
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