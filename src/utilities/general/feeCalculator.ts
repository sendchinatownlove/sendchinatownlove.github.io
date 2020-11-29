import { FeeParams } from '../../utilities/api/types';

/**
 * Calculates the additional amount to charge the customer so that the full donation amount will reach the recipient.
 *
 * @property {number} donationAmount - target amount (in cents) to donate to recipient
 * @property {FeeParams} fee - contains the flat fee (in cents) & multiplier
 *
 */
export function calculateFeeAmount(donationAmount: number, fee: FeeParams) {
  const flat = Number(fee.flat_cost) || 0;
  const rate = Number(fee.multiplier) || 0;

  return Math.ceil((donationAmount + flat) / (1 - rate) - donationAmount);
}
