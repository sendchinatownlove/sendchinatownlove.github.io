import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import lanternHeroTop from './images/lantern-hero-top.png';
import partners_46 from './images/partners-46.png';
import partners_ccba from './images/partners-ccba.png';
import partners_cccny from './images/partners-cccny.png';
import partners_prm from './images/partners-prm.png';
import partners_udooda from './images/partners-udooda.png';
import costBreakdownImg from './images/cost-breakdown.png';
import goal1Img from './images/goal_1.png';
import goal2Img from './images/goal_2.png';

import { Trans, useTranslation } from 'react-i18next';

import DonationSection from './DonationSection';
import DonationDetail from './DonationDetail';
import DonationProgressBar from './DonationProgressBar';
import LightUpFaq from './LightUpFaq';
import { getProject, light_up_chinatown_id } from '../../utilities/api';
import { phoneScreens } from '../../utilities/general/responsive';

import {
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
} from '../../utilities/hooks/ModalPaymentContext';
//import { url } from 'inspector'; // Will use this after making topBanner into a styled component

const LightUpChinatownPage = () => {
  const { t } = useTranslation();
  const today = new Date();
  const campaignEndDate = new Date('12/15/2020');
  const timeUntilEnd = campaignEndDate.getTime() - today.getTime();
  const daysUntilEnd = Math.ceil(timeUntilEnd / (1000 * 3600 * 24));
  const [contributions, setContributions] = useState<number>(0);

  const ModalPaymentDispatcher = useModalPaymentDispatch(null);

  const openModal = (event) => {
    event.preventDefault();
    ModalPaymentDispatcher({
      type: ModalPaymentConstants.SET_MODAL_VIEW,
      payload: ModalPaymentTypes.modalPages.light_up_chinatown,
    });
  };
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
      <div
        className="topBanner"
        style={{
          height: '352px',
          backgroundImage: 'url(' + lanternHeroTop + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignContent: 'center',
          paddingTop: '100px',
          paddingBottom: '50px',
          paddingLeft: '25px',
          paddingRight: '25px',
        }}
      >
        <HeaderText>{t('lightUpChinatown.headerText')}</HeaderText>
        <HeaderSubtext>{t('lightUpChinatown.headerSubtext')}</HeaderSubtext>
        <Button onClick={openModal}>{t('donationBox.button')}</Button>
      </div>
      <Container>
        <TextContainer>
          <SummaryHeader>{t('lightUpChinatown.summaryHeader')}</SummaryHeader>
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
          <SummaryBody>{t('lightUpChinatown.summaryBody5')}</SummaryBody>
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
          <Map
            src="https://storage.cloud.google.com/sendchinatownlove-assets/public/assets/light-up-chinatown/light-up-chinatown-map.gif"
            alt="Light Up Chinatown Map"
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
      <DonationDetailContainer>
        <DonationDetail></DonationDetail>
      </DonationDetailContainer>
      <DonationContainer>
        <CostBreakdownImageContainer>
          <CostBreakdownImage src={costBreakdownImg}></CostBreakdownImage>
        </CostBreakdownImageContainer>
      </DonationContainer>
      <Banner>
        <PartnerThanksTitle>
          {t('lightUpChinatown.partnerThanks')}
        </PartnerThanksTitle>
        <PartnersLogoContainer>
          <PartnerLogo src={partners_46} alt="46 Mott" />
          <PartnerLogo
            src={partners_ccba}
            alt="Chinese Consolidated Benevolent Association"
          />
          <PartnerLogo
            src={partners_cccny}
            alt="Chinese Chamber of Commerce NY"
          />
          <PartnerLogo src={partners_prm} alt="Pearl River Mart" />
          <PartnerLogo
            src={partners_udooda}
            alt="United Democratic Organization"
          />
        </PartnersLogoContainer>
      </Banner>
      <LightUpFaq />
    </React.Fragment>
  );
};

const Button = styled.span`
  margin: 0 auto;
  cursor: pointer;
  width: 212px;
  line-height: 37px;
  text-align: center;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.12em;

  box-shadow: 0 0 0.5pt 0.5pt black;
  background-color: #ffffff;
  border-radius: 100px;
  padding: 10px 10px 10px 10px;
  @media (${phoneScreens}) {
    letter-spacing: 0.08em;
  }
  &:hover {
    color: #ab192e;
    box-shadow: 0 0 1pt 1pt #ab192e;
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
    padding-top: 80px;
    max-width: 1280px;
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

const Banner = styled.div`
  position: relative;
  text-align: center;
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
    margin-left: 0;
    text-align: left;
  }
`;

const HeaderSubtext = styled.span`
  margin: 0 auto;

  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.01em;
  color: #ffffff;
  @media (max-width: 599px) {
    font-size: 16px;
    line-height: 22px;
    width: 215px;
    text-align: left;
    margin-left: 0;
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
