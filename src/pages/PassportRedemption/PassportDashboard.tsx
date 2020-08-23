import React, { useState } from 'react';
import styled from 'styled-components';

// import CircleLogo from './CircleLogo.png';
import TrackScreen from './TrackScreen';
import RedemptionSelectScreen from './RedemptionSelectScreen';
import ScreenName from "./ScreenName";
import { Container, ExternalLink } from './style'
import PassportScreen from './Passport';

interface Props {
  screen?: string
}

type participatingSellerProps = {
  created_at: string,
  id: number,
  name: string,
  seller_id: number,
  stamp_url: string,
  updated_at: string,
};

const PassportRedemption = (props: Props) => {
  const [currentScreenView, setCurrentScreenView] = useState(props.screen);  

  const showCurrentScreen = (screen) => {
    // TODO: Update case #s when all screens are built out
    // NOTE: not sure if this is the right flow, 
    // but currently set up like this for now for ease of editing 
    switch(screen) {
      case ScreenName.Redemption: 
        return <RedemptionSelectScreen setCurrentScreenView={setCurrentScreenView} />
      case ScreenName.Track:
        return <TrackScreen setCurrentScreenView={setCurrentScreenView} />
      // case ScreenName.Dashboard: 
      //   return <PassportScreen setCurrentScreenView={setCurrentScreenView}/>
      default: 
        return <PassportScreen setCurrentScreenView={setCurrentScreenView}/>
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
        {/* <Logo
          src={CircleLogo}
          alt="scl-log"
          className={
            currentScreenView === ScreenName.Track ? 'passportTrackScreen' : ''
          }
        />

        {showCurrentScreen(currentScreenView)}
        */}
      {
        showCurrentScreen(currentScreenView)
      }

      <Row>
        <ExternalLink>VIEW MAP</ExternalLink>
        <ExternalLink href="mailto:sendchinatownlove@gmail.com">
          Contact Us
        </ExternalLink>
        <LinksContainer>
          {
            socialMediaLinks.map((social) => (
              <Icon href={social.url} key={social.url}>
                <span className={`fa fa-${social.platform}`} />
              </Icon>
            ))}
          </LinksContainer>
        </Row>
      </PassportContainer>
    </Container>
  );
};

export default PassportRedemption;

const Logo = styled.img`
  filter: drop-shadow(0 0mm 2px #cdcdcd);

  &.passportTrackScreen {
    position: relative;
    top: 50px;
    z-index: 5;
    filter: drop-shadow(0 -0.1mm 0.1px #cdcdcd);
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LinksContainer = styled.div`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
`;

const Icon = styled.a`
  text-decoration: none;
  color: #a8192e;
  padding: 0 15px;
  font-size: 22px;
`;
