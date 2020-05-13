import { SET_VIEW, SET_AMOUNT, SET_VOUCHER_INFO } from './constants';
import { VoucherState } from './types';

export interface Action {
  type: string;
  payload: any;
}

const VoucherReducer = (state: VoucherState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_VIEW:
      return { ...state, view: payload };
    case SET_AMOUNT:
      return { ...state, amount: payload };
    case SET_VOUCHER_INFO:
      return { ...state, voucher: payload };
    default:
      return state;
  }
};
export default VoucherReducer;
