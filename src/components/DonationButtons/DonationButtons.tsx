import React from 'react'
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { BrowsePageSeller } from '../../utilities/api/types';
import ReactPixel from 'react-facebook-pixel';
import styles from './styles.module.scss';

interface Props {
    seller: BrowsePageSeller;
    showModal: Function;
}

const DonationSection = ({ seller, showModal }: Props) => {
    const { t } = useTranslation();

    const donationClickHander = (event: any) => {
        ReactPixel.trackCustom('DonationButtonClick', {});
        showModal(event);
      };
    
      const voucherClickHander = (event: any) => {
        ReactPixel.trackCustom('VoucherButtonClick', {});
        showModal(event);
      };
    
      const giftMealClickHander = (event: any) => {
        ReactPixel.trackCustom('GiftMealButtonClick', {});
        showModal(event);
      };

      return (
        <React.Fragment>
            <div className={styles.buttonContainer}>
                {seller.accept_donations && (
                <button
                    value="donation"
                    className={classnames(
                    styles.button,
                    seller.cost_per_meal && styles.moreThanTwoButtons,
                    'button--filled'
                    )}
                    onClick={donationClickHander}
                >
                    {t('ownerPanel.donation')}
                </button>
                )}
                {seller.sell_gift_cards && (
                <button
                    value="gift_card"
                    className={classnames(styles.button, 'button--outlined')}
                    onClick={voucherClickHander}
                >
                    {t('ownerPanel.voucher')}
                </button>
                )}
                {seller.cost_per_meal !== null && (
                <button
                    value="buy_meal"
                    className={classnames(styles.button, 'button--outlined')}
                    onClick={giftMealClickHander}
                >
                    Gift a meal
                </button>
                )}
            </div>
        </React.Fragment>
      );

};

export default DonationSection;