/**
 *
 * Modal Payment Context
 *
 * 
 */

import React from "react";
import { defaultState } from "./types"
import ModalPaymentReducer, {Action} from "./reducers"

// CONTEXT
const ModalPaymentStateContext = React.createContext(defaultState)
const ModalPaymentDispatchContext = React.createContext((() => null) as React.Dispatch<Action>)

/**
 * Modal Payment Provider 
 *  
 * @param {node} children - return the react components that are the going to use the context
 * @return {node} The context that holds all state props/methods
 *
 */
 
const ModalPaymentProvider = (props: any) => {
  const [state ,dispatch] = React.useReducer(ModalPaymentReducer,defaultState);

  return (
    <ModalPaymentStateContext.Provider value={state}>
      <ModalPaymentDispatchContext.Provider value={dispatch}>
        {props.children}
      </ModalPaymentDispatchContext.Provider>
    </ModalPaymentStateContext.Provider>
  )
}

function useModalPaymentState() {
  const context = React.useContext(ModalPaymentStateContext)
  if (context === undefined) {
    throw new Error('useModalPaymentState must be used within a CountProvider')
  }
  return context
}
function useModalPaymentDispatch() {
  const context = React.useContext(ModalPaymentDispatchContext)
  if (context === undefined) {
    throw new Error('useModalPaymentDispatch must be used within a CountProvider')
  }
  return context
}

export {
  ModalPaymentProvider,
  useModalPaymentDispatch,
  useModalPaymentState
}
