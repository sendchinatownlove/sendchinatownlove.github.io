import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

import ModalPayment from '../ModalPayment';

interface Props {
    merchant: string;
    option: string;
    className?: string;
    handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    hideBillModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
    showBillModal: boolean;
    donatedAmt: number;
}

interface State {
  name: string
  email: string
  address: string
  city: string
  state: string 
  zipcode: string
  showPayModal: boolean
}

const ModalPaymentBox: any = ModalPayment;

class ModalBilling extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
        name: "",
        email: "", 
        address: "",
        city: "",
        state: "", 
        zipcode: "",
        showPayModal: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.showPaymentModal = this.showPaymentModal.bind(this);
    this.hidePaymentModal = this.hidePaymentModal.bind(this);
  }

  handleChange(e: any) {
    const changeInput = e.target.name;
    const input = e.target.value;
    this.setState({ [changeInput]: input} as Pick<State, keyof State>)
  }

  showPaymentModal() {
      this.setState({ showPayModal: true })
  }

  hidePaymentModal() {
      this.setState({showPayModal: false})
  }

  render() {
    return(
        <React.Fragment>
            <form id="billing-form" 
                    className={styles.billFormContainer}
                    style={{display: this.props.showBillModal ? "block" : "none" }}
            >
                <button
                    className={styles.closeBtn} 
                    onClick={this.props.handleClose}
                > 
                ×
                </button> 

                <h2>Complete your donation</h2>
                <p>Please add your payment information below</p>

                <div className={styles.billingsContainer}>
                    <h3>Billing Information</h3>
                    <label htmlFor="billing-info">Full name</label>
                    <input
                        name="name"
                        type="text"
                        className={styles.label}
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.name}
                    /> 

                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        className={classnames(styles.label, styles.email)}
                        onChange={(e) => this.handleChange(e)}
                        value={ this.state.email }
                    />

                    <label htmlFor="address">Address</label> 
                    <input
                        name="address"
                        type="text"
                        className={classnames(styles.label, styles.address)}
                        onChange={(e) => this.handleChange(e)}
                        value={ this.state.address }
                    />

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <label htmlFor="City">City</label>
                            <input
                                name="city"
                                type="text"
                                className={classnames(styles.label, styles.city)}
                                onChange={(e) => this.handleChange(e)}
                                value={ this.state.city }
                            />
                        </div>

                        <div className={styles.column}>
                            <label htmlFor="State">State</label>
                            <input
                                name="state"
                                type="text"
                                className={classnames(styles.label, styles.state)}
                                onChange={(e) => this.handleChange(e)}
                                value={ this.state.state }
                            />
                        </div>

                        <div className={styles.column}>
                            <label htmlFor="zipcode">Zipcode</label>
                            <input
                                name="zipcode"
                                type="text"
                                className={classnames(styles.label, styles.zipcode)}
                                onChange={(e) => this.handleChange(e)}
                                value={ this.state.zipcode }
                            />
                        </div>
                    </div>

                    <div className={styles.btnRow}>
                        <button
                            type='button'
                            className={classnames(styles.backBtn)}
                            onClick={this.props.hideBillModal}
                        >
                        ᐸ Back
                        </button>

                        <button
                            type='button'
                            className={styles.nextBtn}
                            onClick={this.showPaymentModal}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </form>

            <ModalPaymentBox showPayModal={this.state.showPayModal} 
                                handleClose={this.props.handleClose} 
                                hidePaymentModal={this.hidePaymentModal}
                                donatedAmt={this.props.donatedAmt}
                                billingInfo={this.state} />
      </React.Fragment>
    );
  }
}

export default ModalBilling;

