import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Title } from '../style';
import { socialMediaLinks } from '../../../consts';

import CircleLogo from '../Assets/CircleLogo.png';
import EmailScreen from './emailScreen';
import UploadScreen from './uploadScreen';

interface Props {
  setCurrentScreenView: Function;
}

const Track = (props: Props) => {
  const { t } = useTranslation();

  // THIS WILL BE DELETED. FOR TESTING ONLY.
  const [page, setPage] = useState(0);

  return (
    <Container>
      <PassportCard>
        <Logo src={CircleLogo} alt="scl-log" />
        <InputContainer className="trackScreen">
          <Title color="#a8192e">
            {t('passport.headers.passport').toUpperCase()}
          </Title>

          {page === 0 && <EmailScreen setPage={setPage} />}
          {page === 1 && <UploadScreen />}
        </InputContainer>
      </PassportCard>

      <Row>
        <ExternalLinks
          href="https://www.sendchinatownlove.com/food-crawl.html"
          target="_blank"
        >
          {t('passport.headers.learn')}
        </ExternalLinks>
        <LinksContainer>
          {socialMediaLinks.map((social) => (
            <Icon href={social.url} key={social.platform} target="_blank">
              <span className={`fa fa-${social.platform}`} />
            </Icon>
          ))}
        </LinksContainer>
      </Row>
    </Container>
  );
};

export default Track;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 367px;
  margin: 0 auto;
`;

const PassportCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  width: 367px;
  margin: 50px 0px 0px;
  z-index: 0;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25));
`;

const Logo = styled.img`
  z-index: 10;
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50%;
  margin-bottom: -50px;
`;

export const InputContainer = styled.div`
  background-color: white;
  padding: 25px 20px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 20px;

  &.trackScreen {
    padding-top: 60px;
  }

  &.top {
    border-radius: 20px 20px 0px 0px;
    border-bottom: 1px dashed #dedede;
  }

  &.bottom {
    padding-top: 25px;
    border-radius: 0px 0px 20px 20px;
    border-top: 1px dashed #dedede;
    text-align: center;
    align-items: center;
  }

  &.red {
    color: #a8192e;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  margin: 15px 0 0;
`;

export const Column = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;

  &.center {
    align-items: center;
    margin: 45px 0 15px;
  }
`;

export const InputField = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid #dadada;
  margin-top: 8px;
  padding-left: 1em;
  border-radius: 5px;
  outline: none;
  -webkit-appearance: none;
  font-size: 16px;
  // color: grey;

  :invalid {
    border: 1px solid red;
  }

  &.indent {
    padding-left: 1.5em;
  }
`;

// FOOTER
export const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0 25px;
  width: 100%;
  justify-content: space-between;

  &.row-no-margin {
    margin: 0 auto;
  }
`;

export const ExternalLinks = styled.a`
  font-weight: bold;
  text-transform: uppercase;
  color: black;
  font-size: 12px;
  margin: 20px;
  cursor: pointer;
  letter-spacing: 2px;
`;

const LinksContainer = styled.div`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
`;

const Icon = styled.a`
  text-decoration: none;
  color: #a8192e;
  padding: 0 15px;
  font-size: 22px;
`;
