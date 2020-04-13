export type PaymentParams = {
  amount: number;
  currency: string;
  name: string;
  quantity: number;
  description: string;
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
