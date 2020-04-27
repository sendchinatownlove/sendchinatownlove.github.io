import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
  CLOSE_MODAL,
  CLEAR_FORMS,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_EMAIL,
  SET_ADDRESS,
  SET_CITY,
  SET_STATE,
  SET_ZIPCODE,
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
    case CLOSE_MODAL:
      return defaultState;
    case CLEAR_FORMS:
      return defaultState;
    case SET_FIRST_NAME:
      return { ...state, firstName: payload };
    case SET_LAST_NAME:
      return { ...state, lastName: payload };
    case SET_EMAIL:
      return { ...state, email: payload };
    case SET_ADDRESS:
      return { ...state, address: payload };
    case SET_CITY:
      return { ...state, city: payload };
    case SET_STATE:
      return { ...state, state: payload };
    case SET_ZIPCODE:
      return { ...state, zipCode: payload };
    default:
      return state;
  }
};

export default ModalPaymentReducer;
