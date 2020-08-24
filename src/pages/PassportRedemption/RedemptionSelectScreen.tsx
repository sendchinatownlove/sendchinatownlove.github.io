import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import {
  NoRewardsFooter,
  RedeemRewardsFooter,
  DefaultFooter,
} from './RedemptionFooters';

import {
  getAllSponsors,
  getLocationById,
  redeemReward,
} from '../../utilities/api/interactionManager';

interface Props {
  setCurrentScreenView: Function;
}

// TODO: Ask design --> do we want user to be able to unselect a reward?
const PassportSelected = ({ setCurrentScreenView }: Props) => {
  const { id, access_token } = useParams();

  const [error, setError] = useState('');
  const [tickets, setTickets] = useState<any[]>([]);
  const numRewards = Math.floor(tickets.length / 3);
  const [allSponsors, setAllSponsors] = useState<any[]>([]);
  const [selectedSponsor, setSelectedSponsor] = useState({
    id: null,
    reward_cost: null,
  });

  const fetchData = async () => {
    try {
      const ticketsResponse = await getPassportTickets(id);
      const availableTickets = ticketsResponse.data.filter(
        (ticket) => ticket.sponsor_seller_id === null
      );
      setTickets(availableTickets);
      const allSponsorsResponse = await getAllSponsors();
      const allSponsorsWithLocations = await Promise.all(
        allSponsorsResponse.data.map(async (sponsor) => {
          const locationResponse = await getLocationById(sponsor.location_id);
          return { ...sponsor, location: locationResponse.data };
        })
      );
      setAllSponsors(allSponsorsWithLocations);
    } catch (err) {
      console.error('passport error: ' + err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRedemption = async () => {
    try {
      const ticketsToRedeem = tickets.slice(0, 3).map((ticket) => {
        return { id: ticket.id, sponsor_seller_id: selectedSponsor.id };
      });
      const redemptionResponse = await redeemReward(
        id,
        access_token,
        ticketsToRedeem
      );
      // TODO OS: so this isn't very secure, right? instead of route, should I just change view to RedemptionClaimScreen?
      if (redemptionResponse.status === 200) {
        window.location.href = `/passport/${id}/redeem/${access_token}/sponsor/${selectedSponsor.id}`;
      } else setError('Something went wrong! Please try again.');
    } catch (err) {
      console.error('passport error: ' + err);
    }
  };

  const handleFooter = () => {
    if (numRewards === 0)
      return <NoRewardsFooter setCurrentScreenView={setCurrentScreenView} />;
    else if (!!selectedSponsor.id)
      return (
        <RedeemRewardsFooter
          error={error}
          selectedSponsor={selectedSponsor}
          handleRedemption={handleRedemption}
        />
      );
    else return <DefaultFooter allSponsors={allSponsors} id={id} />;
  };

  return (
    <Container>
      <Heading className="bold">
        {numRewards} REWARD{numRewards === 0 || numRewards > 1 ? 'S' : ''}{' '}
        AVAILABLE
      </Heading>
      <Heading>Rewards available until 9/30/2020</Heading>

      <RewardsContainer
        numRewards={allSponsors.length}
        selected={selectedSponsor.id ? true : false}
      >
        {allSponsors.length > 0 &&
          allSponsors.map((sponsor: any) => {
            return (
              <SingleRewardContainer
                className={selectedSponsor.id === id ? 'selected' : ''}
                onClick={() => {
                  if (numRewards > 0)
                    setSelectedSponsor({
                      id: sponsor.id,
                      reward_cost: sponsor.reward_cost,
                    });
                }}
              >
                <input
                  type="radio"
                  checked={selectedSponsor.id === sponsor.id}
                  id={sponsor.reward}
                />

                <SingleRewardInfo>
                  <Text className="header">{sponsor.reward}</Text>
                  <img
                    src={sponsor.logo_url}
                    alt="reward-logo"
                    width="130px"
                  ></img>
                  <Text>{sponsor.name}</Text>
                  {sponsor && sponsor.location && (
                    <Text className="finePrint">
                      {sponsor.location.address1}
                    </Text>
                  )}
                </SingleRewardInfo>
              </SingleRewardContainer>
            );
          })}
      </RewardsContainer>

      {handleFooter()}
    </Container>
  );
};

export default PassportSelected;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  }
`;

const Heading = styled.span`
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 10px;
  z-index: 2;

  &.bold {
    font-weight: bold;
    font-size: 13px;
  }
`;

const RewardsContainer = styled.div<{
  numRewards: number;
  selected: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  max-height: ${(props) =>
    props.numRewards <= 4 || props.selected ? '500px' : '575px'};
  overflow-y: scroll;
  padding-top: 20px;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  &::before {
    content: '';
    display: ${(props) => (props.numRewards > 4 ? 'block' : 'none')};
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 25px 27px 22px white;
    width: 100%;
    height: 150px;
  }

  &::after {
    content: '';
    display: ${(props) => (props.numRewards > 4 ? 'block' : 'none')};
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px -25px 27px 22px white;
    width: 100%;
    height: ${(props) => (props.selected ? '200px' : '125px')};
  }
`;

const SingleRewardContainer = styled.button`
  width: 160px;
  height: 220px;
  border: 1px solid #e5e5e5;
  background-color: white;
  padding: 5px 5px;
  box-sizing: border-box;
  margin: 8px;
  outline: none;
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  &.selected {
    border: 1px solid black;
  }
`;

const SingleRewardInfo = styled.div`
  width: 100%;
  align-items: center;
`;

export const Text = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: bold;
  font-size: 10px;
  line-height: 100%;

  &.header {
    font-size: 14px;
  }

  &.finePrint {
    font-weight: normal;
    line-height: 110%;
  }
`;
