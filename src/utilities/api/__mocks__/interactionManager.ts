import {successfulSellerResponse, successfulCampaignResponse, succesfulSellerHoursResponse, successfulSellerDeliverOptionsResponse} from "./apiReponses";

const getSeller = () => {
  return Promise.resolve()
    .then(() => ({data: successfulSellerResponse}));
};

const getCampaignsForMerchant = () => {
  return Promise.resolve()
    .then(() => ({data: successfulCampaignResponse}));
};

const getSellerHours = () => {
  return Promise.resolve()
    .then(() => ({data: succesfulSellerHoursResponse}));
};

const getSellerDeliveryOptions = () => {
  return Promise.resolve()
    .then(() => ({data: successfulSellerDeliverOptionsResponse}));
};

exports.getSeller = getSeller;
exports.getCampaignsForMerchant = getCampaignsForMerchant;
exports.getSeller = getSellerHours;
exports.getCampaignsForMerchant = getSellerDeliveryOptions;
// jest.mock('../utilities/api', () => {  
//   return {
//     ...jest.requireActual('../utilities/api'),
//     getSeller: jest.fn(() => ({
//       data: successfulSellerResponse,
//     })),
//   };
// });

// jest.mock('react-router-dom', () => {
//   return {
//     ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
//     useParams: jest.fn(() => ({
//       id: 'shunfa-bakery',
//     })),
//   };
// });