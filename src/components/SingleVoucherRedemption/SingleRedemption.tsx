import React, { FC } from 'react';
import FooterSR from './FooterSingleRedemption';
import styled from 'styled-components';
import {
  Faq,
  VoucherMerchant,
  VoucherAmount,
  VoucherQr,
  VoucherSeparator,
  VoucherCode,
} from './';

interface Props {
  name?: string;
  cn_name?: string;
  address1?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  voucher_code: string;
  value?: number;
  qr_url?: string;
  expiration_date?: string | Date;
  distributor_image?: string;
}
const SingleRedemption: FC<Props> = ({
  name,
  cn_name,
  address1,
  city,
  state,
  zip_code,
  voucher_code,
  value,
  qr_url,
  expiration_date,
  distributor_image,
}) => {
  return (
    <SingleVoucher>
      <VoucherHeader>
        <VoucherMerchant
          address1={address1}
          name={name}
          cnName={cn_name}
          zipCode={zip_code}
          state={state}
          expirationDate={expiration_date}
          city={city}
        />
        <VoucherAmount value={value} />
      </VoucherHeader>
      ​
      <VoucherBody>
        <VoucherCode voucherCode={voucher_code} />
        <VoucherSeparator />
        <VoucherQr qrUrl={qr_url} />
      </VoucherBody>
      <Faq cnName={cn_name} name={name} />
      <FooterSR distributorImage={distributor_image} />
    </SingleVoucher>
  );
};
export default SingleRedemption;

SingleRedemption.defaultProps = {
  name: 'Lanzhou Ramen',
  cn_name: '兰州拉面',
  voucher_code: 'AH2-TA',
  address1: '107 E Broadway',
  city: 'New York',
  state: 'NY',
  zip_code: '10002',
  qr_url: '',
  value: 2000,
  expiration_date: '12/32/2020',
};

const SingleVoucher = styled.article`
  width: 50%;
  max-width: 600px;
  background-color: #faf4ea;
  padding-top: 26px;
  height: 760px;
  &:first-child {
    border-right: 1px solid lightgrey;
  }
  @media print {
    padding-top: 36px;
    width: 50vw;
    height: 100vh;
    overflow-y: visible;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
`;

const VoucherHeader = styled.header`
  width: 83%;
  height: 30%;
  background: white;
  border-radius: 10px;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 21px 16px;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  font-size: 12px;
  @media print {
    font-size: 10px;
    height: 22vh;
  }
`;

const VoucherBody = styled.div`
  width: 83%;
  height: 180px;
  display: flex;
  margin: 0 auto 20px auto;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 10px;
  padding: 0 18px 0;
  @media print {
    height: 22vh;
  }
`;

// NOTE(wilsonj806): Uncomment for debugging
// SingleVoucher.displayName = 'Voucher';
// VoucherHeader.displayName = 'Voucher Header';
// VoucherBody.displayName = 'Voucher Body';
