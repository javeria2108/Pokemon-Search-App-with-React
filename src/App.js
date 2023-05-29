import Pokedox from './Components/Pokedox';
import styled from "styled-components";
import img from './img/bg.gif';
import LogoSrc from './img/logo.png';


const Content=styled.div`
position:fixed;
top:0;
left:0;
min-width:100%;
min-height:100%;
border:1px solid #000;
background-image: url(${img}) ;
background-repeat: no-repeat; 
  background-position: center;
  background-attachment: fixed;       
  webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

`
const Container=styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin:30px 0 10px;
  font-family:Montserrat;
 
`

const Header=styled.span`
 
  color:yellow;
  font-size:40px;
  font-weight:bold;

`
const Logo=styled.img`
width: 100%;
height: 100%;
margin: 15px;
`
function App() {
  return (

    <> 
    <Content>
    <Container>
    <Header>
      <Logo src={LogoSrc}/>
  </Header>
  <Pokedox/>
  </Container>
  </Content>
  </>
   
  );
}

export default App;
