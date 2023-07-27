import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import background from '../img/bgp.gif';
import SearchBar from './Searchbar';
import ReactPaginate from 'react-paginate';
const PokemonDataContainer=styled.div`
   
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
background-color:#57B9EA;
background-repeat: no-repeat;
background-position: center;
background-size: cover;
border-radius: 10px;
justify-content: space-between;
margin-bottom: 15px;

`
const StyledReactPaginate = styled(ReactPaginate)`
     display: flex;
     justify-content:space-between;
     align-items:center;
     cursor: pointer;
     font-size: larger;
     color: white;
     list-style:none;
     a{
        padding: 10px;
        margin:2px;
        background-color:#0A285F;
        border-radius: 10px;
        box-shadow:1px 1px 1px 1px #888999;
     }
     a:hover{
        opacity:0.5;
     }
`;

const PokemonDetails = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const[pageNumber,setPageNumber]=useState(0);

  const perPage=5;
  const pagesVisited=pageNumber*perPage;
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30');
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
const displayPokemon=pokemonData
.slice(pagesVisited,pagesVisited+perPage)
.map((pokemon) =>{
    return (
        <>
     <PokemonDataContainer key={pokemon.id}>
    <div >
      <h2 style={{fontFamily:"fantasy",font:"luminari", color:"#0A285F", textAlign:"center",fontSize:"30px" }}>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{width:"200px"}} />
    <div style={{backgroundColor:"#0A285F", height:"100px",width:"280px",borderRadius:"10px", paddingTop: "20px", marginBottom:"20px"}}>
      <p style={{fontFamily:"cursive",color:" white", fontSize:"18px",textAlign:"center",textDecorationLine:"underline"}}>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
      <p style={{fontFamily:"cursive",color:" white", fontSize:"18px",textAlign:"center",textDecorationLine:"underline"}}>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
      </div>
    </div>
    </PokemonDataContainer>
    </>
    )
})
const pageCount=Math.ceil(pokemonData.length/perPage);
const changePage=({selected})=>{
   setPageNumber(selected);
}
  return (
    <div>
        <SearchBar onSearch={HandleSearch}></SearchBar>
        {loading && <p style={{color:"#0A285F",fontSize:"30px"}}>Loading...</p>}
  
  {error && <p>{error}</p>}
       {displayPokemon}
       <StyledReactPaginate
          previousLabel={"PREV"}
          nextLabel={"NEXT"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"buttons"}
          previousLinkClassName={"previousB"}
          nextLinkClassName={"nextB"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}


       />
      
    </div>
  );
};

export default PokemonDetails;
