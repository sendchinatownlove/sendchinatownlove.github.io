import axios from 'axios';
import { CardElement } from '@stripe/react-stripe-js';
import { Buyer, PaymentParams, SquarePaymentParams } from './types';
import { charges, sellers, vouchers } from './endpoints';

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
  payment: SquarePaymentParams,
  buyer: Buyer
) => {
  const { email, name } = buyer;
  const idempotencyKey = buyer.idempotency_key;

  return await axios
    .post(
      charges,
      {
        is_square: true,
        nonce,
        line_items: [payment],
        email,
        name,
        seller_id: sellerId,
        idempotency_key: idempotencyKey,
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


// Fix return typing
export const getVoucher = async (id: string) => (
{
  "id": 191,
  "seller_id": 35,
  "item_type": "gift_card",
  "created_at": "2020-05-17T02:10:30.095Z",
  "updated_at": "2020-05-17T02:10:30.095Z",
  "payment_intent_id": 183,
  "refunded": false,
  "purchaser_id": 68,
  "gift_card_detail": {
    "id": 43,
    "gift_card_id": "4bf2565e-8b77-478a-9de3-9cc00a89b6da",
    "receipt_id": null,
    "expiration": "2021-05-17",
    "created_at": "2020-05-17T02:10:30.115Z",
    "updated_at": "2020-05-17T04:51:14.895Z",
    "item_id": 191,
    "seller_gift_card_id": "#UKO-TM",
    "recipient_id": 68,
    "amount": 5000
  }
}
)

  // axios
  //   .get(vouchers + id)
  //   .then((res) => res)
  //   .catch((err) => err);
