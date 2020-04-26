/**
 *
 * Modal Payment Context
 *
 *
 */

import React from 'react';
import { defaultState, billingInfoState } from './types';
import ModalPaymentReducer, { ModalBillingReducer, Action } from './reducers';

// MODAL PAYMENT CONTEXT
const ModalPaymentStateContext = React.createContext(defaultState);
const ModalPaymentDispatchContext = React.createContext(
  (() => null) as React.Dispatch<Action>
);

// MODAL BILLING CONTEXT
const ModalBillingStateContext = React.createContext(billingInfoState);
const ModalBillingDispatchContext = React.createContext(
  (() => null) as React.Dispatch<Action>
);


/**
 * Modal Payment Provider
 *
 * @param {node} children - return the react components that are the going to use the context
 * @return {node} The context that holds all state props/methods
 *
 */

//  MODAL PAYMENT PROVIDER
const ModalPaymentProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(ModalPaymentReducer, defaultState);

  return (
    <ModalPaymentStateContext.Provider value={state}>
      <ModalPaymentDispatchContext.Provider value={dispatch}>
        {props.children}
      </ModalPaymentDispatchContext.Provider>
    </ModalPaymentStateContext.Provider>
  );
};

// MODAL BILLING PROVIDER
const ModalBillingInfoProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(
    ModalBillingReducer,
    billingInfoState
  );

  return (
    <ModalBillingStateContext.Provider value={state}>
      <ModalBillingDispatchContext.Provider value={dispatch}>
        {props.children}
      </ModalBillingDispatchContext.Provider>
    </ModalBillingStateContext.Provider>
  );
};

// MODAL PAYMENT STATE & DISPATCH
function useModalPaymentState() {
  const context = React.useContext(ModalPaymentStateContext);
  if (context === undefined) {
    throw new Error('useModalPaymentState must be used within a CountProvider');
  }
  return context;
}
function useModalPaymentDispatch() {
  const context = React.useContext(ModalPaymentDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useModalPaymentDispatch must be used within a CountProvider'
    );
  }
  return context;
}

// MODAL BILLING STATE & DISPATCH
function useModalBillingState() {
  const context = React.useContext(ModalBillingStateContext);
  if (context === undefined) {
    throw new Error('useModalBillingState must be used within a CountProvider');
  }
  return context;
}

function useModalBillingDispatch() {
  const context = React.useContext(ModalBillingDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useModalBillingDispatch must be used within a CountProvider'
    );
  }
  return context;
}

export {
  ModalPaymentProvider,
  useModalPaymentDispatch,
  useModalPaymentState,
  ModalBillingInfoProvider,
  useModalBillingState,
  useModalBillingDispatch,
};
