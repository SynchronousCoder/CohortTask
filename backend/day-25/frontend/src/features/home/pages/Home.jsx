import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import useSong from "../hook/useSong";

const Home = () => {
  const { handleGetSong, song} = useSong();

  return (
    <div>
      <FaceExpression
        onClick={(expression) => {
          handleGetSong({mood: expression});
        }}
      />
      <Player />
    </div>
  );
};

export default Home;
