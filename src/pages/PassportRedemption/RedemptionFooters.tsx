import React from 'react';
import styled from 'styled-components';

import { SubTitle, Button } from "./style";
import ScreenName from './ScreenName';


interface NoRewardsProps {
  setCurrentScreenView: Function;
}

export const NoRewardsFooter = (props: NoRewardsProps) => {
    return (
        <Footer>
          <SubTitle bold="700">
            Have more tickets to add?
          </SubTitle>

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
          <SubTitle bold="700">
            {
              props.error
                ? props.error
                : 'When redeemed, you have 5 minutes to use your reward.'
            }
          </SubTitle>

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
          <SubTitle bold="700">
            Select an offer and be ready to show this screen when you’re
            ordering.
          </SubTitle>

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
  width: 300px;
  margin: 20px 0;
`;
