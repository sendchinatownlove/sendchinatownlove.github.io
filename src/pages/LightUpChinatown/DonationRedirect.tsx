import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  tabletScreens,
  phoneScreens,
} from '../../utilities/general/responsive';
import ExternalLink from './ExternalLink.svg';

const DonationRedirect = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Container>
        <ColumnContainer>
          <Title>{t('lightUpChinatown.goalReachedtitle')}</Title>
          <br />
          <br />
          <Description>
            {t('lightUpChinatown.goalReachedDescription1')}
          </Description>
          <br />
          <Description>
            {t('lightUpChinatown.goalReachedDescription2')}
          </Description>
        </ColumnContainer>
        <ColumnContainer>
          <Button
            className={'button--outlined-with-red'}
            href="https://www.gofundme.com/f/light-up-chinatown"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('lightUpChinatown.goalReachedButton1')}{' '}
            <img alt="external-link" src={ExternalLink} />
          </Button>
          <Button
            className={'button--outlined-with-red'}
            href="https://www.sendchinatownlove.com/ways-to-donate.html"
          >
            {t('lightUpChinatown.goalReachedButton2')}
          </Button>
        </ColumnContainer>
      </Container>
    </React.Fragment>
  );
};

export default DonationRedirect;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  margin: auto;
  @media (${tabletScreens}) {
    flex-direction: column;
    position: relative;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  @media (${tabletScreens}) {
    padding: 5px;
  }
`;

const Title = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  letter-spacing: 0.02em;
  color: #ffffff;
  @media (${phoneScreens}) {
    font-size: 22px;
  }
`;

const Description = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #ffffff;
  @media (${phoneScreens}) {
    font-size: 13px;
  }
`;

const Button = styled.a`
  color: #a8192e;
  text-decoration: none;

  text-align: center;
  line-height: 40px;
  width: 380px;
  height: 60px;
  cursor: pointer;
  margin: 80px 0px 0px 0px;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.05em;
  @media (${phoneScreens}) {
    font-size: 14px;
    width: 100%;
    margin: 16px 0px 16px 0px;
  }
`;
