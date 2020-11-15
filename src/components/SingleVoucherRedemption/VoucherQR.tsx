import React from 'react';

import styles from './styles.module.scss';
import mock from './assets/mockVoucherQR.png';

const VoucherQR = ({ qrUrl }) => (
  <section className={styles.body__QrImage}>
    <img className={styles.qrImage} src={qrUrl || mock} alt="QR Code" />
    <span>Scan the QR code to redeem with your phone</span>
    <span>扫描 QR 码以兑换餐</span>
  </section>
);

export default VoucherQR;
