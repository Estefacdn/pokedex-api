import React, { useEffect, useState } from "react";

const Pokedex = () => {
  const [allPokemons, setAllPokemons] = useState([])

  const getAllPokemons = async () => {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const allPokemons = await data.json();
    setAllPokemons(allPokemons);
    console.log(allPokemons)
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  /* for (let i = 1; i < id ; i++) {
    const element = array[index];
    
  } */

  return (
    <div>
     {allPokemons.map(pokemon => (
       <><li>{pokemon.name}</li> </>
      ))}

    </div>
  );
};

export default Pokedex;
