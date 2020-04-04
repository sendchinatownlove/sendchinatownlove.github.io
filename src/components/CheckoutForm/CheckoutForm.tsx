import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import Stripe from 'stripe';
import NumberFormat from 'react-number-format';
import axios from 'axios';

export interface Props {
  merchant: string,
  option: string
}

interface LineItem {
  amount: number,
  currency: string,
  name: string,
  quantity: number,
  description: string
}

interface State {
  lineItems: LineItem,
  merchantId: string,
  formattedValue: string
}

const stripe = new Stripe('pk_test_5AByIibLOhR6WHL3Mwnmel3P00zm0pIDrD', {
  apiVersion: '2020-03-02',
});

class CheckoutForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      lineItems: {
        amount: 0,
        currency: 'usd',
        name: this.props.option,
        quantity: 0,
        description: ''
      },
      merchantId: this.props.merchant.toLowerCase().split(" ").join("_"),
      formattedValue: '' // for ease of creating the description
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getCheckoutSession() {
    const lineItems = this.state.lineItems;
    lineItems.description = `${this.state.formattedValue} ${this.props.option.toLowerCase()} for ${this.props.merchant}`;
    lineItems.amount = lineItems.amount * 100;

    // should return stripe checkout session id once the endpoint is working
    return axios.post('https://whispering-springs-34358.herokuapp.com/', {
      line_items: [lineItems],
      merchant_id: this.state.merchantId
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
    .then(res => console.log(res)) //TODO: return checkout id
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const lineItems = { ...this.state.lineItems, [e.target.name]: Number(e.target.value) }
    this.setState({ lineItems });
  }

  handleValueChange(values: any) {
     const { formattedValue, value } = values
     const lineItems = { ...this.state.lineItems, amount: parseFloat(value) }
     this.setState({ lineItems: lineItems, formattedValue: formattedValue })
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(this.state);

    // use checkout session id to redirect user to stripe payment
    this.getCheckoutSession();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className={styles.formContainer}>
          <label>Merchant</label>
          <input type="text" className={styles.noOutline} value={this.props.merchant} readOnly />
          <label>Currency</label>
          <input type="text" className={styles.noOutline} value="USD" readOnly />
          <label>Amount</label>
          <NumberFormat className="form-control" placeholder="e.g. 50.00" decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} allowNegative={false} prefix={'$'} onValueChange={this.handleValueChange} />
          <label>Quantity</label>
          <select>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button className={classnames(styles.button, "button--filled")} type="submit"> Checkout </button>
      </form>
    );
  }
}

export default CheckoutForm;
