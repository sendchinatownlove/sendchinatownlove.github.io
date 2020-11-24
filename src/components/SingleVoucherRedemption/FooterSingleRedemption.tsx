import React from 'react';
import Logo from '../../components/Logos/image/logo.svg';
import styled from 'styled-components';
const FooterSR = ({ distributorImage }) => (
  <Container>
    <LogoImage src={Logo} alt="scl" />
    <PartnershipContainer>
      <PartnerShipText>In partnership with:</PartnerShipText>
      <LogoImage src={distributorImage} alt="distributor logo" />
    </PartnershipContainer>
  </Container>
);
FooterSR.defaultProps = {
  distributorImage:
    'https://storage.googleapis.com/sendchinatownlove-assets/public/assets/think-chinatown/think-chinatown-logo.png',
};

export default FooterSR;
const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 0 26px 26px;
  font-size: 10px;
  align-items: flex-end;
  height: 60px;
  background: white;
`;

const PartnershipContainer = styled.div`
  height: 100%;
`;

const LogoImage = styled.img`
  height: 100%;
`;

const PartnerShipText = styled.span`
  font-style: italics;
  margin-right: 7px;
`;
