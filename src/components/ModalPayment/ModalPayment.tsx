import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import ModalConfirmation from '../ModalConfirmation';

interface Props {
    merchant: string;
    option: string;
    className?: string;
    handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    hidePaymentModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
    showPayModal: boolean;
    donatedAmt: number;
    billingInfo: object; //props to send to stripe backend
}

interface State {
  number: string
  expiryDate: string
  securityCode: string
  showConfirmModal: boolean
}

const ModalConfirmBox: any = ModalConfirmation

class ModalPayment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      number: "",
      expiryDate: "", 
      securityCode: "",
      showConfirmModal: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.showConfirmationModal = this.showConfirmationModal.bind(this);
  }

  handleChange(e: any) {
    const changeInput = e.target.name;
    const input = e.target.value;
    this.setState({ [changeInput]: input} as Pick<State, keyof State>)
  }

  showConfirmationModal() {
    this.setState({showConfirmModal: true})
  }

  render() {
    return(
      <React.Fragment>
        <form id="payment-form" 
              className={styles.container}
              style={{display: this.props.showPayModal ? "block" : "none" }} >
            <button
              className={styles.closeBtn} 
              onClick={this.props.handleClose}> ×
            </button> 

          <h2>Complete your donation</h2>
          <p>Please add your payment information below</p>

          <div className={styles.paymentContainer}>
              <h3>Payment Information</h3>
              <label htmlFor="card-info">Card number</label>
              <input
                  name="name"
                  type="text"
                  className={styles.cardLabel}
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.number}
              /> 

              <div className={styles.row}>
                  <div className={styles.column}>
                      <label htmlFor="expiryDate">Expiry date</label>
                      <input
                          name="expiryDate"
                          type="text"
                          className={styles.label}
                          onChange={(e) => this.handleChange(e)}
                          value={this.state.expiryDate}
                      />
                  </div>

                  <div className={styles.column}>
                      <label htmlFor="securityCode">Security code</label> 
                      <input
                          name="securityCode"
                          type="text"
                          className={styles.label}
                          onChange={(e) => this.handleChange(e)}
                          value={this.state.securityCode}
                      />
                  </div>
              </div>
              <br/>
              <h3>Donation details</h3>
              {/* pass in props here for name */}
              <span>Donate <b>${this.props.donatedAmt}</b> to Shufna Bakery</span> <p />

              <div className={styles.row}>
                  <input type="checkbox" 
                        name="checkbox" 
                        className={styles.checkbox} 
                        value="Agree" />
                  <label htmlFor="checkbox">I agree with the <b>Terms & Conditions</b></label>
              </div>

              <p>Given the unpredictable nature of current market conditions, in the event that the merchant runs out of business, gift cards will be treated as a donation to the merchant.</p>

              <div className={styles.btnRow}>
                  <button
                      type='button'
                      className={classnames(styles.backBtn)}
                      onClick={this.props.hidePaymentModal}
                  >ᐸ Back
                  </button>

                  <button
                      type='button'
                      className={styles.nextBtn}
                      onClick={this.showConfirmationModal}
                  >Confirm
                  </button>
              </div>
          </div>
        </form>
        <ModalConfirmBox showConfirmModal={this.state.showConfirmModal} />
      </React.Fragment>
    );
  }
}

export default ModalPayment;

