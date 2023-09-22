import React, { useState, useEffect, FC } from "react";
import { IPokemon, Result } from "../Services/PokemonInterface";
import axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState<IPokemon>();
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [limitButton, setLimitButton] = useState<number>(limit);
  const [filterInput, setFilterInput] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then((response) => {
        setPokemonData(response.data);
        setLoading(false);
      });
    console.log(pokemonData);
  }, [limitButton]);

  const filterPokemon = pokemonData?.results.filter((pokemon) => {
    const nameContains = pokemon.name
      .toLowerCase()
      .includes(filterInput.toLowerCase());
    return nameContains ? pokemon : null;
  });

  const loadSpiner = () => {
    return (
      <div className="spinner">
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={["#ff0000", "#00ff00", "#0000ff"]}
          backgroundColor="#F4442E"
        />
      </div>
    );
  };
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const newLimit = limit;
    setLimitButton(newLimit);
  };

  return (
    <>
      <div className="m-2">
        <div className="input-group rounded" style={{ width: 300 }}>
          <input
            type="search"
            className="form-control"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
        </div>

        {loading ? (
          loadSpiner()
        ) : (
          <ul>
            {filterPokemon?.map((pokemon: Result) => (
              <div key={pokemon.name}>
                <li>{pokemon.name}</li>
              </div>
            ))}
          </ul>
        )}
        <div className="input-group rounded" style={{ width: 300 }}>
          <input
            type="number"
            className="form-control"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleClick}
          >
            Get Pokemon
          </button>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
