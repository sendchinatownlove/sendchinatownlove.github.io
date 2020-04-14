import axios from 'axios';
import { CardElement } from '@stripe/react-stripe-js';
import { Merchant, PaymentParams } from './types';
import { charges, sellers, seller } from './endpoints';

export const getSellers = async () => {
  // TO DO, fix expected type response
  let response: any = undefined;

  await axios
    .get(sellers)
    .then((res) => {
      // TO DO: fix response to success
      response = res;
    })
    .catch((err) => {
      // TO DO: fix response to error
      console.log({ err });
    });

  return response;
};

export const getSeller = async () => {
  // TO DO, fix expected type response
  let response: any = undefined;

  await axios
    .get(seller)
    .then((res) => {
      // TO DO: fix response to success
      response = res;
    })
    .catch((err) => {
      // TO DO: fix response to error
      console.log({ err });
    });

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
      charges,
      {
        line_items: [payment],
        email: email,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    )
    .then(async (res) => {
      // TO DO: fix response to success
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

  // TO DO: fix response to error
};
