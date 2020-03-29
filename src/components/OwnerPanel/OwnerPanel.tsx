import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface Props {
  ownerName: string;
  imageSrc: string;
  className?: string;
}

const OwnerPanel: React.SFC<Props> = ({ imageSrc, ownerName, className }) => {
  return (
    <section className={classnames(styles.container, className)}>
      <figure className={styles.ownerContainer}>
        <img className={styles.ownerImage} src={imageSrc} alt={ownerName} />
      </figure>
      <h2 className={styles.ownerName}>{ownerName}</h2>
      <div className={styles.buttonContainer}>
        <button className={classnames(styles.button, "button--filled")}>Donate</button>
        <button className={classnames(styles.button, "button--outlined")}>Buy Gift Card</button>
      </div>
    </section>
  );
};

export default OwnerPanel;
