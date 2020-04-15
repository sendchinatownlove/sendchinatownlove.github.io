import * as React from 'react';
import classnames from 'classnames';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import styles from './styles.module.scss';
import ModalPayment from '../ModalPayment';
// TO DO: Fix relative paths
import { Seller as State } from '../../utilities/api';

const stripe_pk = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!;
const stripePromise = loadStripe(stripe_pk);

type Props = {
  purchaseType: string;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  hideBillModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showBillModal: boolean;
  donatedAmt: number;
};

const ModalPaymentBox: any = ModalPayment;

// TO DO: Fix type
class ModalBilling extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      address: '',
      email: '',
      className: '',
      cuisineName: '',
      name: '',
      showPayModal: false,
      summary: '',
      story: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.showPaymentModal = this.showPaymentModal.bind(this);
    this.hidePaymentModal = this.hidePaymentModal.bind(this);
  }

  handleChange(e: any) {
    const changeInput = e.target.name;
    const input = e.target.value;
    this.setState({ [changeInput]: input } as Pick<State, keyof State>);
  }

  showPaymentModal() {
    this.setState({ showPayModal: true });
  }

  hidePaymentModal() {
    this.setState({ showPayModal: false });
  }

  render() {
    return (
      <React.Fragment>
        <form
          id="billing-form"
          className={classnames(styles.billFormContainer, 'modalForm--form')}
          style={{ display: this.props.showBillModal ? 'block' : 'none' }}
        >
          <button
            className={'closeButton--close'}
            onClick={this.props.handleClose}
          >
            {' '}
            ×{' '}
          </button>

          <h2>
            Complete your{' '}
            {this.props.purchaseType === 'donation'
              ? 'donation'
              : 'gift card purchase'}
          </h2>
          <div className={styles.addSpacing}>
            Please add your payment information below
          </div>

          <div className={styles.billingsContainer}>
            <h3>Billing Information</h3>
            <label htmlFor="billing-info">Full name</label>
            <input
              name="name"
              type="text"
              className={classnames(styles.label, 'modalInput--input')}
              onChange={(e) => this.handleChange(e)}
              value={this.state.name}
            />

            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              className={classnames(
                styles.label,
                styles.email,
                'modalInput--input'
              )}
              onChange={(e) => this.handleChange(e)}
              value={this.state.email}
            />

            <label htmlFor="address">Address</label>
            <input
              name="address"
              type="text"
              className={classnames(
                styles.label,
                styles.address,
                'modalInput--input'
              )}
              onChange={(e) => this.handleChange(e)}
              value={this.state.address}
            />

            <div className={styles.row}>
              <div className={styles.column}>
                <label htmlFor="City">City</label>
                <input
                  name="city"
                  type="text"
                  className={classnames(
                    'modalInput--input',
                    styles.label,
                    styles.city
                  )}
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.city}
                />
              </div>

              <div className={styles.column}>
                <label htmlFor="State">State</label>
                <input
                  name="stateForm"
                  type="text"
                  className={classnames(
                    'modalInput--input',
                    styles.label,
                    styles.state
                  )}
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.stateForm}
                />
              </div>

              <div className={styles.column}>
                <label htmlFor="zipcode">Zipcode</label>
                <input
                  name="zipCode"
                  type="text"
                  className={classnames(
                    'modalInput--input',
                    styles.label,
                    styles.zipcode
                  )}
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.zipCode}
                />
              </div>
            </div>

            <div className={styles.btnRow}>
              <button
                type="button"
                className={classnames(styles.nextBtn, 'modalButton--back')}
                onClick={this.props.hideBillModal}
              >
                {' '}
                ᐸ Back
              </button>
              <button
                type="button"
                className={'modalButton--filled'}
                onClick={this.showPaymentModal}
              >
                {' '}
                Next
              </button>
            </div>
          </div>
        </form>

        <Elements stripe={stripePromise}>
          <ModalPaymentBox
            showPayModal={this.state.showPayModal}
            handleClose={this.props.handleClose}
            hidePaymentModal={this.hidePaymentModal}
            donatedAmt={this.props.donatedAmt}
            merchant={this.state}
            purchaseType={this.props.purchaseType}
          />
        </Elements>
      </React.Fragment>
    );
  }
}

export default ModalBilling;
