import React from 'react'
import classnames from 'classnames';
import styles from './styles.module.scss';

const OrderNow = ({ dummy }) => {
    return (
        <div className={classnames(styles.subsection, styles.orderNow)}>
            <div className={styles.orderNow__hoursSect}>
                <p className={styles.orderNow__bold}>Hours: </p>
                <div className={styles.orderNow__hours}>
                    {dummy.openHours.map(([day, time]) => (
                        <React.Fragment>
                            <p className={styles.orderNow__smaller}>{day}</p>
                            <p className={styles.orderNow__smaller}>{time}</p>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <p ><span className={styles.orderNow__bold}>Take-out/Delivery: </span>{dummy.isOpen ? 'Available' : 'Not Available'}</p>
            <p className={styles.orderNow__smaller}>Support first party ordering! Save your restaurant on fees by ordering straight from them: <span className={styles.orderNow__bold}>555-555-5555</span></p>
        </div>
    );
};

export default OrderNow;