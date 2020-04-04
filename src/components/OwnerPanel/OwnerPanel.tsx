import * as React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface Props {
  ownerName: string;
  imageSrc: string;
  className?: string;
}

const OwnerPanel: React.SFC<Props> = ({ imageSrc, ownerName, className }) => {
  
  // these will be props fix throughout when passed thru 
  const current = 4000;
  const need = 5000;
  //  fix ^^^ 

  
  return (
    <section className={classnames(styles.container, className)}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

      <figure className={styles.ownerContainer}>
        <img className={styles.ownerImage} src={imageSrc} alt={ownerName} />
      </figure>

      <h2 className={styles.ownerName}>{ownerName}</h2>

      <div className={styles.progressContainer}>
        <div className={classnames(styles.progressBar, "progress-bar")}>
          <div className={styles.myBar} style={{width: `${(current/need)*100}%`}}> </div>
        </div>
        {/* pass props down here*/}
        <div>${current} of ${need}</div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={classnames(styles.button, "button--filled")}>Donate</button>
        <button className={classnames(styles.button, "button--outlined")}>Buy Gift Card</button>
      </div>

      <div className={styles.summaryContainer}>
        <div>
          <span className={styles.storeSummaryLabel}>Type: </span>
          <span>Family-owned and operated</span>
        </div> <br/>
        <div>
          <span className={styles.storeSummaryLabel}>Employees: </span>
          <span>5</span>
        </div> <br/>
        <div>
          <span className={styles.storeSummaryLabel}>Runaway: </span>
          <span>3 months</span>
        </div> <br/>
        <div>
          <span className={styles.storeSummaryLabel}>Breakeven: </span>
          <span>$1000 / month</span>
        </div>
      </div>

      <div className={styles.socialContainer}>
        {/* TEMPLATE!!! add appropriate links & social icons as needed*/}
        <a href="#" className={classnames(styles.fa, "fa fa-twitter")} />
        <a href="#" className={classnames(styles.fa, "fa fa-instagram")} />
        <a href="#" className={classnames(styles.fa, "fa fa-facebook")} />
        <a href="#" className={classnames(styles.fa, "fa fa-youtube")} />
      </div>

      <div className={styles.mapsContainer}>
        {/* need to put in google API */}
        {/* might need to use a react lib since it uses script tags */}
        {/* https://www.npmjs.com/package/google-map-react */}
      </div>

    </section>
  );
};

export default OwnerPanel;
