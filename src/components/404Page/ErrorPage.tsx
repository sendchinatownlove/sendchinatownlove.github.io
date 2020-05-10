import React from 'react';
import styled from 'styled-components';
import ErrorImage from '../../images/404-error-image.png';

interface Props {
  menuOpen: boolean;
}

const ErrorPage = (props: Props) => {
  return (
    <Container>
      <Text menuOpen={props.menuOpen}>
        <Error src={ErrorImage} alt="error" />
        <MainHeader> Sorry Your Dumpling Was Not Found! </MainHeader>
        <SubHeader>
          {' '}
          The page you are trying does not exist or has been moved.
        </SubHeader>
        <SubHeader>Please try going back to the homepage.</SubHeader>
        <BackToHome>
          <a href="https://sendchinatownlove.com/">GO TO HOMEPAGE</a>
        </BackToHome>
      </Text>
    </Container>
  );
};

export default ErrorPage;

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
  display: ${(props: Props) => (props.menuOpen ? 'none' : 'flex')};
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
