import React, { useState, createContext } from 'react';

interface Context {
  totalPageCount: string;
  setPageCount: (page: string) => void;
}

const PageCountContext = createContext<Context>({
  totalPageCount: '1',
  setPageCount: () => true,
});

const Provider = ({ children }) => {
  const [totalPageCount, setTotalPageCount] = useState('1');
  const wrapSetPageCount = (page) => setTotalPageCount(page);

  return (
    <PageCountContext.Provider
      value={{ totalPageCount, setPageCount: wrapSetPageCount }}
    >
      {children}
    </PageCountContext.Provider>
  );
};

export default Provider;

export { PageCountContext };
