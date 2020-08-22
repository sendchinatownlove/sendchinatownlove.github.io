import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import {
  getParticipatingMerchant,
  getParticipatingMerchantTickets,
} from '../../utilities/api/interactionManager';

import { LoaderFillerContainer } from '../../components/Loader';
import VoucherImage from './VoucherFront.png';
import BackImage from './VoucherBack.png';

const Voucher = () => {
  const { id, tickets_secret } = useParams();

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantTickets, setRestaurantTickets] = useState<any | null>();

  const getAllTickets = async () => {
    const { data: { name } } = await getParticipatingMerchant(id);
    const { data: allTickets } = await getParticipatingMerchantTickets(id, tickets_secret);

    if (allTickets && name) {
      setRestaurantName(name);
      setRestaurantTickets(allTickets);
    }
  };

  useEffect(() => {
    getAllTickets();
  });

  const formatTicketCode = (code) => {
    const formattedCode = code.split('');
    formattedCode.splice(3, 0, '-');
    return formattedCode.join('');
  };

  return restaurantTickets ? (
    <Page>
      {restaurantTickets.map((restaurant, idx) => (
        <>
          <Container>
            <Image src={VoucherImage} />
            <ContainerInfo>
              <RestaurantName
                className={restaurantName.length > 15 ? 'long' : ''}
              >
                {restaurantName}
              </RestaurantName>
              <TicketNumber>
                {formatTicketCode(restaurant.ticket_id)}
              </TicketNumber>
            </ContainerInfo>
          </Container>
          {(idx + 1) % 4 === 0 && (
            <>
              <Image src={BackImage} />
              <Image src={BackImage} />
              <Image src={BackImage} />
              <Image src={BackImage} />
            </>
          )}
        </>
      ))}
    </Page>
  ) : (
    <LoaderFillerContainer />
  );
};

export default Voucher;

const Page = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled.div`
  height: 599px;
  width: 775px;
  display: grid;
  grid-template-rows: 1fr;
`;

const Image = styled.img`
  height: 599px;
  width: 775px;
  grid-row: 1;
  grid-column: 1;
`;

const ContainerInfo = styled.div`
  grid-row: 1;
  grid-column: 1;
  height: 599px;
  width: 775px;
  display: flex;
  z-index: 5;
`;

const RestaurantName = styled.div`
  font-family: 'Nova Mono';
  text-transform: uppercase;
  color: #bc4f5e;

  transform: rotate(15deg);
  -webkit-transform: rotate(15deg);
  -moz-transform: rotate(15deg);
  -ms-transform: rotate(15deg);
  -o-transform: rotate(15deg);

  margin-top: 317px;
  margin-left: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  width: 150px;
  height: 25px;
  padding: 0;

  &.long {
    margin-top: 312px;
    font-size: 12px;
    height: 35px;
  }
`;

const TicketNumber = styled.div`
  color: #a8192e;
  font-weight: bold;
  font-style: italic;
  font-size: 50px;
  margin: 160px 0 0 210px;

  width: 285px;
  text-align: center;
`;
