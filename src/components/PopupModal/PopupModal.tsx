import * as React from 'react';
import styles from './styles.module.scss';
import Popup from 'reactjs-popup';
import CheckoutForm from '../CheckoutForm';

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
        <div className={styles.header}>{ option === "Donate"? "Donation" : "Gift Card" }</div>
        <div className={styles.content}>
          <CheckoutForm merchant={merchant} option={option === "Donate"? "Donation" : "Gift Card"}/>
        </div>
      </div>
    )}
  </Popup>
);

export default PopupModal;
