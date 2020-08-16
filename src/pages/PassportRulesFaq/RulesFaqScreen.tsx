import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CircleLogo from '../PassportRedemption/CircleLogo.png';
import CrawlMap from '../PassportRedemption/CrawlMap.png';

interface Props {
  
}
const RulesFaq = (props: Props) => {

  const controls = useRef(document.createElement("div"))
  const [fixedPosition, setFixedPostion] = useState(true)

  useEffect(() =>{
      const initialTop = controls.current.getBoundingClientRect().top
      console.log({initialTop})
      const handleScroll = () =>{
          console.log(window.scrollY);
      }
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener("scroll", handleScroll);
      }
  }, [])


    return (
        <Container> 
            <PassportContainer>
            
        <Logo
          src={CircleLogo}
          alt="scl-log"/>
        <OuterContainer className="trackScreen top">
            <InnerContainer>
      <HeaderContainer fixed={fixedPosition}>
        Header
      </HeaderContainer>
              <Content>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </Content>
      
</InnerContainer>
</OuterContainer>

            </PassportContainer>
        </Container>
    )
}

const Container = styled.div`
  background-color: #e5e5e5;
  height: 100%;
  min-height: 100vh;
  background-image: url(${CrawlMap});

  @media (max-width: 475px) {
    background-size: 500px;
  }
`;

const PassportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red;
  max-width: 380px;
  margin: 0 auto;
  color: red;
  padding: 10px;
  box-sizing: border-box;
`;

const Logo = styled.img`
  filter: drop-shadow(0 0mm 2px #cdcdcd);
    position: relative;
    top: 50px;
    z-index: 5;
    filter: drop-shadow(0 -0.1mm 0.1px #cdcdcd);
  }
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  background-color: yellow;
  &.trackScreen {
    padding-top: 60px;
  }
`;

const InnerContainer = styled.div`
background-color: white;
border: 1px solid #dedede;
padding: 25px 20px;
box-sizing: border-box;
overflow:hidden;
border-radius: 20px;
padding-top: 60px;
`;

const Header = styled.div`
background-color: orange;
color: blue;
padding: 10px 15px;
`;

const Content = styled.div`
color: pink;
padding: 16px
`;


const HeaderContainer = styled.div`
display: flex;
flex-direction: row;
${props => props.fixed && css`
  position: fixed;
  top: 0
`}

`;

export default RulesFaq;