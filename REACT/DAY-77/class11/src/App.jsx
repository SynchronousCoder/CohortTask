import React, { useState } from "react";
import TextBox from "./Components/TextBox";

const App = () => {
  const [real, setReal] = useState("blue");

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-10 flex flex-col items-center justify-center gap-10">
      <h1
        className="
          text-4xl font-extrabold underline 
          animate-[fadeIn_1s_ease-out_forwards]
        "
      >
        The Best color is {real}
      </h1>
      <TextBox setReal={setReal} />
    </div>
  );
};

export default App;