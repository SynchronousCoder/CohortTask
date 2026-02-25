import {BrowserRouter ,Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import "../shared/style.css"
import About from "../pages/About"
import Recipes from "../pages/Recipes"
import Create from "../pages/Create"

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/recipe" element={<Recipes/>}/>
            <Route path="/create-recipe" element={<Create/>}/>
        </Routes>
    </div>
  )
}

export default Router