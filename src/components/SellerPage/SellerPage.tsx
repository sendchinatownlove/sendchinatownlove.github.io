import * as React from 'react';
import { useEffect, useState } from 'react';
import { StoreInfo } from '../StoreInfo';
import OwnerPanel from '../OwnerPanel';
import ErrorPage from '../404Page';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
} from '../../utilities/hooks/ModalPaymentContext/context';
import { SET_SELLER_DATA } from '../../utilities/hooks/ModalPaymentContext/constants';
import { getSeller } from '../../utilities';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import styled from 'styled-components';

interface Props {
  menuOpen: boolean;
}

const SellerPage = (props: Props) => {
  // fix typing
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const dispatch = useModalPaymentDispatch();
  const { sellerData } = useModalPaymentState();
  let seller = sellerData;

  const fetchData = async () => {
    setLoading(true);
    const result = id && (await getSeller(id));
    await dispatch({
      type: SET_SELLER_DATA,
      payload: result.data,
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return seller ? (
    <Container menuOpen={props.menuOpen}>
      <SellerName>{seller.name}</SellerName>
      <ContentContainer>
        {/* TODO(ArtyEmsee): Fix object mapping */}
        <StoreInfo seller={sellerData} />
        <OwnerPanel seller={sellerData} />
      </ContentContainer>
    </Container>
  ) : (
    <>
      {loading ? (
        <Loader isPage={true} />
      ) : (
        <ErrorPage menuOpen={props.menuOpen} />
      )}
    </>
  );
};

export default SellerPage;

const Container = styled.div`
  background: white;
  min-height: 1500px;
  max-width: 1440px;
  margin: 0 auto;
  width: 90%;
  ${(props: Props) => props.menuOpen && 'display: none;'}
`;

const SellerName = styled.div`
  font-weight: 600;
  font-size: 32px;
  max-width: 1200px;
  margin: 12px auto;
  margin-top: 24px;
  width: 100%;
  @media (min-width: 900px) {
    width: 90%;
    margin-top: 32px;
  }
`;

const ContentContainer = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column-reverse;
  margin: 0 auto;
  max-width: 1200px;
  min-height: 1200px;
  @media (min-width: 900px) {
    grid-template-columns: 2fr minmax(250px, 1fr);
    display: grid;
    grid-column-gap: 69px;
  }
  @media (max-width: 599px) {
    font-size: 14px;
    margin: 32px 0px;
    margin-top: 0;
  }
`;
