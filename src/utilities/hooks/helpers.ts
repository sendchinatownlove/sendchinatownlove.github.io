import { LocationInfo } from '../../utilities/hooks/VoucherContext/types';

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
