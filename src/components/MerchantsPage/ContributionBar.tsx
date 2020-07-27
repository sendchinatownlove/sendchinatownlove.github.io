import * as React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface Props {
  totalDonations: number;
  totalGiftCards: number;
}

const ContributionBar = ({ totalDonations, totalGiftCards }: Props) => {
  const { t } = useTranslation();

  const progressWidth = (raised: number, total: number) => {
    if (raised < total) return (raised / total) * 100;
    return 100;
  };

  return (
    <Container>
      <Heading>
        {t('contributionBar.header')}: $
        {Math.floor((totalDonations + totalGiftCards) / 100).toLocaleString()}
      </Heading>
      <Contributions
        style={{
          background: `linear-gradient(-45deg, #dd678a ${progressWidth(
            totalDonations,
            totalDonations + totalGiftCards
          )}%, #F6B917 0%)`,
        }}
      />
      <TextContainer>
        <span>
          {t('contributionBar.vouchers')}:{' '}
          <b>${(Math.floor(totalGiftCards) / 100).toLocaleString()}</b>
        </span>
        <span>
          {t('contributionBar.donations')}:{' '}
          <b>${(Math.floor(totalDonations) / 100).toLocaleString()}</b>
        </span>
      </TextContainer>
      <p>{t('contributionBar.footer')}</p>
    </Container>
  );
};

export default ContributionBar;

const Container = styled.div`
  font-size: 13px;
`;

const Contributions = styled.div`
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

const Heading = styled.div`
  font-size: 17px;
  font-weight: bold;
  margin: 15px 0;
`;
