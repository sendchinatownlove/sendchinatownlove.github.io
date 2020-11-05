import React from 'react';
import FooterSR from './FooterSingleRedemption';
import styled from 'styled-components';
const SingleRedemption = () => {
  // const { beige_banner } = getWebsiteImages();
  return (
    <Container>
      <TopContainer>
        <Voucher>
          <Row>
            <Column>
              <h2>Melonpanna Tea & Shot</h2>
              <span>5105 7th Ave</span>
              <span>Brooklyn, NY 11220</span>
            </Column>
            <Column className="right">
              <span>Single-meal Voucher</span>
              <span>单餐礼品卡</span>
              <Amount>$20</Amount>
            </Column>
          </Row>
          <Button>
            <Column className="right button">
              <span>VOUCHER CODE:</span>
              <span>兑换码:</span>
            </Column>
            <h1>AH2-TA</h1>
          </Button>
        </Voucher>
      </TopContainer>
      ​
      <TextContainer>
        <Bold>
          To redeem, the voucher must be printed and given to the merchant at
          time of redemption. Voucher may only be used once for the entirety of
          the balance.
        </Bold>
        <p>
          Balance displayed in the voucher may or may not represent the final
          balance. Final balance information is subject to [Merchant]'s most
          recent records. By proceeding with your purchase, you understand that
          the voucher card is not redeemable for cash and can only be used at
          [Merchant]. All purchases are final. In the event that the merchant is
          no longer open at the time of redemption, Send Chinatown Love Inc.
          will not be able to refund your purchase.
        </p>
      </TextContainer>
      <TextContainer>
        <Bold>
          兑换时，请打印此兑换券并交给商家。此兑换券可能只可单次使用，不可找零。
        </Bold>
        <p>
          兑换券上的金额可能不代表最终可使用金额。最终可使用金额根据【商家】
          的消费记录决定。此兑换券不可兑换为现金且只能用于【商家】。
          所有消费不可退不可换。若此商家在兑换时已经不再营业， Send Chinatown
          Love 将不会退款。
        </p>
      </TextContainer>
      ​
      <FooterSR />
    </Container>
  );
};
export default SingleRedemption;
const Container = styled.div`
  width: 100%;
  background: #faf4ea;
`;
const TopContainer = styled.div`
  display: grid;
  grid-template-rows: minmax(0, 200px) minmax(0, 200px);
  height: 500px;
  justify-items: center;
`;

const Voucher = styled.div`
    grid-row: 2;
    z-index: 5;
​
    background-color: white;
    width: 535px;
    height: 270px;
    border-radius: 25px;
    padding: 15px;
    -moz-box-shadow: 0 0 5px #dedede;
    -webkit-box-shadow: 0 0 5px #dedede;
    box-shadow: 0 3px 5px #dedede;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  ​ &.right {
    text-align: right;
  }
  ​ &.button {
    align-self: center;
  }
`;
const Button = styled.button`
  border: 1px solid #a8192e;
  display: flex;
  width: 340px;
  height: 90px;
  border-radius: 25px;
  background-color: white;
  outline: none;
  margin: auto;
  justify-content: space-evenly;
  align-items: center;
`;
const TextContainer = styled.div`
  max-width: 510px;
  font-size: 11px;
  margin: 25px auto;
`;
const Bold = styled.p`
  font-weight: bold;
`;
const Amount = styled.h1`
  color: #a8192e;
`;
