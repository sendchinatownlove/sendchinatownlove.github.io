import React, { useState } from 'react';
import classnames from 'classnames';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { SET_MODAL_VIEW } from '../../utilities/hooks/ModalPaymentContext/constants';
import Modal from '../Modal';
import ProgressBar from '../ProgressBar';
import styles from './styles.module.scss';
import defaultOwnerImage from './assets/female.svg';

interface Props {
  imageSrc: string;
  className?: string;
  amountRaised: number;
  targetAmount: number;
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
      {props.targetAmount && (
        <ProgressBar
          amountRaised={props.amountRaised}
          targetAmount={props.targetAmount}
          progressBarColor={props.progressBarColor}
        />
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
            Gift Card
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
