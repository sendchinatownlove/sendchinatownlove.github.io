/**
 * Modal Payment STATE
 *
 * @typedef {Object} DefaultVoucherState
 * @property {number} amount - amount (in cents)
 * @property {number} view - view 
 *
 */

export type VoucherState = {
  amount: string;
  view: number;
};

export const defaultState: VoucherState = {
  amount: '',
  view: -1,
};
