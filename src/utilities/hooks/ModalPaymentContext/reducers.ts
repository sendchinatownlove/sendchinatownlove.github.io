import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
  SET_FEES_AMOUNT,
  SET_FEES,
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
        payload === modalPages.light_up_chinatown
      ) {
        return { ...state, modalView: payload, purchaseType: payload };
      }
      return { ...state, modalView: payload };

    case SET_AMOUNT:
      return { ...state, amount: payload };
    case SET_FEES_AMOUNT:
      return { ...state, feesAmount: payload };
    case SET_FEES:
      return { ...state, fees: payload };
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
