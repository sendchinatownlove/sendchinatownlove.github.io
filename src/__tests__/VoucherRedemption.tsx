import React from 'react';
import axios from 'axios';
import { renderIntegration } from '../utilities/testing/render';
import VoucherPage from '../pages/VoucherRedemption';
import { cleanup, fireEvent } from '@testing-library/react';
import {
  VoucherProvider,
  VoucherTypes,
} from '../utilities/hooks/VoucherContext';

jest.mock('../utilities/api/interactionManager', () => {
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

  const voucherResponse: any = {
    id: 4,
    seller_id: 'shunfa-bakery',
    item_type: null,
    created_at: '2020-07-19T23:15:00.544Z',
    updated_at: '2020-07-19T23:15:00.544Z',
    payment_intent_id: 4,
    refunded: false,
    purchaser_id: 1,
    gift_card_detail: {
      id: 1,
      gift_card_id: '123asdf',
      receipt_id: null,
      expiration: null,
      created_at: '2020-07-19T23:15:00.582Z',
      updated_at: '2020-07-19T23:15:00.582Z',
      item_id: 4,
      seller_gift_card_id: '123asdf',
      recipient_id: 1,
      single_use: false,
      amount: 2500,
    },
  };

  const voucherUpdateResponse: any = {
    id: 4,
    seller_id: 'shunfa-bakery',
    item_type: null,
    created_at: '2020-07-19T23:15:00.544Z',
    updated_at: '2020-07-19T23:15:00.544Z',
    payment_intent_id: 4,
    refunded: false,
    purchaser_id: 1,
    gift_card_detail: {
      id: 1,
      gift_card_id:
        'rphtgeghnxtenpficladyeaklccdkqmxldcshuodqpvaujlshfoxizldomrhpbje',
      receipt_id: null,
      expiration: null,
      created_at: '2020-07-19T23:15:00.582Z',
      updated_at: '2020-07-19T23:15:00.582Z',
      item_id: 4,
      seller_gift_card_id:
        'crlmuwcorvfwrhnzdfkdjkjhwwitqqwnhhelyahrctehykfustgvrbalipvwiaus',
      recipient_id: 1,
      single_use: false,
      amount: 300,
    },
  };

  return {
    ...jest.requireActual('../utilities/api/interactionManager'),
    getSeller: jest.fn(() => ({
      data: shunfaBakeryResponse,
    })),
    getVoucher: jest.fn(() => ({
      data: voucherResponse,
    })),
    updateVoucher: jest.fn(() => ({
      data: voucherUpdateResponse,
    })),
  };
});

beforeAll(() => {
  axios.defaults.adapter = require('axios/lib/adapters/http');
});

afterEach(() => cleanup());

const renderVoucher = () => (
  <VoucherProvider>
    <VoucherPage />
  </VoucherProvider>
);

describe('Voucher Page', () => {
  let providerValues = {};
  let VoucherProps = {};
  let VoucherDispatcher = jest.fn();
  beforeEach(() => {
    VoucherProps = VoucherTypes.defaultState;
    providerValues = {
      VoucherProps,
      VoucherDispatcher,
    };
  });

  test('should display VoucherPage with succesful GET /voucher request', async () => {
    const { findByText } = renderIntegration(
      '/voucher/123asdf',
      renderVoucher()
    );

    const HeaderLabel = await findByText(`Welcome to`, { exact: false });
    const Header = await findByText(`Shunfa Bakery`, { exact: false });
    const CardHeader = await findByText('Your available balance');
    const Amount = await findByText('$25.00');
    const CodeLabel = await findByText('Voucher Code', { exact: false });
    const Code = await findByText('123asdf', { exact: false });
    const NextButton = await findByText(
      'Click to begin redeeming your voucher'
    );

    expect(HeaderLabel).toBeInTheDocument();
    expect(Header).toBeInTheDocument();
    expect(CardHeader).toBeInTheDocument();
    expect(Amount).toBeInTheDocument();
    expect(CodeLabel).toBeInTheDocument();
    expect(Code).toBeInTheDocument();
    expect(NextButton).toBeInTheDocument();
  });

  test('should display VoucherPage Amount prompt when clicking "Click to being to being reddeming your voucher"', async () => {
    const { findByText, findAllByText } = renderIntegration(
      '/voucher/123asdf',
      renderVoucher(providerValues)
    );

    const NextButton = await findByText(
      'Click to begin redeeming your voucher'
    );

    fireEvent.click(NextButton);

    const Header = await findByText(`Shunfa Bakery`, { exact: false });
    const CurrentBalanceHeader = await findByText('Current balance');
    const Amount = await findAllByText('25.00', { exact: false });
    const Prompt = await findByText('How much are you spending today?');
    const Code = await findByText('123asdf', { exact: false });
    const CodeLabel = await findByText('Voucher Code', { exact: false });
    const Next = await findByText('Next', { exact: false });

    expect(CurrentBalanceHeader).toBeInTheDocument();
    expect(Header).toBeInTheDocument();
    expect(Prompt).toBeInTheDocument();
    expect(Amount.length).toBe(2);
    expect(CodeLabel).toBeInTheDocument();
    expect(Code).toBeInTheDocument();
    expect(Next).toBeInTheDocument();
  });

  test('should display VoucherPage Confirm prompt when clicking "Next"', async () => {
    const { findByText, findByPlaceholderText } = renderIntegration(
      '/voucher/123asdf',
      renderVoucher(providerValues)
    );

    const NextButton = await findByText(
      'Click to begin redeeming your voucher'
    );
    fireEvent.click(NextButton);

    const Input = await findByPlaceholderText(`0.00`, { exact: false });
    const Next = await findByText('Next', { exact: false });
    fireEvent.change(Input, { target: { value: 22 } });
    fireEvent.click(Next);

    const Header = await findByText(`Shunfa Bakery`, { exact: false });
    const PageHeader = await findByText('Complete Your Purchase');
    const VoucherBalance = await findByText('25.00', { exact: false });
    const RemainingBalance = await findByText('3.00', { exact: false });
    const RedemptionAmount = await findByText('22.00', { exact: false });
    const Code = await findByText('123asdf', { exact: false });
    const CodeLabel = await findByText('Voucher Code', { exact: false });
    const ButtonLabel = await findByText(
      'Please show your phone to the merchant cashier to confirm the purchase.',
      { exact: false }
    );
    const Next1 = await findByText('Next', { exact: false });

    expect(PageHeader).toBeInTheDocument();
    expect(Header).toBeInTheDocument();
    expect(VoucherBalance).toBeInTheDocument();
    expect(RemainingBalance).toBeInTheDocument();
    expect(RedemptionAmount).toBeInTheDocument();
    expect(CodeLabel).toBeInTheDocument();
    expect(ButtonLabel).toBeInTheDocument();
    expect(Code).toBeInTheDocument();
    expect(Next1).toBeInTheDocument();
  });

  test('should display VoucherPage Completed prompt', async () => {
    const { findByText, findByPlaceholderText } = renderIntegration(
      '/voucher/123asdf',
      renderVoucher(providerValues)
    );

    const NextButton = await findByText(
      'Click to begin redeeming your voucher'
    );
    fireEvent.click(NextButton);

    const Input = await findByPlaceholderText(`0.00`, { exact: false });
    const Next = await findByText('Next', { exact: false });
    fireEvent.change(Input, { target: { value: 22 } });
    fireEvent.click(Next);

    const Next1 = await findByText('Next', { exact: false });
    fireEvent.click(Next1);

    const PageHeader = await findByText('Redemption Complete');
    const RemainingBalance = await findByText('3.00', { exact: false });
    const ButtonLabel = await findByText(
      'Thank you for dining at Shunfa Bakery!'
    );

    expect(PageHeader).toBeInTheDocument();
    expect(RemainingBalance).toBeInTheDocument();
    expect(ButtonLabel).toBeInTheDocument();
  });
});
