/**
 *
 * Modal Payment Context
 *
 *
 */

import React from 'react';
import { Action } from './reducers';

type ProviderProps = { children: React.ReactNode };

/**
 * Modal Payment Store
 *
 * Custom react hook that make Modal Payment State and Dispatch private within its own provider
 *
 * @param {function} reducer - reducer function that controls the change of state according to its dispatcher
 * @param {object} intialState - the intial state of our ModalPayment context
 * @return {node} The context that holds all state props/methods
 *
 */
export default function ModalPaymentStore(reducer, intialState) {
  // CONTEXT
  const ModalPaymentStateContext = React.createContext(intialState);
  const ModalPaymentDispatchContext = React.createContext(
    (() => null) as React.Dispatch<Action>
  );
  const [state, dispatch] = React.useReducer(reducer, intialState);

  /**
   * Modal Provider
   *
   * @param {node} children - return the react components that are the going to use the context
   * @return {node} The context that holds all state props/methods
   *
   */
  const ModalPaymentProvider = ({ children }: ProviderProps) => (
    <ModalPaymentStateContext.Provider value={state}>
      <ModalPaymentDispatchContext.Provider value={dispatch}>
        {children}
      </ModalPaymentDispatchContext.Provider>
    </ModalPaymentStateContext.Provider>
  );

  function useModalPaymentState() {
    const context = React.useContext(ModalPaymentStateContext);
    if (context === undefined) {
      throw new Error(
        'useModalPaymentState must be used within a ModalPaymentProvider'
      );
    }
    return context;
  }

  function useModalPaymentDispatch() {
    const context = React.useContext(ModalPaymentDispatchContext);
    if (context === undefined) {
      throw new Error(
        'useModalPaymentDispatch must be used within a ModalPaymentProvider'
      );
    }
    return context;
  }

  return [ModalPaymentProvider, useModalPaymentState, useModalPaymentDispatch];
}
