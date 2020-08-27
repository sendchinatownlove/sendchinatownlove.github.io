import React from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';

import { PassportContainer, TitleRow, Title } from './style';

type Props = {
  showFaq: boolean;
  toggleView: () => void;
};

const Faq = ({ showFaq, toggleView }: Props) => {
  const history = useHistory();
  const { id } = useParams();

  const goToPassPort = (e) => {
    console.log("clicked");
    history.push(`/passport/${id}/tickets`);
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
        <RewardsLink href="">VIEW ACTIVE REWARDS & GIVEAWAYS</RewardsLink>
        <Question>1. What is the Send Chinatown Love Food Crawl?</Question>
        For the <strong><u>month of September</u></strong>, Send Chinatown Love is hosting a food crawl in Manhattan’s Chinatown, highlighting 13 incredible restaurants, bakeries, cafes and more throughout the neighborhood. Come with your friends and family to explore locally and savor all the incredible things Chinatown has to offer and earn rewards for shopping with our merchants!
 
        <Question>2. What is the purpose of the Send Chinatown Love Food Crawl?</Question>
          <BulletPoint>
            Chinatown was disproportionately impacted by the lack of tourism and foot traffic resulting from COVID-19. To sustain long-term growth for the businesses in Chinatown, we have planned a food crawl for the entire month of September to bring foot traffic back to the neighborhood.
          </BulletPoint>
          <BulletPoint>
            Unlike a traditional food crawl, we encourage you to participate at your own pace and on your own schedule throughout the month to better ensure everyone’s health and safety.
          </BulletPoint>
          <BulletPoint>
            Collect tickets as you visit our 13 vendors around Chinatown and record them in your <em>Passport to Chinatown</em>. Your tickets will unlock rewards at local businesses in the neighborhood! Visit all 13 vendors for a chance to win a grand prize!
          </BulletPoint>

        <Question>3. What is the <em>Passport to Chinatown</em>?</Question>
        The <em>Passport to Chinatown</em> is a mobile site that will be your ultimate guide to the Send Chinatown Love Food Crawl. It will track which vendors you’ve visited and provide a full list of local rewards you can redeem once you’ve submitted your unique ticket codes.

        <Question>4. How can I access my <em>Passport to Chinatown</em>?</Question>
          <BulletPoint>
            Scan the QR code on your ticket to access your <em>Passport to Chinatown</em>. You will be prompted to submit your email address and your ticket code.
          </BulletPoint>
          <BulletPoint>
            You can then view all of your collected tickets by entering your email address in your <em>Passport</em>, then clicking “View My Tickets.”
          </BulletPoint>
 
        <Question>5. How do I get a ticket?</Question>
        Spend at least $5 at any one of our 13 participating vendors and you will be issued a ticket. Each ticket has a unique ticket code that cannot be replaced — don’t lose this!

        <Question>6. How many tickets do I get per purchase?</Question>
          <BulletPoint>
            You get one (1) ticket per purchase over $5. You must spend a minimum of $5 to get one (1) ticket, and are limited to one (1) ticket per transaction.
          </BulletPoint>
          <BulletPoint>
            You will not get multiple tickets for purchases over $5.
          </BulletPoint>

        <Question>7. What are the tickets for?</Question>
        The tickets are used to track the vendors you’ve visited. Be sure to submit your unique ticket code to your Passport to Chinatown. Once submitted, every three (3) tickets will unlock rewards from a list of our local rewards partners.

        <Question>8. How many tickets do I need to win a reward?</Question>
          <BulletPoint>
            You must submit a <strong>total of three (3) tickets</strong> to redeem your reward at one of our local reward partners. Each of your three (3) tickets must be obtained from three <strong>(3) different</strong> vendors. You will <strong><em>not</em></strong> be eligible if you submit multiple tickets from the same vendor.
          </BulletPoint>
          <BulletPoint>
            Every three (3) tickets qualifies you for one (1) local reward. You can get as many tickets as you want, as long as your three (3) tickets are from different vendors. 
            <ul>
              <BulletPoint>
                For example, if you collect a second ticket from a Food Crawl vendor you’ve already visited, you can use this ticket in combination with two other different vendors to redeem another reward.
              </BulletPoint>
            </ul>
          </BulletPoint>
          <BulletPoint>
            You can only redeem your reward once you have <strong>entered your unique ticket code</strong> into your <em>Passport to Chinatown</em>.
          </BulletPoint>

        <Question>9. What is a “rewards partner,” and who are they?</Question>
          <BulletPoint>
            We have partnered with other local businesses to offer rewards to food crawl participants who have successfully collected three (3) tickets. These rewards range from discounts to complimentary items with a purchase.
          </BulletPoint>
          <BulletPoint>
            See the full list of our reward partners and their offerings on our site, <a href="www.sendchinatownlove.com/food-crawl" target="_blank">www.sendchinatownlove.com/food-crawl </a>
          </BulletPoint>

        <Question>10. How do I redeem my reward?</Question>
          <BulletPoint>
            Scan the QR code on the back side of your ticket to access your <em>Passport to Chinatown</em>. You will be able to keep track of the vendors you have   visited and redeem your rewards there.
          </BulletPoint>
          <BulletPoint>
            Once you have submitted three (3) tickets (one (1) ticket each from three (3) different vendors) to your <em>Passport</em>, you will be able to redeem a reward from one of our reward partners listed at <a href="www.sendchinatownlove.com/food-crawl" target="_blank">www.sendchinatownlove.com/food-crawl</a>.
          </BulletPoint>
          <BulletPoint>
            Visit one of our reward partners to redeem your reward!
          </BulletPoint>

        <Question>11. How long are the rewards valid for?</Question>
          <BulletPoint>
            The rewards are redeemable from our local reward partners’ stores for the entire duration of the food crawl (September 1 - 30, 2020). Once you redeem a reward, your <em>Passport to Chinatown</em> will mark that reward as used.
          </BulletPoint>
          <BulletPoint>
            Please note that some of our reward partners are only open certain days of the week. Check our website <a href="www.sendchinatownlove.com/food-crawl" target="_blank">www.sendchinatownlove.com/food-crawl</a> for the latest updates.
          </BulletPoint>

        <Question>12. What are the weekly digital giveaways?</Question>
        As an added bonus, once you have collected your three (3) tickets, you will be entered into a digital raffle to win our item of the week! These raffle items will be announced every Sunday.

        <Question>13. How do I enter the weekly digital giveaways?</Question>
        Once you’ve collected three (3) tickets and logged them into the <em>Passport to Chinatown</em>, you will also be entered into the digital giveaway with just one more step: 
          <ul>
            <BulletPoint>
              Post about the Food Crawl and tag us on Instagram (@sendchinatownlove). This can be an in-feed post or a story. You must include your Instagram username when submitting at least one of your tickets to your Passport to Chinatown.
            </BulletPoint>
          </ul>

        <Question>14. How many times can I enter the digital giveaway? Can I have multiple entries?</Question>
        Every three (3) tickets qualifies you for one (1) entry into our digital giveaway for the month. We’ll select winners four (4) times throughout the month.

        <Question>15. Will the tickets I’ve collected carry over into other weeks? </Question>
          <BulletPoint>
            Yes! Once you input your ticket codes into your <em>Passport to Chinatown</em>, they are automatically saved to your email. The tickets collected during one week of the Food Crawl can roll over to other weeks. For example, if you collect one (1) ticket during the first week of September, you can get two (2) more tickets during another week in September to have a total of three (3) tickets. You can now use these three (3) tickets to redeem a local reward from one of our reward partners.
          </BulletPoint>
          <BulletPoint>
            We’ll select winners for digital giveaway four (4) times throughout the month.
          </BulletPoint>

        <Question>16. Do I get a grand prize for visiting ALL 13 vendors on the Food Crawl?</Question>
        YES! Visit all 13 vendors in the month of September to be entered into our grand prize giveaway!

        <Question>17. What should I bring? </Question>
        <BulletPoint>
          <strong>PPE.</strong> Please bring and wear your mask at all times when you’re not eating or drinking. We want to encourage more foot traffic in the area, but not at the expense of others’ safety. Your own personal hand sanitizer is recommended, but not required, as many businesses will already have hand sanitizer available for you.
        </BulletPoint>
        <BulletPoint>
          <strong>Cash.</strong> Remember to bring cash, since many businesses are cash only. If you forget, refer to our Food Crawl map for ATMs in the Chinatown area.
        </BulletPoint>
        <BulletPoint>
          <strong>Friends and family.</strong> Food is always more enjoyable when shared with your loved ones!
        </BulletPoint>
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

const BulletPoint = styled.li`
  margin-bottom: 12px;
`;

export default Faq;
