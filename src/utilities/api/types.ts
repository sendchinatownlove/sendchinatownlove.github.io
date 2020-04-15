export type PaymentParams = {
  amount: number;
  currency: string;
  item_type: string;
  quantity: number;
  seller_id: string;
};

export type Location = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip_code: number;
  phone_number: string;
};

export type Buyer = {
  name: string;
  email: string;
  address: string;
  city: string;
  stateForm: string;
  zipCode: string;
  showPayModal: boolean;

  //TO DO: what is className doing
  className: '';
};

export type Seller = {
  locations?: Location[];
  cuisineName: string;
  email?: string;
  name: string;
  summary: string;
  story: string;
};
