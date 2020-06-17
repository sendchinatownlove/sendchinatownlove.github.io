import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useVoucherState,
  useVoucherDispatch,
} from '../../utilities/hooks/VoucherContext/context';
import {
  SET_VIEW,
  SET_VOUCHER_INFO,
  SET_AMOUNT,
} from '../../utilities/hooks/VoucherContext/constants';
import {
  updateVoucher,
  getSeller,
} from '../../utilities/api/interactionManager';
import MoreInfo from './MoreInfo';
import Loader from '../../components/Loader';
import {
  AmountContainer,
  MessageContainer,
  Text,
  Footer,
  NextButton,
  Divider,
  Disclaimer,
  Bold,
  FlexFillSpace,
} from './styles';
import { getLocationInfo } from '../../utilities/hooks/helpers';

interface Props {}
interface ContainerProps {
  height?: string;
  bringToTheFront?: boolean;
}

const Amount = (props: Props) => {
  const { amount, voucher } = useVoucherState();
  const dispatch = useVoucherDispatch();
  const [loading, setLoading] = useState(false);

  const setView = async (view) => dispatch({ type: SET_VIEW, payload: view });

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
        sellerID: seller_id,
        location: getLocationInfo(merchantData),
      };

      dispatch({ type: SET_VOUCHER_INFO, payload: newVoucher });
      dispatch({ type: SET_AMOUNT, payload: gift_card_detail.amount });
      setLoading(false);
      setView(3);
    } catch (err) {
      console.log('error: ', err);
      setLoading(false);
    }
  };

  return (
    <Container>
      <AmountContainer>
        <Text
          width="100%"
          align="flex-start"
          color="#474747"
          bold="true"
          wide
          onClick={(e) => setView(voucher.single_use ? 0 : 1)}
        >
          {`< BACK`}
        </Text>
      </AmountContainer>
      <Header>
        {voucher.single_use ? (
          <Text size="18px" width="70%">
            Are you ready to redeem your voucher?
          </Text>
        ) : (
          <Text size="22px">Complete Your Purchase</Text>
        )}
        <MoreInfo marginLeft="35px" showShadow={true} inverted={true} />
      </Header>
      {!voucher.single_use ? (
        <MessageContainer>
          <Text size="16px" width="50%">
            Voucher balance
          </Text>
          <Text size="16px" width="50%" align="flex-end">
            ${(voucher.amount / 100).toFixed(2)}
          </Text>
        </MessageContainer>
      ) : (
        ''
      )}
      <MessageContainer>
        <Text size="16px" width="50%">
          {voucher.single_use
            ? 'Single-use voucher balance'
            : 'Redemption Amount'}
        </Text>
        <Text size="16px" width="50%" align="flex-end">
          ${(amount / 1).toFixed(2)}
        </Text>
      </MessageContainer>
      <Divider />
      {!voucher.single_use ? (
        <MessageContainer>
          <Text size="16px" width="50%">
            Remaining balance
          </Text>
          <Text bold="true" size="24px" width="50%" align="flex-end">
            ${(voucher.amount / 100 - amount).toFixed(2)}
          </Text>
        </MessageContainer>
      ) : (
        <Disclaimer>
          <strong>Note:</strong> Any remaining balance will not be redeemable
          after this purchase
        </Disclaimer>
      )}
      <VoucherContainer>
        <Text>
          Voucher Code: &nbsp; <Bold>{voucher.seller_gift_card_id}</Bold>
        </Text>
      </VoucherContainer>
      <FlexFillSpace></FlexFillSpace>
      <Footer height="220px">
        <Text color="#ab192e" bold="true" width="50%" textAlign="center">
          Please show your phone to the merchant cashier to confirm the
          purchase.
        </Text>
        <NextButton onClick={confirm}>
          {loading ? <Loader /> : 'Next'}
        </NextButton>
      </Footer>
    </Container>
  );
};

export default Amount;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  color: black;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Header = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  width: 100%;
  margin: 24px auto;
  font-size: 24px;
  min-height: 22px;
  line-height: 22px;
  font-weight: 600;
  justify-content: center;
  ${(props: ContainerProps) =>
    props.bringToTheFront && 'z-index: 150!important;'}
  z-index: 150!important;
`;
const VoucherContainer = styled.div`
  width: 90%;
  margin: 24px auto;
  color: black;
  display: flex;
  justify-content: center;
  padding: 16px;
  border: 2px solid #f7f7f7;
  border-radius: 12px;
`;
