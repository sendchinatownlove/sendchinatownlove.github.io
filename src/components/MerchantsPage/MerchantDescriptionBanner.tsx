import * as React from 'react';
import styled from 'styled-components';
import merchantIcon from './images/merchant_icon.png';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

const MerchantDescriptionBanner = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerBackground}></div>
      <div className={styles.bannerContentContainer}>
        <div className={styles.bannerText}>
          <h3 className={styles.bannerHeaderText}>
            {t('descriptionBox.header')}
          </h3>
          <List>
            <Bullets>{t('descriptionBox.bullet1')}</Bullets>
            <Bullets>{t('descriptionBox.bullet2')}</Bullets>
            <Bullets>{t('descriptionBox.bullet3')}</Bullets>
            <Bullets>{t('descriptionBox.bullet4')}</Bullets>
            <Bullets>{t('descriptionBox.bullet5')}</Bullets>
          </List>
        </div>
        <img
          src={merchantIcon}
          className={styles.merchantIconImage}
          alt="target-merchant-img"
        />
      </div>
    </div>
  );
};

export default MerchantDescriptionBanner;

const List = styled.ul`
  padding: 0 5px 0 20px;
`;

const Bullets = styled.li`
  font-family: Open Sans, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 160%;
  color: #ffffff;
`;
