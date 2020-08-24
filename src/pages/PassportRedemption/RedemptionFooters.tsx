import React from 'react';
import styled from 'styled-components';

import { Button, FinePrint } from './TrackScreen';

interface NoRewardsProps {
  setCurrentScreenView: Function;
}

export const NoRewardsFooter = (props: NoRewardsProps) => {
  return (
    <Footer>
      <FinePrint className="center bold red">
        Have more tickets to add?
      </FinePrint>

      <Button
        value="redemption-selected-button"
        className="button--red-filled"
        onClick={() => props.setCurrentScreenView(ScreenName.Track)}
      >
        ADD NEW TICKETS
      </Button>
    </Footer>
  );
};

interface RedeemRewardsProps {
  error: string;
  selectedSponsor: null | any;
  handleRedemption: Function;
}

export const RedeemRewardsFooter = (props: RedeemRewardsProps) => {
  return (
    <Footer>
      <FinePrint className="center bold red">
        {props.error
          ? props.error
          : 'When redeemed, you have 5 minutes to use your reward.'}
      </FinePrint>

      <Button
        value="redemption-selected-button"
        className="button--red-filled"
        disabled={!props.selectedSponsor}
        onClick={() => props.handleRedemption()}
      >
        REEDEM NOW
      </Button>
    </Footer>
  );
};

interface defaultProps {
  allSponsors: any[];
  id: number;
}

export const DefaultFooter = (props: defaultProps) => {
  return (
    <Footer>
      <FinePrint className="center bold">
        Select an offer and be ready to show this screen when you’re ordering.
      </FinePrint>

      {props.allSponsors.length <= 4 && (
        <Button
          className="linkButton"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/passport/${props.id}`;
          }}
        >
          RETURN TO PASSPORT
        </Button>
      )}
    </Footer>
  );
};

const Footer = styled.div`
  z-index: 2;
  display: grid;
  justify-items: center;
`;
