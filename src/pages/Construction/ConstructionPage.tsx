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
        <Icon src={ConstructionImage} alt="under construction" />
        <MainHeader>Website Under Construction</MainHeader>
        <SubHeader>
          Our systems are temporarily offline as we are undergoing maintenance.
          We apologize for any inconvenience this may cause and appreciate your
          continued support and patience.
          <br />
          <br />
          If you are looking to get in touch, volunteer, or donate, please send
          us a note at{' '}
          <a
            href="mailto:hello@sendchinatownlove.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            hello@sendchinatove.com
          </a>
        </SubHeader>
      </Text>
    </Container>
  );
};

export default ConstructionPage;

const Container = styled.main`
  font-family: Open Sans;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;

const Icon = styled.img`
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
  font-size: 24px;
`;
const SubHeader = styled.div`
  margin: 0.2rem auto;
  max-width: 400px;
`;
