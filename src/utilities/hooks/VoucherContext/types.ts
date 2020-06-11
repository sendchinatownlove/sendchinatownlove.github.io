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
  created_at: string;
  expiration: string;
  gift_card_id: string;
  id: number;
  item_id: number;
  receipt_id: string;
  recipient_id: number;
  seller_gift_card_id: string;
  updated_at: string;
  ownerName: string;
  ownerImage: string;
  storeImage: string;
  sellerID: string;
  locations: Array<number | null>;
  single_use: boolean;
};
export type VoucherState = {
  amount: number;
  view: number;
  voucher: VoucherDetails;
};

export const defaultState: VoucherState = {
  amount: 0,
  view: 0,
  voucher: {
    amount: 0,
    created_at: '',
    expiration: '',
    gift_card_id: '',
    id: -1,
    item_id: -1,
    receipt_id: '',
    recipient_id: -1,
    seller_gift_card_id: '',
    updated_at: '',
    ownerName: '',
    ownerImage: '',
    storeImage: '',
    sellerID: '',
    locations: [],
    single_use: false,
  },
};
