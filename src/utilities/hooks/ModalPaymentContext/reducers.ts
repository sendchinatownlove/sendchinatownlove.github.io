import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
  SET_CUSTOM_INPUT,
  CLOSE_MODAL,
  CLEAR_FORMS,
  SET_SELLER_DATA,
  UPDATE_SELLER_DATA,
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
        payload === modalPages.buy_meal
      ) {
        return { ...state, modalView: payload, purchaseType: payload };
      }
      return { ...state, modalView: payload };

    case SET_AMOUNT:
      return { ...state, amount: payload };
    case SET_CUSTOM_INPUT:
      return { ...state, customInput: payload };
    case SET_SELLER_DATA:
      return { ...state, sellerData: payload };
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
    case CLEAR_FORMS:
      return defaultState;
    default:
      return state;
  }
};
export default ModalPaymentReducer;
