import React from 'react';
import styled from 'styled-components';
import '../../responsive.scss';

export type Theme = 'dark' | 'none';

interface Props {
  theme?: Theme;
}

function imgLogo(theme: Theme) {
  if (theme === 'dark') {
    return require(`./image/logo.svg`);
  }
  return require(`./image/logo.svg`);
}

export const Logo = (props: Props) => {
  const { theme = 'none' } = props;

  return <LogoImage src={imgLogo(theme)} alt="send chinatown love" />;
};
const LogoImage = styled.img`
  width: 150px;
  height: 70px;

  @media (max-width: 599px) {
    width: 112px;
    height: 50px;
  }
`;
