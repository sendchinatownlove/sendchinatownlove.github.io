import React from 'react';
import ProgressBar from '../../ProgressBar';
import styled from 'styled-components';
import {
    smallScreens,
    tabletScreens,
} from '../../../utilities/general/responsive';
import campaignDefaultImage from '../images/campaign_default.png';
import apexLogo from '../images/apex-logo.png';
import melonpannaLogo from '../images/melonpanna-logo.png';

// In the final implementation, campaign will be object declared in types.ts
// const CampaignListItem = (campaign: String) => {
  const CampaignListItem = () => {
    return (
        <Container>
            <ColumnContainer>
                <img
                    src={campaignDefaultImage}
                    alt="campaign_image"
                />
            </ColumnContainer>
            <ColumnContainer>
                <Location>
                    Sunset Park, Brooklyn
                </Location>
                <Name>
                    Melonpanna Tea & Shot x APEX for the Youth
                </Name>
                <Description>
                    Partnering with APEX for the Youth, we hope to raise 200 meals for underserved Asian and immigrant youth from low-income families.
                </Description>
                <TimeStamp>
                    Last contribution made 1h ago
                </TimeStamp>
                <ProgressBar
                  amountRaised={100}
                  targetAmount={1000}
                  progressBarColor={'#CF6E8A'}
                  numContributions={20}
                  numDonations={10}
                  numGiftCards={10}
                  donationAmount={50}
                  giftCardAmount={50}
                />
            </ColumnContainer>
            <ColumnContainer>
                <ImagesContainer>
                    <img
                        src={apexLogo}
                        alt="merchant_logo"
                    />
                    <img
                        src={melonpannaLogo}
                        alt="distributor_logo"
                    />
                </ImagesContainer>
                <Button className='button--filled'>
                    Visit merchant
                    </Button>
                <Button className={'button--outlined'}>
                    Gift a meal
                    </Button>
            </ColumnContainer>
        </Container>
    );
};

export default CampaignListItem;

const Container = styled.div`
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  max-height: 350px;
  margin: 35px 0 55px;
  justify-content: space-between;

  @media (max-width: 1350px) {
    margin: 35px 35px 55px;
  }

  @media (${tabletScreens}) {
    max-height: 300px;
  }

  @media (${smallScreens}) {
    max-height: 575px;
    flex-direction: column;
    margin: 0 17px;
    position: relative;
    padding-top: 15px;
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

    @media (${smallScreens}) {
      padding: .5rem 1rem .75rem;

      > img {
        height: 103px;
        object-fit: cover;
        object-position: 0 25%;
      }
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
    color: #1E7C9A;
    margin-bottom: 15px;

    @media (${smallScreens}) {
      font-size: 14px;
    }
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

    @media (${smallScreens}) {
      width: 70%;
    }
`;

const Description = styled.div`
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.02em;
    color: #1E1E1E;
    margin-bottom: 50px;

    @media (${smallScreens}) {
      font-size: 14px;
      margin-bottom: 34px;
    }
`;

const TimeStamp = styled.div`
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 0.02em;
    color: #9E9E9E;
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
    font-size: 14px;
    width: 100%;
  }
`;

const ImagesContainer = styled.span`
  align-self: right;
  margin-bottom: 60px;
  align-self: flex-end;

  @media (${smallScreens}) {
    position: absolute;
    top: 132px;

    img {
      height: 35px;
    }
  }
`;
