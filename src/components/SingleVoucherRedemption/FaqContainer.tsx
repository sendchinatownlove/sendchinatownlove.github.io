import React from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';

const FaqContainer = ({ name, cnName }) => (
  <article className={styles.faq}>
    <p className={classnames(styles.boldText, styles.faq__p)}>
      To redeem, the voucher must be printed and given to the merchant at time
      of redemption OR the QR code must be scanned with a phone. Voucher may
      only be used once for the entirety of the balance.
    </p>
    <p className={styles.faq__p}>
      {`By proceeding with your purchase, you understand that the voucher card is not redeemable for cash and can only be used at ${name}. All purchases are final. In the event that the merchant is no longer open at the time of redemption, Send Chinatown Love Inc. will not be able to refund your purchase. Vouchers may be redeemed before or on the date of expiration.`}
    </p>
    <p className={classnames(styles.boldText, styles.faq__p)}>
      兑换餐时，请列印本券交给商家，或使用手机扫描 QR 码。此餐券只能单次使用,
      不可找零。
    </p>
    <p className={styles.faq__p}>
      {`此餐券不可兑换为现金並只能用于${cnName}。所有消费不得退换。若此商家在兑换时已经不再营业，献爱华埠 Send Chinatown Love 将不会退款。餐券可以通过 QR 码在有效期限之前或当日兑换。`}
    </p>{' '}
    ​
  </article>
);

export default FaqContainer;
