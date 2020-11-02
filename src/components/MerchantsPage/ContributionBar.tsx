import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// We assume in this code that all amounts are > 0.
interface Props {
  donationsRaised: number;
  giftAMealAmountRaised: number;
  giftCardAmountRaised: number;
}

const percentage = (raised: number, total: number) => (raised / total) * 100;

const centsToDollars = (cents: number) =>
  Math.floor(cents / 100).toLocaleString();

const ContributionBar = ({
  donationsRaised,
  giftAMealAmountRaised,
  giftCardAmountRaised,
}: Props) => {
  const { t } = useTranslation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth < 641) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, [setIsSmallScreen]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const totalRaised = useMemo(
    () => donationsRaised + giftAMealAmountRaised + giftCardAmountRaised,
    [donationsRaised, giftAMealAmountRaised, giftCardAmountRaised]
  );

  const contributionBarProgress = useMemo(
    () => ({
      donationsRaised: percentage(donationsRaised, totalRaised),
      giftAMealAmountRaised: percentage(giftAMealAmountRaised, totalRaised),
      giftCardAmountRaised: percentage(giftCardAmountRaised, totalRaised),
    }),
    [donationsRaised, giftAMealAmountRaised, giftCardAmountRaised, totalRaised]
  );

  let textContainerStyle;
  let giftAMealStyle;
  if (isSmallScreen) {
    textContainerStyle = {
      flexDirection: 'column',
    };
  } else {
    giftAMealStyle = {
      position: 'absolute',
      right:
        contributionBarProgress.donationsRaised <= 50 &&
        `${Math.max(
          contributionBarProgress.donationsRaised +
            contributionBarProgress.giftAMealAmountRaised / 2,
          20
        )}%`,
      left:
        contributionBarProgress.donationsRaised > 50 &&
        `${Math.min(
          50 - contributionBarProgress.giftAMealAmountRaised / 2,
          80
        )}%`,
    };
  }

  return (
    <Container>
      <Heading>
        {t('contributionBar.header')}: ${centsToDollars(totalRaised)}
      </Heading>
      <Contributions
        style={{
          // Because we want the slash between donation types to be up/right, we need
          // to make the linear gradient -45deg. Because it's negative degrees,
          // our donations need to be in reverse order, which is why the donations
          // are defined first in the css, but appear last in the UI.
          // See the last paragraph in the section in this site for more info on why
          // we need to define some of the colors twice:
          // https://css-tricks.com/css3-gradients/#linear-gradient
          background: `linear-gradient(
            -45deg,
            #DD678A ${contributionBarProgress.donationsRaised}%,
            #E49155 ${contributionBarProgress.donationsRaised}%,
            #E49155 ${
              contributionBarProgress.giftAMealAmountRaised +
              contributionBarProgress.donationsRaised
            }%,
            #F6B917 ${
              contributionBarProgress.giftAMealAmountRaised +
              contributionBarProgress.donationsRaised
            }%,
            #F6B917 0%
          )`,
        }}
      />
      <TextContainer style={textContainerStyle}>
        <ContributionSpan>
          {t('contributionBar.vouchers')}:{' '}
          <b>${centsToDollars(giftCardAmountRaised)}</b>
        </ContributionSpan>
        <ContributionSpan style={giftAMealStyle}>
          {t('contributionBar.giftAMeal')}:{' '}
          <b>${centsToDollars(giftAMealAmountRaised)}</b>
        </ContributionSpan>
        <ContributionSpan>
          {t('contributionBar.donations')}:{' '}
          <b>${centsToDollars(donationsRaised)}</b>
        </ContributionSpan>
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

const ContributionSpan = styled.span`
  white-space: nowrap;
`;

const Heading = styled.div`
  font-size: 17px;
  font-weight: bold;
  margin: 15px 0;
`;
