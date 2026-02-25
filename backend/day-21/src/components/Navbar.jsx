import { NavLink } from "react-router-dom";
import "../shared/style.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/recipe">Recipe</NavLink>
      <NavLink to="/create-recipe">Create</NavLink>
    </div>
  );
};

export default Navbar;
