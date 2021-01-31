import React from 'react';
import { useTranslation } from 'react-i18next';

import { SubTitle, Button } from '../style';

export const NoRewardsFooter = () => {
  const { t } = useTranslation();

  return (
    <>
      <SubTitle bold="700">{t('passport.labels.moreTickets')}</SubTitle>

      <Button
        value="redemption-selected-button"
        className="button--red-filled"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = '/lny-passport';
        }}
      >
        {t('passport.placeholders.addNewReceipts').toLocaleUpperCase()}
      </Button>
    </>
  );
};

interface RedeemRewardsProps {
  id: number;
  access_token: string;
  selectedSponsor: null | any;
}

export const RedeemRewardsFooter = (props: RedeemRewardsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SubTitle bold="700"> {t('passport.labels.whenRedeemed')} </SubTitle>
      <Button
        value="redemption-selected-button"
        className="button--red-filled"
        disabled={!props.selectedSponsor}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `/lny-passport/${props.id}/redeem/${props.access_token}/sponsor/${props.selectedSponsor.id}`;
        }}
      >
        {t('passport.placeholders.redeemNow').toUpperCase()}
      </Button>
    </>
  );
};

interface defaultProps {
  allSponsors: any[];
  id: number;
}

export const DefaultFooter = (props: defaultProps) => {
  const { t } = useTranslation();
  return (
    <>
      <SubTitle bold="700"> {t('passport.labels.selectOffer')}</SubTitle>
      {props.allSponsors.length <= 4 && (
        <Button
          className="linkButton"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/lny-passport/${props.id}/tickets`;
          }}
        >
          {t('passport.placeholders.returnTo').toLocaleUpperCase()}
        </Button>
      )}
    </>
  );
};
