import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

import {
  useModalPaymentDispatch,
  useModalBillingState, 
  useModalBillingDispatch
} from '../../utilities/hooks/ModalPaymentContext/context';

import {
  SET_MODAL_VIEW,
  CLOSE_MODAL,
  SET_NAME,
  SET_EMAIL, 
  SET_ADDRESS, 
  SET_CITY, 
  SET_STATE, 
  SET_ZIPCODE,
} from '../../utilities/hooks/ModalPaymentContext/constants';

interface Props {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
}

export const ModalBilling = (props: Props) => {
  const { name, email, address, city, state, zipCode } = useModalBillingState();
  const dispatchBillingInfo = useModalBillingDispatch();
  const dispatch = useModalPaymentDispatch();

  const handleChange = (action: string, value: string) => {
    dispatchBillingInfo({ type: action, payload: value });
    console.log(name)
    console.log(value)
    console.log(action)
  };

  const openModal = (e: any) => {
    e.preventDefault();
    dispatch({ type: SET_MODAL_VIEW, payload: 2 });
  };

  const closeModal = (e: any) => {
    e.preventDefault();
    console.log('getting here!')
    dispatch({ type: CLOSE_MODAL, payload: undefined });
  };

  return (
    <form
      className={classnames(styles.billingsContainer, 'modalForm--form')}
    >
      <div>
        <button className={'closeButton--close'} onClick={closeModal}>
          ×
        </button>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor='name'>Name</label>
        <input
          name='name'
          type="text"
          className={'modalInput--input'}
          onChange={(e) => handleChange(SET_NAME, e.target.value)}
          value={name}
        />
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type="text"
          className={'modalInput--input'}
          onChange={(e) => handleChange(SET_EMAIL, e.target.value)}
          value={email}
        />
        <label htmlFor='address'>Address</label>
        <input
          name='address'
          type="text"
          className={'modalInput--input'}
          onChange={(e) => handleChange(SET_ADDRESS, e.target.value)}
          value={address}
        />
        <label htmlFor='city'>City</label>
        <input
          name='city'
          type="text"
          className={'modalInput--input'}
          onChange={(e) => handleChange(SET_CITY, e.target.value)}
          value={city}
        />
        <label htmlFor='state'>State</label>
        <input
          name='state'
          type="text"
          className={'modalInput--input'}
          onChange={(e) => handleChange(SET_STATE, e.target.value)}
          value={state}
        />
        <label htmlFor='zipCode'>Zip Code</label>
        <input
          name='zipCode'
          type="text"
          className={'modalInput--input'}
          onChange={(e) => handleChange(SET_ZIPCODE, e.target.value)}
          value={zipCode}
        />
    
      </div>

      <div className={styles.btnRow}> 
        <button
          type="button"
          className={classnames('modalButton--back', styles.backBtn)}
          onClick={() => dispatch({ type: SET_MODAL_VIEW, payload: 0 })}
        >
          ᐸ Back
        </button>
        <button
          type="button"
          className={classnames(styles.nextBtn, 'modalButton--filled')}
          onClick={openModal}
          // disabled={}
        >
          Next
        </button>
      </div>

    </form>
  );
};

export default ModalBilling;
