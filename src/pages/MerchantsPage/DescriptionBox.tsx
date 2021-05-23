import * as React from 'react';
import styled from 'styled-components';
import { MerchantCard } from './MerchantCard';
import merchantIcon from './images/merchantIcon.png';
import { useTranslation } from 'react-i18next';

const TargetMerchantBox = () => {
  const { t } = useTranslation();

  return (
    <MerchantCard className="descriptionBox">
      <Icon src={merchantIcon} alt="target-merchant-img" />
      <h3>{t('descriptionBox.header')}</h3>
      <List>
        <Bullets>{t('descriptionBox.bullet1')}</Bullets>
        <Bullets>{t('descriptionBox.bullet2')}</Bullets>
        <Bullets>{t('descriptionBox.bullet3')}</Bullets>
        <Bullets>{t('descriptionBox.bullet4')}</Bullets>
        <Bullets>{t('descriptionBox.bullet5')}</Bullets>
      </List>
    </MerchantCard>
  );
};

export default TargetMerchantBox;

const Icon = styled.img`
  width: 35%;
`;

const List = styled.ul`
  padding: 0 5px 0 20px;
`;

const Bullets = styled.li`
  text-align: left;
  padding: 5px 0;
`;
