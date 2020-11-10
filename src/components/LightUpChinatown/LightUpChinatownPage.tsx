import React from 'react';
import styled from 'styled-components';
import lanternHeroTop from './images/lantern-hero-top.png';
import mapImg from './images/light-up-map.gif';
import { Trans, useTranslation } from 'react-i18next';
import DonationSection from './DonationSection';
import DonationDetail from './DonationDetail';

import LightUpFaq from './LightUpFaq';

const LightUpChinatownPage = () => {
  const { t } = useTranslation();
  const today = new Date();
  const campaignEndDate = new Date('11/30/2020');
  const timeUntilEnd = campaignEndDate.getTime() - today.getTime();
  const daysUntilEnd = Math.ceil(timeUntilEnd / (1000 * 3600 * 24));

  return (
    <React.Fragment>
      <Banner>
        <Hero height={304} src={lanternHeroTop} alt="lantern overlay" />
        <HeaderText>{t('lightUpChinatown.headerText')}</HeaderText>
        <HeaderSubtext>{t('lightUpChinatown.headerSubtext')}</HeaderSubtext>
      </Banner>
      <Container>
        <TextContainer>
          <SummaryHeader>{t('lightUpChinatown.summaryHeader')}</SummaryHeader>
          <SummaryBody>{t('lightUpChinatown.summaryBody1')}</SummaryBody>
          <br></br>
          <SummaryBody>
            <Trans i18nKey="lightUpChinatown.summaryBody2">
              Support the Light Up Chinatown project by contributing to
              <strong>“Adopt-A-Lantern!”</strong> In addition to light fixtures
              being installed, beautiful outdoor lanterns will be hung along
              Mott Street from Canal to Bayard to welcome patrons into our
              wonderful community, right in time for the holidays.
            </Trans>
          </SummaryBody>
          <br></br>
          <SummaryBody>
            <p>{t('lightUpChinatown.phase1')}</p>
            <p>{t('lightUpChinatown.phase2')}</p>
            <p>{t('lightUpChinatown.phase3')}</p>
          </SummaryBody>
          <br></br>
          <SummaryBody>{t('lightUpChinatown.summaryBody3')}</SummaryBody>
          <br></br>
          <SummaryBody>
            <Trans i18nKey="lightUpChinatown.summaryBody4">
              <strong>Send Chinatown Love</strong> along with
              <strong>
                Pearl River Mart, 46 Mott St Bakery, CCBA, Chinese Chamber of
                Commerce
              </strong>
              and <strong>UDO</strong> are partnering to raise funds to light up
              major blocks of Chinatown. We hope you will join us.
            </Trans>
          </SummaryBody>
        </TextContainer>
        <MapContainer>
          <Map src={mapImg} /> {/* TODO: Replace with GIF */}
          <CampaignInfoText color={'#1E1E1E'}>
            {t('lightUpChinatown.campaignHeader')}
          </CampaignInfoText>
          <CampaignInfoTime color={'#1E1E1E'}>
            {t('lightUpChinatown.campaignDates')}
          </CampaignInfoTime>
          <CampaignInfoText color={'#CF6E8A'}>
            {daysUntilEnd} {t('lightUpChinatown.campaignDaysLeft')}
          </CampaignInfoText>
        </MapContainer>
      </Container>
      <DonationContainer>
        <DonationSection />
      </DonationContainer>
      <DonationDetailContainer>
        <DonationDetail></DonationDetail>
      </DonationDetailContainer>
      <LightUpFaq />
    </React.Fragment>
  );
};

const Container = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0px 25px;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (min-width: 900px) {
    display: grid;
    grid-column-gap: 116px;
  }
`;

const TextContainer = styled.section`
  align-items: start;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 599px) {
    padding: 35px 0px;
  }
`;

const Hero = styled.img`
  height: ${(props) => props.height}px;
  width: 100vw;
  object-fit: cover;
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
  color: #ffffff;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  @media (max-width: 599px) {
    top: 30%;
    text-align: start;
    left: 30%;
    transform: translate(-30%, -50%);
  }
`;

const HeaderSubtext = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: -0.01em;
  color: #ffffff;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  @media (max-width: 599px) {
    font-size: 16px;
    line-height: 22px;
    top: 55%;
    text-align: start;
    left: 30%;
    transform: translate(-30%, -50%);
  }
`;

const SummaryHeader = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  letter-spacing: 0.02em;
  color: ##1e1e1e;
  margin-bottom: 40px;
`;

const SummaryBody = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-size: 18px;
  line-height: 20px;
  color: ##1e1e1e;
`;

const MapContainer = styled.section`
  position: relative;
  order: 1;
  grid-row: 1;
  padding: 70px 0px;
  text-align: center;
  @media (min-width: 900px) {
    position: sticky;
    top: 20px;
    order: 2;
    grid-column: 2;
  }
  @media (max-width: 599px) {
    padding: 35px 0px;
  }
`;

const Map = styled.img`
  height: 515px;
  width: 388px;
  margin-bottom: 20px;
`;

const CampaignInfoText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 35px;
  color: ${(props) => props.color};
`;

const CampaignInfoTime = styled(CampaignInfoText)`
  font-size: 18px;
`;

const DonationContainer = styled.section`
  background: #f7f7f7;
  align-items: center;
  @media (max-width: 599px) {
    padding: 0px 15px;
  }
`;

const DonationDetailContainer = styled.section`
  background: #f2e0e1;
  align-items: center;
  @media (max-width: 599px) {
    padding: 0px 15px;
  }
`;

export default LightUpChinatownPage;
