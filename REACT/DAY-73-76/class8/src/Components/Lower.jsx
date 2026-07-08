import React from "react";

const Lower = (props) => {
    console.log(props.user)
  return (
    <div>
      {/* Lower section with name + description */}
      <div className="lower p-4">
        <h2 className="text-gray-900 text-xl font-bold">{props.user.name}</h2>
        <p className="text-gray-700 text-base mt-2">
          {props.user.description}
        </p>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Action
        </button>
      </div>
    </div>
  );
};

export default Lower;