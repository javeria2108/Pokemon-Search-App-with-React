import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        const results = response.data.results;
        const pokemonPromises = results.map(async (result) => {
          const pokemonResponse = await axios.get(result.url);
          return pokemonResponse.data;
        });
        const pokemonDetails = await Promise.all(pokemonPromises);
        setPokemonData(pokemonDetails);
        setLoading(false);
      } catch (error) {
        setError('Error fetching Pokemon data.');
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id}>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
          <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default Pokedex;
