import React from 'react';
import Logo from '../../components/Logos/image/logo.svg';
import styled from 'styled-components';
const FooterSR = ({ distributorImage }) => (
  <Container>
    <LogoImage src={Logo} alt="scl" />
    <img src={distributorImage} alt="distributor logo" />
  </Container>
);
export default FooterSR;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  font-size: 10px;
  align-items: flex-end;
  height: 85px;
  background: white;
`;
const LogoImage = styled.img`
  height: 100%;
`;
