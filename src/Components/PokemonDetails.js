import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import background from '../img/bgp.gif';
import SearchBar from './Searchbar';
const PokemonDataContainer=styled.div`
   
    display: flex;
    flex-direction: column;
    align-items:center;
    width:100%;
    background-image: url(${background});
    border-radius: 10px;
    justify-content: space-between;
    margin-bottom: 15px;

`

const PokemonDetails = () => {
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
  const HandleSearch=async (name)=>{ 
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
            );
            setPokemonData([response.data]);
            setLoading(false);
          } catch (error) {
            setError('');
            setLoading(false);
          }
              
}

  return (
    <div>
        <SearchBar onSearch={HandleSearch}></SearchBar>
        {loading && <p>Loading...</p>}
  
  {error && <p>{error}</p>}
        { pokemonData.map((pokemon) => (
        <PokemonDataContainer key={pokemon.id}>
        <div >
          <h2 style={{color:"black",fontSize:"25px", textAlign:"center" }}>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{width:"200px"}} />
          <p style={{color:"black", fontSize:"15px",textAlign:"center",fontWeight:"bold"}}>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
          <p style={{color:"black", fontSize:"15px",textAlign:"center",fontWeight:"bold"}}>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
        </div>
        </PokemonDataContainer>
      )) }
    
      
    </div>
  );
};

export default PokemonDetails;
