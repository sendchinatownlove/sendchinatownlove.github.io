import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import confirmationPic from './chinatown-logo.png';

interface Props {
    merchant: string;
    option: string;
    className?: string;
    handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    showConfirmModal: boolean;
}

class ModalPayment extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
      <form id="payment-form" 
            className={classnames(styles.container, "modalForm--form")}
            style={{display: this.props.showConfirmModal ? "block" : "none" }}
      >
          <button
            className={"closeButton--close"}
            onClick={this.props.handleClose} > ×
          </button> 

        <h2>Complete your donation</h2>
        <p>We appreciate your support for small businesses - thank you!</p>

        <img 
            className={styles.image}
            src={confirmationPic}
            alt="Logo"
        />
        
        <button
            className={classnames(styles.finishBtn, "modalButton--filled")} 
            onClick={this.props.handleClose}
          > 
          Finish
        </button>
      </form>
    );
  }
}

export default ModalPayment;

