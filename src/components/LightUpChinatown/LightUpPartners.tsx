import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import partners_46 from './images/partners-46.png';
import partners_ccba from './images/partners-ccba.png';
import partners_cccny from './images/partners-cccny.png';
import partners_prm from './images/partners-prm.png';
import partners_udooda from './images/partners-udooda.png';

const LightUpPartners = () => {
  const { t } = useTranslation();
  const partners = [
    {
      url: 'https://46mott.com/en/',
      src: partners_46,
      alt: '46 Mott',
    },
    {
      url: 'https://www.ccbanyc.org/eindex.html',
      src: partners_ccba,
      alt: 'Chinese Consolidated Benevolent Association',
    },
    {
      url: 'https://cccofny.wordpress.com/',
      src: partners_cccny,
      alt: 'Chinese Chamber of Commerce NY',
    },
    {
      url: 'https://pearlriver.com/',
      src: partners_prm,
      alt: 'Pearl River Mart',
    },
    {
      url: 'https://uniteddems.weebly.com/',
      src: partners_udooda,
      alt: 'United Democratic Organization',
    },
  ];

  return (
    <Banner>
      <PartnerThanksTitle>
        {t('lightUpChinatown.partnerThanks')}
      </PartnerThanksTitle>
      <PartnersLogoContainer>
        {partners.map((partner) => (
          <a href={partner.url} target="_blank" rel="noopener noreferrer">
            <PartnerLogo src={partner.src} alt={partner.alt} />
          </a>
        ))}
      </PartnersLogoContainer>
    </Banner>
  );
};

const Banner = styled.div`
  position: relative;
  text-align: center;
`;

const PartnerThanksTitle = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 32px;
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  color: #1e1e1e;
  @media (max-width: 599px) {
    font-size: 18px;
    line-height: 26px;
  }
`;

const PartnersLogoContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
`;

const PartnerLogo = styled.img`
  max-height: 130px;
  padding: 20px;
  max-width: 100%;
  overflow-x: hidden;
`;

export default LightUpPartners;
