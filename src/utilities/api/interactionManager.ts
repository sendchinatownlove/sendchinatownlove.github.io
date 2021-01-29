import axios from 'axios';
import { CardElement } from '@stripe/react-stripe-js';
import { Buyer, PaymentParams, SquareLineItems } from './types';
import {
  charges,
  sellers,
  vouchers,
  campaigns,
  fees,
  distributors,
  passportVouchers,
  contacts,
  tickets,
  participatingSellers,
  sponsorSellers,
  locations,
  lyftRewards,
  nonprofits,
  projects,
  gcs,
  crawlReceipts,
  crawlRedemptions,
  crawlRewards,
} from './endpoints';

// Fix return typing
export const getSellers = async (lang?: string): Promise<any> => {
  return await axios.get(sellers, {
    params: { locale: localeFromLanguage(lang) },
  });
};

export const getSeller = async (id: string, lang?: string): Promise<any> => {
  return await axios.get(sellers + id, {
    params: { locale: localeFromLanguage(lang) },
  });
};

export const getSellerHours = async (id: string): Promise<any> => {
  return await axios.get(sellers + id + '/open_hour');
};

export const getSellerDeliveryOptions = async (id: string): Promise<any> => {
  return await axios.get(sellers + id + '/delivery_options');
};

// TODO(ArtyEmsee): add typing for stripe elements
export const makePayment = async (
  stripe: any,
  elements: any,
  payment: PaymentParams,
  buyer: Buyer
) => {
  const { email, name } = buyer;

  // TODO(ArtyEmsee): abstract api call, create global object for headers
  await axios
    .post(
      charges,
      {
        is_square: false,
        line_items: [payment],
        email: email,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    )
    .then(async (res) => {
      // TODO(ArtyEmsee): fix response to success
      if (!stripe || !elements) return;
      else {
        const cardElement = elements!.getElement(CardElement);
        const result = await stripe!.confirmCardPayment(
          `${res.data.client_secret}`,
          {
            payment_method: {
              card: cardElement!,
              billing_details: {
                name: name,
                email: email,
              },
            },
          }
        );

        if (result.error) {
          console.log(result.error.message);
        } else {
          if (result.paymentIntent?.status === 'succeeded') {
            console.log(
              result.paymentIntent?.status,
              'The payment has been processed!'
            );
          }
        }
      }
    });

  // TODO(ArtyEmsee): fix response to error
};

export const makeSquarePayment = async (
  nonce: string,
  sellerId: string,
  payment: SquareLineItems,
  buyer: Buyer,
  isDistribution: boolean,
  campaignId?: string,
  projectId?: string,
  metadata?: string | null
) => {
  const { email, name } = buyer;
  const idempotencyKey = buyer.idempotency_key;
  const isSubscribed = buyer.is_subscribed;

  return await axios
    .post(
      charges,
      {
        is_square: true,
        nonce,
        line_items: payment,
        email,
        name,
        seller_id: sellerId,
        project_id: projectId,
        idempotency_key: idempotencyKey,
        is_subscribed: isSubscribed,
        is_distribution: isDistribution, // TODO: deprecate this in favor of campaignId
        campaign_id: campaignId,
        metadata: metadata,
      },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    )
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const getVoucher = async (id: string) =>
  axios
    .get(vouchers + id)
    .then((res) => res)
    .catch((err) => err);

export const updateVoucher = async (id: string, amount: number) =>
  axios
    .put(vouchers + id, { amount })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });

export const getMerchantGiftCards = async (
  seller_id: string,
  secret: string,
  filterGAM: boolean = false
) => {
  const filterGAMString = filterGAM ? '?filterGAM=true' : ''; // if the key is present at all, filtering will happen
  return axios
    .get(sellers + seller_id + '/gift_cards/' + secret + filterGAMString)
    .then((res) => res); // don't catch error, throw it up the stack
};

function localeFromLanguage(language?: string) {
  switch (language) {
    case 'cn':
      return 'zh-CN';
    case 'en':
    default:
      return 'en';
  }
}

export const getCampaigns = async (): Promise<any> => {
  return await axios
    .get(campaigns)
    .then((res) => res)
    .catch((err) => err);
};

export const getPastCampaigns = async (pageNo = 1): Promise<any> => {
  return await axios
    .get(`${campaigns}?inactive=true&items=10&page=${pageNo}`)
    .then((res) => res)
    .catch((err) => err);
};

export const getCampaignsForMerchant = async (
  seller_id: string
): Promise<any> => {
  return await axios
    .get(sellers + seller_id + '/campaigns')
    .then((res) => res)
    .catch((err) => err);
};

export const getFees = async () => {
  return await axios
    .get(fees)
    .then((res) => res)
    .catch((err) => err);
};

export const getFee = async (name: string) => {
  return await axios
    .get(fees + name)
    .then((res) => res)
    .catch((err) => err);
};

export const getDistributor = async (id: string): Promise<any> => {
  return await axios
    .get(distributors + id)
    .then((res) => res)
    .catch((err) => err);
};

export const getFiscalSponsor = async (id: number): Promise<any> => {
  return await axios
    .get(nonprofits + id)
    .then((res) => res)
    .catch((err) => err);
};

export const getAllParticipatingSellers = async (): Promise<any> =>
  axios
    .get(passportVouchers)
    .then((res) => res)
    .catch((err) => err);

// for passport crawl voucher print outs
export const getParticipatingMerchant = async (id: string) =>
  axios
    .get(passportVouchers + id)
    .then((res) => res)
    .catch((err) => err);

export const getParticipatingMerchantTickets = async (
  id: string,
  tickets_secret: string,
  page: number | null,
  items: number | null,
  printed: boolean | null,
  associated: boolean | null
) =>
  axios
    .get(passportVouchers + id + '/tickets/' + tickets_secret, {
      params: { page, items, printed, associated },
    })
    .then((res) => res)
    .catch((err) => err);

// validate passport email
export const getPassportEmailId = async (email: string) =>
  axios
    .get(contacts, {
      params: { email },
    })
    .then((res) => res)
    .catch((err) => err);

export const getContactInfo = async (passportId: string) =>
  axios
    .get(contacts + passportId)
    .then((res) => res)
    .catch((err) => err);

export const createPassportEmailId = async (
  email: string,
  instagram?: string
) => {
  let params = {};

  params = instagram ? { email, instagram } : { email };

  return axios
    .post(contacts, params)
    .then((res) => res)
    .catch((err) => err);
};

export const updatePassportInstagram = async (
  id: string,
  instagram: string
) => {
  return axios
    .put(contacts + id, { instagram })
    .then((res) => res)
    .catch((err) => err);
};

export const checkForValidTicket = async (ticket_id: string) =>
  axios
    .get(tickets + ticket_id)
    .then((res) => res)
    .catch((err) => err);

export const updateTicketContactId = async (
  ticket_id: string,
  contact_id: string
) =>
  axios
    .put(tickets + ticket_id, { contact_id })
    .then((res) => res)
    .catch((err) => err);

export const getPassportTickets = async (passportId: string) =>
  axios
    .get(contacts + passportId + '/tickets')
    .then((res) => res)
    .catch((err) => err);

export const getParticipatingSeller = async (sellerId: string) =>
  axios
    .get(participatingSellers + sellerId)
    .then((res) => res)
    .catch((err) => err);

export const getGiveawayTicketsForContact = async (contactId: string) =>
  axios
    .get(contacts + contactId)
    .then((res) => res)
    .catch((err) => err);

export const sendRedeemTicketsEmail = async (passportId: string) =>
  axios
    .post(contacts + passportId + '/rewards')
    .then((res) => res)
    .catch((err) => err);

export const getLocationById = async (locationId: number) =>
  axios
    .get(locations + locationId)
    .then((res) => res)
    .catch((err) => err);

export const getAllSponsors = async () =>
  axios
    .get(sponsorSellers)
    .then((res) => res)
    .catch((err) => err);

export const getOneSponsor = async (rewardId: number) =>
  axios
    .get(sponsorSellers + rewardId)
    .then((res) => res)
    .catch((err) => err);

export const redeemReward = async (
  contact_id: number,
  auth_token: string,
  tickets: Array<any>
) =>
  axios
    .put(contacts + contact_id + '/tickets/' + auth_token, { tickets })
    .then((res) => res)
    .catch((err) => err);

export const createLyftReward = async (contact_id: number) =>
  axios
    .post(contacts + contact_id + '/' + lyftRewards)
    .then((res) => res)
    .catch((err) => err);

export const getLyftReward = async (contact_id: number) =>
  axios
    .get(contacts + contact_id + '/' + lyftRewards)
    .then((res) => res)
    .catch((err) => err);

export const redeemToken = async (contact_id: number, token: string) =>
  axios
    .post(contacts + contact_id + '/' + lyftRewards + token + '/redeem/')
    .then((res) => res)
    .catch((err) => err);

export const getProject = async (project_id: number) =>
  axios
    .get(projects + project_id)
    .then((res) => res)
    .catch((err) => err);

export const light_up_chinatown_id = 1;

export const sendImage = async (
  signedUrl: string,
  filename: string,
  image: File
) => {
  return axios.put(signedUrl, image, {
    headers: {
      'Content-Type': image.type,
    },
  });
};

export const getUploadUrl = async (filename: string, filetype: string) => {
  return axios.post(gcs, {
    file_name: filename,
    file_type: filetype,
  });
};

export const uploadCrawlReceipts = async (
  participating_seller_id: number,
  contact_id: number,
  amount: number,
  receipt_url: string
) =>
  axios
    .post(crawlReceipts, {
      participating_seller_id,
      contact_id,
      amount,
      receipt_url,
    })
    .then((res) => res)
    .catch((err) => err);

export const getCrawlRewards = async () =>
  axios
    .get(crawlRewards)
    .then((res) => res)
    .catch((err) => err);

export const redeemRaffle = async (contact_id: number, reward_id: number) =>
  axios
    .post(crawlRedemptions, { contact_id, reward_id })
    .then((res) => res)
    .catch((err) => err);

export const updateRaffle = async (reward_id: number) =>
  axios
    .put(crawlRedemptions, { reward_id })
    .then((res) => res)
    .catch((err) => err);

export const getCrawlReceipts = async (contact_id: number) =>
  axios
    .get(contacts + contact_id + '/crawl_receipts/')
    .then((res) => res)
    .catch((err) => err);
