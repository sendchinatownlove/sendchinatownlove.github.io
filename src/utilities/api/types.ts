export type PaymentParams = {
  amount: number;
  currency: string;
  item_type: string;
  quantity: number;
  seller_id: string;
};

export type SquarePaymentParams = {
  amount: number;
  currency: string;
  item_type: string;
  quantity: number;
};

export type Location = {
  seller_id: number;
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
  nonce?: string;
  idempotency_key?: string;
  is_subscribed: boolean;
  // address: string;
  // city: string;
  // stateForm: string;
  // zipCode: string;
  // showPayModal: boolean;
};

export type Seller = {
  locations?: Location[];
  cuisineName: string;
  email?: string;
  name: string;
  summary: string;
  story: string;
  hero_image_url: string;
};

export type BrowsePageSeller = {
  id: number;
  seller_id: string;
  cuisine_name: string;
  name: string;
  target_amount: number;
  amount_raised: number;
  num_contributions: number;
  num_donations: number;
  num_gift_cards: number;
  donation_amount: number;
  gift_card_amount: number;
  progress_bar_color: string;
  summary: string;
  story: string;
  accept_donations: boolean;
  sell_gift_cards: boolean;
  owner_name: string;
  owner_image_url: string;
  locations?: Location[];
  hero_image_url: string;
  business_type: string;
  num_employees: number;
  founded_year: number;
  website_url: string;
  menu_url: string;
  cost_per_meal: number;
};
