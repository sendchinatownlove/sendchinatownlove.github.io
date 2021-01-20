import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Title, Button } from '../style';
import RaffleTicketCombo from '../Assets/RaffleTicketCombo.png';

// import { getPassportReceipts } from '../../../utilities/api/interactionManager';

interface Props {
  setCurrentScreenView: Function;
}

const Rewards = ({ setCurrentScreenView }: Props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();

  const [receipts, setReceipts] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [activeCard, setActiveCard] = useState(-1);

  const numRewards = Math.floor(receipts.length / 3);
  // const totalAmount = receipts.reduce((acc, curr) => {
  //   acc += curr.amount;
  //   return acc;
  // }, 0);

  const fetchRewards = async () => {
    try {
      // TODO: GET /Rewards
      const allRewards = [{
        id: 0,
        total_value: 5000,
        name: "Hype Beast Basket",
        image_url: null
      }, {
        id: 1,
        total_value: 5200,
        name: "Rest and Relax Basket",
        image_url: null
      }];
      setRewards(allRewards);
    } catch (err) {
      console.error('passport error: ' + err);
    }
  };

  const fetchReceipts = async () => {
    try {
      // TODO: GET /contacts/:contact_id/crawl_receipts
      // filter it so that the receipts must have a null sponsor_seller_id (that are uploaded but not redeeemed)
      const allReceipts = [{
        id: 0,
        participating_seller: 1,
        payment_intent: null,
        contact_id: 8,
        amount: 5000,
        receipt_url: "",
        redemption_id: null
      }, {
        id: 1,
        participating_seller: 1,
        payment_intent: null,
        contact_id: 8,
        amount: 5000,
        receipt_url: "",
        redemption_id: null
      }, {
        id: 2,
        participating_seller: 1,
        payment_intent: null,
        contact_id: 8,
        amount: 5000,
        receipt_url: "",
        redemption_id: null
      }];
      const availableReceipts = allReceipts.filter(
        (receipt) => receipt.redemption_id === null
      );
      setReceipts(availableReceipts);
    } catch (err) {
      console.error('passport error: ' + err);
    }
  };

  // const redeemReward = async (e) => {
  //   e.preventDefault();
  //   console.log('redeemReward');    
  // }

  // const changeReward = async (e) => {
  //   e.preventDefault();
  //   console.log('changeReward');
  // }

  const viewDetails = (e) => {
    e.preventDefault();
    console.log('add details');
  }

  useEffect(() => {
    history.push(`/passport/${id}/redeem`);
    fetchReceipts();
    fetchRewards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/passport/${id}/tickets`);
  }

  const selectCard = (e) => {
    
  }

  return (
    <Container>
      <Header>
        <Logo src={RaffleTicketCombo} alt="raffle-redemption" />
        <Title color="black">
          {numRewards === 1
            ? t('passport.headers.oneRaffleTicketAvailable').toUpperCase()
            : t('passport.headers.raffleTicketAvailable', {
                amount: numRewards,
              }).toUpperCase()}
        </Title>
        <SubText>{t('passport.labels.selectGiveawayBasket')}</SubText>
        <BasketDetails className="button--outlined" onClick={viewDetails}>
          {t('passport.placeholders.giveawayDetails')}
        </BasketDetails>
      </Header>
      <TicketsContainer>
      {rewards && rewards.map((reward) => (
        <TicketCard 
          active={reward.id === activeCard}
          onClick={e => {
            e.preventDefault();
            setActiveCard(reward.id);
          }}
        >
          <TicketHeader>
            <Title>
              {reward.name.toUpperCase()}
            </Title>
            <SubText>
              {`${t('passport.labels.totalValue')}: ${reward.total_value}`.toUpperCase()}
            </SubText>
          </TicketHeader>
          <TicketImage src={reward.image_url} alt="reward-image-url"/>
        </TicketCard>
      ))}
      </TicketsContainer>
      <CancelButton onClick={handleCancel}>
        {t('passport.placeholders.cancel').toUpperCase()}
      </CancelButton>
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
  margin-top: 30px;
  position: fixed:
  z-index: 100;
  height: 215px;

  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TicketsContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 50px;
  top: 250px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TicketCard = styled.div<{
  active: Boolean;
}>`
  width: 80%;
  min-width: 200px;
  margin: 12px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  background: #ffffff; 
  border: 1px solid ${props => props.active ? '#A8192E' : '#FFFFFF'};;
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
`
const TicketImage = styled.img`
  width: 100%;
  border: 1px solid #EAEAEA;
  box-sizing: border-box;
  border-radius: 20px;
`
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
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.15em;
`;
const CancelButton = styled(Button)`
  position: fixed;
  bottom: 0;
  z-index: 100;
  color: #A8192E;
  display: flex;
  justify-self: center;
  align-self: center;

  background: transparent;
  border: none;
  text-decoration: underline;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.15em;
`;