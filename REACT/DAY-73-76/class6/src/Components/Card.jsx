import React from "react";

const Card = ({name, desc, img}) => {
  console.log(name, desc, img)
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image */}
      <img
        src={img}
        alt="Profile"
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2 text-sm">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Card;
