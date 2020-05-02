import * as React from 'react';
import styled from 'styled-components';

interface Props {
  totalDonations: number;
  totalVouchers: number;
}

const Container = styled.div`
  font-size: 13px;
`;

const Donations = styled.div`
  border-radius: 25px;
  height: 25px;
  z-index: 5;
  width: 100%;
  margin-bottom: 15px;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ContributionBar = ({ totalDonations, totalVouchers }: Props) => {
  const progressWidth = (raised: number, total: number) => {
    if (raised < total) return (raised / total) * 100;
    return 100;
  };

  return (
    <Container>
      <h4>Total Raised</h4>
      <Donations
        style={{
          background: `linear-gradient(-45deg, #dd678a ${progressWidth(
            totalDonations,
            totalDonations + totalVouchers
          )}%, #F6B917 0%)`,
        }}
      />
      <TextContainer>
        <span>
          VOUCHERS: <b>${totalVouchers}</b>
        </span>
        <span>
          DONATIONS: <b>${totalDonations}</b>
        </span>
      </TextContainer>
      <p>
        100% of all proceeds go to the businesses, and we cover the credit card
        processing fees.
      </p>
    </Container>
  );
};

export default ContributionBar;
