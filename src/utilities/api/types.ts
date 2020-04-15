export type PaymentParams = {
  amount: number;
  currency: string;
  item_type: string;
  quantity: number;
  seller_id: string;
};

export type Address = {
  address1: string;
  address2: string;
  city: string;
  phone_number: string;
  state: string;
  zip_code: number;
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
}

export type Seller = {
  addresses?: Address[];
  cuisineName: string;
  email?: string;
  name: string;
  summary: string;
  story: string;
};
