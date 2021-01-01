import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { InputContainer } from '../SignIn';
import { CardText, Button, SubTitle } from '../style';
import CircleLogo from '../Assets/CircleLogo.png';

import ScreenType from '../ScreenTypes';

import {
  getPassportTickets,
  getOneSponsor,
  getLocationById,
  redeemReward,
} from '../../../utilities/api/interactionManager';

interface Props {
  setCurrentScreenView: Function;
}

const PassportRedemptionClaim = ({ setCurrentScreenView }: Props) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const { id, access_token, sponsor_seller_id } = useParams();

  const [selectedReward, setSelectedReward] = useState({
    id: '',
    name: '',
    location: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip_code: '',
    },
    logo_url: '',
    reward: '',
    reward_detail: '',
  });

  const fetchSponsor = async () => {
    try {
      const { data: sponsor } = await getOneSponsor(sponsor_seller_id);
      const { data: location } = await getLocationById(sponsor.location_id);
      setSelectedReward({
        ...sponsor,
        location: location,
      });
    } catch (err) {
      console.error('passport error: ' + err);
    }
  };

  const handleRedemption = async () => {
    try {
      const { data: allTickets } = await getPassportTickets(id);
      const ticketsToRedeem = allTickets
        .filter((ticket) => ticket.sponsor_seller_id === null)
        .slice(0, 3)
        .map((ticket) => {
          return { id: ticket.id, sponsor_seller_id };
        });
      const { status } = await redeemReward(id, access_token, ticketsToRedeem);
      // figure out how to handle invalid redemption with this page
      if (status !== 200) push(`/passport/${id}/tickets`);
    } catch (err) {
      console.error('passport error: ' + err);
    }
  };

  useEffect(() => {
    fetchSponsor();
    handleRedemption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [timeLeft, setTimeLeft] = useState(60 * 5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if (!timeLeft) setCurrentScreenView(ScreenType.Rewards);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const formatTime = (time) => {
    const sec = time % 60;
    time = (time - sec) / 60;
    const min = time % 60;

    const pad = (val) => val.toString().padStart(2, '0');
    return `${pad(min)}:${pad(sec)}`;
  };

  return (
    <Container>
      <Logo src={CircleLogo} alt="scl-log" />
      <Shadow>
        <InputContainer className="top shadow">
          <ContentContainer>
            <CardText bold="700" size="30px" letterSpacing="0.15em;">
              {selectedReward.reward}
            </CardText>
            <CardText bold="700" size="25px">
              {selectedReward.reward_detail}
            </CardText>
            <br />
            <LogoImage src={selectedReward.logo_url} alt="reward-logo" />
            <br />
            <div>
              <CardText bold="700" size="15px">
                {selectedReward.name}
              </CardText>
              {selectedReward && selectedReward.location && (
                <>
                  <CardText size="15px">
                    {selectedReward.location.address1}
                    {selectedReward.location.address2 && ', '}
                    {selectedReward.location.address2 &&
                      selectedReward.location.address2}
                  </CardText>
                  <CardText size="15px">
                    {selectedReward.location.city},{' '}
                    {selectedReward.location.state}{' '}
                    {selectedReward.location.zip_code}
                  </CardText>
                </>
              )}
            </div>
          </ContentContainer>
        </InputContainer>
        <InputContainer className="bottom shadow">
          <ContentContainer>
            <CardText size="15px" color="#a8192e">
              {t('passport.labels.offerUser')}
              <span style={{ fontWeight: 'bold' }}>
                {' '}
                {formatTime(timeLeft)}
              </span>
            </CardText>
          </ContentContainer>
        </InputContainer>
      </Shadow>

      <Footer>
        <SubTitle bold="700">{t('passport.labels.pleaseShow')}</SubTitle>
        <Button
          value="redemption-selected-button"
          className="button--red-filled"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/passport/${id}/redeem/${access_token}`;
          }}
        >
          {t('passport.placeholders.markUsed')}
        </Button>
      </Footer>
    </Container>
  );
};

export default PassportRedemptionClaim;

const Container = styled.div`
  position: relative;
  width: 375px;
  hidden: 100vh;
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;

const Logo = styled.img`
  z-index: 10;
  width: 100px;
  height: 100px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 50%;
  margin-bottom: 25px;
`;

const ContentContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Shadow = styled.div`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const LogoImage = styled.img`
  width: 260px;
  border-radius: 20px;
  border: 1px solid #eaeaea;
`;

const Footer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    padding: 10px;
  }
`;
