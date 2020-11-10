import React from 'react';
import styled from 'styled-components';

import { useVoucherState } from '../../utilities/hooks/VoucherContext';

import Logo from '../../components/Logos/image/PureLogo.png';
import LogoNoBorder from '../../components/Logos/image/PureLogoNoBorder.png';

interface Props {}
interface ContainerProps {
  isOnLandingPage: boolean;
}

const StoreBanner = (props: Props) => {
  const { view, voucher } = useVoucherState(null);

  const isOnLandingPage = view === 0;

  return (
    <Container isOnLandingPage={isOnLandingPage}>
      <OwnerImage
        isOnLandingPage={isOnLandingPage}
        src={isOnLandingPage ? LogoNoBorder : Logo}
      />
      <Header isOnLandingPage={isOnLandingPage}>
        {isOnLandingPage && 'Welcome to '}
        {voucher.storeName}
      </Header>
    </Container>
  );
};

export default StoreBanner;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: ${(props: ContainerProps) =>
    props.isOnLandingPage ? '200px' : '100px'};
  flex-direction: ${(props: ContainerProps) =>
    props.isOnLandingPage ? 'column' : 'row'};
  margin: ${(props: ContainerProps) => (props.isOnLandingPage ? '24px' : '0')}
    auto;
  ${(props: ContainerProps) =>
    !props.isOnLandingPage && 'border-bottom: 1px solid #f7f7f7;'}
  ${(props: ContainerProps) => !props.isOnLandingPage && 'padding: 10px 2.5%;'}
  color: black;
  text-align: center;
`;
const Header = styled.div`
  ${(props: ContainerProps) =>
    !props.isOnLandingPage &&
    `
    margin-left: 15px;
    max-width: 307px;
  `};
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
`;
const OwnerImage = styled.img`
  object-fit: cover;
  width: ${(props: ContainerProps) =>
    props.isOnLandingPage ? '150px' : '55px'};
  height: ${(props: ContainerProps) =>
    props.isOnLandingPage ? '150px' : '55px'};
  ${(props: ContainerProps) =>
    props.isOnLandingPage && 'border: 5px solid white;'}
  ${(props: ContainerProps) => props.isOnLandingPage && 'border-radius: 100%;'}
  ${(props: ContainerProps) => props.isOnLandingPage && 'background: white;'}
`;
