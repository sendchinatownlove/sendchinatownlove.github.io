import React from 'react';
import styled from 'styled-components';
import { Logo } from '../Logos';
import '../../responsive.scss';

export type Theme = 'dark' | 'none';

interface Props {
  theme?: Theme;
  menuOpen?: boolean;
}

const FooterComponent = (props: Props) => {
  const { theme = 'none' } = props;

  return (
    <Container menuOpen={props.menuOpen} theme={theme}>
      <a href="https://sendchinatownlove.com/">
        <Logo theme={theme} />
      </a>
      <LinksContainer>
        <LinkItem>
          <Icon href="https://www.facebook.com/Send-Chinatown-Love-100872288240891/">
            <span className="fa fa-facebook" />
          </Icon>
        </LinkItem>
        <LinkItem>
          <Icon href="https://instagram.com/sendchinatownlove">
            <span className="fa fa-instagram" />
          </Icon>
        </LinkItem>
        <LinkItem>
          <Icon href="mailto:hello@sendchinatownlove.com">
            <span className="fa fa-envelope" />
          </Icon>
        </LinkItem>
      </LinksContainer>
    </Container>
  );
};

export default FooterComponent;

const Container = styled.footer`
  display: ${(props: Props) => (props.menuOpen ? 'none' : 'flex')};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${(props: Props) =>
    props.theme === 'dark' ? '#f7f7f7' : '#ffffff'};
  padding: 0 40px 0 40px;

  span {
    margin-left: 24px;
    color: #a8192e;
  }
  @media (min-width: 600px) {
    justify-content: space-between;
    height: 120px;
  }
  @media (max-width: 599px) {
    padding: 0 16px 0 16px;
    height: 80px;
  }
`;

const LinksContainer = styled.div`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  @media (min-width: 600px) {
    order: 2;
  }
  @media (max-width: 599px) {
    flex-direction: row;
  }
`;
const LinkItem = styled.div`
  padding: 0;
  display: flex;
`;

const Icon = styled.a`
  text-decoration: none;
  color: black;
`;
