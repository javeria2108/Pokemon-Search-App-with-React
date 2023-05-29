import Pokedox from './Components/Pokedox';
import styled from "styled-components";
import img from './img/bg.gif';


const Content=styled.div`
position:fixed;
top:0;
left:0;
min-width:100%;
min-height:100%;
border:1px solid #000;
background-image: url(${img}) ;
background-size: contain;
`
const Container=styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin:30px 0 10px;
  font-family:Montserrat;
 
`
const Header=styled.span`
  color:black;
  font-size:25px;
  font-weight:bold;

`
function App() {
  return (

    <> 
    <Content>
    <Container>
    <Header>
    Pokedox
  </Header>
  <Pokedox/>
  </Container>
  </Content>
  </>
   
  );
}

export default App;
