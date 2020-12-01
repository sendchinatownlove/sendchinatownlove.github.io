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

export type SquareLineItems = Array<SquarePaymentParams>;

export type FeeParams = {
  name: string;
  multiplier: number;
  flat_cost: number;
  active: boolean;
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

export type GiftCardDetails = {
  created_at: string;
  email: string;
  expiration: string | null;
  gift_card_id: string;
  /**
   * The latest gift card amount's created_at date. This denotes the last
   * time that the gift card was updated.
   */
  last_updated: string;
  latest_value: number;
  name: string | null;
  original_value: number;
  seller_gift_card_id: string;
  single_use: boolean;
  updated_at: string;
};

export type GiftCardAmounts = {
  value: number;
  gift_card_detail_id: string;
  created_at: string;
  updated_at: string;
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
  gift_a_meal_amount: number;
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
  gallery_image_urls: string[];
  non_profit_location_id: string;
  logo_image_url: string;
};

export type SellerDistributorPair = {
  distributor_id: number;
  distributor_image_url: string;
  distributor_name: string;
  seller_id: string;
  seller_image_url: string;
  seller_name: string;
};

export type Campaign = {
  active: boolean;
  amount_allocated: number;
  amount_raised: number;
  created_at: string;
  description: string;
  display_name: string;
  distributor_id: string;
  end_date: string;
  gallery_image_urls: string[];
  id: number;
  last_contribution: string;
  location_id: string;
  nonprofit_id: string;
  project_id: number;
  price_per_meal: number;
  seller_id: string;
  seller_distributor_pairs: SellerDistributorPair[];
  target_amount: number;
  updated_at: string;
  valid: boolean;
};
