import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';
import SimplePager from '../../components/SimplePager/SimplePager';

import { PageCountContext } from '../../utilities/general/PageCountContext';
import { getAllVouchers } from '../../utilities/api/interactionManager';

const Dashboard = () => {
  const { setPageCount } = useContext(PageCountContext);
  const { search } = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const asyncFetch = async () => {
      // If URL has page number, use that, else use currPage
      const params = new URLSearchParams(search);
      const pageNo = params.get('page');
      const res = await getAllVouchers(pageNo && pageNo !== '1' ? pageNo : '1');
      if (res.status === 401) return setShouldRedirect(true);
      setPageCount(res.headers['total-pages']);
    };
    asyncFetch();
  }, [search, setPageCount]);

  return (
    <Main>
      {shouldRedirect && <Redirect to={'/distributor/login'} />}
      <Header>
        <Heading>Distributor Dashboard: Gift-a-Meal Tracker</Heading>
        <Heading>礼品券记录[COPY TO UPDATE]</Heading>
      </Header>
      <Section>
        <SimplePager />
      </Section>
      <Footer />
    </Main>
  );
};

export default Dashboard;

const Main = styled.main`
  width: 100%;
  min-height: 100%;
`;

const Header = styled.header`
  width: 100%;
  height: 218px;
  background: rgb(168, 25, 46);
  padding: 82px 0 0 129px;
  box-sizing: border-box;
`;

const Heading = styled.h1`
  color: white;
  font-size: 24px;
`;

const Section = styled.section`
  margin: 0 130px 80px;
`;
