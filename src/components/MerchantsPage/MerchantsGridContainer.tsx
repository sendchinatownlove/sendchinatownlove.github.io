import React from 'react';
import styled from 'styled-components';

const MerchantsGridContainer = ({ loadingSellers, children }) => {
  return <Container loadingSellers={loadingSellers}>{children}</Container>;
};

export default MerchantsGridContainer;

const Container = styled.div`
  display: ${({ loadingSellers }: { loadingSellers: boolean }) =>
    loadingSellers ? 'flex' : 'grid'};
  grid-template-columns: repeat(auto-fill, 350px);
  grid-gap: 2.5rem 6rem;
  justify-content: center;
  align-items: center;
  min-height: 500px;

  @media (max-width: 1350px) {
    grid-gap: 2.5rem 5%;
  }

  @media (max-width: 625px) {
    grid-template-columns: 1fr;
    justify-content: center;
    grid-gap: 10px;
    min-height: 200px;
  }
`;
