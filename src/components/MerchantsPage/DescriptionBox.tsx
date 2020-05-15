import * as React from 'react';
import styled from 'styled-components';
import merchantIcon from './images/merchantIcon.png';
import { MerchantCard } from './styles';

const TargetMerchantBox = () => (
  <MerchantCard className="descriptionBox">
    <Icon src={merchantIcon} alt="target-merchant-img" />
    <h3>Meet our Target Merchant</h3>
    <List>
      <Bullets>Asian immigrant-owned small businesses</Bullets>
      <Bullets>
        Not fluent in English, run cash-only establishments, and not tech-savvy
      </Bullets>
      <Bullets>
        Currently struggling to pay rent, utility bill and employee wages
      </Bullets>
      <Bullets>
        Do not have websites, online delivery service, or vouchers available
      </Bullets>
      <Bullets>
        Located in NYC Manhattan Chinatown, Flushing, or Bensonhurst
      </Bullets>
    </List>
  </MerchantCard>
);

export default TargetMerchantBox;

const Icon = styled.img`
  width: 45%;
`;

const List = styled.ul`
  padding: 0 5px 0 20px;
`;

const Bullets = styled.li`
  text-align: left;
  padding: 5px 0;
`;
