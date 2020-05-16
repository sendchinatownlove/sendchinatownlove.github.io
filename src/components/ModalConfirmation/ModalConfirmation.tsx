import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import confirmationPic from './chinatown-logo.png';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { CLOSE_MODAL, SET_SELLER_DATA } from '../../utilities/hooks/ModalPaymentContext/constants';

import { getSeller } from '../../utilities';

export type Props = {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
};

const ModalConfirmation = (props: Props) => {
  const dispatch = useModalPaymentDispatch();

  const finishModal = async(e:any) => {
    e.preventDefault();
    const { data } = props.sellerId && (await getSeller(props.sellerId));

    // TODO: fix this using useCallback to make it a lot nicer
    const data2 = {
      id: data.id,
      seller_id: data.seller_id,
      cuisine_name: data.cuisine_name,
      name: data.name,
      target_amount: data.target_amount,
      amount_raised: 50000,
      num_contributions: data.num_contributions,
      num_donations: data.num_donations,
      num_gift_cards: data.num_gift_cards,
      donation_amount: data.donation_amount,
      gift_card_amount: data.gift_card_amount,
      progress_bar_color: data.progress_bar_color,
      summary: data.summary,
      story: data.story,
      accept_donations: data.accept_donations,
      sell_gift_cards: data.sell_gift_cards,
      owner_name: data.owner_name,
      owner_image_url: data.owner_imagr_url,
      hero_image_url: data.hero_image_url,
      business_type: data.business_type,
      num_employees: data.num_employees,
      founded_year: data.founded_year,
      website_url: data.website_url,
      menu_url: data.menu_url,
    }
    console.log('in confirmation modal', data2)
    dispatch({ type: SET_SELLER_DATA, payload: data2 })
    dispatch({ type: CLOSE_MODAL, payload: undefined })
  }

  return (
    <div className={styles.container} data-testid="Modal Confirmation">
      <h2>Thank you!</h2>
      <p>
        We appreciate your support. We'll{' '}
        {props.purchaseType === 'gift_card'
          ? `email you your voucher when ${props.sellerName} opens back up!`
          : `let you know when ${props.sellerName} receives your donation!`}
      </p>

      <img className={styles.image} src={confirmationPic} alt="Logo" />

      <button
        className={classnames(styles.finishBtn, 'modalButton--filled')}
        // onClick={() => dispatch({ type: CLOSE_MODAL, payload: undefined })}
        onClick={(e) => finishModal(e)}
      >
        Finish
      </button>
    </div>
  );
};

export default ModalConfirmation;
