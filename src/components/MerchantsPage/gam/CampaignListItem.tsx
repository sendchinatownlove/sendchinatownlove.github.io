import React from 'react';
import CampaignProgressBar from './CampaignProgressBar';
import styled from 'styled-components';
import {
  tabletScreens, desktopScreens
} from '../../../utilities/general/responsive';
import campaignDefaultImage from '../images/campaign_default.png';
import { Campaign } from '../../../utilities/api/types';
import { getDistributor, getSeller } from '../../../utilities';
import { useEffect, useState } from 'react';

interface Props {
  campaign: Campaign;
}

const CampaignListItem = (props: Props) => {
  const [distributor, setDistributor] = useState<any | null>();
  const [merchant, setMerchant] = useState<any | null>();
  const campaign = props.campaign;

  const fetchData = async () => {
    const distributorData = await getDistributor(campaign.distributor_id);
    const merchantData = await getSeller(campaign.seller_id);
    setDistributor(distributorData.data);
    setMerchant(merchantData.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const mealsRaised = Math.floor(campaign.amount_raised / campaign.price_per_meal);
  const targetMeals = Math.floor(campaign.target_amount / campaign.price_per_meal);
  const campaignImageUrls = campaign.gallery_image_urls;

  return (
    <Container>
      <ColumnContainer>
        {campaignImageUrls && campaignImageUrls.length && (
          <CampaignImage src={campaignImageUrls[0] ?? campaignDefaultImage} alt="campaign_image" />
        )}
      </ColumnContainer>
      <ColumnContainer>
        {merchant && merchant.locations && merchant.locations.length && (
          <Location>{merchant.locations[0].city}</Location>
        )}
        {distributor && merchant && (
          <Name>{merchant.name} x {distributor.name}</Name>
        )}
        <Description>
          {campaign.description}
          <br></br>
          {distributor &&
            (<a href={distributor.website_url}>{distributor.name}</a>)
          }
        </Description>
        <CampaignProgressBar
          isActive={campaign.active}
          numContributions={mealsRaised}
          targetAmount={targetMeals}
          progressBarColor={'#CF6E8A'}
          lastContributionTime={new Date(campaign.last_contribution)}
          endDate={new Date(campaign.end_date)}
        />
      </ColumnContainer>
      <ColumnContainer>
        <ImagesContainer>
          {distributor &&
            (<a href={distributor.website_url}>
              <DistributorImage src={distributor.image_url} alt="distributor_logo" />
            </a>
            )
          }
          {merchant &&
            (<MerchantImage src={merchant.logo_image_url} alt="merchant_logo" />)
          }
        </ImagesContainer>
        {merchant && (
          <Button className="button--filled" onClick={(e) => {
            e.preventDefault();
            window.location.href = '/' + merchant.seller_id;
          }}>Visit merchant</Button>
        )}
        {campaign.active && (
          <Button className={'button--outlined'}>Gift a meal</Button>
        )}
      </ColumnContainer>
    </Container >
  );
};

export default CampaignListItem;

const Container = styled.div`
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  max-height: 350px;
  margin: 35px 0 55px;
  justify-content: space-between;

  @media (${tabletScreens}) {
    max-height: 600px;
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
    padding: 0.5rem 1rem 0.75rem;

    > span {
      margin: 2.5px 0;
    }

    > button {
      width: 100%;
    }

    > img {
      height: 103px;
      object-fit: cover;
      object-position: 0 25%;
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

  @media (${tabletScreens}) {
    font-size: 14px;
    margin-bottom: 10px;
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

  @media (${tabletScreens}) {
    margin-bottom: 10px;
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
  color: #1e1e1e;
  margin-bottom: 20px;

  @media (${tabletScreens}) {
    font-size: 14px;
    margin-bottom: 10px;
  }
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
    margin-bottom: 10px;
  }
`;

const ImagesContainer = styled.span`
  align-self: right;
  margin-bottom: 60px;
  align-self: flex-end;

  @media (${tabletScreens}) {
    position: absolute;
    top: 132px;
    margin-bottom: 30px;

    img {
      height: 25px;
    }
  }
`;

const CampaignImage = styled.img`
  @media (${tabletScreens}) {
    max-height: 100px;
    width: 100%;
  }

  @media (${desktopScreens}) {
    max-height: 240px;
    max-width: 240px;
  }
`;

const DistributorImage = styled.img`
  max-height: 70px;
  max-width: 120px;
  margin-right: 15px;
  vertical-align: middle;
`;

const MerchantImage = styled.img`
  max-height: 70px;
  max-width: 70px;
  vertical-align: middle;
`;
