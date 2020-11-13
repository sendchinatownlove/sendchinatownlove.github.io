import React, { FC } from 'react';
import FooterSR from './FooterSingleRedemption';
import styled from 'styled-components';
interface Props {
  name?: string;
  cn_name?: string;
  address1?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  voucher_code?: string;
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
        <Column>
          <VendorName>{`${cn_name} ${name}`}</VendorName>
          <span>{`${address1}`}</span>
          <span>{`${city}, ${state} ${zip_code}`}</span>
          <p>{`Expiration Date 有效期限: ${expiration_date}`}</p>
        </Column>
        <Column className="right">
          <Amount>{`$${value}`}</Amount>
          <span>Single-meal Voucher</span>
          <span>单餐礼品卡</span>
        </Column>
      </VoucherHeader>
      ​
      <VoucherBody>
        <Column className="bodyLeft">
          <span>VOUCHER CODE:</span>
          <span>餐券号码:</span>
          <VoucherCode>{`${voucher_code}`}</VoucherCode>
          <span>Show the Voucher Code when redeeming in person</span>
          <span>出示餐券号码以兑换餐</span>
        </Column>
        <VoucherBodySeparator>
          <span>OR</span>
          <span>或</span>
        </VoucherBodySeparator>
        <Column>
          <QRContainer>
            <img src={qr_url} alt="voucher QR code" />
          </QRContainer>
          <TextContainer>
            <span>Scan the QR code to redeem with your phone</span>
            <span>扫描 QR 码以兑换餐</span>
          </TextContainer>
        </Column>
      </VoucherBody>
      <FaqContainer>
        <TextContainer>
          <Bold>
            To redeem, the voucher must be printed and given to the merchant at
            time of redemption OR the QR code must be scanned with a phone.
            Voucher may only be used once for the entirety of the balance.
          </Bold>
          <p>
            {`By proceeding with your purchase, you understand that the voucher card is not redeemable for cash and can only be used at ${name}. All purchases are final. In the event that the merchant is no longer open at the time of redemption, Send Chinatown Love Inc. will not be able to refund your purchase. Vouchers may be redeemed before or on the date of expiration.`}
          </p>
        </TextContainer>
        <TextContainer>
          <Bold>
            兑换餐时，请列印本券交给商家，或使用手机扫描 QR
            码。此餐券只能单次使用, 不可找零。
          </Bold>
          <p>
            {`此餐券不可兑换为现金並只能用于${cn_name}。所有消费不得退换。若此商家在兑换时已经不再营业，献爱华埠 Send Chinatown Love 将不会退款。餐券可以通过 QR 码在有效期限之前或当日兑换。`}
          </p>
        </TextContainer>
        ​
      </FaqContainer>
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
  value: 20,
  expiration_date: '12/32/2020',
};

const SingleVoucher = styled.article`
  width: 50%;
  background-color: #faf4ea;
  padding-top: 26px;
  height: 600px;
  margin-right: 10px;
  @media print {
    width: 50%;
    border: 1px solid black;
    height: auto;
    overflow-y: visible;
  }
`;

const VoucherHeader = styled.header`
  width: 353px;
  height: 135px;
  background: white;
  border-radius: 10px;
  // -moz-box-shadow: 0 0 5px #dedede;
  // -webkit-box-shadow: 0 0 5px #dedede;
  box-shadow: 0 3px 5px #dedede;
  padding: 16px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  font-size: 12px;
`;

const Column = styled.div`
  width: 45%;
  height: 100%;
  &.bodyLeft {
    border-right: 1px dashed #959595;
  }
`;

const VendorName = styled.h1`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
`;

const VoucherBody = styled.div`
  width: 353px;
  height: 126px;
  display: flex;
  margin: 0 auto 20px auto;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 10px;
`;

const VoucherCode = styled.h1`
  line-height: 166%;
  font-size: 28px;
`;

const VoucherBodySeparator = styled.div`
  top: 0;
  position: absolute;
  height: 146px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const QRContainer = styled.div`
  width: 78px;
  height: 73px;
  background: black;
`;

const FaqContainer = styled.div`
  background: white;
  width: 100%;
  min-height: 45%;
  margin: auto;
  font-size: 10px;
  padding: 18px 28px;
`;
const TextContainer = styled.div`
  max-width: 510px;
  font-size: 11px;
  margin: 0 auto 25px auto;
`;
const Bold = styled.p`
  font-weight: bold;
`;
const Amount = styled.h1`
  color: #a8192e;
`;

SingleVoucher.displayName = 'Voucher';
VoucherHeader.displayName = 'Voucher Header';
VoucherBody.displayName = 'Voucher Body';
FaqContainer.displayName = 'Faq Container';
