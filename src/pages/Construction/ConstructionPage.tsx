import React from 'react';
import styled from 'styled-components';
import ConstructionImage from '../../images/construction-image.png';

interface CompactProps {
  menuOpen: boolean;
}

const ConstructionPage = (props: CompactProps) => {
  return (
    <Container>
      <Text menuOpen={props.menuOpen}>
        <Error src={ConstructionImage} alt="under construction" />
        <MainHeader> Website Under Construction! </MainHeader>
        <SubHeader> Our website is currently undergoing maintenance.</SubHeader>
        <SubHeader>
          Please be patient while we're hard at work! You can still donate to us
          in the meantime.
        </SubHeader>
        <BackToHome>
          <a
            href="https://square.link/u/G7n2wte2?src=embed"
            target="_blank"
            rel="noopener noreferrer"
          >
            DONATE
          </a>
        </BackToHome>
      </Text>
    </Container>
  );
};

export default ConstructionPage;

const Container = styled.main`
  font-family: futura;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Error = styled.img`
  width: 80%;
  max-width: 480px;
  margin: 0 auto;
`;

const Text = styled.div`
  margin: 0 auto;
  width: 80%;
  text-align: center;
  display: ${(props: CompactProps) => (props.menuOpen ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const MainHeader = styled.div`
  font-weight: 600;
`;
const SubHeader = styled.div`
  font-weight: 400;
  margin: 0.2rem auto;
`;
const BackToHome = styled.div`
  font-weight: 450;
  font-size: 1rem;
  a {
    color: #a7182d;
  }
`;
