import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface Props {
    merchant: string;
    option: string;
    className?: string;
    handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
    hideBillModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
    showBillModal: boolean;
}

interface State {
  name: string
  email: string
  address: string
  city: string
  state: string 
  zipcode: string
}

class ModalBilling extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      email: "", 
      address: "",
      city: "",
      state: "", 
      zipcode: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: any) {
    const changeInput = e.target.name;
    const input = e.target.value;
    this.setState({ [changeInput]: input} as Pick<State, keyof State>)
  }

  handleSubmit(e: any) {
    e.preventDefault();
  }

  render() {
    return(
      <form id="billing-form" 
            className={styles.container}
            style={{display: this.props.showBillModal ? "block" : "none" }}
      >
          <button
            className={styles.closeBtn} 
            onClick={this.props.handleClose}
          > 
          ×
          </button> 

        {/* Pass in props here for name */}
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
                type="text"
                className={styles.label}
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

            <div className={styles.addressBox}>
                <div className={styles.addressBoxSub}>
                    <label htmlFor="City">City</label>
                    <input
                        name="City"
                        type="text"
                        className={classnames(styles.label, styles.city)}
                        onChange={(e) => this.handleChange(e)}
                        value={ this.state.city }
                    />
                </div>

                <div className={styles.addressBoxSub}>
                    <label htmlFor="State">State</label>
                    <input
                        name="State"
                        type="text"
                        className={classnames(styles.label, styles.state)}
                        onChange={(e) => this.handleChange(e)}
                        value={ this.state.state }
                    />
                </div>

                <div className={styles.addressBoxSub}>
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
                >
                    Next
                </button>
            </div>
        </div>
      </form>
    );
  }
}

export default ModalBilling;

