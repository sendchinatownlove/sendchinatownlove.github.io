import axios from 'axios'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { Merchant, PaymentParams } from './types'

export const makePayment = async (payment: PaymentParams, merchant: Merchant) => {
  const { address, city, email, stateForm, zipCode } = merchant
  const stripe = useStripe();
  const elements = useElements();

  await axios.post('http://localhost:3001/charges', {
        line_items: [payment],
        merchant_id: "hello-world"
      }, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      }).then(async (res) => {
          if (!stripe || !elements) return;
          else {
            const cardElement = elements!.getElement(CardElement);
            const result = await stripe!.confirmCardPayment(`${res.data.client_secret}`, {
              payment_method: {
                card: cardElement!,
                billing_details: {
                    name: name,
                    email: email,
                    address: {
                      city,
                      state: stateForm,
                      country: "US",
                      postal_code: zipCode,
                      line1: address
                    }
                },
              }
            });
  
            if (result.error) {
              console.log(result.error.message);
            } else {
                if (result.paymentIntent?.status === 'succeeded') {
                  console.log(result.paymentIntent?.status, 'The payment has been processed!')
                }
            }
          }
        })
}