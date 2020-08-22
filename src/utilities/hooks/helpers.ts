import { LocationInfo } from '../../utilities/hooks/VoucherContext/types';
import { useState, useEffect } from 'react';

export const getLocationInfo = (merchantData): LocationInfo => {
  const emptyLocationInfo = {
    line1: '',
    line2: '',
  };
  const locations = merchantData?.data?.locations;
  if (!locations || !(locations.length > 0)) {
    return emptyLocationInfo;
  }
  const location = locations[0];
  if (!location) {
    return emptyLocationInfo;
  }
  const locationInfo = {
    line1: `${location.address1 ?? ''} ${location.address2 ?? ''}`,
    line2: `${location.city ?? ''} ${location.state ?? ''}, ${
      location.zip_code ?? ''
    }`,
  };
  return locationInfo;
};

 // https://usehooks.com/useWindowSize/
 export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
