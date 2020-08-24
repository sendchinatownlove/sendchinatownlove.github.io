const baseUrl = process.env.REACT_APP_API_ENDPOINT!;

export const sellers = baseUrl + 'sellers/';
export const charges = baseUrl + 'charges';
export const vouchers = baseUrl + 'gift_cards/';
export const locations = baseUrl + 'locations/';
export const contacts = baseUrl + 'contacts/';
export const sponsorSellers = baseUrl + 'sponsor_sellers/';

// remove later
export const passport = baseUrl + 'contacts/';
