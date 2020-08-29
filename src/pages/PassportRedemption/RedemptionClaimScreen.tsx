import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';

import { InputContainer } from './TrackScreen';
import { Button, SubTitle } from './style';
import CircleLogo from './CircleLogo.png';

import ScreenName from './ScreenName';

import {
  getPassportTickets,
  getOneSponsor,
  getLocationById,
  redeemReward,
} from '../../utilities/api/interactionManager';

interface Props {
  setCurrentScreenView: Function;
}

const PassportRedemptionClaim = ({ setCurrentScreenView }: Props) => {
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
    reward_detail: ''
  });

  const fetchSponsor = async () => {
    try {
      const { data: sponsor } = await getOneSponsor(sponsor_seller_id);
      const { data: location } = await getLocationById(sponsor_seller_id);
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
    if (!timeLeft) setCurrentScreenView(ScreenName.Redemption);
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
          <Content>
            <Text className="header">{selectedReward.reward}</Text>
            <Text className="subheader">{selectedReward.reward_detail}</Text>
            <img src={selectedReward.logo_url} alt="reward-logo" width="260px" />
            <br />
            <div>
              <Text className="">{selectedReward.name}</Text>
              {selectedReward && selectedReward.location && (
                <>
                  <Text className="finePrint">
                    {selectedReward.location.address1}
                    {selectedReward.location.address2 && ', '}
                    {selectedReward.location.address2 &&
                      selectedReward.location.address2}
                  </Text>
                </>
              )}
            </div>
          </Content>
        </InputContainer>
        <InputContainer className="bottom shadow">
          <Content>
            <Text className="finePrint red">
              Offer must be used in:
              <span className="bold"> {formatTime(timeLeft)}</span>
            </Text>
          </Content>
        </InputContainer>
      </Shadow>

      <Footer>
        <SubTitle bold="700">
          Please show this screen to the host when you are placing your order.
        </SubTitle>
        <Button
          value="redemption-selected-button"
          className="button--red-filled"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/passport/${id}/redeem/${access_token}`;
          }}
        >
          MARK AS USED
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
  margin-top: 30px;
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

const Content = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: bold;
  font-size: 15px;
  line-height: 100%;
  text-align: center;

  &.header {
    font-size: 14px;
    margin-bottom: 5px;
  }

  &.subheader {	
    font-size: 10px;	
    margin-bottom: 15px;	
  }

  &.finePrint {
    font-weight: normal;
    line-height: 25%;
  }

  &.red {
    color: #a8192e;
  }

  .bold {
    font-weight: bold;
  }
`;

const Shadow = styled.div`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const Footer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
