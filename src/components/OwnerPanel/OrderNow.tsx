import React, { useState, useEffect, FC } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

import DeliveryButton from './DeliveryButton';

import { formatTime } from '../../utilities/general/textFormatter';

interface Props {
  showingAltLayout: boolean
  hours: any[]
  isMerchantOpen: boolean
  deliveryService ?: any[]
}

const OrderNow: FC<Props> = ({ showingAltLayout, hours, isMerchantOpen, deliveryService }) => {
  const [phone, setPhone] = useState<any | null>(null);
  const [thirdPtyDelivery, setThirdPtyDelivery] = useState<any[]>([])

  useEffect(() => {
    if (deliveryService && deliveryService.length > 0) {
      const copy = [...deliveryService]
      const phoneIndex = deliveryService.findIndex((ele) => ele.phone_number)

      copy.splice(phoneIndex, phoneIndex + 1)

      setPhone(deliveryService[phoneIndex])
      setThirdPtyDelivery(copy)
    }
  }, [deliveryService])

  return (
    <div className={classnames(styles.subsection, styles.orderNow)}>
      {showingAltLayout ? <h2 className={classnames(styles.text__toggleMobileDropdown, styles.heading__mobileDropdown)}>View Hours and Order</h2> : null}
      <div className={styles.orderNow__hoursSect}>
        <p className={styles.boldText}>Hours: </p>
        <div className={styles.orderNow__hours}>
          {hours.length > 0
            ? hours.map((ele) => {
                if (ele.open_time === undefined) {
                  return (
                    <p className={styles.p__hours}>
                      <span className={classnames(styles['textHours--bold'],styles.textHours)}>{ele.open_day}</span>
                      <span className={classnames(styles.textHours, styles.textHour__hours)}>CLOSED</span>
                    </p>
                  );
                }
                const { open_day, open_time, close_time } = ele;
                const openTime = formatTime(open_time);
                const closeTime = formatTime(close_time);

                return (
                  <p className={styles.p__hours}>
                    <span className={classnames(styles['textHours--bold'],styles.textHours)}>{open_day}</span>
                    <span className={classnames(styles.textHours, styles.textHour__hours)}>
                      {openTime + ' - ' + closeTime}
                    </span>
                  </p>
                );
              })
            : <p className={styles['p--noMargin']}>Please call this merchant to confirm open hours.</p>}
        </div>
      </div>
      <p>
        <span className={styles.boldText}>Take-out/Delivery: </span>
        {isMerchantOpen ? 'Available' : 'Not Available'}
      </p>
      <p className={styles.orderNow__smaller}>
        Support first party ordering! Save your restaurant on fees by ordering
        straight from them:
        <span className={styles.orderNow__bold}>{phone ? ' ' + phone.phone_number : ' Not Available'}</span>
      </p>
      <div className={styles.delivery_container}>
        {phone && <DeliveryButton imageUrl={phone.delivery_type.icon_url} name={phone.delivery_type.name} phone={phone.phone_number}/>}
        { thirdPtyDelivery.map((ele) => <DeliveryButton imageUrl={ele.delivery_type.icon_url} name={ele.delivery_type.name} deliveryLink={ele.url}/>)}
      </div>
    </div>
  );
};

export default OrderNow;