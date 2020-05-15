/**
 * Modal Payment STATE
 *
 * @typedef {Object} DefaultVoucherState
 * @property {number} amount - amount (in cents)
 * @property {number} view - view 
 *
 */

export type VoucherDetails = {
  amount: string;
};
export type VoucherState = {
  amount: string;
  view: number;
  voucher: VoucherDetails;
};

export const defaultState: VoucherState = {
  amount: '',
  view: -1,
  voucher: {
    amount: ""
  },
};
