import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import confirmationPic from './chinatown-logo.png';

interface Props {
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showConfirmModal: boolean;
}

const ModalConfirmation: React.SFC<Props> = ({
  handleClose,
  showConfirmModal,
}) => {
  return (
    <form
      id="payment-form"
      className={classnames(styles.container, 'modalForm--form')}
      style={{ display: showConfirmModal ? 'block' : 'none' }}
    >
      <button className={'closeButton--close'} onClick={handleClose}>
        {' '}
        ×
      </button>

      <h2>Thank you for your donation!</h2>
      <p>We appreciate your support for small businesses</p>

      <img className={styles.image} src={confirmationPic} alt="Logo" />

      <button
        className={classnames(styles.finishBtn, 'modalButton--filled')}
        onClick={handleClose}
      >
        {' '}
        Finish
      </button>
    </form>
  );
};

export default ModalConfirmation;
