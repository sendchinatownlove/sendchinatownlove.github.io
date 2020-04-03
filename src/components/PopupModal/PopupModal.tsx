import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import Popup from 'reactjs-popup';
import CheckoutForm, { CheckoutFormProps } from '../CheckoutForm';

export interface Props {
  merchant: string;
  option: string;
  className?: string;
}

const PopupModal: React.SFC<Props> = ({ merchant, option, className }) => (
  <Popup
    trigger={<button className={className}>{ option }</button>}
    position="top left" modal closeOnDocumentClick
  >
    {close => (
      <div className={styles.modal}>
        <div className={styles.header}>{ option }</div>
        <div className={styles.content}>
          <CheckoutForm merchant={merchant} option={option}/>
        </div>
      </div>
    )}
  </Popup>
);

export default PopupModal;
