import styled from "styled-components";
import React, { useState } from 'react';
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; /* Center-align the content */
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
    background: black;
    color:white;
    border: 1px solid black;
    outline: none;
  }
`;

const SearchBar =({onSearch}) => {
    const [searchName, setSearchName] = useState('');
  
    const handleInputChange = (event) => {
      setSearchName(event.target.value);

    };
  
    const handleSubmit = (event) => {
        
        event.preventDefault();
        console.log("im here");
        if (searchName!==''){
        onSearch(searchName.trim());}

     //   props.func(searchName);
      
    
      // Perform the search or API request here
      // You can pass the searchName to the parent component or trigger an API request directly
    };
    
  
    return (
        <SearchContainer>
      <form >
        <input
          type="text"
          value={searchName}
          onChange={handleInputChange}
          placeholder="Search for a Pokemon"
        />
          <button onClick={handleSubmit} style={{color:"white",backgroundColor:"#0A285F", padding:"5px 10px",borderRadius:"10px",
        cursor:"pointer", fontWeight:"bold",fontSize:"15px" } } >Search</button> 
      </form>
      </SearchContainer>
    );
  };
  
  
  export default SearchBar;
  