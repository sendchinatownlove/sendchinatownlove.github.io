import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';

const Loader = () => {
  return (
    <LoaderContainer>
      <LinearLoader />
    </LoaderContainer>
  );
};

export default Loader;

const LinearLoader = styled(LinearProgress)`
  height: 16px !important;
  width: 100%;
  border-radius: 8px;
  background-color: #e6c5ca !important;
  & div {
    background-color: #ab192e !important;
  }
`;

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const LoaderFillerContainer = styled.div`
  width: 100%;
  height: 74vh;
`;
