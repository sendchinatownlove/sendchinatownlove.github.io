import React from 'react';
import CampaignProgressBar from './CampaignProgressBar';
import styled from 'styled-components';
import { tabletScreens } from '../../../utilities/general/responsive';
import { useTranslation } from 'react-i18next';
import campaignDefaultImage from '../images/campaign_default.png';
import { Campaign } from '../../../utilities/api/types';
import { getDistributor, getSeller } from '../../../utilities';
import { useEffect, useState } from 'react';
import Modal from '../../Modal';
import { useModalPaymentDispatch } from '../../../utilities/hooks/ModalPaymentContext/context';
import { SET_MODAL_VIEW } from '../../../utilities/hooks/ModalPaymentContext/constants';

interface Props {
  campaign: Campaign;
  selectedCampaign: null | number;
  setSelectedCampaign: Function;
}

const ModalBox: any = Modal;

const CampaignListItem = (props: Props) => {
  const { t } = useTranslation();

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

  const mealsRaised = Math.floor(
    campaign.amount_raised / campaign.price_per_meal
  );
  const targetMeals = Math.floor(
    campaign.target_amount / campaign.price_per_meal
  );
  const campaignImageUrls = campaign.gallery_image_urls;

  const dispatch = useModalPaymentDispatch(); //provide null according to Bruce's new branch
  const showModal = (event: any) => {
    props.setSelectedCampaign(campaign.id);
    dispatch({ type: SET_MODAL_VIEW, payload: 0 });
  };

  return (
    <Container>
      <ColumnContainer>
        {campaignImageUrls && campaignImageUrls.length && (
          <CampaignImage
            src={campaignImageUrls[0] ?? campaignDefaultImage}
            alt="campaign_image"
          />
          <CampaignImageContainer>
            <CampaignImage
              src={campaignImageUrls[0] ?? campaignDefaultImage}
              alt="campaign_image"
            />
          </CampaignImageContainer>
        )}
      </ColumnContainer>
      <ColumnContainer>
        {merchant && merchant.locations && merchant.locations.length && (
          <Location>{merchant.locations[0].city}</Location>
        )}
        {distributor && merchant && (
          <Name>
            {merchant.name} x {distributor.name}
          </Name>
        )}
        <Description>
          {campaign.description}
          <br></br>
          {distributor && (
            <a href={distributor.website_url}>{distributor.name}</a>
          {campaign.description}{' '}
          {distributor && (
            <a href={distributor.website_url} target="_blank" rel="noopener noreferrer">Learn more about {distributor.name}.</a>
          )}
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
          {distributor && (
            <a href={distributor.website_url}>
              <DistributorImage
                src={distributor.image_url}
                alt="distributor_logo"
              />
            </a>
          )}
          {merchant && (
            <MerchantImage src={merchant.logo_image_url} alt="merchant_logo" />
          )}
        </ImagesContainer>
        {merchant && (
          <Button
            className="button--filled"
        </ImagesContainer>
        {merchant && (
          <Button
            className="button--outlined"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/' + merchant.seller_id;
            }}
          >
            Visit merchant
            {t('gamHome.listItem.viewButton')}
          </Button>
        )}
        {campaign.active && (
          <Button className={'button--filled'} onClick={showModal}>
            {t('gamHome.listItem.giftButton')}
          </Button>
        )}
      </ColumnContainer>

      {campaign.active && props.selectedCampaign === campaign.id && (
        <ModalBox
          purchaseType={'buy_meal'}
          sellerId={merchant.seller_id}
          sellerName={merchant.name}
          costPerMeal={campaign.price_per_meal / 100}
          nonProfitLocationId={merchant.non_profit_location_id}
          campaignId={campaign.id}
        />
      )}
    </Container>
  );
};

export default CampaignListItem;

const Container = styled.div`
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  max-height: 800px;
  margin: 35px 0 55px;
  justify-content: space-between;

  @media (${tabletScreens}) {
    max-height: 1000px;
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
  margin-bottom: 140px;
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

const CampaignImageContainer = styled.div`
  height: 240px;
  width: 240px;

  @media (${tabletScreens}) {
    height: 100px;
    width: 100%;
  }
`;

const CampaignImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const DistributorImage = styled.img`
  max-height: 70px;
  max-width: 120px;
  margin-right: 15px;
  vertical-align: middle;
`;
