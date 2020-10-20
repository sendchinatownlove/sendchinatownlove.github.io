import * as ModalPaymentConstants from './constants';
import ModalPaymentStore from './context';
import ModalPaymentReducer from './reducers';
import * as ModalPaymentTypes from './types';

const [
  ModalPaymentProvider,
  useModalPaymentState,
  useModalPaymentDispatch,
] = ModalPaymentStore(ModalPaymentReducer, ModalPaymentTypes.defaultState);

export {
  ModalPaymentProvider,
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
  ModalPaymentTypes,
};
