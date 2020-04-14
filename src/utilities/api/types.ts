export type PaymentParams = {
  amount: number;
  currency: string;
  item_type: string;
  quantity: number;
  seller_id: string;
};

export type Merchant = {
  name: string;
  email: string;
  address: string;
  city: string;
  stateForm: string;
  zipCode: string;
  showPayModal: boolean;
};
