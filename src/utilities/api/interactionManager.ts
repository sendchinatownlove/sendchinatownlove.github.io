import axios from 'axios';
// import { CardElement } from '@stripe/react-stripe-js';
// import { Buyer, PaymentParams } from './types';
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

// TODO(Bruce): add new api call for square 
export const makePayment = async () => {

  await axios
    .post(
      charges,
      {},
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    )
    .then(async (res) => {
      console.log(res)
      return res
    })
    .catch(err => err);
};

