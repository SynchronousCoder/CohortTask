import React, { useState } from "react";
import Card from "./Card";

const Form = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("FORM SUBMITED!!");
    setUsers([
      ...users,
      {
        name: name,
        desc: desc,
        img: img,
      },
    ]);
    // reset fields
    setName("");
    setDesc("");
    setImg("");

    console.log(users)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-sm mx-auto bg-white p-4 rounded-lg shadow-md space-y-3"
      >
        {/* Name Field */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Description Field */}
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="2"
        ></textarea>

        {/* Image URL Field */}
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="Image URL"
          className="w-full px-3 py-2 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md 
                     hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>

      {users.map((user, idx) => {
        return (
          <Card key={idx} name={user.name} desc={user.desc} img={user.img}/>
        );
      })}

    </>
  );
};

export default Form;
