import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CircleLogo from '../PassportRedemption/CircleLogo.png';
import CrawlMap from '../PassportRedemption/CrawlMap.png';

interface HeaderContainerProps {
  fixed : boolean
  width: number
}

interface PlaceholderProps {
  height : number
}

const RulesFaq = () => {

  const headerContainerRef = useRef<HTMLDivElement>(null)
  const headerWithRef = useRef<HTMLDivElement>(null)
  const [fixedPosition, setFixedPosition] = useState(false)
  const [placeholderHeight, setPlaceholderHeight] = useState(0)
  const [headerWidth, setHeaderWidth] = useState(0);

  const updateHeaderWidth = () => {
    if (headerWithRef.current !== null) {
      setHeaderWidth(headerWithRef.current.offsetWidth)
    }
  }

  useEffect(() => {
    const rect = headerContainerRef.current?.getBoundingClientRect()
    if (rect === undefined) {
      return
    }
    
    updateHeaderWidth()
    window.addEventListener('resize', updateHeaderWidth)

    const initialTop = window.scrollY + rect.top
    const handleScroll = () =>{
        const fixed = window.scrollY > initialTop
        setFixedPosition(fixed)
        setPlaceholderHeight(fixed ? rect.height : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
        window.removeEventListener("scroll", handleScroll)
    }
  },[])

  return (
    <Container> 
        <PassportContainer>
          <TopContainer>
            <TopLink href="goggle.com">VIEW MAP</TopLink>
            <Logo
              src={CircleLogo}
              alt="scl-log" />
            <TopLink href="goggle.com">CONTACT US</TopLink>
          </TopContainer>
          <InnerContainer className="rulesfaq">
              <HeaderParentContainer fixed={fixedPosition} width={headerWidth}>
                  <HeaderContainer ref={headerContainerRef}>
                      <Title>HOW TO WIN REWARDS</Title>
                  </HeaderContainer>
              </HeaderParentContainer>
              <Placeholder height={placeholderHeight} ref={headerWithRef} />
          <Content>
            <RewardsLink href="">VIEW ACTIVE REWARDS & GIVEAWAYS</RewardsLink>
            <Question>
            What is Lorem Ipsum?
            </Question>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            <Question>
            Where does it come from?
            </Question>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
          </Content>
        </InnerContainer>
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
  max-width: 380px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
  font-size: 12px;

`;

const TopContainer = styled.div`
  margin-top: 35px;
  margin-bottom: 25px;
`

const TopLink = styled.a`
  font-weight: bold;
  margin-left: 20px;
  margin-right: 20px;
  color: black;
  letter-spacing: .15em;
  @media (max-width: 370px) {
    margin-left: 15px;
    margin-right: 15px;
`

const Logo = styled.img`
  filter: drop-shadow(0 0mm 2px #cdcdcd);
  vertical-align:middle;
`;

const InnerContainer = styled.div`
background-color: white;
border: 1px solid #dedede;
padding: 5px 20px 25px;
box-sizing: border-box;
overflow:hidden;
border-radius: 20px;

`;

const HeaderParentContainer = styled.div`
${(props : HeaderContainerProps) => props.fixed ? `
position: fixed;
top: 0;
width: ${props.width}px;` : `
`}
`;

const HeaderContainer = styled.div`
display: flex;
justify-content: center;
box-shadow: 0 10px 7px -7px #ccc;
background-color: white;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  letter-spacing: .15em;
`;

const Content = styled.div`
padding: 20px 15px 15px;
`;

const Placeholder = styled.div`
${(props : PlaceholderProps) => "height: " + props.height + "px"}
width: 100%;
`;

const RewardsLink = styled.a`
  text-transform: uppercase;
  color: black;
  font-weight: bold;
  letter-spacing: .15em;
`;

const Question = styled.p`
  font-weight: bold;
  margin-bottom: 1px;
`;

export default RulesFaq;