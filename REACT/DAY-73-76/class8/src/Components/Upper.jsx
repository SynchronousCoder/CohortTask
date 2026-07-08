import React from "react";

const Upper = (props) => {
  return (
    <div className="w-full h-48 overflow-hidden">
      <img
        src={props.users.image}
        alt={props.users.name}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Upper;