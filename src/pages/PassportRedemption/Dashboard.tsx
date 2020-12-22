import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TrackScreen from './TrackScreen';
import RedemptionSelectScreen from './RedemptionSelectScreen';
import RedemptionClaimScreen from './RedemptionClaimScreen';

import ScreenName from './ScreenName';
import PassportScreen from './Passport';
import LyftCodeScreen from './LyftCodeScreen';
import CrawlMap from './Assets/CrawlMap.png';
import { useHistory } from 'react-router-dom';

interface Props {
  screen: ScreenName;
}

const PassportRedemption = (props: Props) => {
  const { location } = useHistory();
  const [currentScreenView, setCurrentScreenView] = useState<ScreenName>(
    props.screen
  );

  useEffect(() => {
    if (location.pathname === '/passport') {
      setCurrentScreenView(ScreenName.Track);
    } else if (location.pathname.includes('/tickets')) {
      setCurrentScreenView(ScreenName.Dashboard);
    }
  }, [location.pathname]);

  const showCurrentScreen = (screen) => {
    // TODO: Update case #s when all screens are built out
    // NOTE: not sure if this is the right flow,
    // but currently set up like this for now for ease of editing
    switch (screen) {
      case ScreenName.Redemption:
        return (
          <RedemptionSelectScreen setCurrentScreenView={setCurrentScreenView} />
        );
      case ScreenName.Track:
        return <TrackScreen setCurrentScreenView={setCurrentScreenView} />;
      case ScreenName.Dashboard:
        return <PassportScreen setCurrentScreenView={setCurrentScreenView} />;
      case ScreenName.Claim:
        return (
          <RedemptionClaimScreen setCurrentScreenView={setCurrentScreenView} />
        );
      case ScreenName.LyftCode:
        return <LyftCodeScreen />;
      default:
        return <TrackScreen setCurrentScreenView={setCurrentScreenView} />;
    }
  };

  return <Container>{showCurrentScreen(currentScreenView)}</Container>;
};

export default PassportRedemption;

const Container = styled.div`
  background-color: #e5e5e5;
  min-height: 100vh;
  background-image: url(${CrawlMap});
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 475px) {
    background-size: 500px;
  }
`;
