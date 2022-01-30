import React from 'react';
import {
  smallScreens,
  tabletScreens,
} from '../../../utilities/general/responsive';
import styled from 'styled-components';

import lny_web from '../images/LNY_Web.png';

export const LNY2022Callout = () => {
  return (
    <CampaignBox>
      <HeaderImage src={lny_web} alt="Happy year of the tiger :)" />
      <TextContainer>
        <Heading>Donate to our Lunar New Year Gift-a-Meal campaign</Heading>
        {/* <SubHeading>Lorem Ipsum something something</SubHeading> */}
      </TextContainer>
      <Button
        className="button--filled"
        onClick={(e) => {
          e.preventDefault();
          window.location.href =
            'https://www.sendchinatownlove.com/lny-gam-2022.html';
        }}
      >
        VISIT LNY GIFT-A-MEAL
      </Button>
    </CampaignBox>
  );
};

const CampaignBox = styled.div`
  align-items: center;
  border: 1px solid #e5e5e5;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 30px;
  margin-bottom: 25px;

  @media (${tabletScreens}) {
    grid-template-columns: 1fr;
    margin-bottom: 15px;
  }
`;

const TextContainer = styled.div`
  @media (${tabletScreens}) {
    margin-bottom: 20px;
  }
`;

const Heading = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;

  @media (${smallScreens}) {
    font-size: 14px;
  }
`;

// eslint-disable-next-line
const SubHeading = styled.p`
  font-size: 15px;

  @media (${smallScreens}) {
    font-size: 12px;
  }
`;

const Button = styled.button`
  text-align: center;
  letter-spacing: 0.15em;
  cursor: pointer;
  margin-bottom: 18px;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.05em;

  @media (${smallScreens}) {
    font-size: 14px;
    padding-right: 0;
  }
`;

const HeaderImage = styled.img`
  height: auto;
  max-width: 250px;

  @media (${tabletScreens}) {
    max-width: 80%;
  }
`;
