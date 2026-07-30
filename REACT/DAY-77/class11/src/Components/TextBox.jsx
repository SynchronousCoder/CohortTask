import React, { useState } from "react";

const TextBox = (props) => {
  const [color, setColor] = useState("");

  function submitHandle(e) {
    e.preventDefault();
    console.log("form submitted");
    setColor("");
  }

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={(e) => {
          submitHandle(e);
          props.setReal(color);
        }}
        className="
          flex flex-col gap-4 p-6 rounded-xl bg-gray-800 shadow-lg
          animate-[fadeInUp_0.8s_ease-out_forwards]
        "
      >
        <input
          type="text"
          onChange={(e) => {
            setColor(e.target.value);
          }}
          placeholder="Enter text"
          className="
            text-white placeholder-gray-400 px-4 py-2 rounded-lg
            outline-none border-2 border-emerald-400
            focus:ring-2 focus:ring-emerald-300
            transition-all duration-300 ease-out
          "
          value={color}
        />
        <button
          className="
            px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold
            transition-transform duration-300 ease-out
            hover:scale-105 focus:scale-105
            focus:outline-none focus:ring-2 focus:ring-emerald-300
          "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TextBox;