import * as VoucherConstants from './constants';
import VoucherStore from './context';
import VoucherReducer from './reducers';
import * as VoucherTypes from './types';

const [VoucherProvider, useVoucherState, useVoucherDispatch] = VoucherStore(
  VoucherReducer,
  VoucherTypes.defaultState
);

export {
  VoucherProvider,
  useVoucherState,
  useVoucherDispatch,
  VoucherConstants,
  VoucherTypes,
};
