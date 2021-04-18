import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';
import SimplePager from '../../components/SimplePager/SimplePager';
import PrintIcon from '@material-ui/icons/Print';

import { PageCountContext } from './PageCountContext';
import {
  getCurrentPageVouchers,
  getVoucherMetadata,
} from '../../utilities/api/interactionManager';

import Table, { FIELDS } from '../../components/SortableTable/Table';
import {
  formatCurrency,
  dateFormatter,
  formatUTCOffsetlessTime,
} from '../../utilities/general/textFormatter';

const Dashboard = () => {
  const { setPageCount, setLoading, isLoading } = useContext(PageCountContext);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pageNo = params.get('page');

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [voucherCount, setVoucherCount] = useState(0);
  const [totalVoucherVal, setTotalVal] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<number | string>(
    new Date().toLocaleString()
  );

  useEffect(() => {
    const asyncFetch = async () => {
      // If URL has page number, use that, else use currPage
      setLoading(true);
      const { data, status } = await getVoucherMetadata();
      if (status === 401) return setShouldRedirect(true);
      const { count, sum, updated_at } = data;
      const {
        data: { gift_cards, seller_names },
        headers,
      } = await getCurrentPageVouchers(pageNo && pageNo !== '1' ? pageNo : '1');
      setPageCount(headers['total-pages']);
      // FIXME gift_cards requires more processing?
      const processed = gift_cards.map((gift_card) => ({
        ...gift_card,
        name: seller_names[gift_card.id] ? seller_names[gift_card.id].en : '',
      }));
      setData(processed);
      setVoucherCount(count);
      setTotalVal(sum);
      setLastUpdated(updated_at);
      setLoading(false);
    };
    if (data) return;
    asyncFetch();
  }, [pageNo, setPageCount, setLoading, data]);

  const sortData = (ind, isAsc) =>
    setData(sortByColumn(data, FIELDS)(ind, isAsc));

  return (
    <Main>
      {shouldRedirect && <Redirect to={'/distributor/login'} />}
      <Header>
        <Heading>Distributor Dashboard: Gift-a-Meal Tracker</Heading>
        <Heading>礼品券记录</Heading>
      </Header>
      <DistributorOverview>
        <MetadataHeading num={1}>
          # Active Vouchers 可使用的礼品券数量
        </MetadataHeading>
        <MetadataHeading num={2}>Total balance 总结余</MetadataHeading>
        <MetadataHeading num={3}>Last Updated 上次更新时间</MetadataHeading>
        <Metadata num={1}>{voucherCount}</Metadata>
        <Metadata num={2}>{formatCurrency(totalVoucherVal)}</Metadata>
        <Metadata num={3}>{`${dateFormatter(
          lastUpdated
        )} ${formatUTCOffsetlessTime(lastUpdated)}`}</Metadata>
      </DistributorOverview>
      <SearchBarContainer>
        <PrintoutLink to="/distributor/print/vouchers">
          <Icon />
          Print All Vouchers
        </PrintoutLink>
      </SearchBarContainer>
      <TableContainer>
        <Table fields={FIELDS} data={data || []} sortFn={sortData} />
        {isLoading ? (
          <TablePlaceholderText>Loading...</TablePlaceholderText>
        ) : data ? null : (
          <TablePlaceholderText>No Vouchers To Load</TablePlaceholderText>
        )}
        <SimplePager />
      </TableContainer>
      <Footer />
    </Main>
  );
};

const sortByColumn = (data, fields) => (fieldIndex, isAsc) => {
  const res = [...data].sort((a, b) => {
    const fieldName = fields[fieldIndex].name;
    if (a[fieldName] > b[fieldName]) {
      return isAsc ? -1 : 1;
    } else if (a[fieldName] < b[fieldName]) {
      return isAsc ? 1 : -1;
    } else {
      return 0;
    }
  });
  console.log(res);
  return res;
};

export default Dashboard;

const Main = styled.main`
  width: 100%;
  min-height: 100%;
`;

const Header = styled.header`
  width: 100%;
  height: 246px;
  background: rgb(168, 25, 46);
  padding: 82px 0 0 120px;
  box-sizing: border-box;
`;

const Heading = styled.h1`
  color: white;
  font-size: 32px;
  width: 672px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 46px;
  margin: 0;
`;

const TableContainer = styled.article`
  margin: 0 auto;
  max-width: 950px;
`;
const SearchBarContainer = styled.div`
  height: 58px;
  margin-bottom: 28px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 950px;
  margin: 0 auto 28px;
`;

const Icon = styled(PrintIcon)`
  margin: 0 12px;
`;
const PrintoutLink = styled(Link)`
  border: 1.5px solid #a8192e;
  border-radius: 50px;
  color: rgb(168, 25, 46);
  text-transform: uppercase;
  padding: 18px 18px 18px 6px;
  width: 300px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;

  &:link {
    text-decoration: none;
  }

  &:hover,
  &:active {
    background-color: #a8192e;
    color: white;
  }
`;

const DistributorOverview = styled.section`
  display: grid;
  background: rgba(171, 25, 46, 0.07);
  width: 100%;
  height: 160px;
  padding: 48px;
  grid-template-rows: 25px 1fr;
  grid-teplate-columns: 1fr 1fr 1fr;
  grid-template-areas:
    'heading1 heading2 heading3'
    'val1 val2 val3';
  justify-content: center;
  grid-gap: 7px 192px;
  margin-bottom: 26px;
`;

const MetadataHeading = styled.h2`
  ${({ num }: { num: number }) => `grid-area: heading${num} ;`}
  font-family: Noto Sans SC, sans-serif;
  text-transform: uppercase;
  font-size: 16px;
`;
const Metadata = styled.p`
  ${({ num }: { num: number }) => `grid-area: val${num} ;`}
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 700;
`;

const TablePlaceholderText = styled.p`
  width: 100%;
  text-align: center;
  margin-top: 30px;
`;
