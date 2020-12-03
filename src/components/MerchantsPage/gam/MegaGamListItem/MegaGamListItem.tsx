import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import type {
  Campaign,
  SellerDistributorPair as SellerDistributorPairType,
} from '../../../../utilities/api/types';
import { tabletScreens } from '../../../../utilities/general/responsive';
import CampaignProgressBar from '../CampaignProgressBar';
import FiscalSponsor from '../FiscalSponsor';
import { SIZE_TYPE } from '../ProgressBar';
import SellerDistributorPair from './SellerDistributorPair';

interface Props {
  campaign: Campaign;
}

const MegaGamListItem = ({ campaign }: Props) => {
  const { t } = useTranslation();
  return (
    <Container isActive={campaign.active}>
      <ImageContentContainer isActive={campaign.active}>
        <CampaignImageContainer isActive={campaign.active}>
          <CampaignImage
            heroImageUrl={campaign.gallery_image_urls[0]}
            isActive={campaign.active}
          />
        </CampaignImageContainer>
        <CampaignContent>
          {/* TODO: Figure out if this is the correct header. If so, we need to translate. */}
          <Header>Mega-GAM</Header>
          <Subheader>{campaign.display_name}</Subheader>
          <Description>{campaign.description}</Description>
          <DonationContainer>
            <CampaignProgressBar
              endDate={campaign.end_date}
              isActive={campaign.active}
              pricePerMeal={campaign.price_per_meal}
              size={campaign.active ? SIZE_TYPE.LARGE : SIZE_TYPE.SMALL}
              targetAmount={campaign.target_amount}
              totalRaised={campaign.amount_raised}
            />
            {campaign.active && (
              // TODO: Open payment modal.
              <Button className="button--filled" onClick={undefined}>
                <ButtonText>
                  {t('gamHome.megaGamListItem.giftButton')}
                </ButtonText>
              </Button>
            )}
          </DonationContainer>
        </CampaignContent>
      </ImageContentContainer>
      <SellerDistributorContent isActive={campaign.active}>
        {/* TODO: Translate. */}
        <LearnMoreText>
          Learn more about our participating merchants:
        </LearnMoreText>
        <SellerDistributorPairs>
          {campaign.seller_distributor_pairs.map(
            (sellerDistributorPair: SellerDistributorPairType) => (
              <SellerDistributorPair
                key={`${sellerDistributorPair.distributor_id};${sellerDistributorPair.seller_id}`}
                sellerDistributorPair={sellerDistributorPair}
              />
            )
          )}
        </SellerDistributorPairs>
      </SellerDistributorContent>
      {campaign.active && campaign.nonprofit_id && (
        <div>
          <Divider />
          <FiscalSponsorContainer>
            <FiscalSponsor nonprofitId={campaign.nonprofit_id} />
          </FiscalSponsorContainer>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ isActive }: { isActive: boolean }) =>
    isActive ? '#f7f7f7' : '#ffffff'};
  display: flex;
  flex-direction: column;
`;

const ImageContentContainer = styled.div`
  display: flex;
  flex-direction: ${({ isActive }: { isActive: boolean }) =>
    isActive ? 'column' : 'row'};
  margin-bottom: ${({ isActive }: { isActive: boolean }) =>
    isActive ? '60px' : '42px'};

  @media (${tabletScreens}) {
    flex-direction: column;
  }
`;

const CampaignImageContainer = styled.div`
  ${({ isActive }: { isActive: boolean }) => {
    let margin;
    if (isActive) {
      margin = '0';
    } else {
      margin = '16px 16px 0';
    }

    return `
      align-items: center;
      display: flex;

      @media (${tabletScreens}) {
        height: 106px;
        margin: ${margin};
      }
    `;
  }}
`;

// TODO: Figure out how this image should scale for active/inactive.
const CampaignImage = styled.div`
  ${({
    heroImageUrl,
    isActive,
  }: {
    heroImageUrl: string;
    isActive: boolean;
  }) => {
    if (isActive) {
      return `
        background-image: url('${heroImageUrl}');
        background-size: cover;
        height: 252px;
        width: 100%;

        @media (${tabletScreens}) {
          height: 106px;
        }
        `;
    }

    return `
      background-image: url('${heroImageUrl}');
      border-radius: 5px;
      height: 240px;
      width: 240px;

      @media (${tabletScreens}) {
        height: 100px;
        width: 100%;
      }
      `;
  }}
`;

const CampaignContent = styled.div`
  flex-grow: 1;
  padding: 44px 66px;

  @media (${tabletScreens}) {
    padding: 16px 16px 0px;
  }
`;

const Header = styled.div`
  color: #1e7c9a;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 16px;

  @media (${tabletScreens}) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const Subheader = styled.div`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 36px;

  @media (${tabletScreens}) {
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

const Description = styled.div`
  font-size: 18px;
  margin-bottom: 24px;

  @media (${tabletScreens}) {
    font-size: 14px;
  }
`;

const DonationContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  @media (${tabletScreens}) {
    flex-direction: column;
  }
`;

const Button = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 56px;
  justify-content: center;
  margin-bottom: 18px;
  width: 360px;

  @media (${tabletScreens}) {
    margin-top: 28px;
    margin-bottom: 16px;
    width: 100%;
  }
`;

const ButtonText = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.15em;
`;

const SellerDistributorContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 44px 66px;

  @media (${tabletScreens}) {
    padding: 0 16px;
    padding-bottom: ${({ isActive }: { isActive: boolean }) =>
      isActive ? '44px' : '16px'};
  }
`;

const LearnMoreText = styled.div`
  margin-bottom: 36px;
`;

const SellerDistributorPairs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > :not(:last-child) {
    margin-right: 28px;
  }

  @media (${tabletScreens}) {
    flex-wrap: wrap;

    > * {
      margin-bottom: 8px;
      margin-right: 0 !important;
      width: 48%;
    }
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid #e5e5e5;
  margin: 0 10% 58px 10%;
`;

const FiscalSponsorContainer = styled.div``;

export default MegaGamListItem;
