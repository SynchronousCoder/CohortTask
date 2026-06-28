import React, { useState } from "react";

const Basic = () => {
  let a = 0;
  let [num, setnum] = useState(a);
  console.log(num);

  let n = "Aryan";
  const [name, setName] = useState(n);
  console.log(name);

  function increment() {
    setnum(num + 1);
    return num;
  }

  function changeName() {
    setName("Snippet");
  }

  return (
    <>
      <div>
        <h1>{num}</h1>
        <button
          onClick={() => {
            increment();
          }}
        >
          Increase
        </button>
      </div>

      <div>
        <h1>{name}</h1>

        <button
          onClick={() => {
            changeName();
          }}
        >
          Click Me
        </button>
      </div>
    </>
  );
};

export default Basic;