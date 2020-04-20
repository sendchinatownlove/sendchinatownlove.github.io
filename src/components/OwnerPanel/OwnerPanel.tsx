import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import Modal from '../Modal';

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
  ;
}

interface State {
  show: boolean;
  purchaseType: string;
}

const ModalBox: any = Modal;

class OwnerPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // these will be props fix throughout when passed thru
      show: false,
      purchaseType: '',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  showModal(event: any) {
    let button = event.target.value;
    this.setState({ show: true, purchaseType: button });
  }

  hideModal() {
    this.setState({ show: false });
  }

  render() {
    console.log(this.props)
    return (
      <section className={classnames(styles.container, this.props.className)}>
        <figure className={styles.ownerContainer}>
          <img
            className={styles.ownerImage}
            src={this.props.imageSrc}
            alt={this.props.ownerName}
          />
        </figure>

        <h2 className={styles.ownerName}>{this.props.ownerName}</h2>
        {this.props.targetAmount && (
          <div className={styles.progressContainer}>
            <div className={classnames(styles.progressBar, 'progress-bar')}>
              <div
                className={styles.myBar}
                style={{
                  width: `${
                    (this.props.amountRaised / this.props.targetAmount) * 100
                    }%`,
                  backgroundColor: this.props.progressBarColor
                  //defaults to default color if no color is passed in
                }}
              >
                {' '}
              </div>
            </div>
            <div>
              {/* TODO(jtmckibb): Add commas for easier readability */}$
              {Math.floor(this.props.amountRaised) / 100} of $
              {Math.floor(this.props.targetAmount) / 100}
            </div>
          </div>
        )}
        <div className={styles.buttonContainer}>
          {this.props.acceptDonations && (
            <button
              value="donation"
              className={classnames(styles.button, 'button--filled')}
              onClick={this.showModal}
            >
              Donate
            </button>
          )}
          {this.props.sellGiftCards && (
            <button
              value="gift-card"
              className={classnames(styles.button, 'button--outlined')}
              onClick={this.showModal}
            >
              Gift Card
            </button>
          )}
        </div>
        {Object.keys(this.props.extraInfo).length !== 0 ?
          <div
            style={{
              width: '100%',
              borderTop: '1px solid #dedede',
              borderBottom: '1px solid #dedede'
            }}>
            {Object.keys(this.props.extraInfo).map((current) => {
              if (current === 'Website' || current == 'Menu') {
                return (
                  <>
                    <p
                      style={{
                        fontWeight: 'bold'
                      }}>
                      {`${current}: `}
                      <a href={`http://${this.props.extraInfo[current]}`}>{this.props.extraInfo[current]}</a>
                    </p>
                  </>
                )
              }
              else {
                return (
                  <>
                    <p style={{
                      fontWeight: 'bold',
                    }}>
                      {`${current}: `}
                      <span style={{
                        fontWeight: 'normal'
                      }}>
                        {this.props.extraInfo[current]}
                      </span>
                    </p>
                  </>
                )
              }
            })}
          </div>
          :
          ''
        }


        <ModalBox
          show={this.state.show}
          handleClose={this.hideModal}
          purchaseType={this.state.purchaseType}
          sellerId={this.props.sellerId}
          sellerName={this.props.sellerName}
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
  }
}

export default OwnerPanel;
