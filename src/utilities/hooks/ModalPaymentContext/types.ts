/**
 * Modal Payment STATE
 *
 * @typedef {Object} DefaultModalPaymentState
 * @property {number} amount - amount (in cents)
 * @property {boolean} customInput - if a user used the custom input
 * @property {boolean} close - modal for closing the payment modal
 * @property {number} modalView - expiration year
 *
 */

export type ModalPaymentState = {
  amount: string;
  customInput: boolean;
  modalView: number;
};

export const defaultState: ModalPaymentState = {
  amount: '',
  customInput: false,
  modalView: -1,
};

/**
 * Modal Billing STATE
 *
 * @typedef {Object} DefaultModalBillingState
 *
 */

export type ModalBillingState = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export const billingInfoState: ModalBillingState = {
  name: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};
