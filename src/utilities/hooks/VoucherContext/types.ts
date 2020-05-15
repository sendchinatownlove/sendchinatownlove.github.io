/**
 * Modal Payment STATE
 *
 * @typedef {Object} DefaultVoucherState
 * @property {number} amount - amount (in cents)
 * @property {number} view - view
 *
 */

export type VoucherDetails = {
  amount: number;
};
export type VoucherState = {
  amount: number;
  view: number;
  voucher: VoucherDetails;
};

export const defaultState: VoucherState = {
  amount: 0,
  view: -1,
  voucher: {
    amount: 0,
  },
};
