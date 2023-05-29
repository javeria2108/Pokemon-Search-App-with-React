import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import background from '../img/bgp.jpg';
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: Montserrat;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;

  & input {
    flex: 1;
    padding: 10px 12px;
    border-radius: 12px;
    background: lightgrey;
    border: 1px solid black;
    outline: none;
  }
`;
const PokemonDataContainer=styled.div`
   
    display: flex;
    flex-direction: column;
    align-items:center;
    width:100%;
    background-image: url(${background});
    border-radius: 10px;
   

`



const Pokedox = () => {
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
          setError('');
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
          <SearchContainer>
        <form>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a Pokemon"
          /> 
         <button type="submit" style={{color:"white",backgroundColor:"black", padding:"5px 10px",borderRadius:"10px",
        cursor:"pointer", fontWeight:"bold",fontSize:"15px" } } >Search</button> 
        </form>
        </SearchContainer>
        {loading && <p>Loading...</p>}
  
        {error && <p>{error}</p>}
  <PokemonDataContainer >
        {pokemonData && (
          <div>
            <h2 style={{color:"black",fontSize:"25px", textAlign:"center" }}>{pokemonData.name}</h2>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} style={{width:"200px"}}/>
            <p style={{color:"black", fontSize:"15px",textAlign:"center",fontWeight:"bold"}}>Type: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
            <p style={{color:"black", fontSize:"15px",textAlign:"center",fontWeight:"bold"}}>Abilities: {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')}</p>
          </div>
        )}
        </PokemonDataContainer>
      </div>
   
    );
  };
  
  export default Pokedox;
  