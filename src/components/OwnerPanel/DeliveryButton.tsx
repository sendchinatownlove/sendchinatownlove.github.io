import React, { FC } from 'react';
import styles from './styles.module.scss'

interface Props {
  imageUrl: string
  name: string
  deliveryLink ?: string
  phone ?: string
}

const DeliveryButton: FC<Props> = ({ imageUrl, name, deliveryLink, phone }) => {
  return (
    <a className={styles.button__delivery} href={phone ? 'tel:' + phone : deliveryLink}>
      <img className={styles.deliveryImage}src={imageUrl} alt={phone ? 'Merchant Phone Number: ' + phone : name} />
    </a>
  )
}

export default DeliveryButton