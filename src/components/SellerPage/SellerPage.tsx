import * as React from 'react';
import { useEffect, useState } from 'react';
import { StoreInfo } from '../StoreInfo';
import OwnerPanel from '../OwnerPanel';
import ErrorPage from '../404Page';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
  ModalPaymentConstants,
} from '../../utilities/hooks/ModalPaymentContext';
import { getSeller } from '../../utilities';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReactPixel from 'react-facebook-pixel';

interface Props {
  menuOpen: boolean;
}

ReactPixel.trackCustom('SellerPageView', {});
const SellerPage = (props: Props) => {
  const { i18n } = useTranslation();

  // fix typing
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const dispatch = useModalPaymentDispatch(null);
  const { sellerData } = useModalPaymentState(null);

  useEffect(() => {
    fetchData(i18n.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const fetchData = async (lang?) => {
    setLoading(true);
    const result = id && (await getSeller(id, lang));
    dispatch({
      type: ModalPaymentConstants.SET_SELLER_DATA,
      payload: result.data,
    });
    setLoading(false);
  };

  return sellerData && !loading ? (
    <Container menuOpen={props.menuOpen}>
      <SellerName>{sellerData.name}</SellerName>
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
    width: 100%;
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
    grid-template-columns: 1fr 464px;
    display: grid;
    grid-column-gap: 69px;
  }
  @media (max-width: 599px) {
    font-size: 14px;
    margin: 32px 0px;
    margin-top: 0;
  }
`;
