/**
 *
 * Voucher Context
 *
 *
 */

import React from 'react';
import { defaultState } from './types';
import VoucherReducer, { Action } from './reducers';

// CONTEXT
const VoucherStateContext = React.createContext(defaultState);
const VoucherDispatchContext = React.createContext(
  (() => null) as React.Dispatch<Action>
);

/**
 * Voucher Provider
 *
 * @param {node} children - return the react components that are the going to use the context
 * @return {node} The context that holds all state props/methods
 *
 */

const VoucherProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(VoucherReducer, defaultState);

  return (
    <VoucherStateContext.Provider value={state}>
      <VoucherDispatchContext.Provider value={dispatch}>
        {props.children}
      </VoucherDispatchContext.Provider>
    </VoucherStateContext.Provider>
  );
};

function useVoucherState() {
  const context = React.useContext(VoucherStateContext);
  if (context === undefined) {
    throw new Error('useVoucherState must be used within a CountProvider');
  }
  return context;
}
function useVoucherDispatch() {
  const context = React.useContext(VoucherDispatchContext);
  if (context === undefined) {
    throw new Error('useVoucherDispatch must be used within a CountProvider');
  }
  return context;
}

export { VoucherProvider, useVoucherDispatch, useVoucherState };
