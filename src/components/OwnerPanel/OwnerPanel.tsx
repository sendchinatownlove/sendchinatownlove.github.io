import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import Modal from '../Modal';
import { useModalPaymentDispatch } from '../../utilities/hooks/ModalPaymentContext/context';
import { SET_MODAL_VIEW } from '../../utilities/hooks/ModalPaymentContext/constants';

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
  extraInfo: { [prop: string]: any }
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

  return (
    <section className={classnames(styles.container, props.className)}>
      <figure className={styles.ownerContainer}>
        <img
          className={styles.ownerImage}
          src={props.imageSrc}
          alt={props.ownerName}
        />
      </figure>

      <h2 className={styles.ownerName}>{props.ownerName}</h2>
      {props.targetAmount && (
        <div className={styles.progressContainer}>
          <div className={classnames(styles.progressBar, 'progress-bar')}>
            <div
              className={styles.myBar}
              style={{
                width: `${(props.amountRaised / props.targetAmount) * 100}%`,
                backgroundColor: props.progressBarColor,
                //defaults to default color if no color is passed in
              }}
            >
              {' '}
            </div>
          </div>
          <div>
            {/* TODO(jtmckibb): Add commas for easier readability */}$
            {Math.floor(props.amountRaised) / 100} of $
            {Math.floor(props.targetAmount) / 100}
          </div>
        </div>
      )}

      <div className={styles.buttonContainer}>
        {props.acceptDonations && (
          <button
            value="donation"
            className={classnames(styles.button, 'button--filled')}
            onClick={showModal}
          >
            Donate
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
      {Object.keys(props.extraInfo).length !== 0 ?
        <div
          style={{
            width: '100%',
            borderTop: '1px solid #dedede',
            borderBottom: '1px solid #dedede'
          }}>
          {Object.keys(props.extraInfo).map((current) => {
            if (current === 'Website' || current === 'Menu') {
              return (
                <>
                  <p className={styles.extraInfoKey}>
                    {`${current}: `}
                    <a className={styles.extraInfoValue} href={`http://${props.extraInfo[current]}`}>{props.extraInfo[current]}</a>
                  </p>
                </>
              )
            }
            else {
              return (
                <>
                  <p className={styles.extraInfoKey}>
                    {`${current}: `}
                    <span className={styles.extraInfoValue}>
                      {props.extraInfo[current]}
                    </span>
                  </p>
                </>
              )
            }
          })}
        </div >
        :
        ''
      }


      <ModalBox
        purchaseType={purchaseType}
        sellerId={props.sellerId}
        sellerName={props.sellerName}
      />


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
