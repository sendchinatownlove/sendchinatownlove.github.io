import React from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';

import { PassportContainer, TitleRow, Title } from './style';

type Props = {
  showFaq: boolean;
  toggleView: () => void;
};

const Faq = ({ showFaq, toggleView }: Props) => {
  const { push } = useHistory();
  const { id } = useParams();

  const goToPassPort = (e) => {
    e.preventDefault();
    push(`/passport/${id}/tickets`);
  }
  
  return (
    <PassportContainer mainView={showFaq} onClick={toggleView}>
      <TitleRow>
        <Title>HOW TO WIN REWARDS</Title>
      </TitleRow>
      {!showFaq && (
        <>
          <br />
          <br />
        </>
      )}
      <Content hidden={!showFaq}>
        <RewardsLink onClick={goToPassPort}>VIEW ACTIVE REWARDS & GIVEAWAYS</RewardsLink>              
        <Question>What is the Send Chinatown Love Food Crawl?</Question>
          For the month of September, Send Chinatown Love is hosting a food crawl in Manhattan’s Chinatown, highlighting 13 incredible restaurants, bakeries, cafes and more throughout the neighborhood. Come with your friends and family to explore locally and savor all the incredible things Chinatown has to offer and earn rewards for shopping with our merchants! 
        <Question>What is the purpose of the Send Chinatown Love Food Crawl?</Question>
        Chinatown was disproportionately impacted by the lack of tourism and foot traffic resulting from COVID-19. To sustain long-term growth for the businesses in Chinatown, we have planned a food crawl for the entire month of September to bring foot traffic back to the neighborhood. Unlike a traditional food crawl, we encourage you to participate at your own pace and on your own schedule throughout the month to better ensure everyone’s health and safety. Collect tickets as you visit our 13 vendors around Chinatown and record them in your Passport to Chinatown. Your tickets will unlock rewards at local businesses in the neighborhood! Visit all 13 vendors for a chance to win a grand prize! 
        <Question>What is the Passport to Chinatown? </Question>
        The Passport to Chinatown is a mobile site that will be your ultimate guide to the Send Chinatown Love Food Crawl. It will track which vendors you’ve visited and provide a full list of local rewards you can redeem once you’ve submitted your unique ticket codes.
        <Question>How can I access my Passport to Chinatown?</Question>
        Scan the QR code on your ticket to access your Passport to Chinatown. You will be prompted to submit your email address and your ticket code. You can then view all of your collected tickets by entering your email address in your Passport, then clicking “View My Tickets.” 
      </Content>
    </PassportContainer>
  );
};

const Content = styled.div`
  padding: 10px 15px 15px;
`;

const RewardsLink = styled.span`
  text-transform: uppercase;
  color: black;
  font-weight: 700;
  letter-spacing: 0.15em;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

const Question = styled.p`
  font-weight: bold;
  margin-bottom: 1px;
`;

export default Faq;
