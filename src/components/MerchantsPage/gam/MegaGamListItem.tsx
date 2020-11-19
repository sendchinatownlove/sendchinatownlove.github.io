import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import type { Campaign } from '../../../utilities/api';
import { tabletScreens } from '../../../utilities/general/responsive';
import MegaGamProgressBar from './MegaGamProgressBar';

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
        {/* TODO: Don't hard code this. Figure out where we should get this data from. */}
        <Subheader>December Campaign</Subheader>
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
          {/* TODO: Add seller/distributor pairs. */}
          <SellerDistributorPairs>
            _SELLER_DISTRIBUTOR_PAIRS_
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
    padding: 16px 36px;
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
`;

export default MegaGamListItem;
