import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

type Props = {
  isPage: Boolean;
};

const MenuItem: React.SFC<Props> = ({ isPage }: Props) => {
  return (
    <LoaderContainer isPage={isPage}>
      <CircularProgress />
    </LoaderContainer>
  );
};

export default MenuItem;

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props: Props) => (props.isPage ? '100vh' : '100%')};
  div {
    color: #ab192e;
  }
`;
