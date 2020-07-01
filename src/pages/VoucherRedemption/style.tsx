import React from 'react';
import styled from 'styled-components';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// CONTAINERS
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`;
const SubViewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const MainView = styled(SubViewContainer)`
  margin: 0 auto;
  width: 90%;
`;
const Footer = styled.div`
  width: 100%;
  min-height: 175px;
  height: 100%;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const BackButtonStyle = styled.span`
  text-align: left;
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  margin: 12px 0;
  display: flex;
  align-items: center;
`;
const BackButton = (props) => (
  <BackButtonStyle {...props}>
    <ArrowBackIosIcon fontSize="small" /> {props.children}
  </BackButtonStyle>
);
const StoreFrontImage = styled.img`
  width: 100%;
  max-width: 600px;
  min-height: 150px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  box-sizing: border-box;
  border-radius: 10px;
`;
const Text = styled.span`
  text-align: center;
`;
const FooterLabelStyle = styled.div`
  text-align: center;
  display: inline;
  margin: 15px auto;
  min-height: 30px;
  width: 50%;
  word-break: break-all;
`;
const FooterLabel = (props) => (
  <FooterLabelStyle {...props}>
    Voucher Code: <b>{props.children}</b>
  </FooterLabelStyle>
);
const SubmitButton = styled.button`
  color: white;
  width: 90%;
  margin: 15px auto;
  padding: 18px 0;
  max-width: 350px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  background: #121212;
  border-radius: 50px;
`;
const Divider = styled.div``;

export {
  ViewContainer,
  SubViewContainer,
  MainView,
  BackButton,
  StoreFrontImage,
  Text,
  Footer,
  FooterLabel,
  SubmitButton,
  Divider,
};
