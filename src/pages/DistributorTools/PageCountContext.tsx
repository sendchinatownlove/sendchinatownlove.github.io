import React, { useState, createContext, useCallback } from 'react';

interface Context {
  totalPageCount: string;
  setPageCount: (page: string) => void;
}

const PageCountContext = createContext<Context>({
  totalPageCount: '1',
  setPageCount: () => true,
});

const Provider = ({ children }) => {
  console.log('rerendering');
  const [totalPageCount, setTotalPageCount] = useState('1');
  const wrapSetPageCount = useCallback((page) => setTotalPageCount(page), []);

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
