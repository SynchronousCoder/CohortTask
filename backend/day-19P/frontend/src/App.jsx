import { Route, Routes } from "react-router-dom"
import Login from "./Features/auth/pages/Login"
import Register from "./Features/auth/pages/Register"
import Hero from "./Features/hero/Hero"
import Feed from "./Features/post/pages/Feed"
import Create from "./Features/post/pages/Create"
import Follow from "./Features/follow/pages/Follow"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Feed />}/>
        <Route path="/create-post" element={<Create />}/>
        <Route path="/follow" element={<Follow /> }/>
      </Routes>
    </>
  )
}

export default App
