import React from 'react';
import {
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
} from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
import { getWebsiteImages } from '../../../utilities/general/StoreImages';
import styled from 'styled-components';

type Props = {};

const SquareCardForm = (props: Props) => {
  const { squareLogo } = getWebsiteImages();

  return (
    <>
      <SquareCardFieldset className="sq-fieldset">
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
      </SquareCardFieldset>

      <Row>
        <img src={squareLogo} alt="Powered by Square logo" width="30px" />
        Powered by Square
      </Row>
    </>
  );
};

export default SquareCardForm;

const SquareCardFieldset = styled.fieldset`
@media (min-width: 900px) {
  display: flex;
  justify-content: space-between
  flex-wrap: nowrap;
}
`;

const SquareCardRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100% !important;
  @media (min-width: 900px) {
    margin-left: 16px;
    min-width: 440px;
    width: 50% !important;
  }
`;

const SquareCardItem = styled.div`
  width: 30% !important;
`;

const Row = styled.div`
  font-family: 'Open Sans';
  font-size: 16px;
  color: #a5a9ad;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
`;
