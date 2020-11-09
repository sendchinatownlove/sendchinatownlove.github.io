/**
 * Modal Payment STATE
 *
 * @typedef {Object} DefaultModalPaymentState
 * @property {number} amount - amount (in cents)
 * @property {number} feesAmount - amount of fees (in cents)
 * @property {FeeParams[]} fees - fee params used to calculate feesAmount
 * @property {boolean} customInput - if a user used the custom input
 * @property {boolean} close - modal for closing the payment modal
 * @property {number} modalView - expiration year
 *
 */

import { BrowsePageSeller, FeeParams } from '../../api/types';

export type ModalPaymentState = {
  amount: string; // @TODO: refactor amount to be type number
  feesAmount?: number;
  fees?: FeeParams[];
  customInput: boolean;
  purchaseType: modalPages | null;
  modalView: modalPages | null;
  sellerData: BrowsePageSeller;
};

export const defaultState: ModalPaymentState = {
  amount: '5',
  feesAmount: 0,
  fees: [],
  customInput: false,
  modalView: null,
  purchaseType: null,
  sellerData: {
    id: 0,
    seller_id: '',
    cuisine_name: '',
    name: '',
    target_amount: 0,
    amount_raised: 0,
    num_contributions: 0,
    num_donations: 0,
    num_gift_cards: 0,
    donation_amount: 0,
    gift_a_meal_amount: 0,
    gift_card_amount: 0,
    progress_bar_color: '',
    summary: '',
    story: '',
    accept_donations: true,
    sell_gift_cards: true,
    owner_name: '',
    owner_image_url: '',
    hero_image_url: '',
    business_type: '',
    num_employees: 0,
    founded_year: 0,
    website_url: '',
    menu_url: '',
    cost_per_meal: 0,
    gallery_image_urls: [],
    non_profit_location_id: '',
    logo_image_url: '',
  },
};

export enum modalPages {
  donation = 'donation',
  donation_pool = 'donation_pool',
  gift_card = 'gift_card',
  buy_meal = 'buy_meal',
  card_details = 'card_details',
  confirmation = 'confirmation',
}
