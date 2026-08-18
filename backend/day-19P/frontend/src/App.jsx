import { Route, Routes } from "react-router-dom"
import Login from "./Features/auth/pages/Login"
import Register from "./Features/auth/pages/Register"
import Hero from "./Features/hero/Hero"
import Home from "./Features/auth/pages/Home"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </>
  )
}

export default App
