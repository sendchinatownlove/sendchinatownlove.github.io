import {
  successfulSellerResponse,
  successfulCampaignResponse,
  succesfulSellerHoursResponse,
  successfulSellerDeliverOptionsResponse,
} from './apiReponses';

const getSeller = () => {
  return Promise.resolve().then(() => ({ data: successfulSellerResponse }));
};

const getCampaignsForMerchant = () => {
  return Promise.resolve().then(() => ({ data: successfulCampaignResponse }));
};

const getSellerHours = () => {
  return Promise.resolve().then(() => ({ data: succesfulSellerHoursResponse }));
};

const getSellerDeliveryOptions = () => {
  return Promise.resolve().then(() => ({
    data: successfulSellerDeliverOptionsResponse,
  }));
};

exports.getSeller = getSeller;
exports.getCampaignsForMerchant = getCampaignsForMerchant;
exports.getSellerHours = getSellerHours;
exports.getSellerDeliveryOptions = getSellerDeliveryOptions;
