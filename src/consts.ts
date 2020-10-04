const MAILTO_URL = 'mailto:hello@sendchinatownlove.com';

const SquareErrors = {
  ADDRESS_VERIFICATION_FAILURE:
    'The card issuer declined the request because the postal code is invalid.',
  ALLOWABLE_PIN_TRIES_EXCEEDED:
    'The card has exhausted its available pin entry retries set by the card issuer.',
  BAD_EXPIRATION:
    'The card expiration date is either missing or incorrectly formatted.',
  CARDHOLDER_INSUFFICIENT_PERMISSIONS:
    'The card issuer has declined the transaction due to restrictions on where the card can be used.',
  CARD_EXPIRED:
    'The card issuer declined the request because the card is expired.',
  CARD_PROCESSING_NOT_ENABLED:
    'The location provided in the API call is not enabled for credit card processing.',
  CARD_NOT_SUPPORTED: 'The card is not supported in the geographic region.',
  CARD_TOKEN_EXPIRED: 'The provided card token (nonce) has expired.',
  CARD_TOKEN_USED:
    'The provided card token (nonce) was already used to process payment.',
  CHIP_INSERTION_REQUIRED:
    'The card issuer requires reading the card using a chip reader.',
  CVV_FAILURE:
    'The card issuer declined the request because the CVV value is invalid.',
  EXPIRATION_FAILURE:
    'The card expiration date is either invalid or indicates that the card is expired.',
  GENERIC_DECLINE: 'An unexpected error occurred.',
  GIFT_CARD_AVAILABLE_AMOUNT:
    'Voucher does not have sufficient balance for requested amount and tip.',
  INSUFFICIENT_FUNDS:
    'This payment source has insufficient funds to cover the payment.',
  INSUFFICIENT_PERMISSIONS:
    'This Square account does not have the permissions to accept this payment.',
  INVALID_ACCOUNT: 'The card issuer was not able to locate account on record.',
  INVALID_CARD_DATA: 'Generic error - the provided card data is invalid.',
  INVALID_EMAIL_ADDRESS: 'The provided email address is invalid.',
  INVALID_EXPIRATION:
    'The expiration date for the payment card is invalid. For example, it indicates a date in the past.',
  INVALID_FEES: 'The app_fee_money on a payment is too high.',
  INVALID_LOCATION:
    'This Square account cannot take payments in the specified region',
  INVALID_PIN:
    'The card issuer declined the request because the PIN is invalid.',
  INVALID_POSTAL_CODE: 'The postal code is incorrectly formatted.',
  MANUALLY_ENTERED_PAYMENT_NOT_SUPPORTED:
    'The card must be swiped, tapped, or dipped.',
  PAN_FAILURE: 'The specified card number is invalid.',
  PAYMENT_LIMIT_EXCEEDED:
    'Square declined the request because the payment amount exceeded the processing limit for this merchant.',
  TEMPORARY_ERROR: 'A temporary internal error occurred.',
  TRANSACTION_LIMIT:
    'The card issuer has determined the payment amount is either too high or too low.',
  VOICE_FAILURE:
    'The card issuer declined the request because the issuer requires voice authorization from the cardholder.',
  CARD_DECLINED_VERIFICATION_REQUIRED:
    'This payment requires verification. For more information, see SCA Overview.',
};

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}
export { MAILTO_URL, SquareErrors, hasKey };
