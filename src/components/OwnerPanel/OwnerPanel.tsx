import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';
import { SocialIcon } from 'react-social-icons';

import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { SET_MODAL_VIEW } from '../../utilities/hooks/ModalPaymentContext/constants';

import Modal from '../Modal';
import ProgressBar from '../ProgressBar';

import styles from './styles.module.scss';
import defaultOwnerImage from './assets/female.svg';
import { BaseColors, BaseButton } from '../BaseComponents';

interface Props {
  imageSrc: string;
  amountRaised: number;
  targetAmount: number;
  numContributions: number;
  numDonations: number;
  numGiftCards: number;
  donationAmount: number;
  giftCardAmount: number;
  acceptDonations: boolean;
  sellGiftCards: boolean;
  costPerMeal: number;
  ownerName: string;
  sellerId: string;
  sellerName: string;
  progressBarColor: string;
  extraInfo: { [prop: string]: any };
}

interface State {
  show: boolean;
  purchaseType: string;
}

interface PaymentButtonProps {
  value: string;
  onClick: (e) => void;
  filling?: string;
  i18nText?: string;
  altText?: string;
}

const ModalBox: any = Modal;

const OwnerPanel = (props: Props) => {
  const dispatch = useModalPaymentDispatch();
  const [purchaseType, setPurchaseType] = useState('');

  const showModal = (event: any) => {
    dispatch({ type: SET_MODAL_VIEW, payload: 0 });
    setPurchaseType(event.target.value);
  };

  const validExtraInfo = Object.keys(props.extraInfo).filter((current) => {
    return props.extraInfo[current] != null;
  });

  const location = window.location.href;
  const facebookQuote = 'Help raise money for ' + props.sellerName;
  const socialIconBackgroundColor = '#a9182e';
  const socialIconDimensions = { height: 50, width: 50 };

  return (
    <Container>
      <figure className={styles.ownerContainer}>
        <img
          className={styles.ownerImage}
          src={
            props.imageSrc
              ? process.env.REACT_APP_BASE_URL + props.imageSrc
              : defaultOwnerImage
          }
          alt={props.ownerName}
        />
      </figure>

      <h2 className={styles.ownerName}>{props.ownerName}</h2>
      {props.targetAmount && (
        <ProgressBar
          amountRaised={props.amountRaised}
          targetAmount={props.targetAmount}
          progressBarColor={props.progressBarColor}
          numContributions={props.numContributions}
          numDonations={props.numDonations}
          numGiftCards={props.numGiftCards}
          donationAmount={props.donationAmount}
          giftCardAmount={props.giftCardAmount}
        />
      )}

      <div className={styles.buttonContainer}>
        {props.acceptDonations && (
          <PaymentButton
            value="donation"
            filling="filled"
            onClick={showModal}
            i18nText="sellerPage.ownerPanel.donation"
            altText="Donation"
          />
        )}
        {props.sellGiftCards && (
          <PaymentButton
            value="gift_card"
            filling="outlined"
            onClick={showModal}
            i18nText="sellerPage.ownerPanel.voucher"
            altText="Voucher"
          />
        )}
        {props.costPerMeal !== null && (
          <PaymentButton
            value="buy_meal"
            filling="red-filled"
            onClick={showModal}
            i18nText="sellerPage.ownerPanel.gift"
            altText="Gift a Meal"
          />
        )}
      </div>
      {validExtraInfo !== [] ? (
        <div className={styles.extraInfoContainer}>
          {validExtraInfo.map((current) => {
            if (current === 'Website' || current === 'Menu') {
              return (
                <React.Fragment key={current}>
                  <p key={current} className={styles.extraInfoKey}>
                    {`${current}: `}
                    <a
                      className={styles.extraInfoValue}
                      href={`http://${props.extraInfo[current]}`}
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
                    {`${current}: `}
                    <span className={styles.extraInfoValue}>
                      {props.extraInfo[current]}
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
        sellerId={props.sellerId}
        sellerName={props.sellerName}
        costPerMeal={props.costPerMeal}
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

const PaymentButtonStyles = styled(BaseButton.BaseButton)`
  margin: 5px 10px;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.05em;
  cursor: pointer;
  @media (max-width: 599px) {
    font-size: 16px;
    height: 48px;
    width: 240px;
    margin-bottom: px;
  }

  ${(props: PaymentButtonProps) => {
    switch (props.filling) {
      case 'filled':
        return `
          color: white;
          background-color: ${BaseColors.defaultButtonColor};
          border-color: ${BaseColors.defaultButtonColor};
          :hover {
            background-color: ${BaseColors.standardRed};
            border-color: ${BaseColors.standardRed};
          }
        `;
      case 'outlined':
        return `
          color: ${BaseColors.defaultButtonColor};
          background-color: white;
          :hover {
            color: ${BaseColors.standardRed};
            background-color: white;
            border-color: ${BaseColors.standardRed};
          }
        `;
      case 'red-filled':
        return `
          background-color: ${BaseColors.standardRed};
          border-color: ${BaseColors.standardRed};
        `;
      default:
        return;
    }
  }}
`;

const PaymentButton = (props: PaymentButtonProps) => {
  const { t } = useTranslation();
  const text =
    props.i18nText && !t(props.i18nText).includes('ownerPanel')
      ? t(props.i18nText)
      : props.altText;
  return <PaymentButtonStyles {...props}>{text}</PaymentButtonStyles>;
};
