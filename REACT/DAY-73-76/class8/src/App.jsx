import React from "react";
import Card from "./Components/Card";

const App = () => {
  const users = [
    {
      name: "Arjun Mehta",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      description:
        "An adventurous soul who loves exploring mountains and capturing nature through photography.",
    },
    {
      name: "Ravi Sharma",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      description:
        "A cheerful personality who enjoys autumn walks and spreading positivity wherever he goes.",
    },
    {
      name: "Neha Kapoor",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      description:
        "A creative thinker with a passion for design and storytelling through visuals.",
    },
    {
      name: "Simran Kaur",
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
      description:
        "A vibrant individual who loves fashion, colors, and bringing joy to her surroundings.",
    },
    {
      name: "David Johnson",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      description:
        "A dedicated developer who thrives in modern workspaces and enjoys solving complex problems.",
    },
    {
      name: "Maria Lopez",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      description:
        "An energetic professional with a warm smile, passionate about community building.",
    },
  ];

  return (
    <div className="h-[100vh] w-[100vw] bg-black py-6 px-6 flex flex-wrap gap-6 justify-center items-start overflow-auto">
      {users.map((user, idx) => {
        return <Card user={user} key={idx} />;
      })}
    </div>
  );
};

export default App;