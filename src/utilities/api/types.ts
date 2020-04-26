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
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
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
  progress_bar_color: string;
  summary: string;
  story: string;
  accept_donations: boolean;
  sell_gift_cards: boolean;
  owner_name: string;
  owner_image_url: string;
  locations?: Location[];
};
