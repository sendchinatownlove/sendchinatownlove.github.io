import React from 'react';
import CampaignProgressBar from './CampaignProgressBar';
import styled from 'styled-components';
import {
  smallScreens,
  tabletScreens,
} from '../../../utilities/general/responsive';
import campaignDefaultImage from '../images/campaign_default.png';
import apexLogo from '../images/apex-logo.png';
import melonpannaLogo from '../images/melonpanna-logo.png';

// In the final implementation, campaign will be object declared in types.ts
interface Props {
  campaign: String;
}

const CampaignListItem = (campaign: Props) => {
  return (
    <Container>
      <ColumnContainer>
        <img src={campaignDefaultImage} alt="campaign_image" />
      </ColumnContainer>
      <ColumnContainer>
        <Location>Sunset Park, Brooklyn</Location>
        <Name>Melonpanna Tea & Shot x APEX for the Youth</Name>
        <Description>
          Partnering with APEX for the Youth, we hope to raise 200 meals for
          underserved Asian and immigrant youth from low-income families.
        </Description>
        {/* Testing values */}
        <CampaignProgressBar
          isActive={true}
          numContributions={73}
          targetAmount={100}
          progressBarColor={'#CF6E8A'}
          lastContributionTime={new Date('07/21/2020 20:05:00')}
          endDate={new Date('07/23/2020')}
        />
      </ColumnContainer>
      <ColumnContainer>
        <ImagesContainer>
          <img src={apexLogo} alt="merchant_logo" />
          <img src={melonpannaLogo} alt="distributor_logo" />
        </ImagesContainer>
        <Button className="button--filled">Visit merchant</Button>
        <Button className={'button--outlined'}>Gift a meal</Button>
      </ColumnContainer>
    </Container>
  );
};

export default CampaignListItem;

const Container = styled.div`
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  max-height: 350px;
  object-fit: cover;
  margin: 35px 0 55px;
  justify-content: space-between;

  @media (max-width: 1350px) {
    margin: 35px 35px 55px;
  }

  @media (${tabletScreens}) {
    max-height: 300px;
  }

  @media (${smallScreens}) {
    flex-direction: column-reverse;
    margin-top: 0;
    max-height: 500px;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 1.5rem;

  @media (${tabletScreens}) {
    > span {
      margin: 2.5px 0;
    }

    > button {
      width: 100%;
    }
  }
`;

const Location = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: #1e7c9a;
  margin-bottom: 15px;
`;

const Name = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #000000;
  margin-bottom: 18px;
`;

const Description = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: #1e1e1e;
  margin-bottom: 50px;
`;

const Button = styled.div`
  text-align: center;
  width: 240px;
  letter-spacing: 0.15em;
  cursor: pointer;
  margin-bottom: 18px;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.05em;

  @media (max-width: 550px) {
    width: 100%;
  }
`;

const ImagesContainer = styled.span`
  align-self: right;
  margin-bottom: 60px;
  align-self: flex-end;
`;
