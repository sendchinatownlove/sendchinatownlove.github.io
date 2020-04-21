
import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
  CLOSE_MODAL,
  CLEAR_FORMS
} from "./constants"
import { defaultState, ModalPaymentState } from "./types"

export interface Action {
  type: string,
  payload: any
}

const ModalPaymentReducer = (state: ModalPaymentState, action: Action) => {
  const {type, payload} = action;

  switch(type){
    case SET_MODAL_VIEW :
      return { ...state, modalView: payload};
    case SET_AMOUNT:
      return { ...state, amount: payload};
    case CLOSE_MODAL:
      return defaultState;
    case CLEAR_FORMS:
      return defaultState;
    default: 
      return state;
  }
}
export default ModalPaymentReducer;
