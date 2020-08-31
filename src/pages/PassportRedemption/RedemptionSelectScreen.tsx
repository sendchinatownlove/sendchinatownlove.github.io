import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import {
  NoRewardsFooter,
  RedeemRewardsFooter,
  DefaultFooter,
} from './RedemptionFooters';
import { CardText } from './style';
import CircleLogo from './CircleLogo.png';

import {
  getPassportTickets,
  getAllSponsors,
  getLocationById,
} from '../../utilities/api/interactionManager';

interface Props {
  setCurrentScreenView: Function;
}

const PassportSelected = ({ setCurrentScreenView }: Props) => {
  const { id, access_token } = useParams();

  const [tickets, setTickets] = useState<any[]>([]);
  const numRewards = Math.floor(tickets.length / 3);

  const [allSponsors, setAllSponsors] = useState<any[]>([]);
  const [selectedSponsor, setSelectedSponsor] = useState({
    id: null,
    reward_cost: null,
  });

  const fetchTickets = async () => {
    try {
      const { data: allTickets } = await getPassportTickets(id);
      const availableTickets = allTickets.filter(
        (ticket) => ticket.sponsor_seller_id === null
      );
      setTickets(availableTickets);
    } catch (err) {
      console.error('passport error: ' + err);
    }
  };

  const fetchSponsors = async () => {
    try {
      const { data: allSponsors } = await getAllSponsors();
      const allSponsorsWithLocations = await Promise.all(
        allSponsors.map(async (sponsor) => {
          const { data: location } = await getLocationById(sponsor.location_id);
          return { ...sponsor, location: location };
        })
      );
      setAllSponsors(allSponsorsWithLocations);
    } catch (err) {
      console.error('passport error: ' + err);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchSponsors();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFooter = () => {
    if (numRewards === 0) return <NoRewardsFooter />;
    else if (!!selectedSponsor.id)
      return (
        <RedeemRewardsFooter
          id={id}
          access_token={access_token}
          selectedSponsor={selectedSponsor}
        />
      );
    else return <DefaultFooter allSponsors={allSponsors} id={id} />;
  };

  const vh = window.innerHeight * 0.01;
  console.log(vh)

  return (
    <Container vh={vh}>
      <Header numSponsors={allSponsors.length}>
        <Logo src={CircleLogo} alt="scl-log" />
        <Heading>
          {numRewards} REWARD{numRewards === 0 || numRewards > 1 ? 'S' : ''}{' '}
          AVAILABLE
        </Heading>
        <SubHeading>Rewards available until 9/30/2020</SubHeading>
      </Header>

      <RewardsContainer>
        {allSponsors.length > 0 &&
          allSponsors.map((sponsor: any) => {
            return (
              <SingleRewardContainer
                selected={selectedSponsor.id === sponsor.id}
                numRewards={numRewards}
                onClick={() => {
                  if (numRewards === 0) {
                    return;
                  }
                  if (selectedSponsor.id !== sponsor.id) {
                    setSelectedSponsor({
                      id: sponsor.id,
                      reward_cost: sponsor.reward_cost,
                    });
                  } else {
                    setSelectedSponsor({
                      id: null,
                      reward_cost: null,
                    });
                  }
                }}
              >
                {numRewards !== 0 && (
                  <input
                    type="radio"
                    checked={selectedSponsor.id === sponsor.id}
                    id={sponsor.reward}
                  />
                )}

                <SingleRewardInfo>
                  <div>
                    <CardText bold="700" size="14px">
                      {sponsor.reward}
                    </CardText>
                    <CardText bold="700" size="10px">
                      {sponsor.reward_detail}
                    </CardText>
                  </div>
                  <LogoImage src={sponsor.logo_url} alt="reward-logo" />
                  <CardText bold="700" size="10px">
                    {sponsor.name}
                  </CardText>
                  {sponsor && sponsor.location && (
                    <CardText size="10px">{sponsor.location.address1}</CardText>
                  )}
                </SingleRewardInfo>
              </SingleRewardContainer>
            );
          })}
        {allSponsors.length > 4 && <Buffer />}
      </RewardsContainer>

      <Footer numSponsors={allSponsors.length}>{handleFooter()}</Footer>
    </Container>
  );
};

export default PassportSelected;

const Container = styled.div<{
  vh: number;
}>`
  width: 375px;
  height: ${(props) => 100 * props.vh}px;
  margin: 0 auto;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div<{
  numSponsors: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: relative;

  ${(props) =>
    props.numSponsors > 4
      ? `    
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 90%;
        width: 100%;
        background-color: white;
        box-shadow: 0px 25px 27px 22px white;
      }
    `
      : ''}
`;

const Logo = styled.img`
  z-index: 10;
  width: 70px;
  height: 70px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 50%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Heading = styled.span`
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 10px;
  z-index: 2;
  font-weight: bold;
  font-size: 13px;
`;

const SubHeading = styled.span`
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 10px;
  z-index: 2;
`;

const Footer = styled.div<{
  numSponsors: number;
}>`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 20px;

  & > * {
    z-index: 2;
    padding: 10px;
  }

  ${(props) =>
    props.numSponsors > 4
      ? `  
      height: calc(min-content - 20px);
      postion: relative;
      background-color: white;
      box-shadow: 0px -10px 27px 20px white;
      z-index: 1;
    `
      : ''}
`;

const RewardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow-y: scroll;
  padding-top: 20px;
  padding-bottom: 30px;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const SingleRewardContainer = styled.button<{
  selected: boolean;
  numRewards: number;
}>`
  width: 160px;
  height: 220px;
  border: ${(props) =>
    props.selected ? '1px solid black' : '1px solid #e5e5e5'};
  box-shadow: ${(props) =>
    props.numRewards > 0 ? '0px 0px 10px rgba(0, 0, 0, 0.25)' : 'none'};
  background-color: white;
  padding: 5px 5px;
  box-sizing: border-box;
  margin: 8px;
  outline: none;
  border-radius: 5px;
  cursor: ${(props) => (props.numRewards > 0 ? 'pointer' : 'auto')};

  display: flex;
  flex-direction: column;
`;

const SingleRewardInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 130px;
  border-radius: 20px;
`;

const Buffer = styled.div`
  height: 50px;
  grid-column: 1 / span 2;
`;
