import React, { useState } from "react";

const Advance = () => {
  function changeGender() {
    if (gender == "Male") {
      setGender("Female");
    } else if (gender == "Female") {
      setGender("Others");
    } else {
      setGender("Male");
    }
  }
  const [gender, setGender] = useState("Male");
  console.log(gender);
  return (
    <div className="advance">
        
      <h1>{gender}</h1>
      <button className="button"
        onClick={() => {
          changeGender();
        }}
      >
        Change
      </button>

        <div className={`washroom ${gender}`}> {gender} WASHROOM</div>

    </div>
  );
};

export default Advance;
