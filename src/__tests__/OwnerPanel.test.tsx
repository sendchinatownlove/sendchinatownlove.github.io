import React from 'react';
import { renderIntegration } from '../utilities/testing/render';
import OwnerPanel from '../components/OwnerPanel';
import { fireEvent } from '@testing-library/react';

const shunfaBakeryResponse: any = {
  id: 35,
  seller_id: 'shunfa-bakery',
  cuisine_name: 'Bakery',
  accept_donations: true,
  sell_gift_cards: true,
  owner_image_url:
    'https://storage.googleapis.com/sendchinatownlove-assets/public/assets/shunfa-bakery/shunfa-bakery-logo.png',
  created_at: '2020-04-15T07:12:08.556Z',
  updated_at: '2020-07-25T19:11:25.460Z',
  target_amount: 300000,
  hero_image_url:
    'https://storage.googleapis.com/sendchinatownlove-assets/public/assets/shunfa-bakery/shunfa-bakery-hero.png',
  progress_bar_color: null,
  num_employees: 3,
  founded_year: 2015,
  website_url: null,
  menu_url: null,
  square_location_id: 'E4R1NCMHG7B2Y',
  cost_per_meal: 500,
  gallery_image_urls: [
    'https://storage.googleapis.com/sendchinatownlove-assets/public/assets/nanbei-food/nanbei-food-gallery-1.png',
    'https://storage.googleapis.com/sendchinatownlove-assets/public/assets/nanbei-food/nanbei-food-gallery-2.png',
    'https://storage.googleapis.com/sendchinatownlove-assets/public/assets/nanbei-food/nanbei-food-gallery-3.png',
    'https://storage.googleapis.com/sendchinatownlove-assets/public/assets/nanbei-food/nanbei-food-gallery-4.png',
    'https://storage.googleapis.com/sendchinatownlove-assets/public/assets/nanbei-food/nanbei-food-gallery-5.png',
  ],
  logo_image_url:
    'https://storage.googleapis.com/sendchinatownlove-assets/public/assets/nanbei-food/nanbei-food-owner.png',
  non_profit_location_id: null,
  name: 'Shunfa Bakery',
  story:
    'In the words of the owner Ping, “When Shunfa Bakery, a Chinese bakery in Brooklyn’s Chinatown, first opened in 2015, it was the result of the long journey of immigrants who worked hard to make a living on their own. It is the story of reclaiming one’s own path and taking charge—being one’s own boss after years of working long, back-breaking hours in various service jobs just to support themselves and their families.\n\nShunfa Bakery opened as a family establishment, and remains one to this day. Family was, and is still, the driver and key motivator in building this bakery from the ground up: family in the sense of children and parents, but also, family in the sense of the community. Shunfa Bakery has earned its place in Brooklyn’s nimble but strong Chinatown, serving Chinese comfort food, and hopes to continue to stay strong not just for business, but for our family.”',
  owner_name: 'Shunfa Bakery',
  summary: null,
  business_type: null,
  distributor: {
    id: 1,
    email: 'dkrcjs7521@gmail.com',
    is_subscribed: true,
    name: 'Yong Su Lee',
    seller_id: 35,
  },
  locations: [
    {
      id: 1,
      address1: '6221 Fort Hamilton Pkwy',
      address2: null,
      city: 'New York',
      state: 'NY',
      zip_code: '11219',
      seller_id: 35,
      created_at: '2020-04-15T07:14:16.501Z',
      updated_at: '2020-06-30T01:19:57.465Z',
      phone_number: '(718) 833-8884',
    },
  ],
  fees: [],
  donation_amount: 296000,
  gift_card_amount: 91675,
  amount_raised: 387675,
  num_gift_cards: 120,
  num_donations: 67,
  num_contributions: 187,
};

describe('Owner Panel', () => {
  test('should display Owner Panel Display body values', async () => {
    const { getByText, getByAltText } = renderIntegration(
      '/shunfa-bakery',
      <OwnerPanel seller={shunfaBakeryResponse}/>
    );

    expect(getByText('Shunfa Bakery')).toBeInTheDocument();
    expect(getByAltText('Shunfa Bakery')).toBeInTheDocument();

    expect(getByText('$3,876 of $3,000')).toBeInTheDocument();
    expect(getByText('187')).toBeInTheDocument();
    expect(getByText('supporters')).toBeInTheDocument();

    expect(getByText('Employees:')).toBeInTheDocument();
    expect(getByText('Founded:')).toBeInTheDocument();
  });

  test('should show donation modal when donation button is created', async () => {
    const { getByRole, findByText } = renderIntegration(
      '/shunfa-bakery',
      <OwnerPanel seller={shunfaBakeryResponse}/>
    );

    const DonationButton = getByRole('button', {name: "Donation"});
    fireEvent.click(DonationButton);

    const DonationHeader = await findByText("Donation for Shunfa Bakery");
    expect(DonationHeader).toBeInTheDocument();
  });

  test('should show donation modal when donation button is created', async () => {
    const { getByRole, findByText } = renderIntegration(
      '/shunfa-bakery',
      <OwnerPanel seller={shunfaBakeryResponse}/>
    );

    const VoucherButton = getByRole('button', {name: "Voucher"});
    fireEvent.click(VoucherButton);

    const VoucherHeader = await findByText("Voucher for Shunfa Bakery");
    expect(VoucherHeader).toBeInTheDocument();
  });
});