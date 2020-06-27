import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

type Props = {
  isPage?: boolean;
  size?: string;
};

const Loader: React.SFC<Props> = ({ isPage, size }: Props) => {
  return (
    <LoaderContainer isPage={isPage} size={size}>
      <CircularProgress />
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props: Props) => (props.isPage ? '100vh' : '100%')};
  div {
    color: #ab192e;
    ${(props: Props) =>
      props.size &&
      `
      width: ${props.size}!important;
      height: ${props.size}!important;
    `};
  }
`;

export const LoaderFillerContainer = styled.div`
  width: 100%;
  height: 74vh;
`;
