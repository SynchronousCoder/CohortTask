import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [num, setNum] = useState(0);
  const [pokemon, setPokemon] = useState([])

  const getPokemon = async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon",
    );
    setPokemon(response.data.results)
    console.log(pokemon);
  };

  useEffect(() => {
    getPokemon();
  },[num]);

  return (
    <div>
      {pokemon.map((poke, idx) => {
        return (
          <div key={idx}>
            <img src={poke.url} alt="" />
            <h2>{poke.name}</h2>
          </div>
        )
      })}
      <button onClick={() => {
        setNum(num+1)
      }}>click</button>
    </div>
  );
};

export default App;