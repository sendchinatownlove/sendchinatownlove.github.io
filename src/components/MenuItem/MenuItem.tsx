import * as React from 'react';
import sampleMenuItem from './sample-menu-item.png';
import styles from './styles.module.scss';

export interface Props {
  name: string;
  description: string;
  imageSrc?: string;
}

const MenuItem: React.SFC<Props> = ({
  name,
  description,
  imageSrc = sampleMenuItem,
}) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageSrc} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default MenuItem;
