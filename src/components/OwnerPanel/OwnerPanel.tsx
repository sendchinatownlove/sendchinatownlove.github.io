import React, { useState } from 'react';
import classnames from 'classnames';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { SET_MODAL_VIEW } from '../../utilities/hooks/ModalPaymentContext/constants';
import Modal from '../Modal';
import ProgressBar from '../ProgressBar';
import styles from './styles.module.scss';
import defaultOwnerImage from './assets/female.svg';
import { withStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { SocialIcon } from 'react-social-icons';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';

interface Props {
  imageSrc: string;
  className?: string;
  amountRaised: number;
  targetAmount: number;
  numContributions: number;
  numDonations: number;
  numGiftCards: number;
  donationAmount: number;
  giftCardAmount: number;
  acceptDonations: boolean;
  sellGiftCards: boolean;
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

const ModalBox: any = Modal;

const OwnerPanel = (props: Props) => {
  const dispatch = useModalPaymentDispatch();
  const [purchaseType, setPurchaseType] = useState('');

  const showModal = (event: any) => {
    dispatch({ type: SET_MODAL_VIEW, payload: 0 });
    setPurchaseType(event.target.value);
  };

  const progressWidth = (raised: number, target: number) => {
    if (raised < target) return (raised / target) * 100;
    return 100;
  };

  const SupporterTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#ffffff',
      color: 'rgba(0, 0, 0, 0.87)',
      width: 180,
      fontSize: theme.typography.pxToRem(14),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const validExtraInfo = Object.keys(props.extraInfo).filter((current) => {
    return props.extraInfo[current] != null;
  });

  const location = window.location.href;
  const facebookQuote = 'Help raise money for ' + props.sellerName;
  const socialIconBackgroundColor = '#a9182e';
  const socialIconDimensions = { height: 50, width: 50 };

  return (
    <section className={classnames(styles.container, props.className)}>
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

  const validExtraInfo = Object.keys(props.extraInfo).filter((current) => {
    return props.extraInfo[current] != null;
  });

  return (
    <section className={classnames(styles.container, props.className)}>
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
      {props.targetAmount && (<>
        <div className={styles.progressContainer}>
          <div className={classnames(styles.progressBar, 'progress-bar')}>
            <div
              className={styles.myBar}
              style={{
                width: `${progressWidth(
                  props.amountRaised,
                  props.targetAmount
                )}%`,
                backgroundColor: props.progressBarColor,
                //defaults to default color if no color is passed in
              }}
            >
              {' '}
            </div>
          </div>
          <div className={styles.contributionInfo}>
            {/* TODO(jtmckibb): Add commas for easier readability */}$
            {Math.floor(props.amountRaised) / 100} of $
            {(Math.floor(props.targetAmount) / 100).toLocaleString()}
            <SupporterTooltip
              title={
                <React.Fragment>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <b>{props.numGiftCards}</b> gift cards
                        </td>
                        <td>
                          <b>${Math.floor(props.giftCardAmount) / 100}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>{props.numDonations}</b> donations
                        </td>
                        <td>
                          <b>${Math.floor(props.donationAmount) / 100}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </React.Fragment>
              }
              enterTouchDelay={50} placement="top"
            >
              <div>
                <b>{props.numContributions}</b> supporters
              </div>
            </SupporterTooltip>
          </div>
        </div>
        <ProgressBar
        amountRaised={props.amountRaised}
        targetAmount={props.targetAmount}
        progressBarColor={props.progressBarColor}
      />
      </>
      )}

      

      <div className={styles.buttonContainer}>
        {props.acceptDonations && (
          <button
            value="donation"
            className={classnames(styles.button, 'button--filled')}
            onClick={showModal}
          >
            Donation
          </button>
        )}
        {props.sellGiftCards && (
          <button
            value="gift_card"
            className={classnames(styles.button, 'button--outlined')}
            onClick={showModal}
          >
            Voucher
          </button>
        )}
      </div>
      {validExtraInfo !== [] ? (
        <div className={styles.extraInfoContainer}>
          {validExtraInfo.map((current) => {
            if (current === 'Website' || current === 'Menu') {
              return (
                <>
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
                </>
              );
            } else
              return (
                <>
                  <p key={current} className={styles.extraInfoKey}>
                    {`${current}: `}
                    <span className={styles.extraInfoValue}>
                      {props.extraInfo[current]}
                    </span>
                  </p>
                </>
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

      {/* hide extra info section until needed */}
      {/* <div className={styles.summaryContainer}>
        <div>
          <span className={styles.storeSummaryLabel}>Type: </span>
          <span>Family-owned and operated</span>
        </div>{' '}
        <br />
        <div>
          <span className={styles.storeSummaryLabel}>Employees: </span>
          <span>5</span>
        </div>{' '}
        <br />
        <div>
          <span className={styles.storeSummaryLabel}>Runaway: </span>
          <span>3 months</span>
        </div>{' '}
        <br />
        <div>
          <span className={styles.storeSummaryLabel}>Breakeven: </span>
          <span>$1000 / month</span>
        </div>
      </div> */}

      {/* hide social links until needed */}
      {/* <div className={styles.socialContainer}>
        <a href="#" className={classnames(styles.fa, 'fa fa-twitter')} />
        <a href="#" className={classnames(styles.fa, 'fa fa-instagram')} />
        <a href="#" className={classnames(styles.fa, 'fa fa-facebook')} />
        <a href="#" className={classnames(styles.fa, 'fa fa-youtube')} />
      </div> */}

      <div className={styles.mapsContainer}>
        {/* need to put in google API */}
        {/* might need to use a react lib since it uses script tags */}
        {/* https://www.npmjs.com/package/google-map-react */}
      </div>
    </section>
  );
};

export default OwnerPanel;
