import React, { useState } from "react";
import Card from "./Components/Card";

const App = () => {
  const localData = JSON.parse(localStorage.getItem('all-Users')) || []

  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [role, setRole] = useState("");
  const [desc, setDesc] = useState("");

  const [allUser, setAllUser] = useState(localData);
  console.log(allUser);
  

  function handleSubmit(e) {
    e.preventDefault();

    const oldUsers = [...allUser];
    oldUsers.push({ name, img, role, desc });

    setAllUser(oldUsers);
    localStorage.setItem('all-Users', JSON.stringify(oldUsers))

    // const user = { name: name, img: img, role: role, desc: desc };
    console.log("Form Submited!!");
    setName("");
    setImg("");
    setDesc("");
    setRole("");
  }

  function handleDelete(idx) {
    const copyUsers = [...allUser]
    copyUsers.splice(idx, 1)

    setAllUser(copyUsers)
    localStorage.setItem('all-Users', JSON.stringify(copyUsers))
    console.log("card deleted!!")
  }

  return (
    <div className="h-screen bg-black text-white">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="p-2 flex flex-wrap justify-center"
      >
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[45%]"
          type="text"
          placeholder="Enter Your Name"
        />
        <input
          onChange={(e) => {
            setImg(e.target.value);
          }}
          value={img}
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[45%]"
          type="text"
          placeholder="Img Url"
        />
        <input
          onChange={(e) => {
            setRole(e.target.value);
          }}
          value={role}
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[45%]"
          type="text"
          placeholder="Enter Your Role"
        />
        <input
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[45%]"
          type="text"
          placeholder="Enter Description"
        />
        <button className="px-5 py-2 text-xl active:scale-95 cursor-pointer font-semibold bg-emerald-700 rounded m-2">
          Submit
        </button>
      </form>

      <div className="flex flex-nowrap gap-5 px-15">
        {allUser.map((user, idx) => {
          return (<Card key={idx} idx={idx} user={user} handleDelete={handleDelete}/>)
        })}
      </div>
    </div>
  );
};

export default App;