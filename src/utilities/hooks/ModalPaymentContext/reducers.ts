import { ModalPaymentTypes } from '.';
import {
  SET_MODAL_VIEW,
  SET_PAYMENT_STATE,
  SET_AMOUNT,
  SET_FEES_AMOUNT,
  SET_FEES,
  SET_REFERRER,
  CLOSE_MODAL,
  CLEAR_FORMS,
  SET_SELLER_DATA,
  UPDATE_SELLER_DATA,
  SET_LUC_DATA,
  CLEAR_ADDRESS,
} from './constants';
import { defaultState, ModalPaymentState, modalPages } from './types';

export interface Action {
  type: string;
  payload: any;
}

const ModalPaymentReducer = (state: ModalPaymentState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MODAL_VIEW:
      if (
        payload === modalPages.donation ||
        payload === modalPages.gift_card ||
        payload === modalPages.buy_meal ||
        payload === modalPages.light_up_chinatown ||
        payload === modalPages.mega_gam
      ) {
        return { ...state, modalView: payload, purchaseType: payload };
      }
      return { ...state, modalView: payload };

    case SET_PAYMENT_STATE:
      if (state.modalView === ModalPaymentTypes.modalPages.mega_gam) {
        return { ...state, campaignState: payload.campaign };
      }
      return { ...state };

    case SET_AMOUNT:
      if (state.modalView === ModalPaymentTypes.modalPages.mega_gam) {
        return {
          ...state,
          amount: payload.amount,
          matchAmount: payload.matchAmount,
        };
      } else {
        return { ...state, amount: payload };
      }
    case SET_FEES_AMOUNT:
      return { ...state, feesAmount: payload };
    case SET_FEES:
      return { ...state, fees: payload };
    case SET_SELLER_DATA:
      return { ...state, sellerData: payload };
    case SET_REFERRER:
      return { ...state, referrer: payload };
    case UPDATE_SELLER_DATA:
      return {
        ...state,
        sellerData: {
          ...state.sellerData,
          amount_raised: payload,
        },
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalView: null,
        customInput: false,
        amount: defaultState.amount,
        purchaseType: null,
      };
    case SET_LUC_DATA:
      return {
        ...state,
        lucData: {
          ...state.lucData,
          [payload.key]: payload.value,
        },
      };
    case CLEAR_FORMS:
      return defaultState;
    case CLEAR_ADDRESS:
      return {
        ...state,
        lucData: {
          ...state.lucData,
          fullName: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
        },
      };
    default:
      return state;
  }
};
export default ModalPaymentReducer;
