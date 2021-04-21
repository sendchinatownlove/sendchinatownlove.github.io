import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const SimplePager = ({ pageCount, isLoading }) => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pageNo = params.get('page') || '1';

  const isFirstPage = pageNo !== '1';
  const isLastPage = checkIfLastPage(pageCount, pageNo);

  return (
    <PagerWrapper>
      {isFirstPage ? (
        <Link
          to={`/distributor/dashboard?page=${parseInt(pageNo) - 1}`}
          component={PagerLink}
        >
          <IconWrapper>
            <ChevronLeftIcon stroke="var(--enabled)" />
          </IconWrapper>
        </Link>
      ) : (
        <IconWrapper>
          <ChevronLeftIcon stroke="var(--disabled)" />
        </IconWrapper>
      )}
      {isLoading ? (
        <PagerText>Loading 装货...</PagerText>
      ) : (
        <PagerText>{`Page ${pageNo} out of ${pageCount} 页面 ${pageNo}/ ${pageCount}`}</PagerText>
      )}
      {isLastPage ? (
        <Link
          to={`/distributor/dashboard?page=${parseInt(pageNo) + 1}`}
          component={PagerLink}
        >
          <IconWrapper>
            <ChevronRightIcon stroke="var(--enabled)" />
          </IconWrapper>
        </Link>
      ) : (
        <IconWrapper>
          <ChevronRightIcon stroke="var(--disabled)" />
        </IconWrapper>
      )}
    </PagerWrapper>
  );
};
export default SimplePager;

const checkIfLastPage = (totalPages, page) => {
  const pageNo = parseInt(page);
  const totalPageCount = parseInt(totalPages);
  return pageNo < totalPageCount && totalPageCount > 1;
};

const PagerWrapper = styled.div`
  --enabled: rgb(168, 25, 46);
  --disabled: rgb(158, 158, 158);
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const PagerLink = styled.a`
  height: 24px;
  font-size: 16px;
`;

const PagerText = styled.p`
  font-size: 18px;
  margin: 0;
`;

const IconWrapper = styled.div`
  box-sizing: border-box;
  font-size: 16px;
  height: 24px;
`;
