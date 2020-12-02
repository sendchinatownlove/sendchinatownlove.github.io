import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import type {
  Campaign,
  SellerDistributorPair as SellerDistributorPairType,
} from '../../../../utilities/api/types';
import { tabletScreens } from '../../../../utilities/general/responsive';
import MegaGamProgressBar from './MegaGamProgressBar';
import SellerDistributorPair from './SellerDistributorPair';

interface Props {
  campaign: Campaign;
}

const MegaGamListItem = ({ campaign }: Props) => {
  const { t } = useTranslation();
  return (
    <Container>
      <HeroImage heroImageUrl={campaign.gallery_image_urls[0]} />
      <Content>
        {/* TODO: Figure out if this is the correct header. If so, we need to translate. */}
        <Header>Mega-GAM</Header>
        <Subheader>{campaign.display_name}</Subheader>
        <Description>{campaign.description}</Description>
        <DonationContainer>
          <MegaGamProgressBar
            endDate={campaign.end_date}
            isActive={campaign.active}
            targetAmount={campaign.target_amount}
            totalRaised={campaign.amount_raised}
          />
          {campaign.active && (
            // TODO: Open payment modal.
            <Button className="button--filled" onClick={undefined}>
              <ButtonText>{t('gamHome.megaGamListItem.giftButton')}</ButtonText>
            </Button>
          )}
        </DonationContainer>
        <SellerDistributorContent>
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
      </Content>
      {/* TODO: Add fiscal sponsor. */}
    </Container>
  );
};

const Container = styled.div`
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;
`;

// TODO: Figure out how this image should scale.
const HeroImage = styled.div`
  background-image: url('${(props: { heroImageUrl: string }) =>
    props.heroImageUrl}');
  background-size: cover;
  height: 252px;
  width: 100%;

  @media (${tabletScreens}) {
    height: 106px;
  }
`;

const Content = styled.div`
  padding: 44px 66px;

  @media (${tabletScreens}) {
    padding: 16px 28px;
  }
`;

const Header = styled.div`
  color: #1e7c9a;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 16px;

  @media (${tabletScreens}) {
    margin-bottom: 8px;
  }
`;

const Subheader = styled.div`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 36px;

  @media (${tabletScreens}) {
    margin-bottom: 16px;
  }
`;

const Description = styled.div`
  font-size: 18px;
  margin-bottom: 24px;
`;

const DonationContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;

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

export default MegaGamListItem;
