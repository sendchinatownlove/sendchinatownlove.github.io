import React from 'react';
import {
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
} from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
import styled from 'styled-components';

type Props = {};

const SquareCardForm = (props: Props) => {
  return (
    <fieldset className="sq-fieldset">
      <CreditCardNumberInput />

      <SquareCardRow>
        <SquareCardItem>
          <CreditCardExpirationDateInput />
        </SquareCardItem>
        <SquareCardItem>
          <CreditCardCVVInput />
        </SquareCardItem>
        <SquareCardItem>
          <CreditCardPostalCodeInput />
        </SquareCardItem>
      </SquareCardRow>
    </fieldset>
  );
};

export default SquareCardForm;

const SquareCardRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100% !important;
`;

const SquareCardItem = styled.div`
  width: 30% !important;
`;
