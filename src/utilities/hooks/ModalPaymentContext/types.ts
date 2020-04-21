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
  amount: number;
  customInput: boolean;
  showModal: boolean;
  modalView: number;
}

export const defaultState: ModalPaymentState =  {
  amount: 0,
  customInput: false,
  showModal: false,
  modalView: 0
}