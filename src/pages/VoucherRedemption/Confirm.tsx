import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useVoucherState,
  useVoucherDispatch,
  VoucherConstants,
} from '../../utilities/hooks/VoucherContext';
import StoreBanner from './StoreBanner';
import {
  updateVoucher,
  getSeller,
} from '../../utilities/api/interactionManager';
import MoreInfo from './MoreInfo';
import Loader from '../../components/Loader';
import {
  ViewContainer,
  SubViewContainer,
  MainView,
  BackButton,
  Text,
  Footer,
  SubmitButton,
} from './style';
import { getLocationInfo } from '../../utilities/hooks/helpers';

interface Props {}

const Amount = (props: Props) => {
  const { amount, voucher } = useVoucherState(null);
  const dispatch = useVoucherDispatch(null);
  const [loading, setLoading] = useState(false);

  const setView = async (view) =>
    dispatch({ type: VoucherConstants.SET_VIEW, payload: view });

  const confirm = async (e) => {
    setLoading(true);

    try {
      const {
        data: { gift_card_detail, seller_id },
      } = await updateVoucher(
        voucher.gift_card_id,
        voucher.amount - amount * 100
      );
      const merchantData = await getSeller(seller_id);

      const newVoucher = {
        ...gift_card_detail,
        ownerName: merchantData.data.owner_name,
        ownerImage: merchantData.data.owner_image_url,
        storeImage: merchantData.data.hero_image_url,
        storeName: merchantData.data.name,
        sellerID: seller_id,
        location: getLocationInfo(merchantData),
      };

      dispatch({
        type: VoucherConstants.SET_VOUCHER_INFO,
        payload: newVoucher,
      });
      dispatch({
        type: VoucherConstants.SET_AMOUNT,
        payload: gift_card_detail.amount,
      });
      setLoading(false);
      setView(3);
    } catch (err) {
      console.log('error: ', err);
      setLoading(false);
    }
  };

  const backToAmount = (e) => setView(voucher.single_use ? 0 : 1);

  return (
    <Container>
      <MainView>
        <StoreBanner />
        <BackButton onClick={backToAmount}>BACK</BackButton>
        <Header>
          <HeaderText>
            {voucher.single_use
              ? 'Are you ready to redeem your voucher?'
              : 'Complete Your Purchase'}
          </HeaderText>
          <MoreInfo showShadow={true} inverted={true} marginLeft="45px" />
        </Header>
        <BalanceContainer>
          {!voucher.single_use ? (
            <BalanceRow>
              <Text>Voucher balance</Text>
              <Text>${(voucher.amount / 100).toFixed(2)}</Text>
            </BalanceRow>
          ) : (
            ''
          )}
          <BalanceRow>
            <Text>
              {voucher.single_use
                ? 'Single-use voucher balance'
                : 'Redemption Amount'}
            </Text>
            <Text>${(amount / 1).toFixed(2)}</Text>
          </BalanceRow>
          <Divider />
          {!voucher.single_use ? (
            <BalanceRow>
              <Text>Remaining balance</Text>
              <Text>${(voucher.amount / 100 - amount).toFixed(2)}</Text>
            </BalanceRow>
          ) : (
            <Disclaimer>
              <strong>Note:</strong> Any remaining balance will not be
              redeemable after this purchase
            </Disclaimer>
          )}
          <VoucherContainer>
            <Text>
              {' '}
              Voucher Code: &nbsp; <b>{voucher.seller_gift_card_id}</b>{' '}
            </Text>
          </VoucherContainer>
        </BalanceContainer>
      </MainView>
      <Footer>
        <DisclaimerText>
          Please show your phone to the merchant cashier to confirm the
          purchase.
        </DisclaimerText>
        <SubmitButton onClick={confirm}>
          {loading ? <Loader size="22px" /> : 'Next'}
        </SubmitButton>
      </Footer>
    </Container>
  );
};

export default Amount;

const Container = styled(ViewContainer)`
  min-height: 500px;
`;
const Header = styled(SubViewContainer)`
  flex-direction: row;
  font-weight: 600;
  font-size: 22px;
  min-height: 22px;
  line-height: 22px;
  justify-content: center;
`;
const HeaderText = styled(Text)`
  width: 50%;
`;
const BalanceContainer = styled(SubViewContainer)`
  min-height: 300px;
  justify-content: space-around;
  margin: 16px auto;
  margin-bottom: 24px;
  width: 100%;
`;
const BalanceRow = styled(SubViewContainer)`
  font-size: 18px;
  min-height: 25px;
  line-height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const VoucherContainer = styled.div`
  display: inline-flex;
  min-height: 30px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 8px;
  word-break: break-all;
  justify-content: center;
  margin: 16px auto;
  align-items: center;
  padding: 8px 16px;
  max-width: 80%;
`;
const Divider = styled.div`
  border-bottom: 2px solid #f7f7f7;
`;
const Disclaimer = styled(SubViewContainer)`
  width: 160px;
  min-height: 60px;
  margin: 0 auto;
  padding: 24px 0;
`;
const DisclaimerText = styled(SubViewContainer)`
  width: 75%;
  text-align: center;
  margin: 16px auto;
  color: #ab192e;
  font-weight: 600;
  font-size: 20px;
`;
