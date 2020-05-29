import axios from 'axios';
import { CardElement } from '@stripe/react-stripe-js';
import { Buyer, PaymentParams, SquareLineItems } from './types';
import { charges, sellers } from './endpoints';

// Fix return typing
export const getSellers = async () =>
  axios
    .get(sellers)
    .then((res) => res)
    .catch((err) => err);

// Fix return typing
export const getSeller = async (id: string) =>
  axios
    .get(sellers + id)
    .then((res) => res)
    .catch((err) => err);

// TODO(ArtyEmsee): add typing for stripe elements
export const makePayment = async (
  stripe: any,
  elements: any,
  payment: PaymentParams,
  buyer: Buyer
) => {
  const { email, name } = buyer;

  // TODO(ArtyEmsee): abstract api call, create global object for headers
  await axios
    .post(
      charges,
      {
        is_square: false,
        line_items: [payment],
        email: email,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    )
    .then(async (res) => {
      // TODO(ArtyEmsee): fix response to success
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

  // TODO(ArtyEmsee): fix response to error
};

export const makeSquarePayment = async (
  nonce: string,
  sellerId: string,
  payment: SquareLineItems,
  buyer: Buyer,
  isDistribution: boolean
) => {
  const { email, name } = buyer;
  const idempotencyKey = buyer.idempotency_key;
  const isSubscribed = buyer.is_subscribed;

  return await axios
    .post(
      charges,
      {
        is_square: true,
        nonce,
        line_items: payment,
        email,
        name,
        seller_id: sellerId,
        idempotency_key: idempotencyKey,
        is_subscribed: isSubscribed,
        is_distribution: isDistribution,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    )
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};
