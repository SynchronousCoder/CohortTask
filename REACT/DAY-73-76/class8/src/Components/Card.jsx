import React from "react";
import Upper from "./Upper";
import Lower from "./Lower";

const Card = (props) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <Upper users={props.user} />
      <Lower user={props.user} />
    </div>
  );
};

export default Card;