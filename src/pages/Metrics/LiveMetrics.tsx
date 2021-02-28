import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import ReactPixel from 'react-facebook-pixel';
import styles from './styles.module.scss';

import { Trans, useTranslation } from 'react-i18next';

import { getProject, light_up_chinatown_id } from '../../utilities/api';
import {
  tabletScreens,
  phoneScreens,
} from '../../utilities/general/responsive';
// hmmm seems to link to fetchData below, but unclear how backend works

const LiveMetrics = () => {
  const { t } = useTranslation();

  console.log('livemetrics component');
  return (
    <React.Fragment>
      <Container>
        <BannerText>Our Impact Since March 2020</BannerText>
      </Container>
      <Container>
        <ColumnContainer>
          <Metric>Metric1</Metric>
          <br />
          <Description>Raised</Description>
          <br />
          <br />
          <Metric>Metric2</Metric>
          <br />
          <Description>Donations and vouchers purchased</Description>
        </ColumnContainer>
        <ColumnContainer>
          <Metric>Metric2</Metric>
          <br />
          <Description>Meals Donated</Description>
          <br />
          <br />
          <Metric>Metric2</Metric>
          <br />
          <Description>Merchants directly supported</Description>
        </ColumnContainer>
        <ColumnContainer>
          <Metric>Metric3</Metric>
          <br />
          <Description>Raised from 2020 Food Crawl</Description>
          <br />
          <br />
          <Metric>Metric2</Metric>
          <br />
          <Description>Raised for Light Up Chinatown</Description>
        </ColumnContainer>
      </Container>
      <ButtonContainer>
        <Button
          className={'button--outlined-with-red'}
          href="https://www.sendchinatownlove.com/about.html"
        >
          Read Our Story
        </Button>
      </ButtonContainer>
    </React.Fragment>
  );
};

const BannerText = styled.div`
  padding: 30px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #ffffff;
  @media (${phoneScreens}) {
    font-size: 13px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  text-align: center;
  max-width: 1440px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background-color: #931a1a;
  @media (${tabletScreens}) {
    flex-direction: column;
    position: relative;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  margin: auto;
  background-color: #931a1a;
  @media (${tabletScreens}) {
    flex-direction: column;
    position: relative;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  text-align: center;
  @media (${tabletScreens}) {
    padding: 5px;
  }
`;

const Metric = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
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
  margin-left: auto;
  margin-right: auto;
  display: block;
  text-align: center;
  line-height: 40px;
  width: 280px;
  height: 60px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
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

export default LiveMetrics;
