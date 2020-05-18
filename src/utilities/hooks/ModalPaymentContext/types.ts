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

import {
  BrowsePageSeller, 
} from '../../api/types';

export type ModalPaymentState = {
  amount: string;
  customInput: boolean;
  modalView: number;
  sellerData: BrowsePageSeller;
};

export const defaultState: ModalPaymentState = {
  amount: '',
  customInput: false,
  modalView: -1,
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
  }
};
