import React from "react";

const Nav = () => {
  return (
    <div className="navbar">
      <div className="prefix">
        <h4>Horizon Clinic</h4>
      </div>
      <div className="middle">
        <div>About Us</div>
        <div>Services</div>
        <div>Contact</div>
      </div>
      <div className="suffix">Book Now</div>
    </div>
  );
};

export default Nav;