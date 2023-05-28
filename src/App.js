import Pokedox from './Components/Pokedox';
import styled from "styled-components";
import img from './img.jpg'

const Container=styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin:30px 0 10px;
  font-family:Montserrat;
  background-image: (url ${img});
`
const Header=styled.span`
  color:black;
  font-size:25px;
  font-weight:bold;

`
function App() {
  return (

    <> 
    <Container>
    <Header>
    Pokedox
  </Header>
  <Pokedox/>
  </Container>
  </>
   
  );
}

export default App;
