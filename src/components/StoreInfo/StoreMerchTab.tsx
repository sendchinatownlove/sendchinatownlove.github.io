import * as React from 'react';
import styled from 'styled-components';
import { BrowsePageSeller } from '../../utilities';

export interface Props {
  getStoreImages: Function;
  seller: BrowsePageSeller;
}

const StoreMerch: React.SFC<Props> = ({ seller, getStoreImages }) => {
  //   const images = getStoreImages(seller.seller_id);

  return (
    <MerchContainer>
      <p>
        Support {seller.name} by purchasing custom clothing and stickers
        designed by our Send Chinatown Love designers.
      </p>
      <Button className="button--filled">
        check out the merch {' '}
        <i className='fa fa-external-link'></i>
      </Button>
    </MerchContainer>
  );
};

export default StoreMerch;

const MerchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

const Button = styled.div`
  text-align: center;
  width: 500px;
  letter-spacing: 0.15em;
  cursor: pointer;

  @media (max-width: 550px) {
      width: 100%;
  }
`;
