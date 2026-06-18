import React from "react";
import Card from "./Components/Card";

const App = () => {

  const users = [
    {
      profileName: "prathak_boiii",
      realName: "Prathak Mehta",
      profilePic:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      images: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      ],
      media: 37,
      followers: "241K",
      following: 231,
      description:
        "Digital creator sharing lifestyle, photography and travel content.",
    },
    {
      profileName: "sarah.codes",
      realName: "Sarah Johnson",
      profilePic:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
      ],
      media: 128,
      followers: "1.2M",
      following: 543,
      description:
        "Frontend developer and content creator helping people learn React.",
    },
    {
      profileName: "alex.visuals",
      realName: "Alex Carter",
      profilePic:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      images: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      ],
      media: 89,
      followers: "856K",
      following: 178,
      description:
        "Filmmaker, photographer and storyteller capturing moments worldwide.",
    },
  ];

  return (
    <div className="h-full w-full bg-gray-950 text-black font-mono flex gap-2 p-2 flex-wrap justify-center items-center">
      {users.map( (user, index) => {
        return <Card user={user} key={index} />
      })}
    </div>
  );
};

export default App;
