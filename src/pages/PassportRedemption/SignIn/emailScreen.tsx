import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { ErrorMessage, SubTitle } from '../style';
import { Label, Column, InputField } from './index';
import { ModalPaymentConstants } from '../../../utilities/hooks/ModalPaymentContext';
import {
  getPassportEmailId,
  createPassportEmailId,
  getCrawlReceipts,
} from '../../../utilities/api/interactionManager';

const EmailScreen = () => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const viewPassportScreen = async (email) => {
    const { data } = await getPassportEmailId(email);

    if (!data) {
      setEmailError(t('passport.errors.noTickets'));
      setEmail('');
      return;
    } else {
      const Tickets = await getCrawlReceipts(data.id);

      if (Tickets.data.length) push(`/lny-passport/${data.id}/tickets`);
      else setEmailError(t('passport.errors.noTickets'));
      return;
    }
  };

  const viewUploadScreen = async (email) => {
    let { data } = await getPassportEmailId(email);

    if (!data) {
      const { data: newUser } = await createPassportEmailId(email);
      data = newUser;
    }
    push(`/lny-passport/${data.id}/upload`);
  };

  return (
    <Column>
      <SubTitle>{t('passport.labels.enterTicket')}</SubTitle>
      <Column />
      <Label htmlFor="email-input">{t('passport.labels.email')}</Label>
      <InputField
        name="email-input"
        type="email"
        onChange={(e) => {
          e.preventDefault();
          setEmail(e.target.value);
          setEmailError('');
        }}
        onBlur={(e) => {
          e.preventDefault();
          if (!!email && !ModalPaymentConstants.EMAIL_REGEX.test(email)) {
            setEmailError(t('passport.errors.validEmail'));
          }
        }}
        value={email}
        pattern={ModalPaymentConstants.EMAIL_REGEX.source}
      />
      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

      <Column className="center">
        <Button
          primary={true}
          disabled={!email || !ModalPaymentConstants.EMAIL_REGEX.test(email)}
          onClick={(e) => {
            e.preventDefault();
            viewUploadScreen(email);
          }}
        >
          Log Receipts
        </Button>
        <Button
          primary={false}
          disabled={!email || !ModalPaymentConstants.EMAIL_REGEX.test(email)}
          onClick={(e) => {
            e.preventDefault();
            viewPassportScreen(email);
          }}
        >
          View Passport
        </Button>
      </Column>
    </Column>
  );
};

export default EmailScreen;

export const Button = styled.button`
  background-color: ${(props: { primary: boolean }) =>
    props.primary ? 'black' : 'white'};
  color: ${(props: { primary: boolean }) =>
    props.primary ? 'white' : 'black'};
  font-weight: bold;
  border: 1px solid black;
  border-radius: 25px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  height: 45px;
  width: 267px;
  margin: 15px 0;
  cursor: pointer;
  outline: none;

  :hover {
    opacity: 0.7;
  }

  :disabled {
    border: 1px solid grey;
    background-color: ${(props: { primary: boolean }) =>
      props.primary ? 'grey' : 'white'};
    color: ${(props: { primary: boolean }) =>
      props.primary ? 'white' : 'grey'};
  }
`;
