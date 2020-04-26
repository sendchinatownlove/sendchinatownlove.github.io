/**
 * Modal Payment STATE
 *
 * @typedef {Object} DefaultModalPaymentState
 * @property {number} amount - amount (in cents)
 * @property {boolean} customInput - if a user used the custom input
 * @property {boolean} close - modal for closing the payment modal
 * @property {number} modalView - view of current modal
 * @property {string} name - user's billing information
 * @property {string} email - user's billing information
 * @property {string} address - user's billing information
 * @property {string} city - user's billing information
 * @property {string} state - user's billing information
 * @property {string} zipCode - user's billing information
 *
 */

export type ModalPaymentState = {
  amount: string;
  customInput: boolean;
  modalView: number;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export const defaultState: ModalPaymentState = {
  amount: '',
  customInput: false,
  modalView: -1,
  name: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
};
