import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
  CLOSE_MODAL,
  CLEAR_FORMS,
  SET_SELLER_DATA,
  UPDATE_SELLER_DATA,
} from './constants';
import { defaultState, ModalPaymentState } from './types';

export interface Action {
  type: string;
  payload: any;
}

const ModalPaymentReducer = (state: ModalPaymentState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MODAL_VIEW:
      return { ...state, modalView: payload };
    case SET_AMOUNT:
      return { ...state, amount: payload };
    case SET_SELLER_DATA:
      return { ...state, sellerData: payload };
    case UPDATE_SELLER_DATA:
      return {
        ...state,
        sellerData: {
          ...state.sellerData,
          amount_raised: payload.amount_raised,
        },
      };
    case CLOSE_MODAL:
      return { ...state, modalView: -1, customInput: false, amount: '' };
    case CLEAR_FORMS:
      return defaultState;
    default:
      return state;
  }
};
export default ModalPaymentReducer;
