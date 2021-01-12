import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import lanternHeroTop from './images/lantern-hero-top.png';
import costBreakdownImg from './images/cost-breakdown.png';
import goal1Img from './images/goal_1.png';
import goal2Img from './images/goal_2.png';

import { Trans, useTranslation } from 'react-i18next';

import DonationSection from './DonationSection';
// import DonationDetail from './DonationDetail';
import DonationProgressBar from './DonationProgressBar';
import LightUpFaq from './LightUpFaq';
import LightUpPartners from './LightUpPartners';
import { getProject, light_up_chinatown_id } from '../../utilities/api';

const LightUpChinatownPage = () => {
  const { t } = useTranslation();
  // @NOTE (wilson) Temporarily comment out since the campaign's been extended,
  // but may be prudent to keep it in for future reuse
  // const today = new Date();
  // const campaignEndDate = new Date('12/20/2020');
  // const timeUntilEnd = campaignEndDate.getTime() - today.getTime();
  // const daysUntilEnd = Math.ceil(timeUntilEnd / (1000 * 3600 * 24));
  const [contributions, setContributions] = useState<number>(0);

  const fetchData = async (project_id: number) => {
    const { data } = await getProject(project_id);
    if (data) {
      setContributions(data.amount_raised);
    }
  };

  useEffect(() => {
    fetchData(light_up_chinatown_id);
  }, []);

  return (
    // Need to update topBanner to styled component
    <React.Fragment>
      <HeroSection>
        <HeaderText>{t('lightUpChinatown.headerText')}</HeaderText>
        <HeaderSubtext>{t('lightUpChinatown.headerSubtext')}</HeaderSubtext>
      </HeroSection>
      <Container>
        <TextContainer>
          <SummaryBody>{t('lightUpChinatown.summaryBody1')}</SummaryBody>
          <br></br>
          <SummaryBody>
            <Trans i18nKey="lightUpChinatown.summaryBody2">
              Patrick Mock, manager of 46 Mott St Bakery and community advocate,
              had an idea to light up Chinatown streets to draw customers back
              to Chinatown. And with the help of <strong>Jenny Low</strong>,{' '}
              <strong>Chung Seto</strong> of UDO, <strong>Joanne Kwong</strong>{' '}
              of Pearl River Mart and <strong>Send Chinatown Love</strong>, the
              Light Up Chinatown project was born.
            </Trans>
          </SummaryBody>
          <br></br>
          <SummaryBody>{t('lightUpChinatown.summaryBody3')}</SummaryBody>
          <br></br>
          <SummaryBody>{t('lightUpChinatown.summaryBody4')}</SummaryBody>
          <br></br>
          <SummaryBody>
            <strong>DECEMBER 15 UPDATE: </strong>
            {t('lightUpChinatown.summaryBody5')}
          </SummaryBody>
          <br></br>
          <br></br>
          {/* <CampaignInfoText color={'#1E1E1E'}>
            {t('lightUpChinatown.campaignDates')}
          </CampaignInfoText>
          <CampaignInfoText color={'#A8192E'}>
            {daysUntilEnd} {t('lightUpChinatown.campaignDaysLeft')}
          </CampaignInfoText> */}
        </TextContainer>
        <MapContainer>
          <Map
            src="https://storage.googleapis.com/sendchinatownlove-assets/public/assets/light-up-chinatown/light-up-chinatown-map.gif"
            alt="Light Up Chinatown Fundraising Goals Map"
          />
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
      <DonationContainer>
        <CostBreakdownImageContainer>
          <CostBreakdownImage src={costBreakdownImg}></CostBreakdownImage>
        </CostBreakdownImageContainer>
      </DonationContainer>
      <LightUpPartners />
      <LightUpFaq />
    </React.Fragment>
  );
};

const HeroSection = styled.div`
  background-image: url(${lanternHeroTop});
  height: 352px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Container = styled.section`
  width: 90%;
  margin: 0 auto;
  padding: 40px 25px 0px;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (min-width: 900px) {
    display: grid;
    grid-column-gap: 116px;
    padding-top: 60px;
    max-width: 1280px;
  }
`;

const TextContainer = styled.section`
  align-items: start;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  width: 100%;
  @media (max-width: 599px) {
    padding: 35px 0px;
  }
`;

const HeaderText = styled.span`
  margin: 0 auto;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  letter-spacing: 0.01em;
  color: #ffffff;

  @media (max-width: 599px) {
    margin-left: 25px;
  }
`;

const HeaderSubtext = styled(HeaderText)`
  font-size: 24px;
  line-height: 33px;
  @media (max-width: 599px) {
    font-size: 16px;
    line-height: 22px;
    width: 215px;
  }
`;

const SummaryBody = styled.div`
  font-family: Open Sans;
  font-style: normal;
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
  border-radius: 10px;
`;

// (wilson)See note above
// const CampaignInfoText = styled.div`
//   font-family: Open Sans;
//   font-style: normal;
//   font-weight: bold;
//   line-height: 35px;
//   color: ${(props) => props.color};
// `;

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

const CostBreakdownImageContainer = styled.div`
  text-align: center;
  background: #ffffff;
  border-radius: 12px;
  max-width: 1220px;
  margin: 0 auto;
`;

const CostBreakdownImage = styled.img`
  border-radius: 12px;
  width: 100%;
  height: auto;
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
  text-align: left;
  float: left;
  @media (max-width: 599px) {
    font-size: 14px;
    line-height: 19px;
  }
`;

export default LightUpChinatownPage;
