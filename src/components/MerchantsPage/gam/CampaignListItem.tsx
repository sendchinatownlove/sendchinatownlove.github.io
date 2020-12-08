import React from 'react';
import CampaignProgressBar from './CampaignProgressBar';
import styled from 'styled-components';
import { tabletScreens } from '../../../utilities/general/responsive';
import { useTranslation } from 'react-i18next';
import campaignDefaultImage from '../images/campaign_default.png';
import { Campaign } from '../../../utilities/api/types';
import Modal from '../../ModalPayment';
import {
  ModalPaymentConstants,
  useModalPaymentDispatch,
  ModalPaymentTypes,
} from '../../../utilities/hooks/ModalPaymentContext';
import FiscalSponsor from './FiscalSponsor';
import { SIZE_TYPE } from './ProgressBar';

interface Props {
  campaign: Campaign;
  selectedCampaignId: null | number;
  setSelectedCampaignId: Function;
}

const ModalBox: any = Modal;

const CampaignListItem = ({
  campaign,
  setSelectedCampaignId,
  selectedCampaignId,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useModalPaymentDispatch(null); //provide null according to Bruce's new branch

  const {
    seller_distributor_pairs: [sellerDistPair],
  } = campaign;
  const {
    distributor_website_url,
    distributor_image_url,
    distributor_name,
    seller_id,
    seller_non_profit_location_id,
    seller_name,
    seller_city,
  } = sellerDistPair;

  const campaignImageUrls = campaign.gallery_image_urls;

  const showModal = (event: any) => {
    setSelectedCampaignId(campaign.id);
    dispatch({
      type: ModalPaymentConstants.SET_MODAL_VIEW,
      payload: ModalPaymentTypes.modalPages.buy_meal,
    });
  };

  return (
    <React.Fragment>
      <Container>
        <EndColumnContainer>
          {campaignImageUrls && campaignImageUrls.length && (
            <CampaignImageContainer>
              <CampaignImage
                src={campaignImageUrls[0] ?? campaignDefaultImage}
                alt="campaign_image"
              />
            </CampaignImageContainer>
          )}
        </EndColumnContainer>
        <MiddleColumnContainer>
          <Location>{seller_city}</Location>
          <Name>
            {seller_name} x {distributor_name}
          </Name>
          <Description>
            {campaign.description}{' '}
            <span>
              Learn more about{' '}
              <a
                href={distributor_website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {distributor_name}.
              </a>
            </span>
          </Description>
          <CampaignProgressBar
            endDate={campaign.end_date}
            isActive={campaign.active}
            pricePerMealInCents={campaign.price_per_meal}
            size={SIZE_TYPE.SMALL}
            targetAmountInCents={campaign.target_amount}
            totalRaisedInCents={campaign.amount_raised}
          />
        </MiddleColumnContainer>
        <EndColumnContainer>
          <ImagesContainer>
            <a href={distributor_website_url}>
              <DistributorImage
                src={distributor_image_url}
                alt="distributor_logo"
              />
            </a>
          </ImagesContainer>
          <Button
            className="button--outlined"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/' + seller_id;
            }}
          >
            {t('gamHome.listItem.viewButton')}
          </Button>
          {campaign.active && (
            <GiftButtonContainer>
              <Button className={'button--filled'} onClick={showModal}>
                {t('gamHome.listItem.giftButton')}
              </Button>
            </GiftButtonContainer>
          )}
        </EndColumnContainer>

        {campaign.active && selectedCampaignId === campaign.id && (
          <ModalBox
            sellerId={seller_id}
            sellerName={seller_name}
            costPerMealInDollars={campaign.price_per_meal / 100}
            nonProfitLocationId={seller_non_profit_location_id}
            campaignId={campaign.id}
          />
        )}
      </Container>
      {campaign.active && campaign.nonprofit_id && (
        <FiscalSponsorContainer>
          <FiscalSponsor nonprofitId={campaign.nonprofit_id} />
        </FiscalSponsorContainer>
      )}
    </React.Fragment>
  );
};

export default CampaignListItem;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 44px 0;

  @media (${tabletScreens}) {
    flex-direction: column;
    padding: 16px;
    position: relative;
  }
`;

const EndColumnContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (${tabletScreens}) {
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

const MiddleColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 126px 0 66px;

  @media (${tabletScreens}) {
    margin: 0 0 42px 0;
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
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.05em;

  @media (${tabletScreens}) {
    font-size: 14px;
    width: 100%;
  }
`;

const GiftButtonContainer = styled.div`
  margin-top: 18px;
`;

const ImagesContainer = styled.span`
  align-self: right;
  margin-bottom: auto;
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
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
`;

const CampaignImage = styled.img`
  border-radius: 5px;
  height: 240px;
  object-fit: cover;
  width: 240px;

  @media (${tabletScreens}) {
    height: 100px;
    margin-bottom: 16px;
    width: 100%;
  }
`;

const DistributorImage = styled.img`
  max-height: 70px;
  max-width: 120px;
  margin-right: 15px;
  vertical-align: middle;
`;

const FiscalSponsorContainer = styled.div`
  margin-left: 28%;

  @media (${tabletScreens}) {
    margin-left: 0%;
  }
`;
