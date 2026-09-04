import React, { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong } from "../service/song.api";

const useSong = () => {
  const context = useContext(SongContext);
  const { song, setSong, loading, setLoading } = context;

  async function handleGetSong({ mood }) {
    setLoading(true);
    try {
      const data = await getSong({ mood });
      setSong(data.song);
      console.log("ans=>", { mood }, data.song);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    handleGetSong, loading, song
  };
};

export default useSong;
