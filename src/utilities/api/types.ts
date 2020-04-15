export type PaymentParams = {
  amount: number;
  currency: string;
  item_type: string;
  quantity: number;
  seller_id: string;
};

export type Address = {
  city: string;
  state: string;
  address1: string;
  address2: string;
  zip_code: number;
};

export type Seller = {
  addresses?: Address[];
  //TO DO: what is className doing
  className: '';
  cuisineName: string;
  // email: string;
  name: string;
  phoneNumber: string;
  //TO DO: why is this necessary here
  showPayModal?: boolean;
  summary: string;
  story: string;
  // zipCode: string;
};
