import React, { useState, createContext, useCallback } from 'react';

interface Context {
  [key: string]: any;
}

const PageCountContext = createContext<Context>({
  setPageCount: () => console.log('hi'),
  setLoading: () => console.log('hi'),
  isLoading: false,
});

const Provider = ({ children }) => {
  const [totalPageCount, setTotalPageCount] = useState('1');
  const [isLoading, setLoading] = useState(true);
  const wrapSetPageCount = useCallback((page) => setTotalPageCount(page), []);
  const wrapSetLoading = useCallback((state) => setLoading(state), []);

  return (
    <PageCountContext.Provider
      value={{
        totalPageCount,
        setPageCount: wrapSetPageCount,
        setLoading: wrapSetLoading,
        isLoading,
      }}
    >
      {children}
    </PageCountContext.Provider>
  );
};

export default Provider;

export { PageCountContext };
