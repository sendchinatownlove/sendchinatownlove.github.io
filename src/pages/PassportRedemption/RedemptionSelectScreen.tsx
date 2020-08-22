import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, FinePrint } from './TrackScreen';

// TODO: DELETE --> DUMMY IMAGE DATA
import Image23 from './image-23.png';

interface Props {
  setCurrentScreenView: Function;
}

// TODO: Ask design --> do we want user to be able to unselect a reward?

const PassportSelected = ({ setCurrentScreenView }: Props) => {
  const [selectedReward, setSelectedReward] = useState({
    name: '',
    rewardType: '',
    address: '',
    logo: '',
  });

  // TODO(Athena): UPDATE THIS WITH THE ACTUAL STHUFF; dummy data for now
  const rewards = [
    {
      name: 'nom wah tea parlor',
      rewardType: '20% off meal',
      address: '13 Doyers St, New York, NY',
      logo: Image23,
    },
    {
      name: 'Hello Wah',
      rewardType: '20% off',
      address: 'chinatown',
      logo: Image23,
    },
    {
      name: 'World Wah',
      rewardType: '20% off',
      address: 'chinatown',
      logo: Image23,
    },
    {
      name: 'Bye Wah',
      rewardType: '20% off',
      address: 'chinatown',
      logo: Image23,
    },
    {
      name: 'Fetty Wah',
      rewardType: 'free sample',
      address: 'chinatown',
      logo: Image23,
    },
    {
      name: 'Taylwah Swift',
      rewardType: 'free album',
      address: 'chinatown',
      logo: Image23,
    },
    {
      name: 'A$AP Wah',
      rewardType: 'free bike',
      address: 'chinatown',
      logo: Image23,
    },
    {
      name: 'wahzaaap',
      rewardType: 'free taffy',
      address: 'chinatown',
      logo: Image23,
    },
  ];

  return (
    <Container>
      {/* TODO: replace with X number of rewards */}
      <Heading className="bold">1 REWARD AVAILABLE</Heading>
      {/* TODO: fix rewards to reflect whatever date should be */}
      <Heading>Rewards available until 9/15/2020</Heading>

      <RewardsContainer
        numRewards={rewards.length}
        selected={selectedReward.name ? true : false}
      >
        {rewards.map((reward) => {
          const { name, logo, rewardType, address } = reward;

          return (
            <SingleRewardContainer
              className={selectedReward.name === name ? 'selected' : ''}
              onClick={() =>
                setSelectedReward({ name, logo, rewardType, address })
              }
            >
              <input
                type="radio"
                checked={selectedReward.name === name}
                id={rewardType}
              />

              <SingleRewardInfo>
                <Text className="header">{rewardType}</Text>
                <img src={logo} alt="reward-logo" width="130px"></img>
                <Text>{name}</Text>
                <Text className="finePrint">{address}</Text>
              </SingleRewardInfo>
            </SingleRewardContainer>
          );
        })}
      </RewardsContainer>

      {!!selectedReward.name ? (
        <Footer>
          <FinePrint className="center bold red">
            When redeemed, you have 5 minutes to use your reward.
          </FinePrint>

          <Button
            value="redemption-selected-button"
            className="button--red-filled"
            disabled={!selectedReward}
            onClick={() => setCurrentScreenView(2)}
          >
            REEDEM NOW
          </Button>
        </Footer>
      ) : (
        <Footer>
          <FinePrint className="center bold">
            Select an offer and be ready to show this screen when you’re
            ordering.
          </FinePrint>

          {rewards.length <= 4 && (
            <Button
              // {/* TODO: Update return screen with the Passport screen when built out  */}
              className="linkButton"
              onClick={() => setCurrentScreenView(0)}
            >
              RETURN TO PASSPORT
            </Button>
          )}
        </Footer>
      )}
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

const Footer = styled.div`
  z-index: 2;
  display: grid;
  justify-items: center;
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
  line-height: 50%;

  &.header {
    font-size: 14px;
  }

  &.finePrint {
    font-weight: normal;
    line-height: 110%;
  }
`;
