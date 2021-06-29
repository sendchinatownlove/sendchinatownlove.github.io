import React from 'react';
import styled from 'styled-components';

import { Logo } from '../Logos';
import emailIcon from '../../images/social-icons/email.png';
import { MAILTO_URL, socialMediaLinks } from '../../consts';
import '../../responsive.scss';

export type Theme = 'dark' | 'none';

interface Props {
  theme?: Theme;
  menuOpen?: boolean;
}

const FooterComponent = (props: Props) => {
  const { theme = 'none' } = props;

  const links = [
    ...socialMediaLinks,
    {
      platform: 'envelope',
      url: MAILTO_URL,
      icon: emailIcon,
    },
  ];

  return (
    <Container theme={theme}>
      <LogoContainer>
        <a href="https://sendchinatownlove.com/">
          <Logo theme={theme} />
        </a>
      </LogoContainer>
      <LinksContainer>
        {links.map((social) => (
          <LinkItem key={social.platform}>
            <Icon href={social.url} target="_blank">
              <img src={social.icon} alt={social.platform} />
            </Icon>
          </LinkItem>
        ))}
      </LinksContainer>
    </Container>
  );
};

export default FooterComponent;

const Container = styled.footer`
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  display: ${(props: Props) => (props.menuOpen ? 'none' : 'flex')};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${(props: Props) =>
    props.theme === 'dark' ? '#f7f7f7' : '#ffffff'};

  @media (min-width: 600px) {
    justify-content: space-between;
    height: 120px;
  }
  @media (max-width: 599px) {
    padding: 0 16px 0 16px;
    height: 80px;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  @media (max-width: 599px) {
    flex-direction: row;
    justify-content: center;
    width: 100%;

    a {
      width: 30%;
    }
    img {
      width: 100%;
      height: auto;
      padding: 10px 0 20px 0;
    }
  }
`;

const LinksContainer = styled.div`
  z-index: 5;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  @media (min-width: 600px) {
    order: 2;
  }
  @media (max-width: 599px) {
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
  }
`;

const LinkItem = styled.div`
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  margin-left: 24px;
  color: #a8192e;
  @media (max-width: 599px) {
    margin-left: 0;
    padding-bottom: 40px;
  }
`;

const Icon = styled.a`
  text-decoration: none;
  color: black;
`;
