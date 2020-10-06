import React from 'react';
import styled from 'styled-components';

import { Logo } from '../Logos';
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
    },
  ];

  return (
    <Container theme={theme}>
      <a href="https://sendchinatownlove.com/">
        <Logo theme={theme} />
      </a>
      <LinksContainer>
        {links.map((social) => (
          <LinkItem key={social.platform}>
            <Icon href={social.url} target="_blank">
              <span className={`fa fa-${social.platform}`} />
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
