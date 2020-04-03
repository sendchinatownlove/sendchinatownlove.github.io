import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import Stripe from 'stripe';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
  line_items: LineItem,
  merchant_id: string,
  formatted_value: string
}

const stripe = new Stripe('pk_test_5AByIibLOhR6WHL3Mwnmel3P00zm0pIDrD', {
  apiVersion: '2020-03-02',
});

class CheckoutForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      line_items: {
        amount: 0,
        currency: 'usd',
        name: this.props.option,
        quantity: 0,
        description: ''
      },
      merchant_id: this.props.merchant.toLowerCase().split(" ").join("_"),
      formatted_value: '' // for ease of creating the description
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const line_items = { ...this.state.line_items, [e.target.name]: Number(e.target.value) }
    this.setState({ line_items });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const line_items = this.state.line_items;
    line_items.description = `${this.state.formatted_value} ${this.props.option.toLowerCase()} for ${this.props.merchant}`;
    line_items.amount = line_items.amount * 100;

    axios.post('https://whispering-springs-34358.herokuapp.com/', {
      line_items: [line_items],
      merchant_id: this.state.merchant_id
    }, {
    	headers: {
    	  'Access-Control-Allow-Origin': '*',
      }
    })
    .then(res => console.log(res))
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Merchant
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={this.props.merchant} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Currency
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="USD" />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Amount
          </Form.Label>
          <Col sm="10">
            <NumberFormat className="form-control" placeholder="e.g. 50.00" decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} allowNegative={false} prefix={'$'} onValueChange={(values) => {
              const { formattedValue, value } = values
              const line_items = { ...this.state.line_items, amount: parseFloat(value) }
              this.setState({ line_items: line_items, formatted_value: formattedValue })
            }} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Quantity
          </Form.Label>
          <Col sm="10">
            <Form.Control name="quantity" as="select" value="Select quantity..." onChange={this.handleChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <button className={classnames(styles.button, "button--filled")} type="submit"> Checkout </button>
      </Form>
    );
  }
}

export default CheckoutForm;
