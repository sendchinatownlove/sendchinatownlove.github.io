import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { RowFormat, Subheader, LabelText, InputText } from '../styles';
import {
  LIGHT_UP_CHINATOWN_TIER_2_MIN,
  LIGHT_UP_CHINATOWN_TIER_3_MIN,
} from '../../../consts';

import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
} from '../../../utilities/hooks/ModalPaymentContext';

export const LanternForm = (props) => {
  const { t } = useTranslation();

  const { amount, lucData } = useModalPaymentState(null);
  const dispatch = useModalPaymentDispatch(null);

  const [showAddress, setShowAddress] = React.useState(false);

  const subHeader =
    amount >= LIGHT_UP_CHINATOWN_TIER_3_MIN
      ? 'paymentProcessing.amount.adopt_lantern_tier_3'
      : 'paymentProcessing.amount.adopt_lantern_tier_2';
  const subText =
    amount >= LIGHT_UP_CHINATOWN_TIER_3_MIN
      ? t('paymentProcessing.amount.tier_3_donation', {
          limit: LIGHT_UP_CHINATOWN_TIER_3_MIN,
        })
      : t('paymentProcessing.amount.tier_2_donation', {
          limit: LIGHT_UP_CHINATOWN_TIER_2_MIN,
        });

  const handleOnChange = (e) => {
    e.preventDefault();
    dispatch({
      type: ModalPaymentConstants.SET_LUC_DATA,
      payload: {
        key: e.target.name,
        value: e.target.value.toString(),
      },
    });
  };

  const shouldShowAddress = (e, bool) => {
    e.preventDefault();
    setShowAddress(bool);

    if (!bool) {
      dispatch({
        type: ModalPaymentConstants.CLEAR_ADDRESS,
        payload: null,
      });
    }
  };

  return (
    <AmountContainer>
      <Subheader>{t(subHeader)}</Subheader>
      <label>{t(subText)}</label>
      <br />
      <br />
      <label>{t('paymentProcessing.amount.personalize')}</label>
      <br />
      <br />
      <SingleRowFormat>
        <RowFormat width="38%">
          <LabelText htmlFor="first_name">
            {t('paymentProcessing.amount.labels.first_name')}
          </LabelText>
          <InputText
            name="firstName"
            type="text"
            className="modalInput--input"
            onChange={handleOnChange}
            placeholder={t('paymentProcessing.amount.place_holder.first_name')}
            value={lucData.firstName}
          />
        </RowFormat>
        <RowFormat width="20%" mobileWidth="30%">
          <LabelText htmlFor="middle_initial">
            {t('paymentProcessing.amount.labels.middle_initial')}
          </LabelText>
          <InputText
            name="middleInitial"
            type="text"
            className="modalInput--input"
            onChange={handleOnChange}
            placeholder={t(
              'paymentProcessing.amount.place_holder.middle_initial'
            )}
            value={lucData.middleInitial}
          />
        </RowFormat>
        <RowFormat width="38%">
          <LabelText htmlFor="last_name">
            {t('paymentProcessing.amount.labels.last_name')}
          </LabelText>
          <InputText
            name="lastName"
            type="text"
            className="modalInput--input"
            onChange={handleOnChange}
            placeholder={t('paymentProcessing.amount.place_holder.last_name')}
            value={lucData.lastName}
          />
        </RowFormat>
      </SingleRowFormat>

      {amount >= LIGHT_UP_CHINATOWN_TIER_3_MIN && (
        <>
          <label>
            <span>
              {' '}
              {t(
                'paymentProcessing.amount.light_up_chinatown_address.disclaimer_1'
              )}
              <strong>
                {' '}
                {t(
                  'paymentProcessing.amount.light_up_chinatown_address.address'
                )}
              </strong>{' '}
              {t(
                'paymentProcessing.amount.light_up_chinatown_address.disclaimer_2'
              )}
            </span>
          </label>
          <br />
          <br />

          <TextTrigger onClick={(e) => shouldShowAddress(e, true)}>
            {' '}
            {t(
              'paymentProcessing.amount.light_up_chinatown_address.address_button'
            )}
          </TextTrigger>
          <br />
          <br />

          {(showAddress || lucData.address !== '') && (
            <>
              <NameRow>
                <RowFormat width="65%" mobileWidth="100%">
                  <LabelText htmlFor="full_name">
                    {t('paymentProcessing.amount.labels.full_name')}
                  </LabelText>
                  <InputText
                    name="fullName"
                    type="text"
                    className="modalInput--input"
                    onChange={handleOnChange}
                    placeholder={t(
                      'paymentProcessing.amount.place_holder.full_name'
                    )}
                    value={lucData.fullName}
                  />
                </RowFormat>
                <TextTrigger onClick={(e) => shouldShowAddress(e, false)}>
                  {' '}
                  {t(
                    'paymentProcessing.amount.light_up_chinatown_address.cancel_address_button'
                  )}
                </TextTrigger>
              </NameRow>
              <RowFormat width="100%">
                <LabelText htmlFor="address">
                  {t('paymentProcessing.amount.labels.address')}
                </LabelText>
                <InputText
                  name="address"
                  type="text"
                  className="modalInput--input"
                  onChange={handleOnChange}
                  placeholder={t(
                    'paymentProcessing.amount.place_holder.address'
                  )}
                  value={lucData.address}
                />
              </RowFormat>
              <SingleRowFormat>
                <RowFormat width="47%" mobileWidth="100%">
                  <LabelText htmlFor="city">
                    {t('paymentProcessing.amount.labels.city')}
                  </LabelText>
                  <InputText
                    name="city"
                    type="text"
                    className="modalInput--input"
                    onChange={handleOnChange}
                    placeholder={t(
                      'paymentProcessing.amount.place_holder.city'
                    )}
                    value={lucData.city}
                  />
                </RowFormat>
                <StateZipRow width="50%" mobileWidth="100%">
                  <RowFormat width="47%" mobileWidth="47%">
                    <LabelText htmlFor="state">
                      {t('paymentProcessing.amount.labels.state')}
                    </LabelText>
                    <InputText
                      name="state"
                      type="text"
                      className="modalInput--input"
                      onChange={handleOnChange}
                      placeholder={t(
                        'paymentProcessing.amount.place_holder.state'
                      )}
                      value={lucData.state}
                    />
                  </RowFormat>
                  <RowFormat width="47%" mobileWidth="47%">
                    <LabelText htmlFor="zip_code">
                      {t('paymentProcessing.amount.labels.zip_code')}
                    </LabelText>
                    <InputText
                      name="zipCode"
                      type="text"
                      className="modalInput--input"
                      onChange={handleOnChange}
                      placeholder={t(
                        'paymentProcessing.amount.place_holder.zip_code'
                      )}
                      value={lucData.zipCode}
                    />
                  </RowFormat>
                </StateZipRow>
              </SingleRowFormat>
            </>
          )}
        </>
      )}
    </AmountContainer>
  );
};

export default LanternForm;

const AmountContainer = styled.div`
  background-color: #f7f7f7;
  padding: 25px 35px;
  margin-top: 30px;
`;

const SingleRowFormat = styled(RowFormat)`
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const TextTrigger = styled.button`
  background: transparent;
  border: none;
  color: #a8192e;
  text-decoration: underline;
  margin: 8px auto;
  text-align: left;
`;

const NameRow = styled(SingleRowFormat)`
  align-items: center;
  button {
    text-align: right;
  }

  @media only screen and (max-width: 800px) {
    button {
      width: 100%;
    }
    flex-direction: column-reverse;
  }
`;
const StateZipRow = styled(RowFormat)`
  flex-direction: row !important;
  justify-content: space-between;
`;
