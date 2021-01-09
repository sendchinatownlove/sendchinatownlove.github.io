import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TrackScreen from './SignIn';
import RewardsSelectScreen from './Rewards';
import RedemptionClaimScreen from './Redemption';
import ScreenType from './ScreenTypes';
import PassportScreen from './Passport';
import LyftCodeScreen from './Lyft';

import { useHistory } from 'react-router-dom';

interface Props {
  screen: ScreenType;
}

const PassportRedemption = (props: Props) => {
  const { location } = useHistory();
  const [currentScreenView, setCurrentScreenView] = useState<ScreenType>(
    props.screen
  );

  useEffect(() => {
    if (location.pathname === '/passport') {
      setCurrentScreenView(ScreenType.Track);
    } else if (location.pathname.includes('/tickets')) {
      setCurrentScreenView(ScreenType.Dashboard);
    }
  }, [location.pathname]);

  const showCurrentScreen = (screen) => {
    // TODO: Update case #s when all screens are built out
    // NOTE: not sure if this is the right flow,
    // but currently set up like this for now for ease of editing
    switch (screen) {
      case ScreenType.Rewards:
        return (
          <RewardsSelectScreen setCurrentScreenView={setCurrentScreenView} />
        );
      case ScreenType.Track:
        return <TrackScreen setCurrentScreenView={setCurrentScreenView} />;
      case ScreenType.Dashboard:
        return <PassportScreen setCurrentScreenView={setCurrentScreenView} />;
      case ScreenType.Claim:
        return (
          <RedemptionClaimScreen setCurrentScreenView={setCurrentScreenView} />
        );
      case ScreenType.LyftCode:
        return <LyftCodeScreen />;
      default:
        return <TrackScreen setCurrentScreenView={setCurrentScreenView} />;
    }
  };

  return <Container>{showCurrentScreen(currentScreenView)}</Container>;
};

export default PassportRedemption;

const Container = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
