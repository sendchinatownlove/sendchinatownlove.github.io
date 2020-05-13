import React from 'react';
import { renderIntegration } from '../utilities/testing/render';
import SellerPage from '../components/SellerPage';

jest.mock('../utilities/api', () => {
  const shunfaBakeryResponse: any = {
    id: 35,
    seller_id: 'shunfa-bakery',
    cuisine_name: 'Bakery',
    name: 'Shunfa Bakery',
    story:
      'In the words of the owner Ping, “When Shunfa Bakery, a Chinese bakery in Brooklyn’s Chinatown, first opened in 2015, it was the result of the long journey of immigrants who worked hard to make a living on their own. It is the story of reclaiming one’s own path and taking charge—being one’s own boss after years of working long, back-breaking hours in various service jobs just to support themselves and their families.\n\nShunfa Bakery opened as a family establishment, and remains one to this day. Family was, and is still, the driver and key motivator in building this bakery from the ground up: family in the sense of children and parents, but also, family in the sense of the community. Shunfa Bakery has earned its place in Brooklyn’s nimble but strong Chinatown, serving Chinese comfort food, and hopes to continue to stay strong not just for business, but for our family.”',
    accept_donations: true,
    sell_gift_cards: true,
    owner_name: 'Shunfa Bakery',
    owner_image_url: 'assets/shunfa-bakery-logo.png',
    created_at: '2020-04-15T07:12:08.556Z',
    updated_at: '2020-04-25T20:06:37.041Z',
    target_amount: 1000000,
    summary: null,
    hero_image_url: 'assets/shunfa-bakery-hero.png',
    progress_bar_color: null,
    business_type: 'Family-owned',
    num_employees: 3,
    founded_year: 2015,
    website_url: null,
    menu_url: null,
    square_location_id: '3D0QAW4CSZJWZ',
    locations: [
      {
        id: 1,
        address1: '6221 Fort Hamilton Pkwy',
        address2: null,
        city: 'Brooklyn',
        state: 'NY',
        zip_code: '11219',
        seller_id: 35,
        created_at: '2020-04-15T07:14:16.501Z',
        updated_at: '2020-04-15T07:14:16.501Z',
        phone_number: '(718) 833-8884',
      },
    ],
    amount_raised: 93500,
  };

  return {
    ...jest.requireActual('../utilities/api'),
    getSeller: jest.fn(() => ({
      data: shunfaBakeryResponse,
    })),
  };
});

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: jest.fn(() => ({
      id: 'shunfa-bakery',
    })),
  };
});

describe('Seller Page', () => {
  test('should display SellerPage with succesful GET /seller request', async () => {
    const { findByTestId } = renderIntegration(
      '/shunfa-bakery',
      <SellerPage />
    );

    const StoryHeader = await findByTestId('Story Header');
    const OwnerPanel = await findByTestId('Owner Panel');
    const HeroBanner = await findByTestId('Hero Banner');
    const Footer = await findByTestId('Footer');
    const StoreInfo = await findByTestId('Store Info');

    expect(StoryHeader).toBeInTheDocument();
    expect(OwnerPanel).toBeInTheDocument();
    expect(HeroBanner).toBeInTheDocument();
    expect(Footer).toBeInTheDocument();
    expect(StoreInfo).toBeInTheDocument();
  });
});
