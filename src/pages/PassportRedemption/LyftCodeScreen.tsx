import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { LyftCode } from './LyftPromo';
import { MAILTO_URL } from '../../consts';
import {
  getLyftReward,
  redeemToken,
} from '../../utilities/api/interactionManager';

import CircleLogo from './CircleLogo.png';

const LyftCodeScreen = () => {
  const { contact_id, token } = useParams();
  const [code, setCode] = useState('');

  useEffect(() => {
    getLyftReward(contact_id).then((res) => {
      if (res.status === 200 && res.data) {
        setCode(res.data.code);
      } else {
        redeemToken(contact_id, token).then((res) => {
          if (res.status === 200 && res.data) {
            setCode(res.data.code);
          }
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <RedirectionLinks
          href="https://www.sendchinatownlove.com/food-crawl.html"
          target="_blank"
        >
          Learn More
        </RedirectionLinks>
        <Logo src={CircleLogo} alt="scl-log" />
        <RedirectionLinks href={MAILTO_URL}>contact us</RedirectionLinks>
      </HeaderContainer>
      <BodyContainer>{code && <LyftCode code={code}></LyftCode>}</BodyContainer>
    </Container>
  );
};

export default LyftCodeScreen;

const Container = styled.div`
  position: relative;
  width: 375px;
  hidden: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 12px auto;
`;

const RedirectionLinks = styled.a`
  text-transform: uppercase;
  color: black;
  font-weight: bold;
  letter-spacing: 0.15em;
  font-size: 12px;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 0mm 2px #cdcdcd);
`;

const BodyContainer = styled.div`
  width: 375px;
  position: relative;
  display: flex;
  justify-content: center;
`;
