import React from "react";

const Card = (props) => {
  // console.log(props)
  const handleDeleteBtn = props.handleDelete
  const index = props.idx
  // console.log(index)
  return (
    <div
      className="h-70 w-65 flex flex-col justify-center items-center gap-1 p-4 font-mono rounded-2xl 
                    bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
    >
      <img
        className="h-24 w-24 rounded-[50%] object-cover"
        src={props.user.img}
        alt={name}
      />
      <h1 className="font-bold text-2xl text-center">{props.user.name}</h1>
      <h3 className="font-medium text-center">{props.user.role}</h3>
      <p className="text-[.75rem] text-center font-light w-[90%] min-h-[30% overflow-hidden bg-pink-300]">{props.user.desc}</p>

      <div
        onClick={() => {
          handleDeleteBtn(index)}}
        className="px-2 py-1 bg-red-500 rounded-xl font-semibold active:scale-95 cursor-pointer mt-2"
      >
        Delete
      </div>
    </div>
  );
};

export default Card;
