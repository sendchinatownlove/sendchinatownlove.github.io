import React, { useState } from 'react';
import styled from 'styled-components';

import CircleLogo from './CircleLogo.png';
import CrawlMap from './CrawlMap.png';

import TrackScreen from './TrackScreen';
import RedemptionSelectScreen from './RedemptionSelectScreen';
import RedemptionClaimScreen from './RedemptionClaimScreen';

interface Props {}

const PassportRedemption = (props: Props) => {
  const [currentScreenView, setCurrentScreenView] = useState(0);

  const showCurrentScreen = (screen) => {
    // TODO: Update case #s when all screens are built out
    // NOTE: not sure if this is the right flow,
    // but currently set up like this for now for ease of editing
    switch (screen) {
      case 1:
        return (
          <RedemptionSelectScreen setCurrentScreenView={setCurrentScreenView} />
        );
      case 2:
        return (
          <RedemptionClaimScreen setCurrentScreenView={setCurrentScreenView} />
        );
      default:
        return <TrackScreen setCurrentScreenView={setCurrentScreenView} />;
    }
  };

  const socialMediaLinks = [
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/Send-Chinatown-Love-100872288240891',
    },
    { platform: 'instagram', url: 'https://instagram.com/sendchinatownlove' },
    { platform: 'envelope', url: 'mailto:hello@sendchinatownlove.com' },
  ];

  return (
    <Container>
      <PassportContainer>
        <Logo
          src={CircleLogo}
          alt="scl-log"
          className={currentScreenView === 0 ? 'passportTrackScreen' : ''}
        />

        {showCurrentScreen(currentScreenView)}

        <Row>
          <ExternalLinks>VIEW MAP</ExternalLinks>
          <ExternalLinks href="mailto:sendchinatownlove@gmail.com.com">
            Contact Us
          </ExternalLinks>
        </Row>

        <LinksContainer>
          {socialMediaLinks.map((social) => (
            <Icon href={social.url}>
              <span className={`fa fa-${social.platform}`} />
            </Icon>
          ))}
        </LinksContainer>
      </PassportContainer>
    </Container>
  );
};

export default PassportRedemption;

const Container = styled.div`
  background-color: #e5e5e5;
  height: 100%;
  min-height: 100vh;
  background-image: url(${CrawlMap});

  @media (max-width: 475px) {
    background-size: 500px;
  }

  position: relative;
`;

const PassportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 380px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
`;

const Logo = styled.img`
  filter: drop-shadow(0 0mm 2px #cdcdcd);
  z-index: 2;

  &.passportTrackScreen {
    position: relative;
    top: 50px;
    z-index: 5;
    filter: drop-shadow(0 -0.1mm 0.1px #cdcdcd);
  }
`;

export const Row = styled.div`
  display: flex;
`;

const ExternalLinks = styled.a`
  font-weight: bold;
  text-transform: uppercase;
  color: black;
  font-size: 12px;
  margin: 20px;
  z-index: 2;
`;

const LinksContainer = styled.div`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  z-index: 2;
`;

const Icon = styled.a`
  text-decoration: none;
  color: #a8192e;
  padding: 0 15px;
  font-size: 22px;
  z-index: 2;
`;
