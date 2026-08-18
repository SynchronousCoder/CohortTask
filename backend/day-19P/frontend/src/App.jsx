import { Route, Routes } from "react-router-dom"
import Login from "./Features/auth/Login"
import Register from "./Features/auth/Register"
import Home from "./Features/home/Home"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </>
  )
}

export default App
