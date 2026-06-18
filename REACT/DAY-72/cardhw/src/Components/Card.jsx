import React from "react";

const Card = (props) => {
  const user = props.user;
  console.log(user.images[0]);
  return (
    <div>
      <div className="card h-[27rem] w-[27rem] bg-amber-50 rounded-2xl p-1 overflow-hidden">
        <div className="upper h-[35%] w-[100%] flex gap-1 p-1">
          <div className="bg-red-300 h-[100%] w-1/3 overflow-hidden flex items-center justify-center">
            <img src={user.images[0]} alt="" />
          </div>
          <div className="bg-blue-300 h-[100%] w-1/3 overflow-hidden flex items-center justify-center">
            <img src={user.images[1]} alt="" />
          </div>
          <div className="bg-green-300 h-[100%] w-1/3 overflow-hidden flex items-center justify-center">
            <img src={user.images[2]} alt="" />
          </div>
        </div>

        <div className="middle h-[45%] w-full relative flex flex-col items-center justify-start">
          {/* Profile Pic */}
          <div className="profilePic absolute left-1/2 top-[5%] transform -translate-x-1/2 -translate-y-1/2 border-4 border-amber-50 rounded-full">
            <div className="h-24 w-24 rounded-full bg-black overflow-hidden">
              <img src={user.profilePic} alt={user.profileName} />
            </div>
          </div>

          {/* Profile Name */}
          <div className="profileName w-full relative flex flex-col justify-center items-center mt-15">
            <h2 className="font-bold">{user.profileName}</h2>
            <p className="text-[.85rem] text-gray-500">{user.realName}</p>
          </div>

          {/* Profile Description */}
          <div className="profileDesc w-full px-6 mt-2">
            <p className=" w-full h-20 text-[0.75rem] overflow-hidden text-ellipsis text-center">
              {user.description}
            </p>
          </div>
        </div>

        <div className="lower h-[20%] w-[100%] flex justify-between items-center px-6">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-[1.4rem]">{user.media}</h1>
            <h3 className="font-light">Media</h3>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-[1.4rem]">{user.followers}</h1>
            <h3>Followers</h3>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-[1.4rem]">{user.following}</h1>
            <h3>Following</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
