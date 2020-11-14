import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import lanternHeroTop from './images/lantern-hero-top.png';
import mapImg from './images/light-up-map.png';
import costBreakdownImg from './images/cost-breakdown.png';
import goal1Img from './images/goal_1.png';
import goal2Img from './images/goal_2.png';

import { Trans, useTranslation } from 'react-i18next';
import DonationSection from './DonationSection';
import DonationDetail from './DonationDetail';
import DonationProgressBar from './DonationProgressBar';
import LightUpFaq from './LightUpFaq';
import { getLightUpChinatownDonation } from '../../utilities/api';

const LightUpChinatownPage = () => {
  const { t } = useTranslation();
  const today = new Date();
  const campaignEndDate = new Date('11/30/2020');
  const timeUntilEnd = campaignEndDate.getTime() - today.getTime();
  const daysUntilEnd = Math.ceil(timeUntilEnd / (1000 * 3600 * 24));
  const [contributions, setContributions] = useState<number>(0);

  const fetchData = async (project_id: number) => {
    const { data } = await getLightUpChinatownDonation(project_id);
    setContributions(data.amount_raised);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

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
              Support the Light Up Chinatown project through donations and
              contributing to <strong>“Adopt-a-Lantern!”</strong> In addition to
              light fixtures being installed, beautiful outdoor lanterns will
              also be hung along Mott Street from Canal to Bayard to welcome
              patrons into our wonderful community, right in time for the
              holidays.
            </Trans>
          </SummaryBody>
          <br></br>
          <SummaryBody>{t('lightUpChinatown.summaryBody3')}</SummaryBody>
          <br></br>
          <SummaryBody>
            <Trans i18nKey="lightUpChinatown.summaryBody4">
              We will be having an in-person{' '}
              <strong>“Light Up Chinatown”</strong> ceremony that will be
              planned for December in celebration of the Winter Solstice. When
              you make a qualifying donation of $150 or more, you will receive
              an email invitation with details including date, time, and
              location.
            </Trans>
          </SummaryBody>
          <br></br>
          <br></br>
          <CampaignInfoText color={'#1E1E1E'}>
            {t('lightUpChinatown.campaignHeader')}
          </CampaignInfoText>
          <CampaignInfoTime color={'#1E1E1E'}>
            {t('lightUpChinatown.campaignDates')}
          </CampaignInfoTime>
          <CampaignInfoText color={'#CF6E8A'}>
            {daysUntilEnd} {t('lightUpChinatown.campaignDaysLeft')}
          </CampaignInfoText>
        </TextContainer>
        <MapContainer>
          <Map src={mapImg} />
          <br></br>
          <GoalContainer>
            <GoalPill src={goal1Img}></GoalPill>
            <GoalText>{t('lightUpChinatown.goal1')}</GoalText>
          </GoalContainer>
          <br></br>
          <br></br>
          <GoalContainer>
            <GoalPill src={goal2Img}></GoalPill>
            <GoalText>{t('lightUpChinatown.goal2')}</GoalText>
          </GoalContainer>
        </MapContainer>
      </Container>
      <DonationProgress>
        <DonationProgressBar raised={contributions}></DonationProgressBar>
      </DonationProgress>
      <DonationContainer>
        <DonationSection />
      </DonationContainer>
      <DonationDetailContainer>
        <DonationDetail></DonationDetail>
      </DonationDetailContainer>
      <DonationContainer>
        <CostBreakdownImageContainer>
          <CostBreakdownImage src={costBreakdownImg}></CostBreakdownImage>
        </CostBreakdownImageContainer>
      </DonationContainer>
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
  line-height: 32px;
  color: ##1e1e1e;
  @media (max-width: 599px) {
    font-size: 12px;
    line-height: 16px;
  }
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

const DonationProgress = styled.div`
  position: relative;
  padding: 0 8% 0 8%;
  height: 93px;
  margin: 58px 0 58px 0;
`;

const DonationContainer = styled.section`
  background: #f7f7f7;
  align-items: center;
  padding: 30px;
  @media (max-width: 599px) {
    padding: 15px 15px;
  }
`;

const DonationDetailContainer = styled.section`
  background: #f2e0e1;
  align-items: center;
  @media (max-width: 599px) {
    padding: 0px 15px;
  }
`;

const CostBreakdownImageContainer = styled.div`
  background: #ffffff;
  border-radius: 24px;
  max-width: 1220px;
  margin: 0 auto;
  @media (max-width: 599px) {
    max-width: 350px;
  }
`;

const CostBreakdownImage = styled.img`
  max-width: 1220px;
  @media (max-width: 599px) {
    max-width: 350px;
`;

const GoalContainer = styled.div`
  display: inline-block;
`;

const GoalPill = styled.img`
  max-width: 93px;
  display: inline-block;
  float: left;
  margin-right: 20px;
  @media (max-width: 599px) {
    max-width: 76px;
  }
`;

const GoalText = styled.div`
  max-width: 224px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #1e1e1e;
  display: inline-block;
  float: left;
  @media (max-width: 599px) {
    font-size: 14px;
    line-height: 19px;
  }
`;

export default LightUpChinatownPage;
