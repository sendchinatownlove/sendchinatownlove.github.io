import React from 'react';
import styled from 'styled-components';
import lanternHeader from './images/lantern-header.png';
import lanternFooter from './images/lantern-footer.png';
import { useTranslation } from 'react-i18next';

const LightUpChinatownPage = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Banner>
        <Hero
          height={304}
          src={lanternHeader}
          alt="lantern overlay"
        />
        <HeaderText>
          {t('lightUpChinatown.headerText')}
        </HeaderText>
        <HeaderSubtext>
          {t('lightUpChinatown.headerSubtext')}
        </HeaderSubtext>
      </Banner>
      <Container>
        <DonationTiersText>
          {t('lightUpChinatown.donationTierText')}
        </DonationTiersText>
      </Container>
      <Banner>
        <Hero
          height={395}
          src={lanternFooter}
          alt="lantern overlay"
        />
      </Banner>
    </React.Fragment>
  );
};

const Container = styled.div`
  padding: 80px 54px;
`;

const Hero = styled.img`
  height: ${props => props.height}px;
  width: 100vw;
`;

const Banner = styled.div`
  position: relative;
  text-align: center;
`;

const HeaderText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  letter-spacing: 0.02em;
  color: #FFFFFF;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const HeaderSubtext = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: -0.01em;
  color: #FFFFFF;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const DonationTiersText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #000000;
  padding-bottom: 15px;
  border-bottom: 1px solid #DEDEDE;
`;

export default LightUpChinatownPage;
