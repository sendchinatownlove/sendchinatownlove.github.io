import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  tabletScreens,
  phoneScreens,
} from '../../utilities/general/responsive';

const DonationDetail = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Container>
        <ColumnContainer>
          <Description>
            <b>{t('lightUpChinatown.donationDetail1')}</b>
          </Description>
          <br></br>
          <Description>{t('lightUpChinatown.donationDetail2')}</Description>
        </ColumnContainer>
        <ColumnContainer>
          <Description>
            <b>{t('lightUpChinatown.donationDetail3')}</b>
          </Description>
          <br></br>
          <Description>
            <b>{t('lightUpChinatown.donationDetail4')}</b>
          </Description>
          <br></br>
          <Description>{t('lightUpChinatown.donationDetail2')}</Description>
          <br></br>
          <Description>{t('lightUpChinatown.donationDetail5')}</Description>
        </ColumnContainer>
      </Container>
    </React.Fragment>
  );
};

export default DonationDetail;

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1440px;
  margin: auto;
  @media (${tabletScreens}) {
    flex-direction: column;
    position: relative;
    display: -webkit-inline-box;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 35px;
  max-width: 320px;
  margin: 0 160px;
  @media (${tabletScreens}) {
    max-width: 160px;
    padding: 22px 0px;
    margin: 0 10px;
  }
`;

const Description = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #1e1e1e;
  @media (${phoneScreens}) {
    font-size: 12px;
    line-height: 16px;
  }
`;
