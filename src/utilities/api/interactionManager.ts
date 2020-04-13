import React from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Merchant, PaymentParams } from './types';

// const genericHeader = {
//   headers: { 'Access-Control-Allow-Origin': '*' },
// };

export const getSellers = async () => {
  // TO DO, fix expected type response
  let response: any = undefined;

  // console.log('interactionManager.ts: ', { genericHeader });

  await axios
    .get('https://api.sendchinatownlove.com/sellers')
    .then((res) => {
      response = res;
    })
    .catch((err) => console.log);

  return response;
};

// TO DO: add typing for stripe elements
export const makePayment = async (
  stripe: any,
  elements: any,
  payment: PaymentParams,
  merchant: Merchant
) => {
  const { address, city, email, name, stateForm, zipCode } = merchant;

  // TO DO: abstract api call, create global object for headers
  await axios
    .post(
      'http://localhost:3001/charges',
      {
        line_items: [payment],
        merchant_id: 'hello-world',
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    )
    .then(async (res) => {
      if (!stripe || !elements) return;
      else {
        const cardElement = elements!.getElement(CardElement);
        const result = await stripe!.confirmCardPayment(
          `${res.data.client_secret}`,
          {
            payment_method: {
              card: cardElement!,
              billing_details: {
                name: name,
                email: email,
                address: {
                  city,
                  state: stateForm,
                  country: 'US',
                  postal_code: zipCode,
                  line1: address,
                },
              },
            },
          }
        );

        if (result.error) {
          console.log(result.error.message);
        } else {
          if (result.paymentIntent?.status === 'succeeded') {
            console.log(
              result.paymentIntent?.status,
              'The payment has been processed!'
            );
          }
        }
      }
    });
};
