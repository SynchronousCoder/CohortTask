import React, { useState } from "react";

const Array = () => {
  const users = [
    "aryan",
    "sarthak",
    "harsh",
    "sarkar",
    "diljit",
    "Dhanda Nyoli",
  ];
  const [marks, setMarks] = useState([90, 76, 92, 83, 21, 29]);

  function giveGrace() {
    const newMarks = marks.map(mark => {
        if(mark >= 95){
            return mark
        }else{
            return mark + 5
        }})
    console.log(newMarks)
    setMarks(newMarks)
  }

  return (
    <div>
      {marks.map((mark, idx) => {
        return (
          <h1 key={idx}>
            {" "}
            Student {idx + 1} = {mark}
            ({mark > 33 ? "PASS" : "FAIL"})
          </h1>
        );
        console.log(mark);
      })}

      <button
        onClick={() => {
          giveGrace();
        }}
      >
        Give Grace
      </button>
    </div>
  );
};

export default Array;
