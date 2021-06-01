import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Title, Button } from '../style';
import RaffleTicketCombo from '../Assets/RaffleTicketCombo.png';

import {
  getCrawlRewards,
  getCrawlReceipts,
  getRedeemedRewards,
  redeemRaffle,
} from '../../../utilities/api/interactionManager';
import Loader from '../../../components/Loader';

interface Props {
  setCurrentScreenView: Function;
}

const Rewards = ({ setCurrentScreenView }: Props) => {
  const { t } = useTranslation();
  const { id } = useParams<any>();
  const history = useHistory();

  const [receipts, setReceipts] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const numReceipts = Math.floor(receipts.length / 3);
  const selectedRewards = rewards
    .filter((reward) => reward.active)
    .map((reward) => reward.id);

  const fetchReceipts = async (id) => {
    try {
      // first get crawl receipts, sort them by redemption_id
      const apiReceipts = await getCrawlReceipts(id);
      const parsedReceipts = apiReceipts.data.sort(
        (a, b) => a.redemption_id - b.redemption_id
      );

      const availableReceipts = parsedReceipts.filter(
        (receipt) => receipt.redemption_id === null
      );
      setReceipts(availableReceipts);

      const redeemedRewards = await getRedeemedRewards(id);
      const redeemedRewardsCount = redeemedRewards.data.reduce((acc, curr) => {
        acc[curr.reward_id] = !acc[curr.reward_id]
          ? 1
          : acc[curr.reward_id] + 1;
        return acc;
      }, {});

      const apiRewards = await getCrawlRewards();
      const parsedRewards = apiRewards.data.map((reward) => {
        return {
          ...reward,
          active: false,
          amount: redeemedRewardsCount[reward.id]
            ? redeemedRewardsCount[reward.id]
            : 0,
        };
      });

      setRewards(parsedRewards);
    } catch (err) {
      console.error('passport error: ' + err);
    }
  };

  useEffect(() => {
    history.push(`/lny-passport/${id}/redeem`);
    fetchReceipts(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/lny-passport/${id}/tickets`);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    const selectedRewards = rewards
      .filter((reward) => reward.active)
      .map((reward) => reward.id);

    const redeemedRewards: any[] = [];
    for (const reward_id of selectedRewards) {
      const redeemedReward = await redeemRaffle(id, reward_id);
      redeemedRewards.push(redeemedReward);
    }

    setLoading(false);
    if (redeemedRewards.length - numReceipts === 0) {
      history.push(`/lny-passport/${id}/tickets`);
    } else {
      fetchReceipts(id);
    }
  };

  const handleTicketSelection = (e) => {
    e.preventDefault();
    const id = e.currentTarget.name;
    e.persist();

    setRewards((oldRewards) => {
      const newRewards = oldRewards.map((rew) => {
        if (rew.id.toString() === id && !rew.active) {
          return {
            ...rew,
            active: true,
            amount: rew.amount + 1,
          };
        }
        return rew;
      });

      return newRewards;
    });
  };

  const clearTickets = (e) => {
    setRewards((oldRewards) => {
      const newRewards = oldRewards.map((rew) => {
        if (rew.active) {
          return {
            ...rew,
            active: false,
            amount: rew.amount - 1,
          };
        }
        return rew;
      });

      return newRewards;
    });
  };

  const activeRewards = rewards.filter((rew) => rew.active === true);
  const ticketsLeft = numReceipts - selectedRewards.length;
  return (
    <Container>
      <Header>
        <Logo src={RaffleTicketCombo} alt="raffle-redemption" />
        <Title color="black">
          {ticketsLeft === 1
            ? t('passport.headers.oneRaffleTicketAvailable').toUpperCase()
            : t('passport.headers.raffleTicketAvailable', {
                amount: ticketsLeft,
              }).toUpperCase()}
        </Title>
        <SubText>{t('passport.labels.selectGiveawayBasket')}</SubText>
        {activeRewards.length > 0 ? (
          <BasketDetails className="button--filled" onClick={clearTickets}>
            {t('passport.placeholders.clearSelection')}
          </BasketDetails>
        ) : (
          <LNYLink
            className="button--filled"
            href="https://www.sendchinatownlove.com/lny-crawl.html#giveaways"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('passport.placeholders.giveawayDetails')}
          </LNYLink>
        )}
      </Header>
      <TicketsContainer>
        {rewards &&
          rewards.map((reward) => (
            <TicketCard
              active={reward.active}
              name={reward.id}
              onClick={handleTicketSelection}
              key={reward.id}
              disabled={ticketsLeft === 0}
            >
              <TicketHeader>
                <TicketTopRow>
                  <TicketButton active={reward.active} />
                  <TicketTitle>{reward.name.toUpperCase()}</TicketTitle>
                  <TicketRewardAmount>{reward.amount}</TicketRewardAmount>
                </TicketTopRow>
                <SubText>
                  {`${t('passport.labels.totalValue')}: $${
                    reward.total_value / 100
                  }`.toUpperCase()}
                </SubText>
              </TicketHeader>
              <TicketImage src={reward.image_url} alt="reward-image-url" />
            </TicketCard>
          ))}
      </TicketsContainer>
      {activeRewards.length > 0 ? (
        <EnterRaffleContainer>
          <SubText>{t('passport.labels.ticketSelection')}</SubText>
          <EnterRaffleTicketButton
            className="button--red-filled"
            onClick={handleSubmission}
          >
            {loading ? (
              <Loader color="#ffffff" size="15px" />
            ) : (
              t('passport.placeholders.enterRaffle').toUpperCase()
            )}
          </EnterRaffleTicketButton>
        </EnterRaffleContainer>
      ) : (
        <CancelButton onClick={handleCancel}>
          {t('passport.placeholders.cancel').toUpperCase()}
        </CancelButton>
      )}
    </Container>
  );
};

export default Rewards;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Header = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  position: fixed;
  z-index: 100;
  height: 250px;

  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TicketsContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 250px;
  bottom: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TicketCard = styled.button<{
  active: Boolean;
}>`
  width: 80%;
  min-width: 200px;
  min-height: 400px;
  margin: 12px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;

  background: #ffffff;
  border: 1px solid ${(props) => (props.active ? '#A8192E' : '#FFFFFF')};
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;
const TicketHeader = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TicketTopRow = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex: space-between;
`;
const TicketButton = styled.div<{
  active: Boolean;
}>`
  width: 16px;
  height: 16px;
  border: 1px solid #c4c4c4;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#A8192E' : 'transparent')};
`;
const TicketTitle = styled(Title)`
  width: 80%;
  margin: 0 auto;
`;
const TicketRewardAmount = styled.div`
  width: 30px;
  height: 14px;
  border-radius: 8px;
  color: white;
  background: #dd678a;
`;
const TicketImage = styled.img`
  width: 100%;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-radius: 20px;
`;
const Logo = styled.img`
  width: 100px;
  height: 100px;
`;
const SubText = styled(Title)`
  font-size: 12px;
  font-weight: normal;
`;
const BasketDetails = styled(Button)`
  width: 300px;
  height: 40px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.15em;
`;
const EnterRaffleContainer = styled.div`
  z-index: 100;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  width: 100%;

  span {
    width: 300px;
  }

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 5.31%,
    #ffffff 22.65%
  );
  padding-top: 20px;
`;
const EnterRaffleTicketButton = styled(Button)`
  font-weight: bold;
  min-height: 40px;
`;
const CancelButton = styled(Button)`
  position: fixed;
  bottom: 0;
  z-index: 100;
  color: #a8192e;
  display: flex;
  justify-self: center;
  align-self: center;

  border: none;
  text-decoration: underline;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.15em;

  width: 100%;
  justify-content: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 3.31%,
    #ffffff 68.65%
  );
  padding: 30px 0 20px 0;
  margin: 0 auto;
`;

const LNYLink = styled.a`
  letter-spacing: 0.15em;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  margin: 10px auto;
`;
