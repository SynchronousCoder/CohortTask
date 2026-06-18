import React, { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState("");

  function submitHandle(e) {
    e.preventDefault();
    console.log("Form submitted", { name, email, password });

    const data = { name, email, password };
    setForm([...form, data]);

    //clear form after submit
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-4" action="" onSubmit={submitHandle}>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="px-2 py-1 bg-blue-500 rounded-2xl active:scale-95"
          type="submit"
          onSubmit={() => {
            console.log(form);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
