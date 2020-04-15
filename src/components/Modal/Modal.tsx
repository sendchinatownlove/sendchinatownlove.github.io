import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import ModalBilling from '../ModalBilling';

interface Props {
  purchaseType: string;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  show: boolean;
}

interface State {
  amount: number;
  customInput: boolean;
  close: boolean;
  next: boolean;
  showBillModal: boolean;
}

const ModalBillingBox: any = ModalBilling;

class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      amount: 0,
      customInput: false,
      close: false,
      next: false,
      showBillModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.showBillingsModal = this.showBillingsModal.bind(this);
    this.hideBillingsModal = this.hideBillingsModal.bind(this);
  }

  handleChange(e: any, customInput: any) {
    const input = e.target.value;
    customInput && Number(input)
      ? this.setState({ amount: input, customInput })
      : this.setState({ amount: input });
  }

  showBillingsModal() {
    this.setState({ showBillModal: true });
  }

  hideBillingsModal() {
    this.setState({ showBillModal: false });
  }

  render() {
    return (
      <form
        id="donation-form"
        className={classnames(styles.donationsContainer, 'modalForm--form')}
        style={{ display: this.props.show ? 'block' : 'none' }}
      >
        <button
          className={'closeButton--close'}
          onClick={this.props.handleClose}
        >
          {' '}
          ×{' '}
        </button>

        {/* Pass in props here for name */}
        <h2>Shunfa Bakery</h2>
        <p>Please select an amount</p>

        <div className={styles.amountContainer}>
          <label htmlFor="select-amount">Select an amount </label> <br />
          <div className={styles.selectAmtContainer}>
            <button
              type="button"
              className={'modalButton--outlined'}
              value="10"
              onClick={(e) => this.handleChange(e, false)}
            >
              {' '}
              $10
            </button>
            <button
              type="button"
              className={'modalButton--outlined'}
              value="25"
              onClick={(e) => this.handleChange(e, false)}
            >
              {' '}
              $25
            </button>
            <button
              type="button"
              className={'modalButton--outlined'}
              value="50"
              onClick={(e) => this.handleChange(e, false)}
            >
              {' '}
              $50
            </button>
            <button
              type="button"
              className={'modalButton--outlined'}
              value="100"
              onClick={(e) => this.handleChange(e, false)}
            >
              {' '}
              $100
            </button>
          </div>
          <label htmlFor="custom-amount">Or enter any amount </label> <br />
          <input
            name="custom-amount"
            type="number"
            className={classnames(styles.customAmt, 'modalInput--input')}
            onChange={(e) => this.handleChange(e, true)}
            value={this.state.customInput ? this.state.amount : ''}
            placeholder="$"
          />
        </div>

        <button
          type="button"
          className={classnames(styles.nextBtn, 'modalButton--filled')}
          onClick={this.showBillingsModal}
          disabled={this.state.amount === 0}
        >
          {' '}
          Next
        </button>

        <ModalBillingBox
          showBillModal={this.state.showBillModal}
          hideBillModal={this.hideBillingsModal}
          donatedAmt={this.state.amount}
          purchaseType={this.props.purchaseType}
        />
      </form>
    );
  }
}

export default Modal;
