import * as React from 'react';
import styled from 'styled-components';
import styles from './styles.module.scss';
import targetMerchantImage from './images/grandmaIcon.png';

const Container = styled.div`
    text-align: center;
  `;

const IMG = styled.img`
  width: 45%;
`;

const UL = styled.ul`
  padding: 0 5px 0 20px;
`;

const BP = styled.li`
  text-align: left;
  padding: 5px 0;
`;

const TargetMerchantBox = () => (
  <Container className={styles.merchantCard}>
    <IMG src={targetMerchantImage} alt="target-merchant-img" />
    <h3>Meet our Target Merchant:</h3>
    <UL>
      <BP>Asian immigrant-owned small businesses</BP>
      <BP>
        Not fluent in English, run cash-only establishments, and not tech-savvy
      </BP>
      <BP>Currently struggling to pay rent, utility bill and employee wages</BP>
      <BP>
        Do not have websites, online delivery service, or gift cards available
      </BP>
      <BP>Located in NYC Manhattan Chinatown, Flushing, or Bensonhurst</BP>
    </UL>
  </Container>
);

export default TargetMerchantBox;
