import { useRef, useEffect } from 'react';

const useScrollToElement = () => {
  const modalRef = useRef<any>(null);

  const width = Math.max(document.body.scrollWidth, document.body.offsetWidth);
  useEffect(() => {
    if (width < 900) {
      modalRef.current?.scrollIntoView();
    }
  }, [modalRef, width]);

  return modalRef;
};

export default useScrollToElement;
