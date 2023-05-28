import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
const Pokedex = () => {
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const fetchPokemonData = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
          );
          setPokemonData(response.data);
          setLoading(false);
        } catch (error) {
          setError('Error fetching Pokemon data.');
          setLoading(false);
        }
      };
  
      if (searchTerm !== '') {
        fetchPokemonData();
      }
    }, [searchTerm]);
  
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    return (
      <div>
        <form>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a Pokemon"
          />
          <button type="submit">Search</button>
        </form>
  
        {loading && <p>Loading...</p>}
  
        {error && <p>{error}</p>}
  
        {pokemonData && (
          <div>
            <h2>{pokemonData.name}</h2>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
            <p>Type: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
            <p>Abilities: {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default Pokedex;
  