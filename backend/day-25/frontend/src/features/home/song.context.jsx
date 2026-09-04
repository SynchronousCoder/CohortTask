import { useState } from "react";
import { createContext } from "react";

export const SongContext = createContext();
const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/aren/moodify/songs/Beeba__RiskyjaTT.CoM__dO-E3qcPj.mp3",
    posterUrl:
      "https://ik.imagekit.io/aren/moodify/posters/Beeba__RiskyjaTT.CoM__27HDwGYS5.jpg",
    title: "Beeba (RiskyjaTT.CoM)",
    mood: "suprised",
  });
  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
      {children}
    </SongContext.Provider>
  );
};

export default SongContextProvider;