/**
 *
 * Voucher Context
 *
 *
 */

import React from 'react';
import { Action } from './reducers';

type ProviderProps = {children: React.ReactNode}


export default function VoucherStore(reducer, initialState) {

  // CONTEXT
  const VoucherStateContext = React.createContext(initialState);
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

  const VoucherProvider = ({children}: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
      <VoucherDispatchContext.Provider value={dispatch}>
        <VoucherStateContext.Provider value={state}>
          {children}
        </VoucherStateContext.Provider>
      </VoucherDispatchContext.Provider>
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

  return [VoucherProvider, useVoucherState, useVoucherDispatch]
}