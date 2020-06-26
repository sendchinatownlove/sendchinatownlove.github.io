import React, { useState } from 'react';
import classnames from 'classnames';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { SET_MODAL_VIEW } from '../../utilities/hooks/ModalPaymentContext/constants';
import { BrowsePageSeller } from '../../utilities/api/types';
import Modal from '../Modal';
import ProgressBar from '../ProgressBar';
import defaultOwnerImage from './assets/female.svg';
import ClipboardIcon from 'react-clipboard-icon';
import CopyToClipboard from 'react-copy-to-clipboard';
import { SocialIcon } from 'react-social-icons';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';
import styled from 'styled-components';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import ReactPixel from 'react-facebook-pixel';

interface Props {
  seller: BrowsePageSeller;
}

interface State {
  show: boolean;
  purchaseType: string;
}

const ModalBox: any = Modal;

const OwnerPanel = ({ seller }: Props) => {
  const { t } = useTranslation();

  const dispatch = useModalPaymentDispatch();
  const [purchaseType, setPurchaseType] = useState('');

  const showModal = (event: any) => {
    dispatch({ type: SET_MODAL_VIEW, payload: 0 });
    setPurchaseType(event.target.value);
  };

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

  const extraInfo = {
    Type: seller.business_type,
    Employees: seller.num_employees,
    Founded: seller.founded_year,
    Website: seller.website_url,
    Menu: seller.menu_url,
  };

  const validExtraInfo = Object.keys(extraInfo).filter((current) => {
    return extraInfo[current] != null;
  });

  const location = window.location.href;
  const facebookQuote = 'Help raise money for ' + seller.name;
  const socialIconBackgroundColor = '#a9182e';
  const socialIconDimensions = { height: 50, width: 50 };
  const costPerMealDollars = seller.cost_per_meal / 100;

  const clipboardStyle = {
    fill: 'white',
    display: 'inline',
    borderRadius: '50%',
    backgroundColor: '#a9182e',
    border: '1px solid #a9182e',
    padding: '0px 8px 0px 16px',
    position: 'relative',
    top: '20px',
  };

  return (
    <Container>
      <figure className={styles.ownerContainer}>
        <img
          className={styles.ownerImage}
          src={
            seller?.owner_image_url
              ? seller.owner_image_url
              : seller?.logo_image_url
              ? seller.logo_image_url
              : defaultOwnerImage
          }
          alt={seller.owner_name}
        />
      </figure>

      <h2 className={styles.ownerName}>{seller.owner_name}</h2>
      {seller.target_amount && (
        <ProgressBar
          amountRaised={seller.amount_raised}
          targetAmount={seller.target_amount}
          progressBarColor={seller.progress_bar_color}
          numContributions={seller.num_contributions}
          numDonations={seller.num_donations}
          numGiftCards={seller.num_gift_cards}
          donationAmount={seller.donation_amount}
          giftCardAmount={seller.gift_card_amount}
        />
      )}

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
      {validExtraInfo !== [] ? (
        <div className={styles.extraInfoContainer}>
          {validExtraInfo.map((current) => {
            if (current === 'Website' || current === 'Menu') {
              return (
                <React.Fragment key={current}>
                  <p key={current} className={styles.extraInfoKey}>
                    {`${t('ownerPanel.extraInfo.' + current)}: `}
                    <a
                      className={styles.extraInfoValue}
                      href={`http://${extraInfo[current]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {current}
                    </a>
                  </p>
                </React.Fragment>
              );
            } else
              return (
                <React.Fragment key={current}>
                  <p key={current} className={styles.extraInfoKey}>
                    {`${t('ownerPanel.extraInfo.' + current)}: `}
                    <span className={styles.extraInfoValue}>
                      {extraInfo[current]}
                    </span>
                  </p>
                </React.Fragment>
              );
          })}
        </div>
      ) : (
        ''
      )}

      <ModalBox
        purchaseType={purchaseType}
        sellerId={seller.seller_id}
        sellerName={seller.name}
        costPerMeal={costPerMealDollars}
      />
      {
        <div className={styles.socialContainer}>
          <div className={styles.socialIconContainer}>
            <FacebookShareButton
              url={location}
              quote={facebookQuote}
              className="share"
            >
              <SocialIcon
                network="facebook"
                bgColor={socialIconBackgroundColor}
                style={socialIconDimensions}
              />
            </FacebookShareButton>
          </div>

          <div className={styles.socialIconContainer}>
            <TwitterShareButton url={location} className="share">
              <SocialIcon
                network="twitter"
                bgColor={socialIconBackgroundColor}
                style={socialIconDimensions}
              />
            </TwitterShareButton>
          </div>

          <div className={styles.socialIconContainer}>
            <EmailShareButton url={location} className="share">
              <SocialIcon
                network="email"
                bgColor={socialIconBackgroundColor}
                style={socialIconDimensions}
              />
            </EmailShareButton>
          </div>

          <div className={styles.socialIconContainer}>
            <CopyToClipboard text={location}>
              <ClipboardIcon
                size={socialIconDimensions.height}
                style={clipboardStyle}
              />
            </CopyToClipboard>
          </div>
        </div>
      }

      <div className={styles.mapsContainer}>
        {/* need to put in google API */}
        {/* might need to use a react lib since it uses script tags */}
        {/* https://www.npmjs.com/package/google-map-react */}
      </div>
    </Container>
  );
};

export default OwnerPanel;

const Container = styled.section`
  display: flex;
  width: 100%;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  align-items: center;
  padding: 18px 32px;

  order: 1;
  grid-row: 1;
  @media (min-width: 900px) {
    position: sticky;
    top: 20px;
    order: 2;
    grid-column: 2;
  }
  @media (max-width: 599px) {
    font-size: 14px;
    padding: 24px;
  }
`;
