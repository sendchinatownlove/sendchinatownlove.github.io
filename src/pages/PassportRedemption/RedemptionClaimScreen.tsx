import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InputContainer, Button, FinePrint } from './TrackScreen';

// TODO: DELETE --> DUMMY IMAGE DATA
import Image23 from './image-23.png';

interface Props {
  setCurrentScreenView: Function;
}

const PassportRedemptionClaim = ({ setCurrentScreenView }: Props) => {
  const [timeLeft, setTimeLeft] = useState(300000);

  // TODO(Olivia): remove later & reference real state
  const selected = {
    name: 'nom wah tea parlor',
    rewardType: '20% off meal',
    address: '13 Doyers St, New York, NY',
    logo: Image23,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);
    if (!timeLeft) markAsUsed();
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (time) => {
    const ms = time % 1000;
    time = (time - ms) / 1000;
    const sec = time % 60;
    time = (time - sec) / 60;
    const min = time % 60;

    const pad = (val) => `00${val}`.slice(-2);
    return `${pad(min)}:${pad(sec)}`;
  };

  // TODO(Olivia): rly marked as used when claimed; this will just redirect
  const markAsUsed = () => setCurrentScreenView(1);

  return (
    <Container>
      <Shadow>
        <InputContainer className="top shadow">
          <Content>
            <Text className="header">{selected.rewardType}</Text>
            <img src={Image23} alt="reward-logo" width="260px" />
            <br />
            <div>
              <Text className="">{selected.name}</Text>
              <Text className="finePrint">
                {selected.address.slice(0, selected.address.indexOf(','))}
              </Text>
              <Text className="finePrint">
                {selected.address.slice(selected.address.indexOf(',') + 2)}
              </Text>
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

      <Margin>
        <FinePrint className="center bold red">
          Please show this screen to the host when you are placing your order.
        </FinePrint>
        <Button
          value="redemption-selected-button"
          className="button--red-filled"
          onClick={() => setCurrentScreenView(1)}
        >
          MARK AS USED
        </Button>
      </Margin>
    </Container>
  );
};

export default PassportRedemptionClaim;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  margin-top: 30px;
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
  line-height: 75%;
  text-align: center;

  &.header {
    font-size: 30px;
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

const Margin = styled.div`
  margin: 20px;
`;
