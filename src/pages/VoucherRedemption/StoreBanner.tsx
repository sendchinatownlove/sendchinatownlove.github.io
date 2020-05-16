import React from 'react';
import styled from 'styled-components';
import ImageSrc from '../../images/sample-banner.png';

interface Props {}

const StoreBanner = (props: Props) => {
  return (
    <Container>
      <OwnerImage src={ImageSrc} />
      <Header>Welcome to Shunfa Bakery</Header>
    </Container>
  );
};

export default StoreBanner;

const Container = styled.div`
  width: 100%;
  margin: 24px auto;
  color: black;
  text-align: center;
`;
const Header = styled.h1`
  font-weight: 700;
`;
const OwnerImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
`;
