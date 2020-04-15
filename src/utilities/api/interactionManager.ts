import axios from 'axios';
import { CardElement } from '@stripe/react-stripe-js';
import { Seller, PaymentParams } from './types';
import { charges, sellers, seller } from './endpoints';

// Fix return typing
export const getSellers = async () =>
  axios
    .get(sellers)
    .then((res) => res)
    .catch((err) => err);

// Fix return typing
export const getSeller = async () =>
  axios
    .get(seller)
    .then((res) => res)
    .catch((err) => err);

// TO DO: add typing for stripe elements
export const makePayment = async (
  stripe: any,
  elements: any,
  payment: PaymentParams,
  seller: Seller
) => {
  // TO DO*: Fix after shape is finalized
  // const { address, city, email, name, stateForm, zipCode } = seller;

  // TO DO: abstract api call, create global object for headers
  await axios
    .post(
      charges,
      {
        line_items: [payment],
        // email: email,
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
              // billing_details: {
              //   name: name,
              //   email: email,
              //   address: {
              //     city,
              //     state: stateForm,
              //     country: 'US',
              //     postal_code: zipCode,
              //     line1: address,
              //   },
              // },
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
